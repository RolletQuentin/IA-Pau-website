import styled from "styled-components";
import routes from "../../utils/routes";
import Button from "../../components/Button";
import BasicButton from "../../components/BasicButton";
import NavbarOffset from "../../components/NavbarOffset";
import { Link } from "react-router-dom";
import AbstractUser from "../../assets/abstract-user.png";
import DataChallengeIcon from "../../assets/data-challenges.png";
import FilesIcon from "../../assets/files.png";

const StyledMyDataChallenge = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 500px;
    margin: auto;

    .admin-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .admin-section-button {
        transform: scale(1.3);
    }

    img {
        width: 50px;
        height: 50px;
    }
`;

function Admin() {
    return (
        <StyledMyDataChallenge>
            <h1>Administrer</h1>

            <Button className="admin-section">
                <img
                    src={AbstractUser}
                    alt="Icone utilisateur"
                    className="icon"
                />
                <h2>Utilisateurs</h2>
                <Link to={routes.adminUsers}>
                    <BasicButton className="admin-section-button">
                        Administrer
                    </BasicButton>
                </Link>
            </Button>

            <Button className="admin-section">
                <img
                    src={DataChallengeIcon}
                    alt="Icone data challenge"
                    className="icon"
                />

                <h2>Data Challenges</h2>
                <Link to={routes.adminDataChallenges}>
                    <BasicButton className="admin-section-button">
                        Administrer
                    </BasicButton>
                </Link>
            </Button>

            <Button className="admin-section">
                <img src={FilesIcon} alt="Icone fichiers" className="icon" />

                <h2>Ressources</h2>
                <Link to={routes.adminRessources}>
                    <BasicButton className="admin-section-button">
                        Administrer
                    </BasicButton>
                </Link>
            </Button>
        </StyledMyDataChallenge>
    );
}

export default Admin;
