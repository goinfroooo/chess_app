"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all_piece_square = exports.check_colision = void 0;

var _piece_deplacement = require("./piece_deplacement");

var check_colision = function check_colision(parameters, square, type_piece, all_displacement) {
  var colisioned_displacement = [];

  if (type_piece === 'white-pawn') {} else if (type_piece === 'black-pawn') {} else if (type_piece === 'rook') {} else if (type_piece === 'bishop') {} else if (type_piece === 'knight') {
    colisioned_displacement = all_displacement;
  } else if (type_piece === 'queen') {} else if (type_piece === 'king') {} else {
    // Cas par défaut ou erreur
    console.error('Type de pièce non reconnu : ', type_piece);
  }

  return colisioned_displacement;
};

exports.check_colision = check_colision;

var all_piece_square = function all_piece_square(parameters) {
  var all_pieces_square = [];
  var pieces = document.querySelectorAll('.piece');
  pieces.forEach(function (piece) {
    //console.log(piece);
    var square = piece.getAttribute("data-square");
    all_pieces_square.push(square);
  });
  console.log(all_pieces_square);
  return all_pieces_square;
};

exports.all_piece_square = all_piece_square;