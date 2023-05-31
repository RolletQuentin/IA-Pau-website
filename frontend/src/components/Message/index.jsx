import styled from "styled-components";

const StyledMessage = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "SanFrancisco";
    font-size: 1rem;
    padding: 0.1rem;

    & .sender {
        font-size: 0.75rem;
    }

    & p {
        border-radius: 1.15rem;
        line-height: 1.25;
        max-width: 75%;
        padding: 0.5rem 0.875rem;
        position: relative;
        word-wrap: break-word;
    }

    & p::before,
    & p::after {
        bottom: -0.1rem;
        content: "";
        height: 1rem;
        position: absolute;
    }

    & p.from-me {
        align-self: flex-end;
        background-color: #248bf5;
        color: #fff;
    }

    & p.from-me::before {
        border-bottom-left-radius: 0.8rem 0.7rem;
        border-right: 1rem solid #248bf5;
        right: -0.35rem;
        transform: translate(0, -0.1rem);
    }

    & p.from-me::after {
        background-color: #fff;
        border-bottom-left-radius: 0.5rem;
        right: -40px;
        transform: translate(-30px, -2px);
        width: 10px;
    }

    & p[class^="from-"] {
        margin: 0.5rem 0;
        width: fit-content;
    }

    & p.from-me ~ p.from-me {
        margin: 0.25rem 0 0;
    }

    & p.from-me ~ p.from-me:not(:last-child) {
        margin: 0.25rem 0 0;
    }

    & p.from-me ~ p.from-me:last-child {
        margin-bottom: 0.5rem;
    }

    & p.from-them {
        align-items: flex-start;
        background-color: #e5e5ea;
        color: #000;
    }

    & p.from-them:before {
        border-bottom-right-radius: 0.8rem 0.7rem;
        border-left: 1rem solid #e5e5ea;
        left: -0.35rem;
        transform: translate(0, -0.1rem);
    }

    & p.from-them::after {
        background-color: #fff;
        border-bottom-right-radius: 0.5rem;
        left: 20px;
        transform: translate(-30px, -2px);
        width: 10px;
    }

    & p[class^="from-"].emoji {
        background: none;
        font-size: 2.5rem;
    }

    & p[class^="from-"].emoji::before {
        content: none;
    }
`;

function Message({ date, sender, idSender, content, idViewer }) {
    const messageOwner = idSender === idViewer;
    return (
        <StyledMessage>
            <p className={messageOwner ? "from-me" : "from-them"}>
                <span className="sender">{sender}</span>
                <br />
                {content}
            </p>
        </StyledMessage>
    );
}

export default Message;
