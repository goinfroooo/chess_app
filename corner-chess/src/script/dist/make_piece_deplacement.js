"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.check_check = exports.check_mat = exports.check_endgame = exports.warn_illegal_deplacement = exports.simulate_deplacement = exports.check_deplacement = exports.initMakeDeplacement = void 0;
var view_piece_deplacement_1 = require("./view_piece_deplacement");
var pieceClicked = ""; //Pas utile ?
function initMakeDeplacement(initialPieceClicked) {
    pieceClicked = initialPieceClicked;
    // Autre initialisation si nécessaire
}
exports.initMakeDeplacement = initMakeDeplacement;
exports.check_deplacement = function (parameters, piece_clicked, pieces_positions, event) {
    var _a;
    var target = event.target;
    if (((_a = target === null || target === void 0 ? void 0 : target.dataset) === null || _a === void 0 ? void 0 : _a.highlighted) === "false") {
        return { "status": -2, "board": pieces_positions }; // On ne peut pas bouger sur des cases non highlightées
    }
    var color = view_piece_deplacement_1.retrieve_piece_color(piece_clicked);
    var piece_type = view_piece_deplacement_1.retrieve_piece_type(piece_clicked);
    var square_to_move = target.id;
    var actual_board = __assign({}, pieces_positions);
    // Assurez-vous que piece_clicked est de type keyof Board
    if (!(piece_clicked in pieces_positions)) {
        throw new Error("Piece clicked is not a valid key of Board");
    }
    var new_board = exports.simulate_deplacement(piece_clicked, square_to_move, pieces_positions);
    // On check les échecs au roi
    var king_square = (color === "black") ? new_board["black-king"] : new_board["white-king"];
    for (var _i = 0, _b = Object.entries(new_board); _i < _b.length; _i++) {
        var _c = _b[_i], piece = _c[0], square = _c[1];
        if (view_piece_deplacement_1.retrieve_piece_color(piece) !== color) {
            var opposite_color = view_piece_deplacement_1.retrieve_piece_color(piece);
            var opposite_piece_type = view_piece_deplacement_1.retrieve_piece_type(piece);
            var all_displacement = view_piece_deplacement_1.all_rules_displacement(parameters, square, opposite_piece_type, opposite_color, new_board);
            if (all_displacement.includes(king_square)) {
                console.log("Déplacement illégal : ", piece, " peut prendre le roi");
                exports.warn_illegal_deplacement(square);
                return { "status": -1, "board": actual_board };
            }
        }
    }
    console.log("Déplacement autorisé");
    return { "status": 0, "board": new_board };
};
exports.simulate_deplacement = function (piece_clicked, square_to_move, pieces_positions) {
    var board = __assign({}, pieces_positions);
    for (var _i = 0, _a = Object.entries(board); _i < _a.length; _i++) {
        var _b = _a[_i], piece = _b[0], square = _b[1];
        if (square_to_move === square) {
            delete board[piece];
        }
    }
    board[piece_clicked] = square_to_move;
    return board;
};
exports.warn_illegal_deplacement = function (square) {
    // Créer un contexte audio
    var audioContext = new window.AudioContext();
    var oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 220;
    oscillator.connect(audioContext.destination);
    oscillator.start();
    view_piece_deplacement_1.downlight_square(); //just to be sure
    view_piece_deplacement_1.highlight_square([square]); //La fonction attent un tableau a la base
    // Mettre une pause avant d'arrêter l'oscillateur
    setTimeout(function () {
        // Arrêter l'oscillateur
        oscillator.stop();
        view_piece_deplacement_1.downlight_square();
    }, 1000); // Mettre une pause de 1 seconde (1000 millisecondes) avant d'arrêter l'oscillateur
};
exports.check_endgame = function (parameters, board, trait) {
    var opposite_color = trait === "white" ? "black" : "white"; //on change le trait
    var mat = exports.check_mat(parameters, board, trait);
    var check = exports.check_check(parameters, board, trait);
    console.log("mat : ", mat, " échec adverse : ", check);
    if (mat && check) {
        alert("fin de partie : victoire des " + opposite_color + " par échec et mat");
        return 1;
    }
    else if (mat) {
        alert("fin de partie : nulle par pat");
        return 2;
    }
    else {
        return 0;
    }
    return -1; //En cas d'erreur
};
exports.check_mat = function (parameters, board, trait) {
    for (var _i = 0, _a = Object.entries(board); _i < _a.length; _i++) {
        var _b = _a[_i], piece = _b[0], square = _b[1];
        if (view_piece_deplacement_1.retrieve_piece_color(piece) === trait) { // Parcourir toutes les pièces du trait
            var piece_type = view_piece_deplacement_1.retrieve_piece_type(piece);
            var all_displacement = view_piece_deplacement_1.all_rules_displacement(parameters, square, piece_type, trait, board);
            var check = false;
            for (var _c = 0, all_displacement_1 = all_displacement; _c < all_displacement_1.length; _c++) { // Vérifier tous les déplacements de chaque pièce
                var square_to_move = all_displacement_1[_c];
                var new_board = exports.simulate_deplacement(piece, square_to_move, board);
                var king_square = (trait === "black") ? new_board["black-king"] : new_board["white-king"];
                if (piece_type === "king") {
                    console.log(all_displacement, new_board, king_square);
                }
                check = false;
                for (var _d = 0, _e = Object.entries(new_board); _d < _e.length; _d++) {
                    var _f = _e[_d], piece2 = _f[0], square2 = _f[1];
                    if (view_piece_deplacement_1.retrieve_piece_color(piece2) !== trait) {
                        var opposite_color = view_piece_deplacement_1.retrieve_piece_color(piece2);
                        var opposite_piece_type = view_piece_deplacement_1.retrieve_piece_type(piece2);
                        var all_displacement2 = view_piece_deplacement_1.all_rules_displacement(parameters, square2, opposite_piece_type, opposite_color, new_board);
                        if (all_displacement2.includes(king_square)) {
                            console.warn(king_square);
                            check = true;
                        }
                    }
                }
                if (!check) {
                    console.log(square_to_move);
                    console.log(piece, "from", square, "to", square_to_move, "can counter check");
                    return false; // On peut bouger donc pas de mat
                }
            }
        }
    }
    return true; // On est mat
};
exports.check_check = function (parameters, board, trait) {
    var check = false;
    var king_square = (trait === "black") ? board["black-king"] : board["white-king"];
    for (var _i = 0, _a = Object.entries(board); _i < _a.length; _i++) {
        var _b = _a[_i], piece = _b[0], square = _b[1];
        if (view_piece_deplacement_1.retrieve_piece_color(piece) !== trait) {
            var opposite_color = view_piece_deplacement_1.retrieve_piece_color(piece);
            var opposite_piece_type = view_piece_deplacement_1.retrieve_piece_type(piece);
            var all_displacement = view_piece_deplacement_1.all_rules_displacement(parameters, square, opposite_piece_type, opposite_color, board);
            if (all_displacement.includes(king_square)) {
                console.log(piece, " can eat king on ", king_square);
                check = true;
            }
        }
    }
    return check;
};
