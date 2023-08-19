import { useState } from "react";
import { ContainerPublish, TextTitle, ContentContainer, InputTitle, TextAreaContent, ButtonContainer, SubmitButton } from "./style";


export default function Publication() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {
        // Lógica para enviar a publicação
    };
    return (
        <ContainerPublish>
            <TextTitle>
                What are you going to share today?
            </TextTitle>
            <ContentContainer>
                <InputTitle
                    placeholder="Your Link"
                    value={title}
                    onChange={handleTitleChange}
                />
                <TextAreaContent
                    placeholder="Write your content here..."
                    value={content}
                    onChange={handleContentChange}
                />
            </ContentContainer>
            <ButtonContainer>
                <SubmitButton onClick={handleSubmit}>Publish</SubmitButton>
            </ButtonContainer>

        </ContainerPublish>
    )
}




