import convertNumberToWords from 'number-to-words';

export function amountInWords(currencySymbol, amount) {
  const currencyNames = {
    $: 'US Dollar',
    '₹': 'Indian Rupee',
    '£': 'British Pound Sterling',
  };

  const numberToWords = (num) => {
    if (num === 0) {
      return 'Zero';
    }

    const roundedNum = Math.round(num * 100) / 100;

    const integerPartWords = convertNumberToWords.toWords(roundedNum);

    const decimalPart = roundedNum % 1;
    const decimalPartWords =
      decimalPart > 0 ? ` and ${Math.round(decimalPart * 100)} cents` : '';

    return `${integerPartWords} ${decimalPartWords}`;
  };

  const currencyName = currencyNames[currencySymbol];

  if (!currencyName) {
    throw new Error('Unsupported currency symbol');
  }

  const amountWords = numberToWords(amount);

  return `${amountWords} ${currencyName} only`;
}
