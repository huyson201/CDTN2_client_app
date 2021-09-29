import React from 'react';
import styled from 'styled-components';
export default function CustomButton({text, color, bgColor, onPress}) {
  return (
    <ButtonContainer onPress={onPress} bgColor={bgColor}>
      <ButtonText  color={color}>{text}</ButtonText>
    </ButtonContainer>
  );
}
const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  margin-top:10px;
  background-color: ${props => props.bgColor};
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => props.color};
`;
