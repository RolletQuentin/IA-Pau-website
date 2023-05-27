import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = (fakeRole = null) => {
    // error
    const [globalError, setGlobalError] = useState('');
    // state
    const [isLoading, setIsLoading] = useState(false);
    // dispatch
    const { dispatch } = useAuthContext();

    const login = async (email, password, rememberMe) => {
        setIsLoading(true);
        setGlobalError('');

        if (!fakeRole){
            console.log(process.env.REACT_APP_PROXY)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/user/login/', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const json = await response.json();
    
            if (!response.ok) {       
                setGlobalError(json.errors.global);
            }
    
            if (response.ok) {
                if (rememberMe) {
                    localStorage.setItem('user', JSON.stringify(json)); // save the user to the local storage
                }
                dispatch({type: 'LOGIN', payload: json}); // update the auth context
            }
        }else{
            const json = {
                role: fakeRole,  // Administrateur || Gestionaire || Etudiant
                
            }
            dispatch({type: 'LOGIN', payload: json}); // update the auth context
        }
        setIsLoading(false);
        console.log("fetched")
    }

    return {login, isLoading, globalError};
}