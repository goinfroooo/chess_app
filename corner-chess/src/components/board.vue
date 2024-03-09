<template>
    <div class="container">
        <div class="row">
            <div class="col-9 content mt-2 d-flex justify-content-center">
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
                    <i v-for="(square,piece) in board_pieces"  
                    @click="board_view_deplacement($event)"
                    :id="piece" 
                    :data-square="square"
                    :class="color_piece(piece)+icon_piece(piece)+' fa-solid fa-2x  text-center piece'">
                    </i>
                </div>
            </div>
            <div class="col-3">
                <div class="card h-100 w-100 bg-light">
                    <div class="card-body">
                        <div class="row gy-4 gy-md-0">
                            <h1 class="card-title">Information de partie</h1>
                            <p>Vous avez les pièces {{ player_color==="white" ? "blanches" : "noires" }}</p>
                            <p>C'est au tour des  {{ trait==="white" ? "blancs" : "noirs" }} de jouer</p>
                            <div>temps restant avant abandon automatique :<br>{{ temps_restant }}</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script setup>

//On importe les 2 scripts qui permettent de gérer la logique du plateau

import * as view_deplacement from "../script/view_piece_deplacement.js";
import * as make_deplacement from "../script/make_piece_deplacement.js";
import { computed,ref,onMounted } from 'vue';
import Config from "../config";
import { getCsrfToken,getUserToken } from "@/script/token";


let current_game = window.localStorage.getItem("current_game");
if (current_game === null) {
    alert ("wesh");
}
else {
    current_game = JSON.parse(current_game);
    console.log(current_game);
}

let current_timestamp = ref(Date.now());
console.log(current_timestamp.value);
console.log(current_game.updated_at);
const temps_restant=computed(()=>{
    let currentTimestamp = current_timestamp.value;
    let gameTimestamp = new Date(current_game.updated_at).getTime(); // Exemple : 1709805295385

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

    // Mettre à jour l'affichage du timer
    
})




//On définit un tas de parametres

const columns = ["a","b","c","d","e","f","g","h",];
const rows = ["1","2","3","4","5","6","7","8",];

const board_height = 400; //donne la taille en pixel du plateau (pas responsive pour le moment)
const board_width = 400;
const piece_height = board_height/columns.length;
const piece_width = board_width/rows.length;

//On wrap tous les parametres pour les passer aux fonctions js c'est plus compact
//TODO : revoir ça, ça me parait bourin et souvent inutile, on a juste besoin de rows et columns en général
const parameters = {
  columns: columns,
  rows: rows,
  board_height: board_height,
  board_width: board_width,
  piece_height: piece_height,
  piece_width: piece_width,
};


let board_pieces = JSON.parse(current_game.board);
//console.log(board_pieces);

let piece_clicked = "";//Permet de garder en mémoire la pièce cliquée actuellement par le joueur.
//La pièce cliquée est la pièce dont on souhaite voir les déplacements
let trait = current_game.trait; //Permet de dire a qui c'est de jouer. 
let player_color = current_game.color;

const board_view_deplacement = (event) => { //Fonction de callback lors du click sur une pièce

    if(player_color!==trait) {
        return-2
    }
    if (view_deplacement.retrieve_piece_color(event.target.id)!==trait){  //si la pièce cliquée est de la mauvaise couleur
        alert(trait+" turn"); //a modifier dans le futur. On ne va pas alert pour ca
        return -1;
    } 
    piece_clicked = view_deplacement.view_move(parameters,board_pieces, event); //On appelle view deplacement, dans le fichier view_piece_deplacement.js
    console.log (piece_clicked);
}

const board_make_deplacement = (parameters,piece, event) => {//fonction de callback pour l'appui sur une case
    //console.log (board_pieces);
    if(player_color!==trait) {
        return-2
    }
    const result = make_deplacement.check_deplacement(parameters,piece,board_pieces, event); 
    if (result.status===0) { //déplacement permis
        board_pieces = result.board; //On actualise le board dans la variable js
        actualise_board (board_pieces) ; //on actualise graphiquement le board
        view_deplacement.downlight_square(); 
        console.log (board_pieces);//for debug
        
        trait=trait==="white" ? "black" : "white" //on change le trait
        let statut = make_deplacement.check_endgame (parameters,board_pieces,trait); //On vérifie si la partie est terminée
        update_game(current_game.id,board_pieces,trait,statut);
    }
    
    
    console.log (result); //for debug
}

const update_game = async (game_id,board,trait,status) => {

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
            current_game.updated_at=data.updated_at;
            current_game.status=status;
            current_game.board=JSON.stringify(board);
            current_game.trait=trait;
            return 0;
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire:", error);
            alert("erreur : veuillez contacter l'administrateur du site")
        }
    }
}

const actualise_board = (board_pieces) => { //sert a mettre a jour l'affichage du plateau a l'utilisateur
    let DOM_board = document.querySelectorAll(".piece");
    

    for (let element of DOM_board) {
        if (! (element.id in board_pieces)) { //Si la piece a été mangée
            element.remove(); //On la supprime
        }
        else if (element.dataset.square != board_pieces[element.id]) { //si la piece a été déplacée
            element.dataset.square = board_pieces[element.id];
            const column = columns.indexOf(board_pieces[element.id][0]);
            const row = rows.indexOf(board_pieces[element.id][1])+1;

            let style=create_square_position(column,row);
            element.style.left = style.left;
            element.style.top = style.top;


        }
    }
}

const initialize_board= (board) => { //sert a mettre a jour l'affichage du plateau a l'utilisateur
    let DOM_board = document.querySelectorAll(".piece");
    

    for (let element of DOM_board) {
        if (! (element.id in board)) { //Si la piece a été mangée
            element.remove(); //On la supprime
        }
         //si la piece a été déplacée
            element.dataset.square = board[element.id];
            const column = columns.indexOf(board[element.id][0]);
            const row = rows.indexOf(board[element.id][1])+1;
            let style=create_square_position(column,row);
            element.style.left = style.left;
            element.style.top = style.top;


        
    }
}


const icon_piece = (input_piece) => {//cette fonction sert a definir la bonne icone font awesome en fonction de la pièce

    let piece = input_piece.split("-")[1];
    piece = piece.replace(/\d/g, '');
    //console.log (piece);
    return " fa-chess-"+piece+" ";
};

const color_piece = (piece) => {//Cette fonction sert a definir graphiquement la couleur de la pièce en fonction de la pièce

    const color = piece.split("-")[0];
    //console.log(color);
    if (color==="white") {return " text-primary ";}
    else if (color==="black") {return " text-dark ";}
    else {return "";}
};

const create_square_position = (column,row) => {//Sert a positionner toutes les divs representant les cases du plateau aux bons endroit du plateau

    //Nb : la fonction est utilisée pour autre chose aussi faudrait renommer ça

    const left= piece_width*column; 
    const top = board_height-piece_height*row; //Parce qu'on part du haut mais que la ligne 1 est en bas
    const styles = {};
    //console.log (top,left);
    styles['left'] = left.toString()+'px';
    styles['top'] = top.toString()+'px';

    return styles;

};

onMounted(async () => {
    initialize_board(board_pieces)
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
    .content {

    width: 800px;
    height: 800px;
    }
</style>