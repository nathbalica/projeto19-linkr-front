import { styled } from "styled-components"
import { IoIosArrowDown } from "react-icons/io";

export const ContainerHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 72px;
    background-color: #151515;
    padding: 0 20px;
    box-sizing: border-box;

    position: fixed;
    top: 0;
    z-index: 1000;
`

export const LogoName = styled.h1`
    color: white;
    font-family: 'Passion One', sans-serif;
    font-size: 45px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 2.25px; 
    cursor: pointer;
`

export const Avatar = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #ffffff; /* Cor de fundo caso a imagem tenha áreas transparentes */
    object-fit: cover; /* Garante que a imagem preencha o círculo */
`

export const UserContainer = styled.div `
    
`

export const ArrowIcon = styled(IoIosArrowDown)`
    width: 24px;
    height: 24px;
    cursor: pointer;
    fill: white;
    margin-right: 10px;
`;

export const LogoutMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 72px;
    right: 0px;
    color: #fff;
    width: 135px;
    height: 38px; 
    padding: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 0px 0px 0px 20px;
    background: #171717; 
    object-fit: cover;

    color: #FFF;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.75px; 
    cursor: pointer;

`;