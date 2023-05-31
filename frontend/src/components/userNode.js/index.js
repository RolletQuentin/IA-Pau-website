import React, { useState } from "react";
import BasicButton from "../BasicButton";
import { Loader } from "../../utils/Atoms";
import Button from "../Button";
import AbstractUser from "../../assets/abstract-user.png";


const UserNode = ({
    editable = false,
    member = null,
    setGlobalError,

}) => {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = (id) => {
        const fetchDelete = async () => {
            setIsDeleting(true)
            setGlobalError("")
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/evenements/getAllEvenements/')
    
            const json = await response.json();
            if (!response.ok) {     
                setGlobalError(json.error);
            }
            
            if (response.ok) {
                console.log(json.error) 
                
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
                <span>{member.nom}</span>
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