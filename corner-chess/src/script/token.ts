import Config from "@/config";
import {TokenError} from "./error_class";
 
export const AskCsrfToken = async () =>  {
    
    await fetch(Config.backendConfig.apiUrl+'/csrf-token', {
        method: 'GET',
        
    })
    .then(response => response.json()) // Si le script PHP renvoie du JSON
    .then(data => {
        console.log(data.csrf_token);
        setCookie("X-CSRF-TOKEN",data.csrf_token,30);
        })
    .catch(error => {
        console.error ("Le backend ne renvoit pas de token csrf")
    }
)}

// Fonction pour récupérer le jeton CSRF depuis les cookies de session
export const getCsrfToken = () => {
    const csrfCookie = document.cookie.match(/X-CSRF-TOKEN=([^;]+)/);
    if (csrfCookie) {
        return decodeURIComponent(csrfCookie[1]); // Décode le contenu du cookie si nécessaire
    }
    throw new TokenError ("le cookie CSRF n'est pas présent");
}

export const getUserToken = () => {
    const Cookie = document.cookie.match(/USER-TOKEN=([^;]+)/);
    if (Cookie) {
        return decodeURIComponent(Cookie[1]); // Décode le contenu du cookie si nécessaire
    }
    else {
        throw new TokenError ("le cookie utilisateur n'est pas présent");
    };
}

// Créer une instance Axios avec le jeton CSRF inclus dans les en-têtes

export const IfExistCookie = (name:string) => {
    let regex = new RegExp('(?:^|;\\s*)' + name + '=([^;]*)');
    let match = regex.exec(document.cookie);
    return match !== null;
}

export const setCookie = (name:string, value:string, daysToExpire:number) =>{
    let date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    let secure = "Secure"; 
    let sameSite = "SameSite=None"; // Pour autoriser le cookie dans toutes les requêtes transversales de site
    document.cookie = name + "=" + value + ";" + expires + ";path=/"+";"+secure+";"+sameSite;
}

export const deleteCookie = (name:string) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}