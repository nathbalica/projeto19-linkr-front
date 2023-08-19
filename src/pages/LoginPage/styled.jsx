import styled from "styled-components"
import { headerColor } from "../../constants/colors"
import { mainColor } from "../../constants/colors"
import { Link } from "react-router-dom"



export const AuthContainer = styled.section`
  text-align: center;
  max-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FormContainer = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 23px;
  height: calc(100vh - 175px);


  background-color: ${mainColor};
  @media screen and (min-width: 768px) {
    width: 535px;
    height: 100vh
    
  }
`

export const HeaderAuth = styled.div`
  width: 100%;
  height: 175px;
  background-color: ${headerColor};
  h1{
    color: #FFF;
    font-family: Passion One;
    font-size: 76px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 3.8px;
    
  }
  h3{
      color: #FFF;
      text-align: center;
      font-family: Oswald;
      font-size: 23px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    width: 905px; 
    height: 100vh;
  }
`;

export const ContainerLogo = styled.div `
@media screen and (min-width: 768px) {
  margin-top: 200px;
  h1{
    text-align: left;
    font-size: 106px; 
  }
  h3{
    font-size: 43px; 
    text-align: justify;
  }
}
`

export const InputAuth = styled.input`
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  outline: none;
  width: 100%;
  height: 55px;
  margin-top: 10px;
  border: none;
  :focus {
    border: 2px solid #ffb6b6;
    margin: 0px;
  }
  @media screen and (min-width: 768px) {
    &:first-child{
    margin-top: 200px;
  }
  }
  
`;

export const ButtonAuth = styled.button `
  width: 100%;
  height: 55px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #1877F2;

  color: #FFF;
  font-family: Oswald;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px;
  margin-top: 10px;
`

export const AuthLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
  color: #FFF;
  font-family: Lato;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;

  &:hover {
    color: #ffb6b6;
  }
`;
