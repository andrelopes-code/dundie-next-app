import { PRIVATE_API_URL } from "@/constants/apiRoute";

export const validateUserToken = async (token: string) => {
    return fetch(`${PRIVATE_API_URL}/api/token/validate`, {
        method: "GET",
        headers: {
            "x-access-token": `${token}`,
        },
    })
        .then(async (res) => {
            if (res.status == 200) {
                const response = await res.json();
                return response;
            } else {
                return false;
            }
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
};
