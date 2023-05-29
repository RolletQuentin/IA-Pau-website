import axios from "axios";

const toggleDelete = async (url, user) => {
    console.log("salut");
    // eslint-disable-next-line no-restricted-globals
    const confirmResponse = confirm(
        `Êtes-vous sûr de vouloir supprimer cet élément ?`
    );
    if (confirmResponse) {
        try {
            await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Élément supprimé avec succès");
        } catch (error) {
            console.error(error);
        }
    }
};

export default toggleDelete;
