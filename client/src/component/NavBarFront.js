import React from 'react';
import {Container, Dropdown, Navbar, NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";


const NavBarFront = observer(() => {
    return (
        <Navbar bg="dark" variant="dark" style={{position: "fixed", top: 0, right: 0, left: 0, zIndex: 2, textAlign: "center", height: 83}}>
            <Container >
                <Navbar.Brand style={{display: "inline-block", fontSize: 24}} href="/main"><b>JobSearch</b></Navbar.Brand>
            </Container>
        </Navbar>
    );
});

export default NavBarFront;