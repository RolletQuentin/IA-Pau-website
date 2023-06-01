import { useAuthContext } from "./useAuthContext";
import { useLogout } from "./useLogout";

export const useVerifyAuth = () => {
    const { logout } = useLogout();
    const {user} = useAuthContext();

    const verifyAuth = async() => {
        const response = await fetch(process.env.REACT_APP_PROXY + '/api/user/isConnected/', {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        })
        const json = await response.json();
        
        if (response.ok) {
            if (!json.Connected) {
                alert("session expired");
                logout();
            }else{
                console.log("connected")
            }
        }else{
            console.log(json.error)
        }        
    }

    return {verifyAuth};
}