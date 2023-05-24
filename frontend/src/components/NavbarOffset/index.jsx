import { useState } from "react";
import styled from "styled-components";

const StyledNavbarOffset = styled.div`
    height: ${(props) => (props.isFixed ? "50px" : "95px")};
    width: 100%;
`;

function NavbarOffset() {
    const [isFixed, setIsFixed] = useState(false);
    function scrollFunction() {
        if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
        ) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    }
    window.onscroll = function () {
        scrollFunction();
    };
    return <StyledNavbarOffset isFixed={isFixed}></StyledNavbarOffset>;
}

export default NavbarOffset;
