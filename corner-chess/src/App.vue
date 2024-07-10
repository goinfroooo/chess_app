<template>
        
        <header_custom :backendConfig="Config.backendConfig"></header_custom>
        <navbar></navbar>
        <router-view></router-view>
        
</template>

<script setup lang="ts">

//import des composants

import header_custom from "./components/header.vue";
import navbar from "./components/navbar.vue";

//import des script externes
import "https://kit.fontawesome.com/3467c927e1.js";

//Import des script interne
import Config from "./config";


</script>

<style>

@import './assets/css/style.css';

</style>
