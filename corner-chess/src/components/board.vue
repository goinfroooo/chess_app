<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-9 mt-2 d-flex justify-content-center">
                <div id="board" class="board p-0 bg-light">
                    <!-- On creer les cases du plateaux -->
                    <template v-for="(column,index) in columns" :key="index">
                        <div v-for="(row,index2 ) in rows" 
                        @click="board_make_deplacement(parameters,piece_clicked, $event)"  
                        :id="column + row" 
                        class="square" 
                        :style="create_square_position(index,index2+1)">
                    </div>
                    </template>
                    <!-- On creer les pièces -->
                    <i v-for="(square,piece) in board"  
                    @click="board_view_deplacement($event)"
                    :id="piece" 
                    :data-square="square"
                    :class="color_piece(piece)+icon_piece(piece)+' fa-solid fa-2x  text-center piece'">
                    </i>
                </div>
            </div>
            <div class="col-3 me-0 pe-0">
                <div class="card h-100 w-100 bg-light">
                    <div class="card-body">
                        <div class="row gy-4 gy-md-0">
                            <h1 class="card-title">Information de partie</h1>
                            <p>Vous avez les pièces {{ player_color==="white" ? "blanches" : "noires" }}</p>
                            <p>C'est au tour des  {{ trait==="white" ? "blancs" : "noirs" }} de jouer</p>
                            <div v-if="!current_game.IsSandbox">temps restant avant abandon automatique :<br>{{ temps_restant }}</div>
                            <div v-if="current_game.IsSandbox"> <input type="file" @change="handleFileUpload" /></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script setup lang="ts">

//On importe les 2 scripts qui permettent de gérer la logique du plateau

import * as view_deplacement from "../script/view_piece_deplacement.js";
import * as make_deplacement from "../script/make_piece_deplacement.js";
import { computed,ref,onMounted } from 'vue';
import { gameStore } from "@/stores/game.js";
import Config from "../config";
import { getCsrfToken,getUserToken } from "@/script/token";
import {initial_board} from "../script/chess_config";
import {Board,Parameters,Game} from "../script/interface";
import { CriticalError, DisplayError, EventError } from "@/script/error_class.js";


let current_timestamp = ref(Date.now());
let current_game = gameStore();
let board:Board = initial_board;

//On définit un tas de parametres

const columns = ["a","b","c","d","e","f","g","h",];
const rows = ["1","2","3","4","5","6","7","8",];

const board_height = 400; //donne la taille en pixel du plateau (pas responsive pour le moment)
const board_width = 400;
const piece_height = board_height/columns.length;
const piece_width = board_width/rows.length;

//On wrap tous les parametres pour les passer aux fonctions js c'est plus compact
//TODO : revoir ça, ça me parait bourin et souvent inutile, on a juste besoin de rows et columns en général
const parameters:Parameters = {
    columns: columns,
    rows: rows,
    board_height: board_height,
    board_width: board_width,
    piece_height: piece_height,
    piece_width: piece_width,
};

let piece_clicked = "";//Permet de garder en mémoire la pièce cliquée actuellement par le joueur.
//La pièce cliquée est la pièce dont on souhaite voir les déplacements
let trait = "white";
let player_color = "white";


