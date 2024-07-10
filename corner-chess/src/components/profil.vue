<template>

    <section id="profil">
        <div class="container-fluid ps-2 m-3 bg-light">
            <div v-if="!profil" class="spinner-border " role="status">
                <span class="visually-hidden ">Loading...</span>
            </div>
            <div v-else>
                <div class="row me-2">
                    <div class="card col-12">
                        <div class="d-flex">
                            <img class="rounded-3 me-3" :src="Config.backendConfig.apiUrl+'/storage/img/profil.PNG'" height="50px" width="50px">
                            <h1 class="d-flex justify-content-center card-title">Profil</h1>
                        </div>
                        
                        <div class="card-body rounded-3 border border-2 border-black my-2">
                            <div class=" container" >
                                <div class="row">
                                    <div class="col-6 col-md-3 p-3 rounded-3 bg-light ">Prénom</div>
                                    <div class="col-6 col-md-3 p-3  "><input type="text" v-model="profil.first_name" class="form-control"></div>
                                    <div class="col-6 col-md-3 p-3  bg-light ">Nom</div>
                                    <div class="col-6 col-md-3 p-3  "><input type="date" v-model="profil.last_name" class="form-control"></div>

                                    <div class="col-6 col-md-3 p-3  bg-light " style="--bs-bg-opacity: .8;">Adresse mail</div>
                                    <div class="col-6 col-md-3 p-3 " style="max-width: 25%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{ profil.email}} <br><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_mail">modifier l'email</button></div>
                                    <div class="col-6 col-md-3 p-3  bg-light " style="--bs-bg-opacity: .8;">Pseudo</div>
                                    <div class="col-6 col-md-3 p-3 "><input v-model="profil.pseudo" class="form-control"></div>
                                    
                                    <div class="col-6 col-md-3 p-3  bg-light " style="--bs-bg-opacity: .8;">Date de naissance</div>
                                    <div class="col-6 col-md-3 p-3 "><input v-model="date_anniversaire" class="form-control"></div>
                                    <div class="col-6 col-md-3 p-3  bg-light ">Profil crée le</div>
                                    <div class="col-6 col-md-3 p-3 ">{{ date_creation}}</div>
                                    
                                </div>

                                
                            </div>
                        </div>
                        <button class="bg-light border-3" @click="save_change()">Sauvegarder</button>
                    </div>
                </div>
            </div>
        </div>
    </section>


</template>

<script setup lang="ts">
import { onMounted,ref,computed} from 'vue';
import Config from "../config";
import { getCsrfToken,getUserToken } from "@/script/token";
import {Profil} from "../script/interface";
import  { NetworkError } from '@/script/error_class';


const profil = ref<Profil | null>(null) ;
const date_creation = computed (():string =>{
    if (profil.value === null) {
        return "";
    }
    let dateString = profil.value.created_at;
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const formattedDate = day + ' ' + months[monthIndex] + ' ' + year;
    return formattedDate;
});

const date_anniversaire = computed (():string =>{

    if (profil.value === null) {
        return "";
    }
    let dateString = profil.value.birthday;
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const [year, month, day] = dateString.split('-');
    const formattedDate = `${day} ${months[parseInt(month) - 1]} ${year}`;

    return formattedDate;
});




const retrieve_profil = async (): Promise<{ email: string; birthday: string; created_at: string; pseudo: string; last_name: string; first_name: string; } | null> => {
    const user_token = getUserToken();
    if (user_token == null) {
        alert("veuillez vous connecter pour voir votre profil");
        return null;
    } else {
        console.log(user_token);
        const route = "/user/get_profil";
        let options = {
            method: 'POST',
            headers: {
                "X-CSRF-TOKEN": getCsrfToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "user_token": user_token }),
        }
        console.log(options);
        try {
            const response = await fetch(Config.backendConfig.apiUrl + route, options);
            console.log(response);
            if (!response.ok) {
                throw new NetworkError('La requête a échoué.');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire:", error);
            alert("erreur : Nous ne parvenons pas à récupérer votre profil. Veuillez contacter l'administrateur du site");
            return null;
        }
    }
}

const save_change = () => {
    
}

onMounted (async ()=>{

    profil.value= await retrieve_profil();
    console.log (profil.value);
})


</script>

<style scoped>


</style>