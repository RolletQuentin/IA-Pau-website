import { Link } from "react-router-dom";
import Button from "../Button";

function ButtonLink({ children, href }) {
    return (
        <Link to={href}>
            <Button>{children}</Button>
        </Link>
    );
}

export default ButtonLink;
