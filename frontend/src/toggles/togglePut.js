const axios = require("axios");

export const togglePut = async (url, user, data) => {
    const config = {
        method: "put",
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
