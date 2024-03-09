<template>

    <section id="profil">
        <div class="container ps-2 m-3 bg-light">
            <div class="row ">
                
                <h1 class="d-flex justify-content-center">Profil</h1>
                <table class="border border-black border-3 w-100" >
                    <tr>
                        <td class="p-3 bg-dark bg-gradient fw-bold text-white">Prenom</td>
                        <td class="p-3 bg-light text-dark">{{ profil.first_name}}</td>
                        <td class="p-3 bg-dark bg-gradient fw-bold text-white">Nom</td>
                        <td class="p-3 bg-light text-dark">{{ profil.last_name}}</td>
                    </tr>
                    <tr>
                        <td class="p-3 bg-primary bg-gradient fw-bold" style="--bs-bg-opacity: .8;">Pseudo</td>
                        <td class="p-3 bg-light text-dark border border-1">{{ profil.pseudo}}</td>
                        <td class="p-3 bg-primary bg-gradient fw-bold" style="--bs-bg-opacity: .8;">Adresse mail</td>
                        <td class="p-3 bg-light text-dark border border-1">{{ profil.email}}</td>
                    </tr>
                    <tr>
                        <td class="p-3 bg-dark bg-gradient fw-bold text-white">Date de naissance</td>
                        <td class="p-3 bg-light text-dark">{{ date_anniversaire}}</td>
                        <td class="p-3 bg-dark bg-gradient fw-bold text-white">Profil crée le</td>
                        <td class="p-3 bg-light text-dark">{{ date_creation}}</td>
                    </tr>

                    
                </table>

            </div>
        </div>
        
    </section>

</template>

<script setup>
import { onMounted,ref,computed} from 'vue';
import Config from "../config";
import { getCsrfToken,getUserToken } from "@/script/token";


const profil = ref({"created_at":"2024-02-08T10:02:46.000000Z","birthday":"2000-01-01"}) ;
const date_creation = computed (() =>{
    //let dateString = '2024-03-08T10:02:46.000000Z';
    let dateString = profil.value.created_at;
    
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const formattedDate = day + ' ' + months[monthIndex] + ' ' + year;
    return formattedDate;
});

const date_anniversaire = computed (() =>{
    let dateString = profil.value.birthday;
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const [year, month, day] = dateString.split('-');
    const formattedDate = `${day} ${months[parseInt(month) - 1]} ${year}`;

    return formattedDate;
});




const retrieve_profil = async () => {

    const user_token = getUserToken();
    if (user_token==null) {
        alert("veuillez vous connecter pour voir votre profil");
        return -1;
    }
    else {
        console.log(user_token);
        const route = "/user/get_profil";
        let options = {
            method: 'POST',
            headers: {
                "X-CSRF-TOKEN":getCsrfToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"user_token": user_token}),
        }
        console.log (options);
        fetch(Config.backendConfig.apiUrl+route, options)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            return response.json();
        }) // Si le script PHP renvoie du JSON
        .then(data => {
            // Traiter la réponse du serveur (si nécessaire)
            console.log(data);
            profil.value=data;

        })
        .catch(error => {
            // Gérer les erreurs de la requête
            console.error("Erreur lors de l'envoi du formulaire:", error);
            alert ("erreur : veuillez contacter l'administrateur du site")
        });
    }
}

onMounted (()=>{
    if (true) {
    retrieve_profil();}
})


</script>

<style scoped>


</style>