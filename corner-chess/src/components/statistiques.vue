<template>

    <div class="container p-2 m-3 bg-white">
        <section id="stat_profil" class="card">
            

        </section>
    </div>

</template>

<script setup lang="ts">


import {ref,onMounted} from "vue";
import { gameStore } from '../stores/game';
import { useRouter } from 'vue-router';

import Config from "../config";
import { getCsrfToken,getUserToken } from "@/script/token";

const router = useRouter();

const current_game = gameStore();
let game_list = ref([]);

const retrieve_game_list = async () => {
    const user_token = getUserToken();
    if (user_token == null) {
        alert("veuillez vous connecter pour voir vos parties en cours");
        return -1;
    } else {
        const route = "/game/player_games_active";
        let options = {
            method: 'POST',
            headers: {
                "X-CSRF-TOKEN": getCsrfToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "user_token": user_token }),
        }

        try {
            const response = await fetch(Config.backendConfig.apiUrl + route, options);
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            const data = await response.json();
            console.log(data);
            game_list.value = data; // Mettre à jour game_list avec la nouvelle valeur
            return data;
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire:", error);
            alert("erreur : veuillez contacter l'administrateur du site")
        }
    }
}


onMounted(async () => {
  await retrieve_game_list(); // Appelez retrieve_game_list lorsque le composant est monté
});



</script>

<style scoped>

@import "../assets/css/style.css";

.vertical-center {
    vertical-align: middle;
    text-align: center;

}


</style>