<template>
    <div class="content mt-2 d-flex justify-content-center">
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
    
</template>

<script setup>

//On importe les 2 scripts qui permettent de gérer la logique du plateau

import * as view_deplacement from "../script/view_piece_deplacement.js";
import * as make_deplacement from "../script/make_piece_deplacement.js";

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

//Variable très importante, elle définit l'état du plateau
//A terme il faudra que cette variable sois passé via un slot au chargement du composant pour pouvoir reprendre des parties en cours
let board_pieces = {

    //black pieces
    "black-rook1":"a7",
    "black-knight1":"a6",
    "black-bishop1":"b6",
    "black-queen":"b7",
    "black-king":"a8",
    "black-bishop2":"c8",
    "black-knight2":"c7",
    "black-rook2":"b8",
    //black pawns
    "black-pawn1":"a5",
    "black-pawn2":"d8",
    "black-pawn3":"c6",
    "black-pawn4":"d6",
    "black-pawn5":"b5",
    "black-pawn6":"d7",
    "black-pawn7":"c5",
    "black-pawn8":"d5",
    //white piece
    "white-rook1":"g1",
    "white-knight1":"f2",
    "white-bishop1":"f1",
    "white-queen":"g2",
    "white-king":"h1",
    "white-bishop2":"g3",
    "white-knight2":"h3",
    "white-rook2":"h2",
    //white pawn
    "white-pawn1":"e1",
    "white-pawn2":"f3",
    "white-pawn3":"h4",
    "white-pawn4":"g4",
    "white-pawn5":"f4",
    "white-pawn6":"e4",
    "white-pawn7":"e3",
    "white-pawn8":"e2",
    
};

let piece_clicked = "";//Permet de garder en mémoire la pièce cliquée actuellement par le joueur.
//La pièce cliquée est la pièce dont on souhaite voir les déplacements
let trait = "white"; //Permet de dire a qui c'est de jouer. 
//TODO : le récupérer d'un slot aussi ?

const board_view_deplacement = (event) => {

    if (view_deplacement.retrieve_piece_color(event.target.id)!==trait){  
        alert(trait+" turn");
        console.log (trait);
        return -1;
    } 
    piece_clicked = view_deplacement.view_move(parameters,board_pieces, event);
    console.log (piece_clicked);
}

const board_make_deplacement = (parameters,piece, event) => {
    console.log (board_pieces);
    const result = make_deplacement.check_deplacement(parameters,piece,board_pieces, event);
    if (result.status===0) {
        board_pieces = result.board;
        actualise_board (board_pieces) ;
        view_deplacement.downlight_square();
        console.log (board_pieces);
        
        trait=trait==="white" ? "black" : "white" //on change le trait
        make_deplacement.check_endgame (parameters,board_pieces,trait);
    }
    
    
    console.log (result);
}

const actualise_board = (board_pieces) => {
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


const icon_piece = (input_piece) => {

    let piece = input_piece.split("-")[1];
    piece = piece.replace(/\d/g, '');
    //console.log (piece);
    return " fa-chess-"+piece+" ";
};

const color_piece = (piece) => {

    const color = piece.split("-")[0];
    //console.log(color);
    if (color==="white") {return " text-primary ";}
    else if (color==="black") {return " text-dark ";}
    else {return "";}
};

const create_square_position = (column,row) => {

    //console.log (column,row);
    //console.log (board_width,piece_width);

    const left= piece_width*column; 
    const top = board_height-piece_height*row; //Parce qu'on part du haut mais que la ligne 1 est en bas
    const styles = {};
    //console.log (top,left);
    styles['left'] = left.toString()+'px';
    styles['top'] = top.toString()+'px';

    return styles;

};

</script>

<style scoped>

    @import "../assets/css/chess_style.css";
    .content {

    width: 800px;
    height: 800px;
    }
</style>