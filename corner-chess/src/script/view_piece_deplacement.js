import * as colision from "./make_piece_deplacement";



export const view_move = (parameters,board, event) => {
    
    downlight_square();
    all_piece_square(parameters);
    
    const piece_clicked = event.target.id;
    let piece_type = retrieve_piece_type (piece_clicked) ;
    let piece_color = retrieve_piece_color (piece_clicked) ;
    let square = board[piece_clicked];

    let all_displacement = all_rules_displacement (parameters,square,piece_type,piece_color,board);
    highlight_square (all_displacement); //On met les cases possible en surbrillance

    
    return piece_clicked;
};

export const retrieve_piece_type = (piece_id) => {

    let piece_type = piece_id.split("-")[1];
    
    piece_type = piece_type.replace(/\d/g, ''); //On récupère le type de pièce
    if (piece_type==="pawn") {
        return piece_id.replace(/\d/g, '');
    }
    else {
        return piece_type;
    }
};

export const retrieve_piece_color = (piece_id) => {

    let color = piece_id.split("-")[0];
    return color;
    
};

export const retrieve_piece_position = (parameters,target) => {
    
    var computedStyle = window.getComputedStyle(target);
    let top = computedStyle.getPropertyValue("top");// recupere "200px" par exemple
    let left = computedStyle.getPropertyValue("left");

    let position = {
        top: parseInt (top.slice(0,-2)), //pour enlever le px et convertir en int
        left:parseInt (left.slice(0,-2)), 
    };
    return position;
};

export const convert_position_to_square = (parameters, position ) => {

    const row = parameters.rows [(parameters.board_height-position.top)/parameters.piece_height-1];
    const column = parameters.columns [position.left/parameters.piece_height];
    const square = column+row;
    //console.log ("square : ",square);

    return square;

};


export const all_rules_displacement = (parameters, square, type_piece,piece_color,board ) => {

    let all_displacement = [];
    let all_pieces_square = all_piece_square(parameters,board);

    if (type_piece === 'white-pawn') {
        all_displacement=white_pawn_deplacement(parameters,square,all_pieces_square,piece_color,board);
    } else if (type_piece === 'black-pawn') {
        all_displacement=black_pawn_deplacement(parameters,square,all_pieces_square,piece_color,board);
    } else if (type_piece === 'rook') {
        all_displacement=rook_deplacement(parameters,square,all_pieces_square,piece_color,board);
    } else if (type_piece === 'bishop') {
        all_displacement=bishop_deplacement(parameters,square,all_pieces_square,piece_color,board);
    } else if (type_piece === 'knight') {
        all_displacement=knight_deplacement(parameters,square,all_pieces_square,piece_color,board);
    } else if (type_piece === 'queen') {
        all_displacement=queen_deplacement(parameters,square,all_pieces_square,piece_color,board);
    } else if (type_piece === 'king') {
        all_displacement=king_deplacement(parameters,square,all_pieces_square,piece_color,board);

    } else {
        // Cas par défaut ou erreur
        console.error('Type de pièce non reconnu : ',type_piece);
    }

    //console.log(all_displacement);
    return all_displacement;
}

export const highlight_square = (square_to_highlight ) => {

    console.log (square_to_highlight);
    for (let square of square_to_highlight) {
        
        let squareElement = document.getElementById(square);
        console.log(squareElement);
        squareElement.style.backgroundColor = "red";
        squareElement.style.opacity = "50%";
        squareElement.style.zIndex = 1;
        squareElement.dataset.highlighted = "true";
    }
}

export const downlight_square = () => {


    let squareElement = document.getElementsByClassName("square");

    let arrayElement=Array.from(squareElement);
    
    for (let element of arrayElement) {
        
        element.style.zIndex=0;
        element.style.backgroundColor = "";
        element.style.opacity = "100%";
        element.dataset.highlighted = "false";

    }
    
}

