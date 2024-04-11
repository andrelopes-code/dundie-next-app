export default async function useLogout() {
    fetch("http://localhost:3000/api/logout").catch((err) =>
        console.log("OCORREU UM ERRO: ", err)
    );
    window.location.assign("/login");
}
