import React, { useState } from "react";
import BasicButton from "../BasicButton";
import { Loader } from "../../utils/Atoms";
import Button from "../Button";
import AbstractUser from "../../assets/abstract-user.png";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useVerifyAuth } from "../../hooks/auth/useVerifyAuth";


const Invitation = ({
    setGlobalError = () => {},
    invitation,
}) => {
    const {verifyAuth} = useVerifyAuth()

    const { user } = useAuthContext();
    const [isAccepting, setIsAccepting] = useState(false)

    const handleAccept = () => {
        const fetchAccept = async () => {
            setIsAccepting(true)
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/join/?IdEquipe=' + invitation.IdEquipe , {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            })
            await verifyAuth();

            const json = await response.json();
            
            if (!response.ok) {     
                console.log(json.error)
                setGlobalError(json.error);
            }
            if (response.ok) {
                console.log("accepted") 
            }
            setIsAccepting(false)
        }
        fetchAccept()
    }

    return (
        invitation &&
        <Button className="button">
            <div className="left">
                <img
                    src={AbstractUser}
                    alt="Icone utilisateur"
                    className="icon"
                />
                <p style={{margin: 0}}>{invitation.Users.filter((u) => u.id === invitation.IdLeader)[0].firstname + " " + invitation.Users.filter((u) => u.id === invitation.IdLeader)[0].lastname + " vous a invité a rejoindre l'équipe " + invitation.Nom}</p>
            </div>
            {true ? (
                <div>
                    {isAccepting ?
                    <Loader/>
                    :
                    <BasicButton onPress={(e) => handleAccept()}>
                        Accept
                    </BasicButton>}
                </div>
            ) : null}
        </Button>
    )
}

export default Invitation;