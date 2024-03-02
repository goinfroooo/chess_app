<template>

<header class="bg-light py-4">
        <nav class="navbar navbar-expand-md fixed-top navbar-light bg-light">
            <div class="container-fluid">
                <a :href="Config.frontendConfig.indexUrl" class="navbar-brand text-uppercase fw-bold text-brand ms-4">
                <span class="bg-primary bg-gradient p-1 rounded-3 text-light">Corner</span> Chess
                </a>
            </div>
        </nav>
</header>
    <inscription_form :backendConfig="Config.backendConfig"></inscription_form>

</template>

<script setup>

import inscription_form from "./components/inscription_form.vue";
import Config from "./config.js"

//import * as csrf_token from "./script/csrf_token.js";

console.log (Config);
//csrf_token.AskCsrfToken(); //Pour mettre à jour le token. A voir si on la déplace directe dans le script plus tard


</script>

<style>

@import './assets/css/style_inscription.css';



</style>
