import { styled } from '@mui/material/styles';

const RootContainer = styled('div')({
  justifyContent: 'left',
});

const DrawerContainer = styled('div')({
  paddingTop: '20px',
  width: '245px',
});

const ItemContainer = styled('div')({
  display: 'flex',
  paddingTop: 0,
  paddingBottom: 0,
});

const ButtonContainer = styled('div')({
  padding: '10px 8px',
  justifyContent: 'flex-start',
  textTransform: 'none',
  letterSpacing: 0,
  width: '100%',
});

const ButtonRootContainer = styled('div')({
  paddingLeft: '25px',
  justifyContent: 'left !important',
});

const SubMenuContainer = styled('div')({
  paddingLeft: '50px !important',
});

export {
  RootContainer,
  DrawerContainer,
  ItemContainer,
  ButtonContainer,
  ButtonRootContainer,
  SubMenuContainer,
};
