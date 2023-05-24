import CenterContainer from "../../containers/CenterContainer";
import ProfileForm from "../../components/Form/Profile";
import NavbarOffset from "../../components/NavbarOffset";


function Profile() {
    return(        
    <CenterContainer style = {{minWidth: "500px"}}>
        <NavbarOffset></NavbarOffset>
        <ProfileForm></ProfileForm>
    </CenterContainer>
    )
}

export default Profile;
