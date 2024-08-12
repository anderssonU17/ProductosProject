// Autenticacion de token, se obtiene token para guardarlo en localStorage

export const isUserAuthenticated = () => {
    if (localStorage.getItem("token")){
        return true;
    }
    return false;
}
