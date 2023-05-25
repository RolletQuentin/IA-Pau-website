import styled from "styled-components";
import NavbarOffset from "../../components/NavbarOffset";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../utils/Atoms";

const StyledAdminUsers = styled.div``;

function AdminUsers() {
    const { data, isLoading, error } = useFetch(
        process.env.REACT_APP_PROXY + "/api/user/"
    );
    console.log(process.env.REACT_APP_PROXY);

    return (
        <StyledAdminUsers>
            <NavbarOffset />
            {isLoading ? <Loader /> : <div>AdminUser</div>}
        </StyledAdminUsers>
    );
}

export default AdminUsers;
