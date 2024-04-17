import API_URL from "@/constants/apiRoute";

export default async function useLogout() {
    fetch(`${API_URL}/logout`).catch((err) =>
        console.log("OCORREU UM ERRO: ", err)
    );
    window.location.assign("/login");
}
