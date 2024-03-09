<template>
    <div ref="rules_navbar" id="rules_navbar" class="py-2"> 
    <!-- Navbar à droite -->
    <nav class="sidebar fixed-right bg-light rounded-3">
        <div class="container-fluid mt-3">
            <div class="d-flex justify-content-center">
                <h1 class="navbar-brand fs-1">Règles</h1>
            </div>
            <div class="d-flex align-item-center">
                <ul class="navbar-nav">
                    <li v-for="element in menu_structure" class="nav-item fs-2 px-3 py-1">
                        <div>
                            <a class="nav-link" :href="element.section_id">
                                <h1 class="fs-3">{{element.section_title}}</h1>
                            </a>
                        </div>
                        <div v-for="title in element.subtitle" class="py-0">
                            <a class="nav-link py-0" :href="title.id">
                                <h2 class="fs-4">{{title.title}}</h2>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </nav>
    </div>
</template>

<script setup>

import "https://code.jquery.com/jquery-3.6.0.min.js";
import "../script/scrolling";
import {ref,onMounted} from "vue";
import { add_scrolling_event } from "../script/scrolling";

let menu_structure = ref([]);
console.log(menu_structure.value);

const retrieve_DOM_rules = () => {

        const sections = document.querySelectorAll (".rules_section");
        //console.log (sections);
        let structure = [];

        for (let i = 0; i < sections.length; i++) {
            const currentSection = sections[i];

            // Récupère le titre et le sous-titre de la section actuelle
            const sectionTitle = currentSection.querySelector('.section_title').innerText;
            const sectionId = currentSection.querySelector('.section_title').id;
            const subtitles = currentSection.querySelectorAll('.subtitle');
            //console.log(subtitles);
            // Crée un objet représentant la section courante
            const sectionData = {};
            sectionData['section_title'] = sectionTitle;
            sectionData['section_id'] = "#"+sectionId;
            sectionData['subtitle'] = [];
            for (const subtitle of subtitles) {
                const id = "#"+subtitle.id;
                const title = subtitle.innerText;
                const objet = {"title":title,"id":id};
                sectionData['subtitle'].push(objet);
            }

            //console.log(JSON.stringify(sectionData));
            structure.push((sectionData));

        }
    console.log(structure);
    return structure;
}


onMounted(async () => {
    menu_structure.value=retrieve_DOM_rules();
    add_scrolling_event();
});




</script>

<style scoped>

#rules_navbar {
    width:200px;
    position: fixed;
    top:50;
    
}

</style>