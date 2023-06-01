import React, { useEffect, useState } from "react";
import SectionContainer from "../../containers/SectionContainer";
import VBox from "../../containers/VBox";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import Invitation from "../../components/Invitation";
import MarginContainer from "../../containers/MarginContainer";
import CenterContainer from "../../containers/CenterContainer";
import styled from "styled-components";

const StyledTeamView = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;

    .section {
        width: 500px;
        display: flex;
        flex-direction: column;
        padding: 10px 50px;
    }

    .button {
        background: var(--primary);
        justify-content: space-between;
        width: auto;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .button img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }

    .delete {
        background: var(--pastel2);
    }

    .add-member {
        align-self: end;
    }

    .return {
        align-self: start;
        margin-top: 20px;
    }
`;

const Invitations = () => {
    const {verifyAuth} = useVerifyAuth()
    const [pendingInvitations, setPendingInvitations] = useState([]);
    const [globalError, setGlobalError] = useState("");
    const { user } = useAuthContext();


    useEffect(() => {

        const fetchPendingInvitation = async () => {
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/myinvitations/', {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            } )
            verifyAuth();
            const json = await response.json();
            if (!response.ok) {     
                console.log(json.error) 
                setGlobalError(json.error);
            }
    
            if (response.ok) {
                setPendingInvitations(json)
                console.log(json)
            }
        }
        fetchPendingInvitation()
    }, [])

    return (
        <StyledTeamView>

                <SectionContainer style={{width: "600px"}}>
                    <h2>Your Invitations</h2>
                    <VBox>
                        {pendingInvitations.map((invitation, index) => {
                            return (
                                <Invitation key={index} invitation={invitation} setGlobalError={setGlobalError}/>
                                )
                            })}
                    </VBox>
            </SectionContainer>
        </StyledTeamView>


    )
}

export default Invitations;