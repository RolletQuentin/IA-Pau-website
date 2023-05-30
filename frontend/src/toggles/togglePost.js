import axios from "axios";

export const togglePost = async (url, user, data) => {
    try {
        await axios.post(url, {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
                "Content-Type": "application.json",
            },
            body: data,
        });
    } catch (err) {
        console.error(err);
    }
};
