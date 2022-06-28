import React, {useContext} from 'react';
import Nav from 'react-bootstrap/Nav';
import {Container, Dropdown, Navbar, NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../context/Context";
import {Link} from "react-router-dom";

const NavBar = observer(({categories}) => {
    const {user, dispatch, isFetching} = useContext(Context)

    const logOut = async () => {
        dispatch({type: "LOGOUT"})
        window.location.replace("/")

        console.log(isFetching)
    }

    return (
        <Navbar bg="dark" variant="dark" style={{position: "fixed", top: 0, right: 0, left: 0, zIndex: 2}}>
            <Container >
                <Navbar.Brand style={{display: "inline-block"}} href="/main">JobSearch</Navbar.Brand>
                <Nav className="me-auto">
                    <NavDropdown title="TYPE PROFESSION" id="collasible-nav-dropdown">
                        {categories.map(c =>
                            <NavDropdown.Item  key={c.id} style={{position: "relative"}}>
                                <Link className="text-dark" style={{textDecoration: "none"}}>
                                    <span >{c.name}</span>
                                </Link>
                            </NavDropdown.Item>
                        )}
                    </NavDropdown>
                </Nav>
                {
                        <Nav className="mc-auto">
                            {user ?
                                <Nav.Link href={`/user/${user._id}`}>
                                    User {user.name} {user.lastname}
                                </Nav.Link>
                                : ``}
                            {user ?
                                <Nav>
                                    {user.role === "EMPLOYER" || user.role === "ADMIN"?(
                                        <Nav>
                                            <Nav className="me-auto">
                                                <NavDropdown title="Functional" id="collasible-nav-dropdown">
                                                    <NavDropdown.Item href="/create">Employer panel</NavDropdown.Item>
                                                    <NavDropdown.Item href="/post">My posts</NavDropdown.Item>
                                                </NavDropdown>
                                            </Nav>
                                            <Nav.Link onClick={() => logOut()}>Exit</Nav.Link>
                                        </Nav>
                                        )
                                        :
                                        (
                                        <Nav>
                                            <Nav.Link onClick={() => logOut()}>Exit</Nav.Link>
                                        </Nav>
                                        )
                                    }

                                </Nav>
                                :
                                <Nav.Link href="/register">Registration</Nav.Link>
                            }
                        </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;