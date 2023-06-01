import styled from "styled-components";
import NavbarOffset from "../../../components/NavbarOffset";
import SignupForm from "../../../components/Form/Signup";

const StyledModifyUser = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    margin: auto;
`;

function AdminModifyUser() {
    return (
        <StyledModifyUser>
            <SignupForm
                title="Ajouter / Modifier un utilisateur"
                icon={false}
                buttonText="Enregistrer"
                firstAuth={false}
            />
        </StyledModifyUser>
        
    );
}

export default AdminModifyUser;
