<template>
        
        <header_custom :backendConfig="Config.backendConfig"></header_custom>
        <navbar></navbar>
        <router-view></router-view>
        
</template>

<script setup>

//import des composants

import header_custom from "./components/header.vue";
import navbar from "./components/navbar.vue";



//import des script externes
import "https://kit.fontawesome.com/3467c927e1.js";

//Import des script interne
import Config from "./config.js";
//import * as csrf_token from "./script/csrf_token.js";
//csrf_token.AskCsrfToken(); //Pour mettre à jour le token. A voir si on la déplace directe dans le script plus tard
//edit je laisse ça la mais peux etre qu'on demandera les token a la requete a chaque fois





</script>

<style>

@import './assets/css/style.css';

</style>
