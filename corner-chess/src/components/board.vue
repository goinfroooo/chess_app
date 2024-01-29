<template>
    <div class="content mt-2">
        <div class="board p-0">
            <!-- Ajoutez ici le reste du contenu de votre page -->
            <template v-for="(column,index) in columns" :key="index">
                <div v-for="(row,index2 ) in rows" 
                :id="column + row" 
                class="square" 
                :style="create_square_position(index,index2+1)">
            </div>
            </template>

            <i v-for="piece in pieces"  
            @click="deplacement.view_move(parameters, $event)"
            :id="piece" 
            :class="color_piece(piece)+icon_piece(piece)+' fa-solid fa-2x  text-center piece'">
            </i>
        </div>
    </div>
    
</template>

<script setup>

import * as deplacement from "../script/piece_deplacement.js";

const columns = ["a","b","c","d","e","f","g","h",];
const rows = ["1","2","3","4","5","6","7","8",];

const board_height = 400;
const board_width = 400;
const piece_height = board_height/columns.length;
const piece_width = board_width/rows.length;

const parameters = {
  columns: columns,
  rows: rows,
  board_height: board_height,
  board_width: board_width,
  piece_height: piece_height,
  piece_width: piece_width,
};

const pieces = [

    //black pieces
    "black-rook1",
    "black-knight1",
    "black-bishop1",
    "black-queen",
    "black-king",
    "black-bishop2",
    "black-knight2",
    "black-rook2",
    //black pawns
    "black-pawn1",
    "black-pawn2",
    "black-pawn3",
    "black-pawn4",
    "black-pawn5",
    "black-pawn6",
    "black-pawn7",
    "black-pawn8",
    //white piece
    "white-rook1",
    "white-knight1",
    "white-bishop1",
    "white-queen",
    "white-king",
    "white-bishop2",
    "white-knight2",
    "white-rook2",
    //white pawn
    "white-pawn1",
    "white-pawn2",
    "white-pawn3",
    "white-pawn4",
    "white-pawn5",
    "white-pawn6",
    "white-pawn7",
    "white-pawn8",
    
];

const emit = defineEmits ("piece_click");


const icon_piece = (input_piece) => {

    let piece = input_piece.split("-")[1];
    piece = piece.replace(/\d/g, '');
    //console.log (piece);
    return " fa-chess-"+piece+" ";
};

const color_piece = (piece) => {

    const color = piece.split("-")[0];
    //console.log(color);
    if (color==="white") {return " text-light ";}
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