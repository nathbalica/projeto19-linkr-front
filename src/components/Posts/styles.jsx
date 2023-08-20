import { styled } from "styled-components";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

export const ContainerPosts = styled.div`
    height: auto;
    display: flex;
    background: #171717;
    padding: 15px;
    margin-bottom: 20px;
    flex-shrink: 0;
    @media screen and (min-width: 768px) {
    width: 100%;
    height: 276px;
    border-radius: 16px;
  }
`;

export const Perfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 15px;
`;

export const HeartIconOutline = styled(IoHeartOutline)`
    color: white;
    margin-top: 17px;
    font-size: 20px;
    cursor: pointer;
`;

export const HeartIconFull = styled(IoHeart)`
    color: red;
    margin-top: 17px;
    font-size: 20px;
    cursor: pointer;
`;

export const Likes = styled.p`
    color: #fff;
    text-align: center;
    font-family: Lato;
    font-size: 9px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
`;

export const NameUser = styled.h2`
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff; /* Cor de fundo caso a imagem tenha áreas transparentes */
    object-fit: cover; /* Garante que a imagem preencha o círculo */
`;

