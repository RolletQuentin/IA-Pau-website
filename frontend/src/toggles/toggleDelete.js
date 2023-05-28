// suppression d'une des données
const toggleDelete = (url, user) => {
    console.log("salut");
    // eslint-disable-next-line no-restricted-globals
    const confirmResponse = confirm(
        `Êtes-vous sûr de vouloir supprimer cet élément ??`
    );
    if (confirmResponse) {
        try {
            fetch(url, {
                headers: {
                    method: "DELETE",
                    Authorization: "Bearer " + user.jwt,
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.err(err);
        }
    }
};

export default toggleDelete;