export const white_pawn_deplacement = (parameters,square,all_pieces_square,color,board ) => {

    let row=square[1];
    let column = square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];

    //On check le déplacement coté colonne
    let column_index = columns.indexOf(column);
    let row_index = rows.indexOf(row)
    if (column_index!=0) {
        let square = columns[column_index-1]+row;

            if (!(all_pieces_square.includes(square))){
                
                all_displacement.push(square);
            }
        

    }
    //On check le déplacement coté ligne
    if (row_index!=rows.length) {
        let square = column+rows[row_index+1];
        
        if (!(all_pieces_square.includes(square))){
                
            all_displacement.push(square);
        }
    }
    //On check le déplacement en diagonal
    if (column_index!=0 && row_index!=rows.length) {
        let square = columns[column_index-1]+rows[row_index+1];

        if (all_pieces_square.includes(square)){
            let piece_bloquante = retrieve_piece_by_square(board,square);
            
            if (retrieve_piece_color(piece_bloquante)!==color) {
                all_displacement.push(square);
            } 
        }
    }
    //console.log (all_displacement);
    return all_displacement;

}

export const black_pawn_deplacement = (parameters,square,all_pieces_square,color,board ) => {

    
    let row=square[1];
    let column = square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];

    let column_index = columns.indexOf(column);
    let row_index = rows.indexOf(row)
    //On check le déplacement coté colonne
    if (column_index!=columns.length) {
        let square = columns[column_index+1]+row;

        if (!(all_pieces_square.includes(square))){
                
            all_displacement.push(square);
        }
    }
    //On check le déplacement coté ligne
    if (row_index!=0) {
        let square = column+rows[row_index-1];
        if (!(all_pieces_square.includes(square))){
                
            all_displacement.push(square);
        }

        
    }
    //On check le déplacement en diagonal
    if (column_index!=columns.length && row_index!=0) {
        let square = columns[column_index+1]+rows[row_index-1];
        if (all_pieces_square.includes(square)){
            let piece_bloquante = retrieve_piece_by_square(board,square);
            if (retrieve_piece_color(piece_bloquante)!==color) {
                all_displacement.push(square);
            } 
        }
    }
    
    return all_displacement;

}

export const knight_deplacement = (parameters, square,all_pieces_square,color,board ) => {

    //console.log("knight deplacement",square);
    let row=square[1];
    let column = square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];

    const knightMoves = [
        { col: 1, row: 2 },
        { col: 2, row: 1 },
        { col: 2, row: -1 },
        { col: 1, row: -2 },
        { col: -1, row: -2 },
        { col: -2, row: -1 },
        { col: -2, row: 1 },
        { col: -1, row: 2 },
      ];
    
    for (const move of knightMoves) {
        const newColIndex = columns.indexOf(column) + move.col;
        const newRow = parseInt(row) + move.row;
        
        
        if (
          newColIndex >= 0 &&
          newColIndex < columns.length &&
          newRow >= 1 &&
          newRow <= rows.length
        ) {
            let square = columns[newColIndex] + newRow;
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                
            }

            else {
                all_displacement.push(square);
            }
            
            

        }
    }
      return all_displacement;
    
}

