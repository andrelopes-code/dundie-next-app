interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export const tryRefreshToken = async (
    refresh_token: string | undefined
): Promise<RefreshTokenResponse> => {
    return fetch("http://localhost:8000/refresh_token", {
        method: "POST",
        headers: {
            "x-refresh-token": `${refresh_token}`,
        },
    })
        .then(async (res) => {
            return await res.json();
        })
        .catch((err) => console.log(err));
};
