import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledNavbarOffset = styled.div`
    transition: height 0.4s;
    height: ${(props) => (props.size + "px")};
    width: 100%;
`;

function NavbarOffset() {
    // to add an animation when we scroll on the page
    const [size, setSize] = useState(60);
    
    
    useEffect(() => {
        function scrollFunction() {
            if (
                document.body.scrollTop - size > 5 ||
                document.documentElement.scrollTop - size > 5
            ) {
                setSize(60);
            } else {
                setSize(100);
            }
        }
        scrollFunction();
        window.addEventListener("scroll", scrollFunction);
        return () => {
            window.removeEventListener("scroll", scrollFunction);
        };
    }, []);
    return <StyledNavbarOffset size={size}></StyledNavbarOffset>;
}

export default NavbarOffset;
