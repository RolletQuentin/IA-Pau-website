import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext([]);

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        case 'IS_READY':
            return {
                ...state,
                ready: true
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        ready: false
    })

    useEffect(() => {
        const fetchUserFromLocalStorage = async () => {
            const data = await localStorage.getItem('user')
            const user = await JSON.parse(data);
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            }
            dispatch({ type: 'IS_READY' });
        }
        fetchUserFromLocalStorage()
    }, []);
    
    return (
        <AuthContext.Provider value ={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}