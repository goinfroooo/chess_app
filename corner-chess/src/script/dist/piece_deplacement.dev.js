"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all_piece_square = exports.check_loop = exports.king_deplacement = exports.queen_deplacement = exports.rook_deplacement = exports.bishop_deplacement = exports.knight_deplacement = exports.black_pawn_deplacement = exports.white_pawn_deplacement = exports.highlight_square = exports.all_rules_displacement = exports.convert_position_to_square = exports.retrieve_piece_position = exports.retrieve_piece_color = exports.retrieve_piece_type = exports.view_move = void 0;

var colision = _interopRequireWildcard(require("./piece_colision"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var view_move = function view_move(parameters, event) {
  all_piece_square(parameters);
  var target = event.target;
  var piece_type = retrieve_piece_type(parameters, target.id);
  var piece_color = retrieve_piece_color(parameters, target.id);
  var position = retrieve_piece_position(parameters, target);
  var square = convert_position_to_square(parameters, position);
  var all_displacement = all_rules_displacement(parameters, square, piece_type, piece_color);
  var colisioned_deplacement = colision.check_colision(parameters, square, piece_type, all_displacement);
  highlight_square(parameters, all_displacement);
};

exports.view_move = view_move;

var retrieve_piece_type = function retrieve_piece_type(parameters, piece_id) {
  var piece_type = piece_id.split("-")[1];
  piece_type = piece_type.replace(/\d/g, ''); //On récupère le type de pièce

  if (piece_type === "pawn") {
    return piece_id.replace(/\d/g, '');
  } else {
    return piece_type;
  }
};

exports.retrieve_piece_type = retrieve_piece_type;

var retrieve_piece_color = function retrieve_piece_color(parameters, piece_id) {
  var piece_type = piece_id.split("-")[0];
  return piece_type;
};

exports.retrieve_piece_color = retrieve_piece_color;

var retrieve_piece_position = function retrieve_piece_position(parameters, target) {
  var computedStyle = window.getComputedStyle(target);
  var top = computedStyle.getPropertyValue("top"); // recupere "200px" par exemple

  var left = computedStyle.getPropertyValue("left");
  var position = {
    top: parseInt(top.slice(0, -2)),
    //pour enlever le px et convertir en int
    left: parseInt(left.slice(0, -2))
  };
  return position;
};

exports.retrieve_piece_position = retrieve_piece_position;

var convert_position_to_square = function convert_position_to_square(parameters, position) {
  var row = parameters.rows[(parameters.board_height - position.top) / parameters.piece_height - 1];
  var column = parameters.columns[position.left / parameters.piece_height];
  var square = column + row; //console.log ("square : ",square);

  return square;
};

exports.convert_position_to_square = convert_position_to_square;

var all_rules_displacement = function all_rules_displacement(parameters, square, type_piece, piece_color) {
  var all_displacement = [];
  var all_pieces_square = colision.all_piece_square(parameters);

  if (type_piece === 'white-pawn') {
    all_displacement = white_pawn_deplacement(parameters, square, all_pieces_square, piece_color);
  } else if (type_piece === 'black-pawn') {
    all_displacement = black_pawn_deplacement(parameters, square, all_pieces_square, piece_color);
  } else if (type_piece === 'rook') {
    all_displacement = rook_deplacement(parameters, square, all_pieces_square, piece_color);
  } else if (type_piece === 'bishop') {
    all_displacement = bishop_deplacement(parameters, square, all_pieces_square, piece_color);
  } else if (type_piece === 'knight') {
    all_displacement = knight_deplacement(parameters, square);
  } else if (type_piece === 'queen') {
    all_displacement = queen_deplacement(parameters, square, all_pieces_square, piece_color);
  } else if (type_piece === 'king') {
    all_displacement = king_deplacement(parameters, square, all_pieces_square, piece_color);
  } else {
    // Cas par défaut ou erreur
    console.error('Type de pièce non reconnu : ', type_piece);
  }

  console.log(all_displacement);
  return all_displacement;
};

exports.all_rules_displacement = all_rules_displacement;

var highlight_square = function highlight_square(parameters, square_to_highlight) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = square_to_highlight[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var square = _step.value;
      var squareElement = document.getElementById(square);
      squareElement.style.backgroundColor = "red";
      squareElement.style.opacity = "50%";
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

exports.highlight_square = highlight_square;

var white_pawn_deplacement = function white_pawn_deplacement(parameters, square, all_pieces_square, color) {
  var row = square[1];
  var column = square[0];
  var columns = parameters.columns;
  var rows = parameters.rows;
  var all_displacement = [];
  var column_index = columns.indexOf(column);
  var row_index = rows.indexOf(row);

  if (column_index != 0) {
    var _square = columns[column_index - 1] + row;

    console.log(_square);

    if (all_pieces_square.includes(_square)) {
      var piece_bloquante = document.querySelector('i[data-square=' + _square + ']').id;

      if (piece_bloquante.split("-")[0] !== color) {
        all_displacement.push(_square);
      }
    } else {
      all_displacement.push(_square);
    }
  }

  if (row_index != rows.length) {
    var _square2 = column + rows[row_index + 1];

    console.log(_square2);

    if (all_pieces_square.includes(_square2)) {
      var piece_bloquante = document.querySelector('i[data-square=' + _square2 + ']').id;

      if (piece_bloquante.split("-")[0] !== color) {
        all_displacement.push(_square2);
      }
    } else {
      all_displacement.push(_square2);
    }
  }

  if (column_index != 0 && row_index != rows.length) {
    var _square3 = columns[column_index - 1] + rows[row_index + 1];

    console.log(_square3);

    if (all_pieces_square.includes(_square3)) {
      var piece_bloquante = document.querySelector('i[data-square=' + _square3 + ']').id;

      if (piece_bloquante.split("-")[0] !== color) {
        all_displacement.push(_square3);
      }
    }
  }

  console.log(all_displacement);
  return all_displacement;
};

exports.white_pawn_deplacement = white_pawn_deplacement;

var black_pawn_deplacement = function black_pawn_deplacement(parameters, square, all_pieces_square, color) {
  console.log(square);
  var row = square[1];
  var column = square[0];
  var columns = parameters.columns;
  var rows = parameters.rows;
  var all_displacement = [];
  var column_index = columns.indexOf(column);
  var row_index = rows.indexOf(row);

  if (column_index != columns.length) {
    var _square4 = columns[column_index + 1] + row;

    if (all_pieces_square.includes(_square4)) {
      var piece_bloquante = document.querySelector('i[data-square=' + _square4 + ']').id;

      if (piece_bloquante.split("-")[0] !== color) {
        all_displacement.push(_square4);
      }
    } else {
      all_displacement.push(_square4);
    }
  }

  if (row_index != 0) {
    var _square5 = column + rows[row_index - 1];

    if (all_pieces_square.includes(_square5)) {
      var piece_bloquante = document.querySelector('i[data-square=' + _square5 + ']').id;

      if (piece_bloquante.split("-")[0] !== color) {
        all_displacement.push(_square5);
      }
    } else {
      all_displacement.push(_square5);
    }
  }

  if (column_index != columns.length && row_index != 0) {
    var _square6 = columns[column_index + 1] + rows[row_index - 1];

    if (all_pieces_square.includes(_square6)) {
      var piece_bloquante = document.querySelector('i[data-square=' + _square6 + ']').id;

      if (piece_bloquante.split("-")[0] !== color) {
        all_displacement.push(_square6);
      }
    }
  }

  console.log(all_displacement);
  return all_displacement;
};

exports.black_pawn_deplacement = black_pawn_deplacement;

var knight_deplacement = function knight_deplacement(parameters, square) {
  var row = square[1];
  var column = square[0];
  var columns = parameters.columns;
  var rows = parameters.rows;
  var all_displacement = [];
  var knightMoves = [{
    col: 1,
    row: 2
  }, {
    col: 2,
    row: 1
  }, {
    col: 2,
    row: -1
  }, {
    col: 1,
    row: -2
  }, {
    col: -1,
    row: -2
  }, {
    col: -2,
    row: -1
  }, {
    col: -2,
    row: 1
  }, {
    col: -1,
    row: 2
  }];

  for (var _i = 0, _knightMoves = knightMoves; _i < _knightMoves.length; _i++) {
    var move = _knightMoves[_i];
    var newColIndex = columns.indexOf(column) + move.col;
    var newRow = parseInt(row) + move.row;

    if (newColIndex >= 0 && newColIndex < columns.length && newRow >= 1 && newRow <= rows.length) {
      all_displacement.push(columns[newColIndex] + newRow);
    }
  }

  return all_displacement;
};

exports.knight_deplacement = knight_deplacement;

var bishop_deplacement = function bishop_deplacement(parameters, piece_square, all_pieces_square, color) {
  console.log(color);
  var row = piece_square[1];
  var column = piece_square[0];
  var columns = parameters.columns;
  var rows = parameters.rows;
  var all_displacement = []; // Diagonale 1: En augmentant la colonne et la ligne

  for (var i = 1; i <= rows.length; i++) {
    var colIndex = columns.indexOf(column) + i;
    var rowIndex = rows.indexOf(row) + i;

    if (colIndex < columns.length && rowIndex < rows.length) {
      var square = columns[colIndex] + rows[rowIndex];

      if (all_pieces_square.includes(square)) {
        var piece_bloquante = document.querySelector('i[data-square=' + square + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(square);
        }

        break;
      } else {
        all_displacement.push(square);
      }
    } else {
      break;
    }
  } // Diagonale 2: En diminuant la colonne et la ligne


  for (var _i2 = 1; _i2 <= rows.length; _i2++) {
    var _colIndex = columns.indexOf(column) - _i2;

    var _rowIndex = rows.indexOf(row) + _i2;

    if (_colIndex >= 0 && _rowIndex < rows.length) {
      var _square7 = columns[_colIndex] + rows[_rowIndex];

      if (all_pieces_square.includes(_square7)) {
        var piece_bloquante = document.querySelector('i[data-square=' + _square7 + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(_square7);
        }

        break;
      } else {
        all_displacement.push(_square7);
      }
    } else {
      break;
    }
  } // Diagonale 3: En diminuant la colonne et la ligne


  for (var _i3 = 1; _i3 <= rows.length; _i3++) {
    var _colIndex2 = columns.indexOf(column) - _i3;

    var _rowIndex2 = rows.indexOf(row) - _i3;

    if (_colIndex2 >= 0 && _rowIndex2 >= 0) {
      var _square8 = columns[_colIndex2] + rows[_rowIndex2];

      if (all_pieces_square.includes(_square8)) {
        var piece_bloquante = document.querySelector('i[data-square=' + _square8 + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(_square8);
        }

        break;
      } else {
        all_displacement.push(_square8);
      }
    } else {
      break;
    }
  } // Diagonale 4: En augmentant la colonne et en diminuant la ligne


  for (var _i4 = 1; _i4 <= rows.length; _i4++) {
    var _colIndex3 = columns.indexOf(column) + _i4;

    var _rowIndex3 = rows.indexOf(row) - _i4;

    if (_colIndex3 < columns.length && _rowIndex3 >= 0) {
      var _square9 = columns[_colIndex3] + rows[_rowIndex3];

      if (all_pieces_square.includes(_square9)) {
        var piece_bloquante = document.querySelector('i[data-square=' + _square9 + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(_square9);
        }

        break;
      } else {
        all_displacement.push(_square9);
      }
    } else {
      break;
    }
  }

  return all_displacement;
};

exports.bishop_deplacement = bishop_deplacement;

var rook_deplacement = function rook_deplacement(parameters, piece_square, all_pieces_square, color) {
  console.log(color);
  var row = piece_square[1];
  var column = piece_square[0];
  var columns = parameters.columns;
  var rows = parameters.rows;
  var all_displacement = []; //ligne 1

  for (var i = 1; i <= rows.length; i++) {
    var colIndex = columns.indexOf(column) + i;
    var rowIndex = rows.indexOf(row);

    if (colIndex < columns.length) {
      var square = columns[colIndex] + rows[rowIndex];

      if (all_pieces_square.includes(square)) {
        var piece_bloquante = document.querySelector('i[data-square=' + square + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(square);
        }

        break;
      } else {
        all_displacement.push(square);
      }
    } else {
      break;
    }
  } //ligne 2


  for (var _i5 = 1; _i5 <= rows.length; _i5++) {
    var _colIndex4 = columns.indexOf(column) - _i5;

    var _rowIndex4 = rows.indexOf(row);

    if (_colIndex4 >= 0) {
      var _square10 = columns[_colIndex4] + rows[_rowIndex4];

      if (all_pieces_square.includes(_square10)) {
        var piece_bloquante = document.querySelector('i[data-square=' + _square10 + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(_square10);
        }

        break;
      } else {
        all_displacement.push(_square10);
      }
    } else {
      break;
    }
  } //ligne 3


  for (var _i6 = 1; _i6 <= rows.length; _i6++) {
    var _colIndex5 = columns.indexOf(column);

    var _rowIndex5 = rows.indexOf(row) - _i6;

    if (_rowIndex5 >= 0) {
      var _square11 = columns[_colIndex5] + rows[_rowIndex5];

      if (all_pieces_square.includes(_square11)) {
        var piece_bloquante = document.querySelector('i[data-square=' + _square11 + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(_square11);
        }

        break;
      } else {
        all_displacement.push(_square11);
      }
    } else {
      break;
    }
  }

  for (var _i7 = 1; _i7 <= rows.length; _i7++) {
    var _colIndex6 = columns.indexOf(column);

    var _rowIndex6 = rows.indexOf(row) + _i7;

    if (_rowIndex6 < rows.length) {
      var _square12 = columns[_colIndex6] + rows[_rowIndex6];

      if (all_pieces_square.includes(_square12)) {
        var piece_bloquante = document.querySelector('i[data-square=' + _square12 + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(_square12);
        }

        break;
      } else {
        all_displacement.push(_square12);
      }
    } else {
      break;
    }
  }

  return all_displacement;
};

exports.rook_deplacement = rook_deplacement;

var queen_deplacement = function queen_deplacement(parameters, square, all_pieces_square, color) {
  var rook_square = rook_deplacement(parameters, square, all_pieces_square, color);
  var bishop_square = bishop_deplacement(parameters, square, all_pieces_square, color);
  var uniqueValues = new Set([].concat(_toConsumableArray(rook_square), _toConsumableArray(bishop_square))); // Convertir le Set en tableau

  var all_displacement = Array.from(uniqueValues);
  return all_displacement;
};

exports.queen_deplacement = queen_deplacement;

var king_deplacement = function king_deplacement(parameters, square, all_pieces_square, color) {
  var row = square[1];
  var column = square[0];
  var columns = parameters.columns;
  var rows = parameters.rows;
  var all_displacement = []; // Les positions relatives possibles pour le roi

  var kingMoves = [{
    col: 0,
    row: 1
  }, // en haut
  {
    col: 1,
    row: 1
  }, // en haut à droite
  {
    col: 1,
    row: 0
  }, // à droite
  {
    col: 1,
    row: -1
  }, // en bas à droite
  {
    col: 0,
    row: -1
  }, // en bas
  {
    col: -1,
    row: -1
  }, // en bas à gauche
  {
    col: -1,
    row: 0
  }, // à gauche
  {
    col: -1,
    row: 1
  } // en haut à gauche
  ];

  for (var _i8 = 0, _kingMoves = kingMoves; _i8 < _kingMoves.length; _i8++) {
    var move = _kingMoves[_i8];
    var newColIndex = columns.indexOf(column) + move.col;
    var newRow = parseInt(row) + move.row;

    if (newColIndex >= 0 && newColIndex < columns.length && newRow >= 1 && newRow <= rows.length) {
      var _square13 = columns[newColIndex] + newRow;

      if (all_pieces_square.includes(_square13)) {
        var piece_bloquante = document.querySelector('i[data-square=' + _square13 + ']').id;

        if (piece_bloquante.split("-")[0] !== color) {
          all_displacement.push(_square13);
        }
      } else {
        all_displacement.push(_square13);
      }
    }
  }

  return all_displacement;
};

exports.king_deplacement = king_deplacement;

var check_loop = function check_loop(parameters, square) {};

exports.check_loop = check_loop;

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