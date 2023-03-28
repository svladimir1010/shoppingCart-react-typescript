import { createContext, ReactNode, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartContextProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    getItemQuantity: ( id: number ) => number
    increaseCartQuantity: ( id: number ) => void   // добавление товара в корзину
    decreaseCartQuantity: ( id: number ) => void   // удаление
    removeFromCart: ( id: number ) => void
    cartItems: CartItem[]                          // количество товаров
}

const ShoppingCartContext = createContext( {} as ShoppingCartContext )


export const ShoppingCartContextProvider = ( { children }: ShoppingCartContextProviderProps ) => {
    const [ isOpen, setIsOpen ] = useState( false ) // показать - скрыть корзину

    const [ cartItems, setCartItems ]
        = useLocalStorage<CartItem[]>( 'shopping-cart', [] )
    // хранение єлементов корзины в localStorage [{"id":1,"quantity":3},{"id":2,"quantity":1}]
    // const [ cartItems, setCartItems ] = useState<CartItem[]>( [] )  // место хранения єлементов корзины по id

    const cartQuantity = cartItems.reduce(
        ( quantity: number, item: CartItem ) => item.quantity + quantity,
        0,
    )

    const openCart = () => setIsOpen( true )
    const closeCart = () => setIsOpen( false )

    const getItemQuantity = ( id: number ) =>
        cartItems.find( ( item: CartItem ) => item.id === id )?.quantity || 0

    const increaseCartQuantity = ( id: number ) =>
        setCartItems( ( currentItems: CartItem[] ) => {
            if( !currentItems.find( item => item.id === id ) ) {
                return [ ...currentItems, { id, quantity: 1 } ]
            } else {
                return currentItems.map( item => {
                    if( item.id === id ) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                } )
            }
        } )

    const decreaseCartQuantity = ( id: number ) =>
        setCartItems( ( currentItems: CartItem[] ) => {
            if( currentItems.find( item => item.id === id )?.quantity === 1 ) {
                return currentItems.filter( item => item.id !== id )
            } else {
                return currentItems.map( item => {
                    if( item.id === id ) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                } )
            }
        } )

    const removeFromCart = ( id: number ) =>
        setCartItems( ( currentItems: CartItem[] ) =>
            currentItems.filter( item => item.id !== id ),
        )


    return (
        <ShoppingCartContext.Provider value={ {
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart,
        } }>
            { children }
            <ShoppingCart isOpen={ isOpen }/>
        </ShoppingCartContext.Provider>
    )
}

export const useShoppingCartContext = () => useContext( ShoppingCartContext )

