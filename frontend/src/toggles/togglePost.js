// import axios from "axios";

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
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${user.jwt}`,
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error(error);
    }
};
