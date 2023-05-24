import SignupForm from "../../components/Form/Signup";
import NavbarOffset from "../../components/NavbarOffset";
import CenterContainer from "../../containers/CenterContainer";

function Signup() {
    return(
        <CenterContainer style = {{minWidth: "500px"}}>  
        <NavbarOffset></NavbarOffset>
            <SignupForm></SignupForm>
        </CenterContainer>
    )
}

export default Signup;
