<template>

    <div id="game_list"></div>

</template>

<script setup>

const game_list = {};

const retrieve_game_list = async () => {

    const user_token = getUserToken();
    if (user_token==null) {
        alert("veuillez vous connecter pour voir vos parties en cours");
        return -1;
    }
    else {
        console.log(user_token);
        const route = "/game/player_games_active";
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
            game_list=data;
            alert ("ça marche. Vous pouvez consulter vos parties en cours dans l'onglet correspondant");

        })
        .catch(error => {
            // Gérer les erreurs de la requête
            console.error("Erreur lors de l'envoi du formulaire:", error);
            alert ("erreur : veuillez contacter l'administrateur du site")
        });
    }
}


</script>

<style scoped>


</style>