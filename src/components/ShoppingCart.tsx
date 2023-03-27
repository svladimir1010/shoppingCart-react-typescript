import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useSoppingCart } from '../context/ShoppingCartContext'

type ShoppingCartProps = {
    isOpen: boolean
}

const ShoppingCart = ({isOpen}: ShoppingCartProps) => {
    const {closeCart} = useSoppingCart()
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
        </Offcanvas>
    )
}

export default ShoppingCart
