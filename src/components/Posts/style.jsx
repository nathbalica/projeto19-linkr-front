import styled from "styled-components";
import { IoHeartOutline, IoHeart, IoTrash } from "react-icons/io5";
import { BsPencilFill } from "react-icons/bs";

export const ContainerPosts = styled.div`
    height: auto;
    display: flex;
    background: #171717;
    padding: 15px;
    margin-bottom: 20px;
    flex-shrink: 0;
    max-width: 561px;
    @media screen and (min-width: 768px) {
        width: 100%;
        height: 276px;
        border-radius: 16px;
    }
`;

export const EditBoxContainer = styled.div`
    background-color: white;
    color: #333333;
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
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
    width: 100%;
`;

export const NameUser = styled.h2`
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const PostDescription = styled.p`
    width: 100%;
    margin-top: 10px;
    color: #b7b7b7;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

export const LinkPost = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 115px;
    background: blue;
    border-radius: 11px;
    border: 1px solid #4d4d4d;
    background: rgba(196, 196, 196, 0);
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff; /* Cor de fundo caso a imagem tenha áreas transparentes */
    object-fit: cover; /* Garante que a imagem preencha o círculo */
`;

export const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const PostButtons = styled.p`
    display: flex;
    gap: 5px;
`;

export const DeleteIcon = styled(IoTrash)`
    color: white;
    cursor: pointer;
    font-size: 16px;
`;
export const EditIcon = styled(BsPencilFill)`
    color: white;
    cursor: pointer;
    font-size: 15px;
`;

export const TextAreaContent = styled.textarea`
    width: 100%;
    min-height: 47px;
    padding: 8px;
    margin-top: 10px;
    border-radius: 5px;
    background: white;
    box-sizing: border-box;
    border: none;

    color: #333333;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
`;
