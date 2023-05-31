import axios from "axios";

export const togglePatch = async (url, user, data) => {
    const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: url,
        headers: {
            Authorization: `Bearer ${user.jwt}`,
            "Content-Type": "application.json",
        },
        data: JSON.stringify(data),
    };

    axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => console.error(error));
};
