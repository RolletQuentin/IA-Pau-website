import styled from "styled-components";
import SignupForm from "../../../components/Form/Signup";
import NavbarOffset from "../../../components/NavbarOffset";
import { useParams } from "react-router-dom";

const StyledAddUser = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
`;

function AdminAddUser() {
    const { id } = useParams();

    return (
        <StyledAddUser>
            <NavbarOffset />
            <SignupForm
                title={
                    (id === undefined ? "Ajouter" : "Modifier") + " utilisateur"
                }
                icon={false}
                buttonText="Enregistrer"
                firstAuth={false}
            />
        </StyledAddUser>
    );
}

export default AdminAddUser;
