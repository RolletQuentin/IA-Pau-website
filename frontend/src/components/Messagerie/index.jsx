import styled from "styled-components";
import Button from "../Button";
import InputTextDefault from "../Input/Text/Default";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Message from "../Message";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { togglePost } from "../../toggles/togglePost";
import { Loader } from "../../utils/Atoms";

const StyledMessagerie = styled.div`
    & .mainContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        width: 100%;
        height: 750px;
        padding: 10px 30px;
    }

    & .conversation {
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 30px;

        /* Styles pour la scrollbar personnalisée */
        scrollbar-width: thin;
        scrollbar-color: #c4c4c4 transparent;
    }

    & .conversation::-webkit-scrollbar {
        width: 8px;
    }

    & .conversation::-webkit-scrollbar-thumb {
        background-color: #c4c4c4;
        border-radius: 4px;
    }

    & .conversation::-webkit-scrollbar-thumb:hover {
        background-color: #a6a6a6;
    }

    & .conversation::-webkit-scrollbar-track {
        background-color: transparent;
    }

    & .conversation::-webkit-scrollbar-track:hover {
        background-color: #f2f2f2;
    }

    & .send-message {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
    }

    & .send-button {
        background: none;
        border: none;
    }

    & .send-button:hover {
        cursor: pointer;
    }
`;

function Messagerie({ className }) {
    const { user } = useAuthContext();
    const { id_equipe, id_data_challenge } = useParams();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");
    const conversationRef = useRef(null);
    const [isMouseActive, setIsMouseActive] = useState(false);

    // fetch all the messages from one team
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await fetch(
                        process.env.REACT_APP_PROXY +
                            `/api/messages/retrieve/?IdEquipe=${id_equipe}`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.jwt}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const json = await response.json();
                    setMessages(json);
                    scrollToBottom();
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        setIsLoading(true);
        fetchData();
    }, [id_equipe, user]);

    const scrollToBottom = () => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop =
                conversationRef.current.scrollHeight;
        }
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <StyledMessagerie className={className}>
            <Button className="mainContainer">
                <h2>Messagerie</h2>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="conversation" ref={conversationRef}>
                        {user &&
                            messages &&
                            messages.map(
                                ({
                                    IdMessage,
                                    DateMessage,
                                    sender,
                                    IdSender,
                                    content,
                                }) => {
                                    return (
                                        <Message
                                            key={IdMessage}
                                            date={DateMessage}
                                            sender={sender}
                                            idSender={IdSender}
                                            content={content}
                                            idViewer={user.userId}
                                        />
                                    );
                                }
                            )}
                    </div>
                )}

                <div className="send-message">
                    <InputTextDefault
                        placeholder="Ecrire un message"
                        value={content}
                        setValue={setContent}
                    />
                    <button
                        className="material-symbols-outlined send-button"
                        onClick={() => {
                            togglePost(
                                process.env.REACT_APP_PROXY +
                                    `/api/messages/send/?IdEquipe=${id_equipe}`,
                                user,
                                { "content": content }
                            );
                            setContent("");
                            scrollToBottom();
                        }}
                    >
                        send
                    </button>
                </div>
            </Button>
        </StyledMessagerie>
    );
}

export default Messagerie;
