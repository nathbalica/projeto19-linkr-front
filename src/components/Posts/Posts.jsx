import { styled } from "styled-components";
// import { FaHeart } from "react-icons/fa";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import avatar from "../../assets/abyssinian.jpg";
import { useState } from "react";

export default function Posts() {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <ContainerPosts>
            <Perfil>
                <Avatar src={avatar} />
                {liked ? (
                    <HeartIconFull onClick={handleLike} />
                ) : (
                    <HeartIconOutline onClick={handleLike} />
                )}
                <Likes>13 likes</Likes>
            </Perfil>
            <Content>
                <NameUser>
                    Juvenal Juvêncio
                </NameUser>
                <PostDescription>
                    Muito maneiro esse tutorial de Material UI
                    com React, deem uma olhada! #react
                    #material
                </PostDescription>
                <LinkPost>
                    Link aqui
                </LinkPost>
            </Content>
        </ContainerPosts>
    );
}

const ContainerPosts = styled.div`
  height: auto;
  display: flex;
  background: #171717;
  padding: 15px;
  margin-bottom: 20px;
  flex-shrink: 0;

`;

const Perfil = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 15px;

`;

const HeartIconOutline = styled(IoHeartOutline)`
  color: white;
  margin-top: 17px;
  font-size: 20px;
  cursor: pointer;
`;

const HeartIconFull = styled(IoHeart)`
  color: red;
  margin-top: 17px;
  font-size: 20px;
  cursor: pointer;
`;

const Likes = styled.p`
    color: #FFF;
    text-align: center;
    font-family: Lato;
    font-size: 9px;
    font-style: normal;
    font-weight: 400;
    line-height: normal; 
    margin-top: 8px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
`;

const NameUser = styled.h2`
    color: #FFF;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal; 
`

const PostDescription = styled.p`
    margin-top: 10px;
    color: #B7B7B7;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal; 
`

const LinkPost = styled.div`
    margin-top: 10px;
    width: 278px;
    height: 115px; 
    background: blue;
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    background: rgba(196, 196, 196, 0.00);


`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff; /* Cor de fundo caso a imagem tenha áreas transparentes */
  object-fit: cover; /* Garante que a imagem preencha o círculo */
`;