export const bishop_deplacement = (parameters, square,all_pieces_square,color,board ) => {

    let row=square[1];
    let column = square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];
    

    // Diagonale 1: En augmentant la colonne et la ligne
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) + i;
        const rowIndex = rows.indexOf(row) + i;

        if (colIndex < columns.length && rowIndex < rows.length) {
            let square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                break;
            }
            else {
                all_displacement.push(square);
            }
            
        } else {
            break;
        }
    }

    // Diagonale 2: En diminuant la colonne et la ligne
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) - i;
        const rowIndex = rows.indexOf(row) + i;

        if (colIndex >= 0 && rowIndex < rows.length) {
            let square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                break;
            }
            else {
                all_displacement.push(square);
            }
            
        } else {
            break;
        }
    }

    // Diagonale 3: En diminuant la colonne et la ligne
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) - i;
        const rowIndex = rows.indexOf(row) - i;

        if (colIndex >= 0 && rowIndex >= 0) {
            let square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                break;
            }
            else {
                all_displacement.push(square);
            }
            
        } else {
            break;
        }
    }

    // Diagonale 4: En augmentant la colonne et en diminuant la ligne
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) + i;
        const rowIndex = rows.indexOf(row) - i;

        if (colIndex < columns.length && rowIndex >= 0) {
            let square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                break;
            }
            else {
                all_displacement.push(square);
            }
            
        } else {
            break;
        }
    }

    return all_displacement;
}
export const rook_deplacement = (parameters, piece_square,all_pieces_square,color,board ) => {

    let row=piece_square[1];
    let column = piece_square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];

    //ligne 1
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) + i;
        const rowIndex = rows.indexOf(row) ;

        if (colIndex < columns.length ) {
            let square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                break;
            }
            else {
                all_displacement.push(square);
            }
            
        } else {
            break;
        }
    }

    //ligne 2
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) - i;
        const rowIndex = rows.indexOf(row) ;

        if (colIndex >=0) {
            let square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                break;
            }
            else {
                all_displacement.push(square);
            }
            
        } else {
            break;
        }
    }

    //ligne 3
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column);
        const rowIndex = rows.indexOf(row)-i;

        if (rowIndex >= 0) {
            let square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                break;
            }
            else {
                all_displacement.push(square);
            }
            
        } else {
            break;
        }
    }

    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) ;
        const rowIndex = rows.indexOf(row)+i ;
        

        if (rowIndex < rows.length) {
            let square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
                break;
            }
            else {
                all_displacement.push(square);
            }
            
        } else {
            break;
        }
    }

    return all_displacement;

}



export const queen_deplacement = (parameters, square,all_pieces_square,color,board ) => {

    let rook_square = rook_deplacement(parameters, square,all_pieces_square,color,board );
    let bishop_square = bishop_deplacement(parameters, square,all_pieces_square,color,board );

    const uniqueValues = new Set([...rook_square, ...bishop_square]);

    // Convertir le Set en tableau
    const all_displacement = Array.from(uniqueValues);
    

    
    return all_displacement;

}

export const king_deplacement = (parameters,square,all_pieces_square,color,board ) => {
    
    let row=square[1];
    let column = square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];
    

    // Les positions relatives possibles pour le roi
    const kingMoves = [
      { col: 0, row: 1 }, // en haut
      { col: 1, row: 1 }, // en haut à droite
      { col: 1, row: 0 }, // à droite
      { col: 1, row: -1 }, // en bas à droite
      { col: 0, row: -1 }, // en bas
      { col: -1, row: -1 }, // en bas à gauche
      { col: -1, row: 0 }, // à gauche
      { col: -1, row: 1 }, // en haut à gauche
    ];
  
    for (const move of kingMoves) {
        const newColIndex = columns.indexOf(column) + move.col;
        const newRow = parseInt(row) + move.row;
  
        if (
        newColIndex >= 0 &&
        newColIndex < columns.length &&
        newRow >= 1 &&
        newRow <= rows.length
        ) {

            let square = columns[newColIndex] + newRow;
            if (all_pieces_square.includes(square)){
                let piece_bloquante = retrieve_piece_by_square(board,square);
                if (retrieve_piece_color(piece_bloquante)!==color) {
                    all_displacement.push(square);
                } 
            } else {
                all_displacement.push(square);
            }
        }
    }
    

    return all_displacement;

}


export const all_piece_square= (parameters,board) => {

    let all_pieces_square = [];
    const pieces = document.querySelectorAll('.piece');
    for (const key in board) {
        all_pieces_square.push(board[key]);
    }

    return all_pieces_square;
}

export const retrieve_piece_by_square = (board,square) => {

    for (const piece in board) {
        if (board[piece] === square) {
            return piece;
        }
    }
    console.error ("le board ne correspond pas a la réalité")
    return -1
}