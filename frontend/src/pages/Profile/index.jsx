import CenterContainer from "../../containers/CenterContainer";
import NavbarOffset from "../../components/NavbarOffset";
import SignupForm from "../../components/Form/Signup";

function Profile() {
    return (
        <CenterContainer style={{ minWidth: "500px" }}>
            <SignupForm
                title="Profil"
                icon={true}
                buttonText="Enregistrer"
                firstAuth={false}
            />
        </CenterContainer>
    );
}

export default Profile;
