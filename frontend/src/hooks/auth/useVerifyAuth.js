import { useLogout } from "./useLogout";

export const useVerifyAuth = () => {
    const { logout } = useLogout();

    const verifyAuth = (json) => {
        console.log(json)
        if (json.error === "session expired") {
            alert("session expired");
            logout();
        }else if (json.error === "request is not authorized"){
            alert("request is not authorized");
        }
    }

    return {verifyAuth};
}