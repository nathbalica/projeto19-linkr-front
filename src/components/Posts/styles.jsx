import styled from "styled-components";
import { IoHeartOutline, IoHeart, IoTrash, IoChatbubblesOutline } from "react-icons/io5";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

export const ContainerPosts = styled.div`
    height: auto;
    display: flex;
    background: #171717;
    padding: 15px;
    flex-shrink: 0;
    width: 100%;
    z-index: 2;
    @media screen and (min-width: 768px) {
        height: auto;
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
    padding-right: 10px;
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
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
`;

export const CommentsIcon = styled(IoChatbubblesOutline)`
    color: white;
    margin-top: 15px;
    font-size: 20px;
    cursor: pointer;
`

export const CommentsCount = styled.p`
    color: #fff;
    text-align: center;
    font-family: Lato;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
    padding-left: 2px;
    margin-left: -2px;
    width: 62px;
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
    cursor: pointer;
`;

export const PostDescription = styled.p`
    margin-top: 10px;
    color: #b7b7b7;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    .hashtag {
        font-weight: bold;
    /* Outros estilos que você deseja aplicar */
    }
`;

export const HashtagLink = styled(Link)`
  color: white;
  text-decoration: none; /* Optional: Remove underline for the link */
`;

export const Articles = styled.div`
    display: flex;
    align-items: center;
`;

export const MetaDataInfos = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    flex: 1;
    color: #fff;
    h2 {
        color: #cecece;
        font-family: Lato;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 5px;
    }
    h3 {
        color: #9b9595;
        font-family: Lato;
        font-size: 9px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 5px;
    }
    p {
        color: #cecece;
        font-family: Lato;
        font-size: 9px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 5px;
    }
    @media screen and (min-width: 768px) {
        h2 {
            font-size: 16px;
        }
        h3 {
            font-size: 11px;
        }
        p {
            font-size: 11px;
        }
    }
`;

export const MetaDataImage = styled.div`
    width: 95px;
    height: 115px;
    margin: 0;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0px 13px 13px 0px;
        flex-shrink: 0;
    }
    @media screen and (min-width: 768px) {
        min-height: 153px;
    }
`;

export const LinkPost = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    min-height: 115px;
    border-radius: 13px;
    border: 1px solid #4d4d4d;
    cursor: pointer;
    @media screen and (min-width: 768px) {
        min-height: 155px;
    }
`;

export const Avatar = styled.img`
    width: 50px;
    height: 50px;
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
TextAreaContent.defaultProps = {
    id: "edit-textarea",
};

export const LoadingContainer = styled.div`
    padding-top: 10px;
    margin-left: 100px;
    @media screen and (min-width: 768px) {
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        margin-left: 130px;
        width: 100%;
        height: 100%; /* Set the height to 100% to ensure vertical centering */
    }
`;
