import { styled } from "styled-components";

export const ContainerPublish = styled.div`
 
  width: 100%;
  height: auto;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column; /* Para garantir que o botão fique abaixo dos campos */
  align-items: center; 
  justify-content: space-between; /* Alinha o conteúdo no início */
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 209px;
    border-radius: 16px;

  }
`;

export const TextTitle = styled.h1`
  color: #707070;
  text-align: center;
  font-family: Lato;
  font-size: 17px;
  font-weight: 300;
`;

export const InputTitle = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    background: #EFEFEF; 
    border: none;

    color: #949494;
    font-family: Lato;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
`;

export const ContentContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const TextAreaContent = styled.textarea`
    width: 100%;
    min-height: 47px;
    padding: 8px;
    margin-top: 10px;
    border-radius: 5px;
    background: #EFEFEF; 
    box-sizing: border-box;
    border: none;

    color: #949494;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal; 
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; /* Alinha o botão à direita */
`;

export const SubmitButton = styled.button`
    font-family: Lato;
    color: #FFF; 
    margin-top: 10px;
    background-color: #007bff;
    font-size: 14px;
    font-style: normal;
    font-weight: bold; 
    border: none;
    border-radius: 4px;
    width: 112px;
    height: 22px; 
    cursor: pointer;
`;