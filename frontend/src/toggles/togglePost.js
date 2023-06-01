// import axios from "axios";

import { useVerifyAuth } from "../hooks/auth/useVerifyAuth";

// export const togglePost = async (url, user, data) => {
//     const config = {
//         method: "post",
//         maxBodyLength: Infinity,
//         url: url,
//         headers: {
//             Authorization: `Bearer ${user.jwt}`,
//             "Content-Type": "application/json",
//         },
//         data: JSON.stringify(data),
//     };

//     try {
//         const response = await axios.request(config);
//         console.log(response);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// };

export const togglePost = async (url, user, data) => {
    const {verifyAuth} = useVerifyAuth()
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${user.jwt}`,
                "Content-Type": "application/json",
            },
        });
        await verifyAuth()
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        await verifyAuth()
        console.error(error);
    }
};
