import styled from "styled-components";
import NavbarOffset from "../../components/NavbarOffset";
import Button from "../../components/Button";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../utils/Atoms";
import FilesIcon from "../../assets/files.png";
import BasicButton from "../../components/BasicButton";
import { Link } from "react-router-dom";
import routes from "../../utils/routes";

const StyledAdminRessources = styled.div`
    margin: auto;
    width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .section {
        width: 800px;
        display: flex;
        flex-direction: column;
        padding: 10px 50px;
    }

    .button {
        margin: 10px;
        background: var(--primary);
        justify-content: space-between;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .button img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }

    .delete {
        background: var(--pastel2);
        margin-right: 20px;
    }

    .add-member {
        align-self: end;
    }

    .return {
        align-self: start;
        margin-top: 20px;
    }
`;

function AdminRessources() {
    const { data, isLoading, error } = useFetch(
        process.env.REACT_APP_PROXY + "/api/ressources/"
    );

    return (
        <StyledAdminRessources>
            <NavbarOffset />
            <h1>Administrer ressources</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <Button className="section">
                    {data.map(({ id, name, description, file }) => (
                        // TODO : replace key email -> id
                        <Button key={id} className="button">
                            <div className="left">
                                <img
                                    src={FilesIcon}
                                    alt="Icone utilisateur"
                                    className="icon"
                                />
                                <span>
                                    {name} {description} {file}
                                </span>
                            </div>
                            <div>
                                <BasicButton className="delete">
                                    Supprimer
                                </BasicButton>
                                <Link>
                                    <BasicButton className="update">
                                        Modifier
                                    </BasicButton>
                                </Link>
                            </div>
                        </Button>
                    ))}
                    <Link className="add-member">
                        <BasicButton>Ajouter ressource</BasicButton>
                    </Link>
                </Button>
            )}
            <Link className="return" to={routes.admin}>
                <BasicButton>Retour menu administrer</BasicButton>
            </Link>
        </StyledAdminRessources>
    );
}

export default AdminRessources;
