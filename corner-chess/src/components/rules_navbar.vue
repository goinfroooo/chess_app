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
                            <a class="nav-link" :href="element.id">
                                <h1 class="fs-3">{{element.title}}</h1>
                            </a>
                        </div>
                        <div v-for="title in element.subtitles" class="py-0">
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

<script setup lang="ts">

import "https://code.jquery.com/jquery-3.6.0.min.js";
import "../script/scrolling";
import {ref,onMounted} from "vue";
import { add_scrolling_event } from "../script/scrolling";
import {Section} from "../script/interface";
import { CriticalError,DisplayError } from "@/script/error_class";

let menu_structure = ref<Section[]>([]);
console.log(menu_structure.value);

const retrieve_DOM_rules = () => {

    const sections = document.querySelectorAll(".rules_section");
    let structure = [];

    for (let i = 0; i < sections.length; i++) {
        const currentSection = sections[i];

        // Vérifie si la section actuelle a un titre de section
        const sectionTitleElement = currentSection.querySelector('.section_title');
        if (sectionTitleElement && sectionTitleElement instanceof HTMLElement) {
            const sectionTitle:string = sectionTitleElement.innerText;
            const sectionId = sectionTitleElement.id;
            const subtitles = Array.from(currentSection.querySelectorAll('.subtitle'));

            // Crée un objet représentant la section courante
            const sectionData: Section = {title: "", id: "", subtitles: []};
            sectionData.title = sectionTitle;
            sectionData.id = "#" + sectionId;
            for (const subtitle of subtitles) {
                if (subtitle instanceof HTMLElement) {
                    const id: string = "#" + subtitle.id;
                    const title:string = subtitle.innerText;
                    sectionData.subtitles.push({"title": title, "id": id});
                }
                else {
                    throw new DisplayError ("impossible de récupérer le titre");
                }
                
            }
        

            //console.log(JSON.stringify(sectionData));
            structure.push((sectionData));

        }else {
            throw new DisplayError ("impossible de récupérer le titre");
        }
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