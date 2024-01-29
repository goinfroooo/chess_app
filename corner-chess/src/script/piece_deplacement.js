import * as colision from "./piece_colision";

export const view_move = (parameters, event) => {
    
    const target = event.target;
    let piece_type = retrieve_piece_type (parameters,target.id) ;
    let position = retrieve_piece_position(parameters,target);
    let square = convert_position_to_square (parameters,position);

    let all_displacement = all_rules_displacement (parameters,square,piece_type);
    let colisioned_deplacement = colision.check_colision (parameters,square,piece_type,all_displacement);
    
    highlight_square (parameters,all_displacement);
};

export const retrieve_piece_type = (parameters,piece_id) => {
    let piece_type = piece_id.split("-")[1];
    
    piece_type = piece_type.replace(/\d/g, ''); //On récupère le type de pièce
    if (piece_type==="pawn") {
        return piece_id.replace(/\d/g, '');
    }
    else {
        return piece_type;
    }
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
    console.log ("square : ",square);

    return square;

};

export const all_rules_displacement = (parameters, square, type_piece ) => {

    let all_displacement = [];

    if (type_piece === 'white-pawn') {
        all_displacement=white_pawn_deplacement(parameters,square);
    } else if (type_piece === 'black-pawn') {
        all_displacement=black_pawn_deplacement(parameters,square);
    } else if (type_piece === 'rook') {
        all_displacement=rook_deplacement(parameters,square);
    } else if (type_piece === 'bishop') {
        all_displacement=bishop_deplacement(parameters,square);
    } else if (type_piece === 'knight') {
        all_displacement=knight_deplacement(parameters,square);
    } else if (type_piece === 'queen') {
        all_displacement=queen_deplacement(parameters,square);
    } else if (type_piece === 'king') {
        all_displacement=king_deplacement(parameters,square);

    } else {
        // Cas par défaut ou erreur
        console.error('Type de pièce non reconnu : ',type_piece);
    }

    console.log(all_displacement);
    return all_displacement;
}

export const highlight_square = (parameters, square_to_highlight ) => {

    for (let square of square_to_highlight) {

        let squareElement = document.getElementById(square);
        squareElement.style.backgroundColor = "red";
        squareElement.style.opacity = "50%";
    }
}
export const white_pawn_deplacement = (parameters, square ) => {

        console.log (square);
    let row=square[1];
    let column = square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];

    let column_index = columns.indexOf(column);
    let row_index = rows.indexOf(row)
    if (column_index!=0) {
        all_displacement.push (columns[column_index-1]+row);

    }
    if (row_index!=rows.length) {
        all_displacement.push (column+rows[row_index+1]);
    }

    if (all_displacement.length==2) {
        all_displacement.push (columns[column_index-1]+rows[row_index+1]);
    }
    console.log (all_displacement);
    return all_displacement;

}

export const black_pawn_deplacement = (parameters, square ) => {

    console.log (square);
    let row=square[1];
    let column = square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];

    let column_index = columns.indexOf(column);
    let row_index = rows.indexOf(row)
    if (column_index!=columns.length) {
        all_displacement.push (columns[column_index+1]+row);

    }
    if (row_index!=0) {
        all_displacement.push (column+rows[row_index-1]);
    }

    if (all_displacement.length==2) {
        all_displacement.push (columns[column_index+1]+rows[row_index-1]);
    }
    console.log (all_displacement);
    return all_displacement;

}

export const knight_deplacement = (parameters, square ) => {

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
          all_displacement.push(columns[newColIndex] + newRow);
        }
      }
      return all_displacement;
}

export const bishop_deplacement = (parameters, square ) => {

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
            all_displacement.push(columns[colIndex] + rows[rowIndex]);
        } else {
            break;
        }
    }

    // Diagonale 2: En diminuant la colonne et la ligne
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) - i;
        const rowIndex = rows.indexOf(row) + i;

        if (colIndex >= 0 && rowIndex < rows.length) {
            all_displacement.push(columns[colIndex] + rows[rowIndex]);
        } else {
            break;
        }
    }

    // Diagonale 3: En diminuant la colonne et la ligne
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) - i;
        const rowIndex = rows.indexOf(row) - i;

        if (colIndex >= 0 && rowIndex >= 0) {
            all_displacement.push(columns[colIndex] + rows[rowIndex]);
        } else {
            break;
        }
    }

    // Diagonale 4: En augmentant la colonne et en diminuant la ligne
    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columns.indexOf(column) + i;
        const rowIndex = rows.indexOf(row) - i;

        if (colIndex < columns.length && rowIndex >= 0) {
            all_displacement.push(columns[colIndex] + rows[rowIndex]);
        } else {
            break;
        }
    }

    return all_displacement;
}
export const rook_deplacement = (parameters, square ) => {

    let all_displacement =[];

    for (let row of parameters.rows) {
        if (row != square[1]) {
        all_displacement.push (square[0]+row);
        }
    }

    for (let column of parameters.columns) {
        if (column != square[0]) {
        all_displacement.push (column+square[1]);
        }
    }
    return all_displacement;

}



export const queen_deplacement = (parameters, square ) => {

    let rook_square = rook_deplacement(parameters, square );
    let bishop_square = bishop_deplacement(parameters, square );

    const uniqueValues = new Set([...rook_square, ...bishop_square]);

    // Convertir le Set en tableau
    const all_displacement = Array.from(uniqueValues);
    

    
    return all_displacement;

}

export const king_deplacement = (parameters, square ) => {
    
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
        all_displacement.push(columns[newColIndex] + newRow);
      }
    }
    

    return all_displacement;

}

