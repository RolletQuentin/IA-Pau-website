import styled from "styled-components";
import SignupForm from "../../../components/Form/Signup";
import NavbarOffset from "../../../components/NavbarOffset";

const StyledAddUser = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
`;

function AdminAddUser() {
    return (
        <StyledAddUser>
            <h1>Ajouter un utilisateur</h1>
            <div></div>
            <SignupForm />
        </StyledAddUser>
    );
}

export default AdminAddUser;
