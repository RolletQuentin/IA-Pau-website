import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useSignup = () => {
    const [globalError, setGlobalError] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [emptyField, setEmptyField] = useState([]);

    const { dispatch } = useAuthContext();

    const signup = async (lastname, firstname, level, phone, school, city, email, password, numEtudiant) => {
        setIsLoading(true);
        setGlobalError('');
        setEmptyField([]);

        const response = await fetch(process.env.REACT_APP_PROXY + '/api/user/signup/', {
            method: 'POST',
            body: JSON.stringify({
                lastname,
                firstname,
                level,
                phone,
                school,
                city,
                email,
                password,
                numEtudiant
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json();

        if (!response.ok) {       
            setGlobalError(json.error);
            setEmptyField(json.errors);
            console.log(json.errors)
        }

        if (response.ok) {
            // save the user to the local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
        }
        setIsLoading(false);
    }

    return {signup, isLoading, globalError, setGlobalError, setEmptyField, emptyField};
}