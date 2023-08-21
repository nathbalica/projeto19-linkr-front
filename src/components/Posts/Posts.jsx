import { styled } from "styled-components";
import apis from "../../services/apis";
import { useEffect } from "react";
import { useState } from "react";
import { ContainerPosts, Perfil, HeartIconOutline, HeartIconFull, Likes, Content, NameUser, Avatar } from "./styles";
import { RotatingLines } from "react-loader-spinner";


export default function Posts({ post, updatePosts }) {
    const [metaData, setMetaData] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

    // console.log(post.link)

    useEffect(() => {
        if (post.link) {
            setLoading(true);
            apis.getMetaData(post.link)
                .then((res) => {
                    if (res) {
                        setMetaData({
                            title: res.title || "",
                            description: res.description || "",
                            images: res.images && res.images.length > 0 ? res.images[0] : "",
                            url: post.link,
                        });
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [post.link]);

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
                    {post.like_count} {post.like_count === 1 ? "like" : "likes"}
                </Likes>
            </Perfil>
            <Content>

                <NameUser>{post.username}</NameUser>
                <PostDescription>{post.content}</PostDescription>

                {loading ? (
                    <LoadingContainer>
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="48"
                            visible={true}
                        />
                    </LoadingContainer>

                ) : (
                    <LinkPost>
                        {metaData && (
                            <a href={metaData.url} target="_blank" rel="noopener noreferrer">
                                <Articles>
                                    <MetaDataInfos>
                                        <h2>
                                            {metaData.title.length > (window.innerWidth >= 768 ? 114 : 70)
                                                ? metaData.title.substring(0, window.innerWidth >= 768 ? 114 : 70) + "..."
                                                : metaData.title}
                                        </h2>
                                        <h3>
                                            {metaData.description.length > (window.innerWidth >= 768 ? 240 : 120)
                                                ? metaData.description.substring(0, window.innerWidth >= 768 ? 240 : 120) + "..."
                                                : metaData.description}
                                        </h3>
                                        <p>
                                            {metaData.url.length > (window.innerWidth >= 768 ? 200 : 80)
                                                ? metaData.url.substring(0, window.innerWidth >= 768 ? 200 : 80) + "..."
                                                : metaData.url}
                                        </p>
                                    </MetaDataInfos>
                                    {metaData.images && <MetaDataImage><img alt="a" src={metaData.images} /></MetaDataImage>}
                                </Articles>
                            </a>

                        )}
                    </LinkPost>
                )}
            </Content>
        </ContainerPosts>
    );
}

const LoadingContainer = styled.div`
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

const PostDescription = styled.p`
    margin-top: 10px;
    color: #b7b7b7;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Articles = styled.div`
    display: flex;
    align-items: center;
`;

const MetaDataInfos = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    flex: 1;
    color: #fff;

    h2{
        color: #CECECE;
        font-family: Lato;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 5px;
    }
    h3{
        color: #9B9595;
        font-family: Lato;
        font-size: 9px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 5px;
    }
    p{
        color: #CECECE;
        font-family: Lato;
        font-size: 9px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 5px;
    }

    @media screen and (min-width: 768px) {
        h2{
            font-size: 16px;
        }
        h3{
            font-size: 11px;
        }
        p{
            font-size: 11px;
        }
    }
`;

const MetaDataImage = styled.div`
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

const LinkPost = styled.div`
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


