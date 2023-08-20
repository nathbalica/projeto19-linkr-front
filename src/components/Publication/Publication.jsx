import { useState } from "react";
import {
    ContainerPublish,
    TextTitle,
    ContentContainer,
    InputTitle,
    TextAreaContent,
    ButtonContainer,
    SubmitButton,
} from "./style";
import apis from "../../services/apis";

export default function Publication({ updatePosts }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

    const handleSubmit = () => {
        const postObj = {
            content,
            link: title,
        };

        apis.publish(postObj, token)
            .then((response) => {
                console.log("Post publicado:", response);
                setTitle("");
                setContent("");
                updatePosts();
            })
            .catch((error) => {
                console.error("Erro ao publicar post:", error);
            });
    };
    return (
        <ContainerPublish data-test="publish-box">
            <TextTitle>What are you going to share today?</TextTitle>
            <ContentContainer>
                <InputTitle
                    placeholder="Your Link"
                    value={title}
                    onChange={handleTitleChange}
                    data-test="link"
                />
                <TextAreaContent
                    placeholder="Write your content here..."
                    value={content}
                    onChange={handleContentChange}
                    data-test="description"
                />
            </ContentContainer>
            <ButtonContainer>
                <SubmitButton onClick={handleSubmit} data-test="publish-btn">
                    Publish
                </SubmitButton>
            </ButtonContainer>
        </ContainerPublish>
    );
}
