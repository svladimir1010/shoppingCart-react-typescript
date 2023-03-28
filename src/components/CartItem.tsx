import React from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useShoppingCartContext } from '../context/ShoppingCartContext'
import storeItems from '../data/items.json'
import { formatCurrency } from '../utilites/formatCurrency'

type CartItemProps = {
    id: number
    quantity: number
}

const CartItem = ( { id, quantity }: CartItemProps ) => {
    const { removeFromCart } = useShoppingCartContext()

    const item = storeItems.find( item => item.id === id )
    if( !item ) return null

    return (
        <Stack direction="horizontal" gap={ 2 } className="d-flex align-items-center">
            <img src={ item.imgUrl }
                 style={ { width: '125px', height: '75px', objectFit: 'cover' } }
                 alt={ item.name }
            />
            <div className="me-auto">
                <div>
                    { item.name }
                    { quantity > 1
                        && <span className="text-muted" style={ { fontSize: '.65rem' } }>{ ' ' }
                    x { quantity }
                    </span> }
                </div>
                <div className="text-muted" style={ { fontSize: '.75rem' } }>
                    { formatCurrency( item.price ) }
                </div>
            </div>
            <div>
                { formatCurrency( item.price * quantity ) }
            </div>
            <Button
                onClick={ () => removeFromCart( item.id ) }
                variant="outline-danger"
                size="sm"
            >
                &times;
            </Button>
        </Stack>
    )
}

export default CartItem
