import { styled } from "styled-components";
// import { FaHeart } from "react-icons/fa";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import apis from "../../services/apis";

export default function Posts({ post, updatePosts }) {
    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

    function toggleLike(id, liked) {
        if (token) {
            if (liked) {
                apis.dislike(id, token).then(() => {
                    updatePosts();
                });
            } else {
                apis.like(id, token).then(() => {
                    updatePosts();
                });
            }
        }
    }

    return (
        <ContainerPosts>
            <Perfil>
                <Avatar src={post.profile_image} />
                {post.liked ? (
                    <HeartIconFull
                        onClick={() => toggleLike(post.id, post.liked)}
                    />
                ) : (
                    <HeartIconOutline
                        onClick={() => toggleLike(post.id, post.liked)}
                    />
                )}
                <Likes>
                    {post.like_count} {post.like_count == 1 ? "like" : "likes"}
                </Likes>
            </Perfil>
            <Content>
                <NameUser>{post.username}</NameUser>
                <PostDescription>{post.content}</PostDescription>
                <LinkPost>{post.link}</LinkPost>
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
    color: #fff;
    text-align: center;
    font-family: Lato;
    font-size: 9px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
`;

const NameUser = styled.h2`
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const PostDescription = styled.p`
    margin-top: 10px;
    color: #b7b7b7;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const LinkPost = styled.div`
    margin-top: 10px;
    width: 278px;
    height: 115px;
    background: blue;
    border-radius: 11px;
    border: 1px solid #4d4d4d;
    background: rgba(196, 196, 196, 0);
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff; /* Cor de fundo caso a imagem tenha áreas transparentes */
    object-fit: cover; /* Garante que a imagem preencha o círculo */
`;
