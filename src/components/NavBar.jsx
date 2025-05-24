import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav as BootstrapNav, Container, Button } from 'react-bootstrap';
import fetchLogo from '../images/fetch_logo.png';

export default function Nav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch(`https://frontend-take-home-service.fetch.com/auth/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        }).then(res => {
            if(res.status == 400 || res.status == 401) {
                alert("Logout unsuccessful. Please try again");
            } else if (res.status == 200) {
               navigate('/');
            }
        })  
          .catch((error) => {
            console.error("Error fetching data:", error);
          });  
    };

    return (
        //top navbar with a light background and a little shadow
        <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
            <Container>
                {/* logo that links to homepage */}
                <Navbar.Brand>
                <img
                    src={fetchLogo}
                    alt="Fetch Logo Image"
                    style={{ width: '100px', height: '100px' }}
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <BootstrapNav className="ms-auto">
                        <BootstrapNav.Link as={Link} to="/main" className="fw-medium">
                            Browse
                        </BootstrapNav.Link>
                        <BootstrapNav.Link as={Link} to="/favorites" className="fw-medium">
                            Favorites
                        </BootstrapNav.Link>
                           <Button variant="outline-dark" className="ms-3" onClick={handleLogout}>
                             Logout
                           </Button>
                    </BootstrapNav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}