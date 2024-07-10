import { Board,Parameters } from "./interface";
import { BoardError,CriticalError,EventError } from "./error_class";

export const view_move = (parameters: Parameters, board: Board, event: MouseEvent):string => {
    // Vérifier si l'événement a une cible valide
    const target = event.target as HTMLElement;
    if (target === null) {
        throw new EventError("L'événement ne correspond pas au clic d'une pièce");
    }

    // Réinitialiser l'affichage
    downlight_square(); 

    // Assurer que l'ID de la cible est une chaîne
        // Assurer que l'ID de la cible est une chaîne
        const piece_clicked = target.id as keyof Board; 

        // Vérifier si piece_clicked est une clé valide dans board
        if (!board.hasOwnProperty(piece_clicked)) {
            throw new BoardError("La pièce cliquée n'existe pas dans le board");
        }

    // Récupérer les informations sur la pièce cliquée
    let piece_type:string = retrieve_piece_type(piece_clicked);
    let piece_color:string = retrieve_piece_color(piece_clicked);
    let square:string = board[piece_clicked];

    // Obtenir tous les déplacements possibles
    let all_displacement = all_rules_displacement(parameters, square, piece_type, piece_color, board);

    // Mettre en surbrillance les cases possibles
    highlight_square(all_displacement);

    return piece_clicked;
};


export const retrieve_piece_type = (piece_id:string):string => {

    let piece_type = piece_id.split("-")[1];
    
    piece_type = piece_type.replace(/\d/g, ''); //On récupère le type de pièce
    if (piece_type==="pawn") {
        return piece_id.replace(/\d/g, '');
    }
    else {
        return piece_type;
    }
};

export const retrieve_piece_color = (piece_id:string):string => {

    let color = piece_id.split("-")[0];
    return color;
    
};

/*export const retrieve_piece_position = (parameters:Parameters,target) => {
    
    var computedStyle = window.getComputedStyle(target);
    let top = computedStyle.getPropertyValue("top");// recupere "200px" par exemple
    let left = computedStyle.getPropertyValue("left");

    let position = {
        top: parseInt (top.slice(0,-2)), //pour enlever le px et convertir en int
        left:parseInt (left.slice(0,-2)), 
    };
    return position;
};*/

export const all_rules_displacement = (parameters:Parameters, square:string, type_piece:string,piece_color:string,board:Board ):string[] => {
//Cette fonction sert a determiner toutes les cases atteignables par la pièce concernée.
//square : la case de départ de la pièce concernée
//board : l'etat du plateau avec le positionnement de chaque pièce.
    let all_displacement:string[] = [];
    let all_pieces_square = all_piece_square(board); //Récupère toutes les cases sur lesquelles il y a une pièce.
    //ca permet de gagner un peu de temps par la suite.

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
        throw new BoardError ("Type de pièce non reconnu : "+type_piece);
    }

    //console.log(all_displacement);
    return all_displacement;
}

export const highlight_square = (squares_to_highlight:string[] ):number => {

    //console.log (square_to_highlight);
    try {
        for (let square of squares_to_highlight) {
            
            let squareElement = document.getElementById(square);
            if (squareElement !== null) {
            
                squareElement.style.backgroundColor = "red"; //Illumine les cases
                squareElement.style.opacity = "50%"; //pour avoir un rendu sympa
                squareElement.style.zIndex = "1"; //Pur mettre les cases au 1er plan et pouvoir cliquer facilement dessus ensuite
                squareElement.dataset.highlighted = "true"; //Modifie la propriété data-highlited des cases; 
                //Cela permet de savoir plus facilement si la case est illuminée ou non dans le reste de l'app
            }
        }
        return 0;
    }catch (error) {
        console.error (error);
        throw new CriticalError("impossible to downlight square : " + error);
        
    }
}

export const downlight_square = ():number => {
    //enleve la surbrillance et rend leur style de base aux cases
    try {

        let squareElement: HTMLCollectionOf<Element> = document.getElementsByClassName("square");
        let arrayElement: HTMLElement[] = Array.from(squareElement) as HTMLElement[];
        
        for (let element of arrayElement) {
            
            element.style.zIndex="0";
            element.style.backgroundColor = "";
            element.style.opacity = "100%";
            element.dataset.highlighted = "false";
        }
        return 0;

    }catch (error) {
        throw new CriticalError ("erreur en essayant de downlight les cases : " +error);
    }
}

