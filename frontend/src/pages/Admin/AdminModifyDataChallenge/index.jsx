import styled from "styled-components";
import { useParams } from "react-router-dom";
import NavbarOffset from "../../../components/NavbarOffset";
import AdminProjects from "../../../components/AdminProjects";
import AdminGestionnaires from "../../../components/AdminGestionnaires";
import AdminRessourcesDataChallenge from "../../../components/AdminRessourcesDataChallenge";
import AdminInfosDataChallenge from "../../../components/AdminInfosDataChallenge";

import { Link } from "react-router-dom";
import routes from "../../../utils/routes";
import Button from "../../../components/Button";
import BasicButton from "../../../components/BasicButton";

const StyledModifyDataChallenge = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    margin: auto;

    & .container {
        margin: 10px 0px;
    }
`;

function AdminModifyDataChallenge() {
    const { id } = useParams();

    return (
        <StyledModifyDataChallenge>
            <h1>Ajouter / Modifier un Data Challenge</h1>
            <AdminInfosDataChallenge className="container" />
            {id !== undefined && (
                <>
                    <AdminProjects id={id} className="container" />
                    <AdminRessourcesDataChallenge
                        id={id}
                        className="container"
                    />
                    <AdminGestionnaires id_event={id} className="container" />
                </>
            )}
            
            <br></br>
            <Link className="return" to={routes.adminDataChallenges}>
                <BasicButton>Retour menu administrer Data Challenges</BasicButton>
            </Link>
        </StyledModifyDataChallenge>
    );
}

export default AdminModifyDataChallenge;
