import React from "react";
import styled from "styled-components";
import apis from "../../services/apis";

const DeleteAlert = ({ closeAlert, token, post_id, updatePosts }) => {
    function sendRequest() {
        if (token) {
            console.log(token, post_id);
            apis.deletePost(post_id, token)
                .then(() => {
                    updatePosts();
                    closeAlert();
                })
                .catch((error) => {
                    console.error("Não foi possível apagar post:", error);
                });
        }
    }
    return (
        <AlertContainer>
            <AlertBox>
                <div className="text">
                    Are you sure you want to delete this post?
                </div>
                <div className="buttons">
                    <button
                        className="no"
                        onClick={closeAlert}
                        data-test="cancel"
                    >
                        No, go back
                    </button>
                    <button
                        className="yes"
                        onClick={sendRequest}
                        data-test="confirm"
                    >
                        Yes, delete it
                    </button>
                </div>
            </AlertBox>
        </AlertContainer>
    );
};

export default DeleteAlert;

const AlertContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const AlertBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Lato";
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    background-color: white;
    border-radius: 30px;
    padding: 25px;
    width: 560px;
    background-color: #333333;
    color: white;
    .text {
        margin-top: 14px;
        width: 300px;
    }
    .buttons {
        margin-top: 40px;
        margin-bottom: 30px;
        gap: 25px;
        display: flex;
    }
    button {
        justify-content: center;
        align-items: center;
        width: 126px;
        height: 36px;
        font-size: 18px;
        font-family: "Lato";
        font-weight: 700;
        border: none;
        border-radius: 5px;
    }
    button.no {
        background-color: white;
        color: #1877f2;
    }
    button.yes {
        background-color: #1877f2;
        color: white;
    }
`;
