export const validateUserToken = async (token: string): Promise<boolean> => {
    return fetch("http://localhost:8000/token/validate", {
        method: "GET",
        headers: {
            "x-access-token": `${token}`,
        },
    })
        .then((res) => {
            if (res.status == 200) {
                return true;
            } else {
                return false;
            }
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
};
