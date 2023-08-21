import { styled } from "styled-components";

export const ContainerTimeline = styled.div`
    min-height: 100vh;
    padding-bottom: 20px;
`;

export const ContainerFeed = styled.div`
    padding-top: 72px;
    @media screen and (min-width: 768px) {
        width: 611px;
        padding: 25px;
    }
`;

export const TextTimeline = styled.h1`
    padding: 20px;
    color: #fff;
    font-family: Oswald;
    font-size: 33px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    @media screen and (min-width: 768px) {
        text-align: left;
    }
`;

export const NoPostsMessage = styled.p`
    padding: 60px 20px 20px 20px;
    color: #666;
    font-size: 20px;
    text-align: center;
`;

export const ContainerContent = styled.div`
    @media screen and (min-width: 768px) {
        display: flex;
        justify-content: center;
        padding-top: 72px;
    }
`;

export const ContainerHashtags = styled.div`
    display: none;
    @media screen and (min-width: 768px) {
        min-height: 406px; /* Pode ajustar conforme necessário */
        display: flex;
        justify-content: center;
        align-items: flex-start;
        margin-top: 115px;
    }
`;