export const white_pawn_deplacement = (parameters:Parameters,square:string,all_pieces_square:string[],color:string,board:Board ):string[] => {

    let row:string=square[1];
    let column:string = square[0];
    let columns:string[] = parameters.columns;
    let rows:string[] = parameters.rows;
    let all_displacement:string[] = [];

    //On check le déplacement coté colonne
    let column_index:number = columns.indexOf(column);
    let row_index:number = rows.indexOf(row)
    if (column_index!=0) {
        let square:string = columns[column_index-1]+row;

        if (!(all_pieces_square.includes(square))){
            all_displacement.push(square);
        }
    }
    //On check le déplacement coté ligne
    if (row_index!=rows.length-1) {
        let square:string = column+rows[row_index+1];
        
        if (!(all_pieces_square.includes(square))){
                
            all_displacement.push(square);
        }
    }
    //On check le déplacement en diagonal
    if (column_index!=0 && row_index!=rows.length-1) {
        let square = columns[column_index-1]+rows[row_index+1];

        if (all_pieces_square.includes(square)){
            let piece_bloquante = retrieve_piece_by_square(board,square);
            if (typeof(piece_bloquante)==="number") {
                throw new BoardError ("le board ne correspond pas à la réalité");
            }
            
            if (retrieve_piece_color(piece_bloquante)!==color) {
                all_displacement.push(square);
            } 
        }
    }
    //console.log (all_displacement);
    return all_displacement;

}

export const black_pawn_deplacement = (parameters:Parameters,square:string,all_pieces_square:string[],color:string,board:Board ):string[] => {

    let row=square[1];
    let column = square[0];
    let columns = parameters.columns;
    let rows = parameters.rows;
    let all_displacement = [];

    let column_index = columns.indexOf(column);
    let row_index = rows.indexOf(row)
    //On check le déplacement coté colonne
    if (column_index!=columns.length-1) {
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
    if (column_index!=columns.length-1 && row_index!=0) {
        let square = columns[column_index+1]+rows[row_index-1];
        if (all_pieces_square.includes(square)){
            let piece_bloquante = retrieve_piece_by_square(board,square);
            if (typeof(piece_bloquante)==="number") {
                throw ("le board ne correspond pas à la réalité");
            }
            if (retrieve_piece_color(piece_bloquante)!==color) {
                all_displacement.push(square);
            } 
        }
    }
    console.log (all_displacement,column_index,row_index);
    return all_displacement;

}

export const knight_deplacement = (parameters:Parameters, square:string,all_pieces_square:string[],color:string,board:Board ):string[] => {

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
                if (typeof(piece_bloquante)==="number") {
                    throw ("le board ne correspond pas à la réalité");
                }
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

const handleDiagonalMove = (column: string,row: string,colIncrement: number,rowIncrement: number,columns: string[],rows: string[], all_pieces_square: string[],board: Board,color: string): string[] => {
    const all_displacement: string[] = [];
    const columnIndexStart = columns.indexOf(column);
    const rowIndexStart = rows.indexOf(row);

    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columnIndexStart + colIncrement * i;
        const rowIndex = rowIndexStart + rowIncrement * i;

        if (colIndex >= 0 && colIndex < columns.length && rowIndex >= 0 && rowIndex < rows.length) {
            const square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)) {
                const piece_bloquante = retrieve_piece_by_square(board, square);
                if (typeof piece_bloquante === "number") {
                    throw new BoardError("le board ne correspond pas à la réalité");
                }
                if (retrieve_piece_color(piece_bloquante) !== color) {
                    all_displacement.push(square);
                }
                break;
            } else {
                all_displacement.push(square);
            }
        } else {
            break;
        }
    }

    return all_displacement;
};

export const bishop_deplacement = (parameters: Parameters,square: string,all_pieces_square: string[],color: string,board: Board): string[] => {
    const row = square[1];
    const column = square[0];
    const { columns, rows } = parameters;
    let all_displacement: string[] = [];

    all_displacement = all_displacement.concat(
        handleDiagonalMove(column, row, 1, 1, columns, rows, all_pieces_square, board, color),   // Diagonale 1
        handleDiagonalMove(column, row, -1, 1, columns, rows, all_pieces_square, board, color),  // Diagonale 2
        handleDiagonalMove(column, row, -1, -1, columns, rows, all_pieces_square, board, color), // Diagonale 3
        handleDiagonalMove(column, row, 1, -1, columns, rows, all_pieces_square, board, color)   // Diagonale 4
    );

    return all_displacement;
};

