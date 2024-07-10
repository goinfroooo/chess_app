<template>

    <div class="container p-2 m-3 bg-white">
        <h1 class="d-flex justify-content-center">Parties en cours</h1>
        <div id="game_list" class="bg-light">
            <div class="text_white bg-light border rounded-3 " v-for="game in game_list">
                <table class="border border-black border-3 w-100" >
                    <tr>
                        <td class="p-3 border-black border-2">Adversaire</td>
                        <td class="p-3 border-black border-2">Couleur</td>
                        <td class="p-3 border-black border-2">trait</td>
                        <td class="p-3 border-black border-2">statut</td>
                        <td class="p-3 border-black border-2 vertical-center" rowspan="2">
                            <div class="d-flex justify-content-center align-items-center">
                                <button  class="btn btn-primary" @click="handleClick(game,$event)" >Voir la partie</button>
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td class="p-3 border-black border-2 w-50">{{ game.pseudo }}</td>
                        <td class="p-3 border-black border-2">{{ game.color }}</td>
                        <td class="p-3 border-black border-2">{{ game.trait }}</td>
                        <td class="p-3 border-black border-2">{{ game.status }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">


import {ref,onMounted} from "vue";
import { gameStore } from '../stores/game';
import { RouteComponent, useRouter } from 'vue-router';
import Config from "../config";
import { getCsrfToken,getUserToken } from "@/script/token";
import { Game } from "@/script/interface";

const router:RouteComponent = useRouter();

const current_game = gameStore();
let game_list = ref<Game[]>([]);

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

const handleClick = (game:Game ,event:MouseEvent) => {

    //console.log (game);
    //window.localStorage.setItem("current_game",JSON.stringify(game))
    current_game.setGame(game);
    current_game.setIsSandbox(false);
    console.log (current_game.Game.board);
    router.push({ name: 'game'});
}

</script>

<style scoped>

@import "../assets/css/style.css";

.vertical-center {
    vertical-align: middle;
    text-align: center;

}


</style>