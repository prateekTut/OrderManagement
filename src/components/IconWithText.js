// IconWithText.js
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const RootContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const IconContainer = styled(Avatar)({
  marginRight: theme => theme.spacing(2),
  backgroundColor: "#e6f7ff",
  width: 50,
  height: 50,
});

const ContentContainer = styled('div')({
  marginLeft: 10,
  marginBottom: theme => theme.spacing(2),
});

const CustHeading = styled(Typography)({
  color: "#7F8FA4",
  fontSize: 12
});

const CustContent = styled(Typography)({
  fontSize: 15
});

const IconWithText = ({ icon, heading, content, iconColor }) => {
  return (
    <RootContainer>
      <IconContainer >
      {React.cloneElement(icon, {
          style: { color: iconColor || 'inherit' },
        })}
      </IconContainer>
      <ContentContainer>
        <CustHeading gutterBottom>
          {heading}
        </CustHeading>
        <CustContent variant="body1">
          {content}
        </CustContent>
      </ContentContainer>
    </RootContainer>
  );
};

export default IconWithText;
