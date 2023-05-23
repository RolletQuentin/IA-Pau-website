import LoginForm from "../../components/Form/Login";
import NavbarOffset from "../../components/NavbarOffset";
import CenterContainer from "../../containers/CenterContainer";

function Login() {
    return (
        <CenterContainer style={{ minWidth: "500px" }}>
            <NavbarOffset />
            <LoginForm />
        </CenterContainer>
    );
}

export default Login;
