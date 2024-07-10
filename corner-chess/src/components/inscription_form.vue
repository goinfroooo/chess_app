<template>
    <section class="inscription_form bg-dark p-4">
        <h1 class="d-flex justify-content-center text-white">Inscription</h1>
        <div class="container">
            <div class="row ">
                <form method="post" action="./contact_form_treatment.php" id="contact_form">
                    <div class="mb-3 d-flex">
                        <div class="me-3">
                            <label for="inscription_surname" class="form-label text-white">Prénom</label>
                            <input type="text" class="form-control" id="inscription_surname" name="first_name" placeholder="">
                        </div>
                        <div>
                            <label for="contact_name" class="form-label text-white">Nom</label>
                            <input type="text" class="form-control" id="inscription_name" name="last_name" placeholder="">
                        </div>
                    </div>
                    <div class="mb-3 champ">
                        <label for="inscription_date_naissance" class="form-label text-white">Date de naissance</label>
                        <input type="date" class="form-control" id="inscription_date_naissance" name="birthday" placeholder="prenom.nom@email.com">
                    </div>
                    <div class="mb-3 champ">
                        <label for="inscription_pseudo" class="form-label text-white">Pseudo</label>
                        <input type="text" class="form-control" id="inscription_pseudo" name="pseudo" placeholder="pseudo">
                    </div>
                    <div class="mb-3 champ">
                        <label for="inscription_email" class="form-label text-white">Email</label>
                        <input type="email" class="form-control" id="inscription_email" name="email" placeholder="prenom.nom@email.com">
                    </div>

                    <div class="mb-3 champ">
                        <label for="inscription_password" class="form-label text-white">Mot de passe</label>
                        <input type="password" class="form-control" id="inscription_password" name="password" placeholder="password">
                    </div>

                    <div class="g-recaptcha" data-sitekey="your_site_key"></div>

                    <div>
                        <input type="hidden" id="captcha" name="captcha">
                    </div>
                    
                <input class="btn btn-primary w-100" type="button" value = "envoyer" @click="submit_inscription_form()">
                
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
//import backendConfig from "@/config"; //A voir si c'est debile ou pas

import { DisplayError } from "@/script/error_class";
import { getCsrfToken,AskCsrfToken } from "@/script/token";


//import "https://www.google.com/recaptcha/api.js" ;
const props = defineProps(["backendConfig"]);

const submit_inscription_form = async () => {
    // Récupérer les données du formulaire

    let form = document.getElementById('contact_form');
    if (form instanceof HTMLFormElement) {
        let formData = new FormData(form);
        const route = "/user/create_user";
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
            return response.text();
        }) // Si le script PHP renvoie du JSON
        .then(data => {
            // Traiter la réponse du serveur (si nécessaire)
            console.log(data);
            alert ("inscription effectuée");

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

.sidebar {
    margin-top: 50px;
}

.champ {
    max-width: 20rem;
}


</style>