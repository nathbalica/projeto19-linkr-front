import React from "react";
import styled from "styled-components";

const DeleteAlert = ({ closeAlert, token, post_id }) => {
    function sendRequest() {
        if (token) {
            console.log(token, post_id);
            // apis.deletePost(post_id, token)
            //     .then(() => {
            //         updatePosts();
            //     })
            //     .catch((error) => {
            //         console.error("Não foi possível apagar post:", error);
            //     });
        }
    }
    return (
        <AlertContainer>
            <AlertBox>
                <span>Are you sure you want to delete this post?</span>
                <button className="no" onClick={closeAlert}>
                    No, go back
                </button>
                <button className="yes" onClick={sendRequest}>
                    Yes, delete it
                </button>
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
    font-family: "Roboto";
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    background-color: white;
    border-radius: 8px;
    padding: 12px;
    width: 300px;
    span {
        background-color: #333333;
        color: white;
    }
    button {
        margin-top: 8px;
        padding-top: 4px;
        justify-content: center;
        align-items: center;
        width: 15%;
        height: 28px;
        .no {
            background-color: white;
            color: #1877f2;
        }
        .yes {
            background-color: #1877f2;
            color: white;
        }
    }
`;
