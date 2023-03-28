import React from 'react'
import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShoppingCartContext } from '../context/ShoppingCartContext'

const Navbar = () => {
    const { openCart, cartQuantity } = useShoppingCartContext()

    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3" style={ { height: '12vh' } }>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={ NavLink }>Home</Nav.Link>
                    <Nav.Link to="/about" as={ NavLink }>About</Nav.Link>
                    <Nav.Link to="/store" as={ NavLink }>Store</Nav.Link>
                </Nav>
                <Button
                    onClick={ openCart }
                    style={ {
                        width: '3rem',
                        height: '3rem',
                        position: 'relative',
                        transition: 'all .3s ease-out',
                        opacity: cartQuantity >= 1 ? 1 : 0,
                    } }
                    className="rounded-circle"
                    variant="outline-primary"
                >
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <title>ionicons-v5-d</title>
                        <circle cx="176" cy="416" r="32"></circle>
                        <circle cx="400" cy="416" r="32"></circle>
                        <polygon
                            points="167.78 304 429.12 304 467.52 112 133.89 112 125.42 64 32 64 32 96 98.58 96 146.58 368 432 368 432 336 173.42 336 167.78 304"></polygon>
                    </svg>
                    { cartQuantity >= 1 && <div
                        className="rounded-circle bg-danger d-flex justify-content-center align-items-center "
                        style={ {
                            color: 'white',
                            width: '1.5rem',
                            height: '1.5rem',
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            transform: 'translate(25%, 25%)',
                        } }
                    >
                      <span style={ { position: 'relative', left: 1, bottom: 1 } }>{ cartQuantity }</span>
                    </div> }
                </Button>

            </Container>
        </NavbarBs>
    )
}

export default Navbar