const handleRookLineMove = (colIncrement: number, rowIncrement: number, column: string, row: string, columns: string[], rows: string[], all_pieces_square: string[], board: Board, color: string): string[] => {
    const all_displacement: string[] = [];
    const columnIndexStart = columns.indexOf(column);
    const rowIndexStart = rows.indexOf(row);

    for (let i = 1; i <= rows.length; i++) {
        const colIndex = columnIndexStart + colIncrement * i;
        const rowIndex = rowIndexStart + rowIncrement * i;

        if (colIndex >= 0 && colIndex < columns.length && rowIndex >= 0 && rowIndex < rows.length) {
            const square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)) {
                const piece_bloquante = retrieve_piece_by_square(board, square);
                if (typeof piece_bloquante === "number") {
                    throw new BoardError("le board ne correspond pas à la réalité");
                }
                if (retrieve_piece_color(piece_bloquante) !== color) {
                    all_displacement.push(square);
                }
                break;
            } else {
                all_displacement.push(square);
            }
        } else {
            break;
        }
    }

    return all_displacement;
};

export const rook_deplacement = (parameters: Parameters, piece_square: string, all_pieces_square: string[], color: string, board: Board): string[] => {
    const row = piece_square[1];
    const column = piece_square[0];
    const { columns, rows } = parameters;
    let all_displacement: string[] = [];

    try {
        all_displacement = all_displacement.concat(
            handleRookLineMove(1, 0, column, row, columns, rows, all_pieces_square, board, color),  // Ligne 1: augmentant la colonne
            handleRookLineMove(-1, 0, column, row, columns, rows, all_pieces_square, board, color), // Ligne 2: diminuant la colonne
            handleRookLineMove(0, -1, column, row, columns, rows, all_pieces_square, board, color), // Ligne 3: diminuant la ligne
            handleRookLineMove(0, 1, column, row, columns, rows, all_pieces_square, board, color)   // Ligne 4: augmentant la ligne
        );

        return all_displacement;
    } catch (error) {
        console.error(error);
        throw new BoardError ("error during rook displacement : "+ error);
    }
};


export const queen_deplacement = (parameters:Parameters, square:string,all_pieces_square:string[],color:string,board:Board ) => {

    let rook_squares:string[] = rook_deplacement(parameters, square,all_pieces_square,color,board );
    let bishop_squares:string[] = bishop_deplacement(parameters, square,all_pieces_square,color,board );

    const uniqueValues = new Set([...rook_squares, ...bishop_squares]);

    // Convertir le Set en tableau
    const all_displacement = Array.from(uniqueValues);
    

    
    return all_displacement;

}

export const king_deplacement = (parameters:Parameters,square:string,all_pieces_square:string[],color:string,board:Board ):string[] => {
    
    
    let row=square[1];
    let column = square[0];
    let columns:string[] = parameters.columns;
    let rows:string[] = parameters.rows;
    let all_displacement:string[] = [];

    try {

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
                    let piece_bloquante: string | number = retrieve_piece_by_square(board,square);
                    if (typeof(piece_bloquante)==="number") {
                        throw ("le board ne correspond pas à la réalité");
                    }
                    if (retrieve_piece_color(piece_bloquante)!==color) {
                        all_displacement.push(square);
                    } 
                } else {
                    all_displacement.push(square);
                }
            }
        }
        return all_displacement;
    }catch (error) {
        console.error (error);
        return all_displacement
    }
    

    

}


export const all_piece_square= (board:Board):string[] => {//renvoit toutes les cases sur lesquelles il y a une pièce

    let all_pieces_square:string[] = [];
    const pieces = document.querySelectorAll('.piece');
    for (const position of Object.values(board)) {
        all_pieces_square.push(position);
    }

    return all_pieces_square;
}

export const retrieve_piece_by_square = (board:Board,square:string): string | number => {//permet de savoir quelle pièce est sur une case donnée

    for (const [piece, position] of Object.entries(board)) {
        if (position === square) {
          return piece;
        }
      }
      console.error("le board ne correspond pas à la réalité"); // important, ce cas ne doit pas se produire
      throw new BoardError ("le board ne correspond pas à la réalité");
};