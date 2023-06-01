import React, { useState } from "react";
import BasicButton from "../BasicButton";
import { Loader } from "../../utils/Atoms";
import Button from "../Button";
import AbstractUser from "../../assets/abstract-user.png";
import HBox from "../../containers/HBox";
import VBox from "../../containers/VBox";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";


const UserNode = ({
    editable = false,
    member = null,
    setGlobalError,

}) => {
    const { user } = useAuthContext();

    const {id_team} = useParams();
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = (id) => {
        const fetchDelete = async () => {
            setIsDeleting(true)
            setGlobalError("")
            console.log(id)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/teams/kick/?IdEquipe=' + id_team + '&IdUser=' + id, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            })
    
            const json = await response.json();
            if (!response.ok) {     
                setGlobalError(json.error);
            }
            
            if (response.ok) {
                console.log() 
                
            }
            setIsDeleting(false)
        }
        fetchDelete()
    }

    return (
        member &&
        <Button className="button">
            <div className="left">
                <img
                    src={AbstractUser}
                    alt="Icone utilisateur"
                    className="icon"
                />
                <VBox gap="0">
                    <p style={{margin: 0}}>{member.firstname + " " + member.lastname}</p>
                    <small>{member.email}</small>
                </VBox>
            </div>
            {editable ? (
                <div>
                    {isDeleting ?
                    <Loader/>
                    :
                    <BasicButton className="delete" onPress={(e) => handleDelete(member.id)}>
                        Supprimer
                    </BasicButton>}
                </div>
            ) : null}
        </Button>
    )
}

export default UserNode;