const temps_restant=computed(()=>{
    if (current_game.IsSandbox) {
        return 0;
    }
    else {
        let currentTimestamp = current_timestamp.value;
        let gameTimestamp = new Date(current_game.Game.updated_at).getTime(); // Exemple : 1709805295385

        // Calcul de la différence en millisecondes
        let differenceMs = currentTimestamp - gameTimestamp;

        // Convertir la différence en heures, minutes et secondes
        let seconds = Math.floor(differenceMs / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        // Calcul des secondes restantes après la conversion en heures et minutes
        seconds %= 60;
        minutes %= 60;

        // Calcul du temps restant avant la fin de la journée
        let remainingHours = 23 - hours;
        let remainingMinutes = 59 - minutes;
        let remainingSeconds = 59 - seconds;

        // Affichage du résultat sous forme de hh:mm:ss
        let formattedResult = `${remainingHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

        return formattedResult;
    }
})

const retrieve_current_game = () => { //Je pense que cette fonction n'est plus très utile. A voir si on la recycle pour de la persistance

        //current_game = JSON.parse(current_game);
        board = current_game.Game.board;
        trait = current_game.Game.trait; //Permet de dire a qui c'est de jouer. 
        player_color = current_game.Game.color;
    
}

const board_view_deplacement = (event: MouseEvent): number => {

    const target = event.target as HTMLElement; // Assertion de type pour informe
    if (!target) {
        // Si event.target est null, retourner une valeur d'erreur appropriée
        console.error("L'événement n'a pas de cible.");
        throw new DisplayError ("L'événement n'a pas de cible.")
    }

    if (player_color !== trait && !current_game.IsSandbox) {
        return -2;
    }

    // Vous pouvez maintenant accéder à event.target en toute sécurité
    if (view_deplacement.retrieve_piece_color(target.id) !== trait) {
        alert(trait + " turn");
        return -1;
    }

    piece_clicked = view_deplacement.view_move(parameters, board, event);
    return 0;
}

const board_make_deplacement = (parameters:Parameters,piece:string, event:MouseEvent) => {//fonction de callback pour l'appui sur une case
    //console.log (board);
    if(player_color!==trait && !current_game.IsSandbox) {
        return-2
    }
    const result = make_deplacement.check_deplacement(parameters,piece,board, event); 
    if (result.status===0) { //déplacement permis
        board = result.board; //On actualise le board dans la variable js
        actualise_board (board) ; //on actualise graphiquement le board
        view_deplacement.downlight_square(); 
        
        trait=trait==="white" ? "black" : "white" //on change le trait
        let statut = make_deplacement.check_endgame (parameters,board,trait); //On vérifie si la partie est terminée
        if (!current_game.IsSandbox) {
            update_game(current_game.Game.id,board,trait,statut);
        }
    }

    //console.log (result); //for debug
}

const update_game = async (game_id:number,board:Board,trait:string,status:number) => {

    const user_token = getUserToken();
    if (user_token == null) {
        console.error ("Un utilisateur sans token a essayé de modifier une partie");
        return -1;
    } else {
        const route = "/game/update";
        let options = {
            method: 'POST',
            headers: {
                "X-CSRF-TOKEN": getCsrfToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_token": user_token,
                "game_id": game_id,
                "status": status,
                "board": JSON.stringify(board),
                "trait":trait,
            }),
        }
        console.log (options);

        try {
            const response = await fetch(Config.backendConfig.apiUrl + route, options);
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            const data = await response.json();
            console.log(data);
            current_game.Game.updated_at=data.updated_at;
            current_game.Game.status=status;
            current_game.Game.board=board;
            current_game.Game.trait=trait;
            return 0;
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire:", error);
            alert("erreur : veuillez contacter l'administrateur du site")
        }
    }
}

const actualise_board= (board:Board) => { //sert a mettre a jour l'affichage du plateau a l'utilisateur
    let DOM_board = Array.from(document.querySelectorAll(".piece"));


    for (let element of DOM_board) {
        if (! (element.id in board)) { //Si la piece a été mangée
            element.remove(); //On la supprime
        }
        else {
            try {
                const square = element.id as keyof Board; 
                const HTMLElement = element as HTMLElement;
                
                if (HTMLElement.dataset.square != board[square]) {
            //si la piece a été déplacée
                
                    
                    HTMLElement.dataset.square = board[square];
                    const column = columns.indexOf(board[square][0]);
                    const row = rows.indexOf(board[square][1])+1;
                    let style=create_square_position(column,row);
                    HTMLElement.style.left = style.left;
                    HTMLElement.style.top = style.top;
                }
            }catch (error) {
                console.error (error);
                throw new CriticalError ("erreur critique inconnue");
            }
        }

        
    }
}


const icon_piece = (input_piece:string) => {//cette fonction sert a definir la bonne icone font awesome en fonction de la pièce

    let piece = input_piece.split("-")[1];
    piece = piece.replace(/\d/g, '');
    //console.log (piece);
    return " fa-chess-"+piece+" ";
};

const color_piece = (piece:string) => {//Cette fonction sert a definir graphiquement la couleur de la pièce en fonction de la pièce

    const color = piece.split("-")[0];
    //console.log(color);
    if (color==="white") {return " text-primary ";}
    else if (color==="black") {return " text-dark ";}
    else {return "";}
};

const create_square_position = (column_index:number,row_index:number) => {//Sert a positionner toutes les divs representant les cases du plateau aux bons endroit du plateau

    //Nb : la fonction est utilisée pour autre chose aussi faudrait renommer ça

    const left= piece_width*column_index; 
    const top = board_height-piece_height*row_index; //Parce qu'on part du haut mais que la ligne 1 est en bas
    const styles: { [key: string]: string } = {}
    //console.log (top,left);
    styles['left'] = left.toString()+'px';
    styles['top'] = top.toString()+'px';

    return styles;

};

//Pour importer une position

const handleFileUpload = (event: Event) => {

    console.warn ("hello");

    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) {
        throw new Error("Erreur, l'input ne contient pas de fichier");
    }
    const file = input.files[0];

    if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
        const readerEvent = e.target as FileReader;
        try {
            
            board = JSON.parse(readerEvent.result as string); 
            actualise_board(board);
        } catch (error) {
            alert("Erreur de lecture du fichier JSON.");
        }
        };
        reader.readAsText(file);
    } else {
    alert("Veuillez sélectionner un fichier JSON.");
    }
}

onMounted(async () => {
    actualise_board(board);
    //retrieve_current_game();
    
});


// Fonction pour mettre à jour le timer
function updateTimer() {
    current_timestamp.value=Date.now();

}

// Mettre à jour le timer toutes les secondes
setInterval(updateTimer, 1000);

</script>

<style scoped>

    @import "../assets/css/chess_style.css"; 

</style>