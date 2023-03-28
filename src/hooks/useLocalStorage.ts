import { useEffect, useState } from 'react'

export function useLocalStorage<T>( key: string, initialValue: T | (() => T) ) {
    const [ value, setValue ] = useState( () => {
        // если в localStorage есть data мы один раз обращаемся к хранилищу и записываем
        // его в initialState - value
        const jsonValue = localStorage.getItem( key )
        if( jsonValue ) {
            return JSON.parse( jsonValue )
        }

        if( typeof initialValue === 'function' ) {
            // return initialValue()
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    } )


    useEffect( () => {
        localStorage.setItem( key, JSON.stringify( value ) )
    }, [ key, value ] )

    return [ value, setValue ] as [ typeof value, typeof setValue ]
}