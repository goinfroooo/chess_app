"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.retrieve_piece_by_square = exports.all_piece_square = exports.king_deplacement = exports.queen_deplacement = exports.rook_deplacement = exports.bishop_deplacement = exports.knight_deplacement = exports.black_pawn_deplacement = exports.white_pawn_deplacement = exports.downlight_square = exports.highlight_square = exports.all_rules_displacement = exports.retrieve_piece_color = exports.retrieve_piece_type = exports.view_move = void 0;
var error_class_1 = require("./error_class");
exports.view_move = function (parameters, board, event) {
    // Vérifier si l'événement a une cible valide
    var target = event.target;
    if (target === null) {
        throw new error_class_1.EventError("L'événement ne correspond pas au clic d'une pièce");
    }
    // Réinitialiser l'affichage
    exports.downlight_square();
    // Assurer que l'ID de la cible est une chaîne
    // Assurer que l'ID de la cible est une chaîne
    var piece_clicked = target.id;
    // Vérifier si piece_clicked est une clé valide dans board
    if (!board.hasOwnProperty(piece_clicked)) {
        throw new error_class_1.BoardError("La pièce cliquée n'existe pas dans le board");
    }
    // Récupérer les informations sur la pièce cliquée
    var piece_type = exports.retrieve_piece_type(piece_clicked);
    var piece_color = exports.retrieve_piece_color(piece_clicked);
    var square = board[piece_clicked];
    // Obtenir tous les déplacements possibles
    var all_displacement = exports.all_rules_displacement(parameters, square, piece_type, piece_color, board);
    // Mettre en surbrillance les cases possibles
    exports.highlight_square(all_displacement);
    return piece_clicked;
};
exports.retrieve_piece_type = function (piece_id) {
    var piece_type = piece_id.split("-")[1];
    piece_type = piece_type.replace(/\d/g, ''); //On récupère le type de pièce
    if (piece_type === "pawn") {
        return piece_id.replace(/\d/g, '');
    }
    else {
        return piece_type;
    }
};
exports.retrieve_piece_color = function (piece_id) {
    var color = piece_id.split("-")[0];
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
exports.all_rules_displacement = function (parameters, square, type_piece, piece_color, board) {
    //Cette fonction sert a determiner toutes les cases atteignables par la pièce concernée.
    //square : la case de départ de la pièce concernée
    //board : l'etat du plateau avec le positionnement de chaque pièce.
    var all_displacement = [];
    var all_pieces_square = exports.all_piece_square(board); //Récupère toutes les cases sur lesquelles il y a une pièce.
    //ca permet de gagner un peu de temps par la suite.
    if (type_piece === 'white-pawn') {
        all_displacement = exports.white_pawn_deplacement(parameters, square, all_pieces_square, piece_color, board);
    }
    else if (type_piece === 'black-pawn') {
        all_displacement = exports.black_pawn_deplacement(parameters, square, all_pieces_square, piece_color, board);
    }
    else if (type_piece === 'rook') {
        all_displacement = exports.rook_deplacement(parameters, square, all_pieces_square, piece_color, board);
    }
    else if (type_piece === 'bishop') {
        all_displacement = exports.bishop_deplacement(parameters, square, all_pieces_square, piece_color, board);
    }
    else if (type_piece === 'knight') {
        all_displacement = exports.knight_deplacement(parameters, square, all_pieces_square, piece_color, board);
    }
    else if (type_piece === 'queen') {
        all_displacement = exports.queen_deplacement(parameters, square, all_pieces_square, piece_color, board);
    }
    else if (type_piece === 'king') {
        all_displacement = exports.king_deplacement(parameters, square, all_pieces_square, piece_color, board);
    }
    else {
        // Cas par défaut ou erreur
        console.error('Type de pièce non reconnu : ', type_piece);
        throw new error_class_1.BoardError("Type de pièce non reconnu : " + type_piece);
    }
    //console.log(all_displacement);
    return all_displacement;
};
exports.highlight_square = function (squares_to_highlight) {
    //console.log (square_to_highlight);
    try {
        for (var _i = 0, squares_to_highlight_1 = squares_to_highlight; _i < squares_to_highlight_1.length; _i++) {
            var square = squares_to_highlight_1[_i];
            var squareElement = document.getElementById(square);
            if (squareElement !== null) {
                squareElement.style.backgroundColor = "red"; //Illumine les cases
                squareElement.style.opacity = "50%"; //pour avoir un rendu sympa
                squareElement.style.zIndex = "1"; //Pur mettre les cases au 1er plan et pouvoir cliquer facilement dessus ensuite
                squareElement.dataset.highlighted = "true"; //Modifie la propriété data-highlited des cases; 
                //Cela permet de savoir plus facilement si la case est illuminée ou non dans le reste de l'app
            }
        }
        return 0;
    }
    catch (error) {
        console.error(error);
        throw new error_class_1.CriticalError("impossible to downlight square : " + error);
    }
};
exports.downlight_square = function () {
    //enleve la surbrillance et rend leur style de base aux cases
    try {
        var squareElement = document.getElementsByClassName("square");
        var arrayElement = Array.from(squareElement);
        for (var _i = 0, arrayElement_1 = arrayElement; _i < arrayElement_1.length; _i++) {
            var element = arrayElement_1[_i];
            element.style.zIndex = "0";
            element.style.backgroundColor = "";
            element.style.opacity = "100%";
            element.dataset.highlighted = "false";
        }
        return 0;
    }
    catch (error) {
        throw new error_class_1.CriticalError("erreur en essayant de downlight les cases : " + error);
    }
};
exports.white_pawn_deplacement = function (parameters, square, all_pieces_square, color, board) {
    var row = square[1];
    var column = square[0];
    var columns = parameters.columns;
    var rows = parameters.rows;
    var all_displacement = [];
    //On check le déplacement coté colonne
    var column_index = columns.indexOf(column);
    var row_index = rows.indexOf(row);
    if (column_index != 0) {
        var square_1 = columns[column_index - 1] + row;
        if (!(all_pieces_square.includes(square_1))) {
            all_displacement.push(square_1);
        }
    }
    //On check le déplacement coté ligne
    if (row_index != rows.length - 1) {
        var square_2 = column + rows[row_index + 1];
        if (!(all_pieces_square.includes(square_2))) {
            all_displacement.push(square_2);
        }
    }
    //On check le déplacement en diagonal
    if (column_index != 0 && row_index != rows.length - 1) {
        var square_3 = columns[column_index - 1] + rows[row_index + 1];
        if (all_pieces_square.includes(square_3)) {
            var piece_bloquante = exports.retrieve_piece_by_square(board, square_3);
            if (typeof (piece_bloquante) === "number") {
                throw new error_class_1.BoardError("le board ne correspond pas à la réalité");
            }
            if (exports.retrieve_piece_color(piece_bloquante) !== color) {
                all_displacement.push(square_3);
            }
        }
    }
    //console.log (all_displacement);
    return all_displacement;
};
exports.black_pawn_deplacement = function (parameters, square, all_pieces_square, color, board) {
    var row = square[1];
    var column = square[0];
    var columns = parameters.columns;
    var rows = parameters.rows;
    var all_displacement = [];
    var column_index = columns.indexOf(column);
    var row_index = rows.indexOf(row);
    //On check le déplacement coté colonne
    if (column_index != columns.length - 1) {
        var square_4 = columns[column_index + 1] + row;
        if (!(all_pieces_square.includes(square_4))) {
            all_displacement.push(square_4);
        }
    }
    //On check le déplacement coté ligne
    if (row_index != 0) {
        var square_5 = column + rows[row_index - 1];
        if (!(all_pieces_square.includes(square_5))) {
            all_displacement.push(square_5);
        }
    }
    //On check le déplacement en diagonal
    if (column_index != columns.length - 1 && row_index != 0) {
        var square_6 = columns[column_index + 1] + rows[row_index - 1];
        if (all_pieces_square.includes(square_6)) {
            var piece_bloquante = exports.retrieve_piece_by_square(board, square_6);
            if (typeof (piece_bloquante) === "number") {
                throw ("le board ne correspond pas à la réalité");
            }
            if (exports.retrieve_piece_color(piece_bloquante) !== color) {
                all_displacement.push(square_6);
            }
        }
    }
    console.log(all_displacement, column_index, row_index);
    return all_displacement;
};
exports.knight_deplacement = function (parameters, square, all_pieces_square, color, board) {
    //console.log("knight deplacement",square);
    var row = square[1];
    var column = square[0];
    var columns = parameters.columns;
    var rows = parameters.rows;
    var all_displacement = [];
    var knightMoves = [
        { col: 1, row: 2 },
        { col: 2, row: 1 },
        { col: 2, row: -1 },
        { col: 1, row: -2 },
        { col: -1, row: -2 },
        { col: -2, row: -1 },
        { col: -2, row: 1 },
        { col: -1, row: 2 },
    ];
    for (var _i = 0, knightMoves_1 = knightMoves; _i < knightMoves_1.length; _i++) {
        var move = knightMoves_1[_i];
        var newColIndex = columns.indexOf(column) + move.col;
        var newRow = parseInt(row) + move.row;
        if (newColIndex >= 0 &&
            newColIndex < columns.length &&
            newRow >= 1 &&
            newRow <= rows.length) {
            var square_7 = columns[newColIndex] + newRow;
            if (all_pieces_square.includes(square_7)) {
                var piece_bloquante = exports.retrieve_piece_by_square(board, square_7);
                if (typeof (piece_bloquante) === "number") {
                    throw ("le board ne correspond pas à la réalité");
                }
                if (exports.retrieve_piece_color(piece_bloquante) !== color) {
                    all_displacement.push(square_7);
                }
            }
            else {
                all_displacement.push(square_7);
            }
        }
    }
    return all_displacement;
};
var handleDiagonalMove = function (column, row, colIncrement, rowIncrement, columns, rows, all_pieces_square, board, color) {
    var all_displacement = [];
    var columnIndexStart = columns.indexOf(column);
    var rowIndexStart = rows.indexOf(row);
    for (var i = 1; i <= rows.length; i++) {
        var colIndex = columnIndexStart + colIncrement * i;
        var rowIndex = rowIndexStart + rowIncrement * i;
        if (colIndex >= 0 && colIndex < columns.length && rowIndex >= 0 && rowIndex < rows.length) {
            var square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)) {
                var piece_bloquante = exports.retrieve_piece_by_square(board, square);
                if (typeof piece_bloquante === "number") {
                    throw new error_class_1.BoardError("le board ne correspond pas à la réalité");
                }
                if (exports.retrieve_piece_color(piece_bloquante) !== color) {
                    all_displacement.push(square);
                }
                break;
            }
            else {
                all_displacement.push(square);
            }
        }
        else {
            break;
        }
    }
    return all_displacement;
};
exports.bishop_deplacement = function (parameters, square, all_pieces_square, color, board) {
    var row = square[1];
    var column = square[0];
    var columns = parameters.columns, rows = parameters.rows;
    var all_displacement = [];
    all_displacement = all_displacement.concat(handleDiagonalMove(column, row, 1, 1, columns, rows, all_pieces_square, board, color), // Diagonale 1
    handleDiagonalMove(column, row, -1, 1, columns, rows, all_pieces_square, board, color), // Diagonale 2
    handleDiagonalMove(column, row, -1, -1, columns, rows, all_pieces_square, board, color), // Diagonale 3
    handleDiagonalMove(column, row, 1, -1, columns, rows, all_pieces_square, board, color) // Diagonale 4
    );
    return all_displacement;
};
var handleRookLineMove = function (colIncrement, rowIncrement, column, row, columns, rows, all_pieces_square, board, color) {
    var all_displacement = [];
    var columnIndexStart = columns.indexOf(column);
    var rowIndexStart = rows.indexOf(row);
    for (var i = 1; i <= rows.length; i++) {
        var colIndex = columnIndexStart + colIncrement * i;
        var rowIndex = rowIndexStart + rowIncrement * i;
        if (colIndex >= 0 && colIndex < columns.length && rowIndex >= 0 && rowIndex < rows.length) {
            var square = columns[colIndex] + rows[rowIndex];
            if (all_pieces_square.includes(square)) {
                var piece_bloquante = exports.retrieve_piece_by_square(board, square);
                if (typeof piece_bloquante === "number") {
                    throw new error_class_1.BoardError("le board ne correspond pas à la réalité");
                }
                if (exports.retrieve_piece_color(piece_bloquante) !== color) {
                    all_displacement.push(square);
                }
                break;
            }
            else {
                all_displacement.push(square);
            }
        }
        else {
            break;
        }
    }
    return all_displacement;
};
exports.rook_deplacement = function (parameters, piece_square, all_pieces_square, color, board) {
    var row = piece_square[1];
    var column = piece_square[0];
    var columns = parameters.columns, rows = parameters.rows;
    var all_displacement = [];
    try {
        all_displacement = all_displacement.concat(handleRookLineMove(1, 0, column, row, columns, rows, all_pieces_square, board, color), // Ligne 1: augmentant la colonne
        handleRookLineMove(-1, 0, column, row, columns, rows, all_pieces_square, board, color), // Ligne 2: diminuant la colonne
        handleRookLineMove(0, -1, column, row, columns, rows, all_pieces_square, board, color), // Ligne 3: diminuant la ligne
        handleRookLineMove(0, 1, column, row, columns, rows, all_pieces_square, board, color) // Ligne 4: augmentant la ligne
        );
        return all_displacement;
    }
    catch (error) {
        console.error(error);
        throw new error_class_1.BoardError("error during rook displacement : " + error);
    }
};
exports.queen_deplacement = function (parameters, square, all_pieces_square, color, board) {
    var rook_squares = exports.rook_deplacement(parameters, square, all_pieces_square, color, board);
    var bishop_squares = exports.bishop_deplacement(parameters, square, all_pieces_square, color, board);
    var uniqueValues = new Set(__spreadArrays(rook_squares, bishop_squares));
    // Convertir le Set en tableau
    var all_displacement = Array.from(uniqueValues);
    return all_displacement;
};
exports.king_deplacement = function (parameters, square, all_pieces_square, color, board) {
    var row = square[1];
    var column = square[0];
    var columns = parameters.columns;
    var rows = parameters.rows;
    var all_displacement = [];
    try {
        // Les positions relatives possibles pour le roi
        var kingMoves = [
            { col: 0, row: 1 },
            { col: 1, row: 1 },
            { col: 1, row: 0 },
            { col: 1, row: -1 },
            { col: 0, row: -1 },
            { col: -1, row: -1 },
            { col: -1, row: 0 },
            { col: -1, row: 1 },
        ];
        for (var _i = 0, kingMoves_1 = kingMoves; _i < kingMoves_1.length; _i++) {
            var move = kingMoves_1[_i];
            var newColIndex = columns.indexOf(column) + move.col;
            var newRow = parseInt(row) + move.row;
            if (newColIndex >= 0 &&
                newColIndex < columns.length &&
                newRow >= 1 &&
                newRow <= rows.length) {
                var square_8 = columns[newColIndex] + newRow;
                if (all_pieces_square.includes(square_8)) {
                    var piece_bloquante = exports.retrieve_piece_by_square(board, square_8);
                    if (typeof (piece_bloquante) === "number") {
                        throw ("le board ne correspond pas à la réalité");
                    }
                    if (exports.retrieve_piece_color(piece_bloquante) !== color) {
                        all_displacement.push(square_8);
                    }
                }
                else {
                    all_displacement.push(square_8);
                }
            }
        }
        return all_displacement;
    }
    catch (error) {
        console.error(error);
        return all_displacement;
    }
};
exports.all_piece_square = function (board) {
    var all_pieces_square = [];
    var pieces = document.querySelectorAll('.piece');
    for (var _i = 0, _a = Object.values(board); _i < _a.length; _i++) {
        var position = _a[_i];
        all_pieces_square.push(position);
    }
    return all_pieces_square;
};
exports.retrieve_piece_by_square = function (board, square) {
    for (var _i = 0, _a = Object.entries(board); _i < _a.length; _i++) {
        var _b = _a[_i], piece = _b[0], position = _b[1];
        if (position === square) {
            return piece;
        }
    }
    console.error("le board ne correspond pas à la réalité"); // important, ce cas ne doit pas se produire
    throw new error_class_1.BoardError("le board ne correspond pas à la réalité");
};
