<template>
    <div>
    <!-- Navbar à gauche -->
    <nav class="sidebar fixed-left bg-light">
        <div class="container-fluid mt-3">
            <div class="d-flex justify-content-center">
                <h1 class="fw-bold"><router-link class="navbar-brand " to="/">Menu</router-link></h1>
            </div>
            <div class="d-flex align-item-center">
                <ul class="navbar-nav">
                    <li class="nav-item fs-2 p-3">
                        <a class="nav-link nav-link-special" v-on:click="ready_to_play">Demander une partie</a>
                    </li>
                    <li class="nav-item fs-2 p-3">
                        <router-link to="/game_list" class="nav-link">Parties en cours</router-link>
                    </li>
                    <li class="nav-item fs-2 p-3 d-none">
                        <router-link to="/statistiques" class="nav-link">Statistiques</router-link>
                    </li>
                    <li class="nav-item fs-2 p-3">
                        <a class="nav-link" v-on:click="activate_sandbox" >Libre</a>
                    </li>
                </ul>
            </div>
            
        </div>
    </nav>
    </div>
</template>



<script setup lang="ts">
import Config from "../config";
import { getCsrfToken,AskCsrfToken,getUserToken } from "@/script/token";
import { RouteComponent, useRouter } from 'vue-router';
import { gameStore } from '../stores/game';

const router:RouteComponent = useRouter();
const current_game = gameStore();

const ready_to_play = () => {

    const user_token = getUserToken();
    if (user_token==null) {
        alert("veuillez vous connecter avant de jouer");
        return -1;
    }

    else {
        console.log(user_token);
        const route = "/player_status/ready_to_play";
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
            return response.text();
        }) // Si le script PHP renvoie du JSON
        .then(data => {
            // Traiter la réponse du serveur (si nécessaire)
            console.log(data);
            alert ("Demande prise en compte. La partie sera créée quand un autre joueur sera disponible");

        })
        .catch(error => {
            // Gérer les erreurs de la requête
            console.error("Erreur lors de l'envoi du formulaire:", error);
            alert ("erreur : veuillez contacter l'administrateur du site")
        });
    }

}

const activate_sandbox = () => {

    current_game.setIsSandbox(true);
    router.push({ name: 'game'});
}

</script>

<style scoped>

.sidebar {
    margin-top: 50px;
}

.nav-link-special:hover {
    /* Ajoutez ici les styles pour le survol */
    color: #007bff; /* Couleur de lien standard de Bootstrap */
    text-decoration: underline; /* Souligner le texte au survol */
    cursor: pointer; /* Curseur de type main pour indiquer qu'il s'agit d'un lien cliquable */
}
</style>