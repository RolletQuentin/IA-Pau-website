import axios from "axios";

export const togglePut = async (url, user, data) => {
    try {
        await axios.put(url, {
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
