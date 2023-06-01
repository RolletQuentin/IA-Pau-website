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
        
        /*if (false && response.ok) {
            if (json.error === "session expired") {
                alert("session expired");
                logout();
            }else if (json.error === "request is not authorized"){
                alert("request is not authorized");
            }
        }else{*/
            console.log("herreeee")
            console.log(json)
            console.log("endddd herrre")
        //}        
    }

    return {verifyAuth};
}