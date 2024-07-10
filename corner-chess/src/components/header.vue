<template>
    <header class="bg-light py-4">
        <nav class="navbar navbar-expand-md fixed-top navbar-light bg-light">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand text-uppercase fw-bold text-brand ms-4">
                    <span class="bg-primary bg-gradient p-1 rounded-3 text-light">Corner</span> Chess
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <router-link to="/Rules" class="nav-link">Régles</router-link>
                        </li>
                        <li class="nav-item active">
                            <router-link to="/Profil" class="nav-link">Profil</router-link>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link " data-bs-toggle="modal" data-bs-target="#modal_connexion">Connexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="modal" id="modal_connexion" tabindex="-1">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title fw-bold">Connexion</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form method="post" action="./contact_form_treatment.php" id="connexion_form">
                                    <div class="mb-3">
                                        <label for="contact_email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="connexion_email" name="connexion_email" placeholder="prenom.nom@email.com">
                                    </div>
                                    <div class="mb-3">
                                        <label for="connexion_password" class="form-label">Mot de passe</label>
                                        <input type="password" class="form-control" id="connexion_password" name="connexion_password" placeholder="">
                                    </div>

                                    <input class="btn btn-primary w-100" type="button" value = "Connexion" @click="submit_connexion_form()">
                            </form>
                        <p>Pas encore inscrit ? Inscrivez vous <a href="../../inscription.html">ici</a></p>
                    
                        </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                        </div>
                    </div>
    </header>
</template>

<script setup lang="ts">


import { DisplayError } from "@/script/error_class";
import { getCsrfToken,AskCsrfToken,setCookie } from "../script/token";


//import "https://www.google.com/recaptcha/api.js" ;
const props = defineProps(["backendConfig"]);

const submit_connexion_form = async () => {
    // Récupérer les données du formulaire
    
    let form = document.getElementById('connexion_form');
    if (form instanceof HTMLFormElement) {
        let formData = new FormData(form);
        const route = "/user/get_user_token";
        // Envoyer les données via Fetch
        await AskCsrfToken ();

        let options = {
            method: 'POST',
            headers: {
                "X-CSRF-TOKEN":getCsrfToken(),
            },
            body: formData,
        }
        console.log (options);
        fetch(props.backendConfig.apiUrl+route, options)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            return response.json();
        }) // Si le script PHP renvoie du JSON
        .then(data => {
            // Traiter la réponse du serveur (si nécessaire)
            console.log(data.token);
            setCookie("USER-TOKEN",data.token,30)
            alert ("connected");

        })
        .catch(error => {
            // Gérer les erreurs de la requête
            console.error("Erreur lors de l'envoi du formulaire:", error);
            alert ("erreur : veuillez contacter l'administrateur du site")
        });
    }else {
        throw new DisplayError ("le formulaire ne peut etre récupéré dans la page");
    }
}


</script>

<style scoped>


</style>