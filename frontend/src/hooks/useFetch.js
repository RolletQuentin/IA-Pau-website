import { useState } from "react";

export const useFetch = () => {
    // error
    const [error, setError] = useState("");
    // state
    const [isLoading, setIsLoading] = useState(false);

    const fetchCustom = async (url, header = {}) => {
        let json;
        setIsLoading(true);

        try {
            const response = await fetch(url, header);
            json = await response.json();
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }

        return json;
    };

    return { fetchCustom, isLoading, error };
};

// export function useFetch(url, header = {}) {
//     const [data, setData] = useState({});
//     const [isLoading, setLoading] = useState(true);
//     const [error, setError] = useState(false);
//     console.log(url);
//     console.log(header);

//     useEffect(() => {
//         if (!url) return;

//         async function fetchData() {
//             try {
//                 const response = await fetch(url, header);
//                 const data = await response.json();
//                 setData(data);
//             } catch (error) {
//                 console.log(error);
//                 setError(true);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         setLoading(true);
//         fetchData();
//     }, [url, header]);

//     return { isLoading, data, error };
// }
