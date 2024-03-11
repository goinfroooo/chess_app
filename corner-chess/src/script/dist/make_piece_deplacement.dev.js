"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMakeDeplacement = initMakeDeplacement;
exports.check_check = exports.check_mat = exports.check_endgame = exports.warn_illegal_deplacement = exports.simulate_deplacement = exports.check_deplacement = void 0;

var _view_piece_deplacement = require("./view_piece_deplacement");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//On a besoin de quelques fonctions deja definie. Peut etre resegmenter les fichiers et créer un script "utilitaire" ?
var pieceClicked = ""; //Pas utile ?

function initMakeDeplacement(initialPieceClicked) {
  pieceClicked = initialPieceClicked; // Autre initialisation si nécessaire
}

var check_deplacement = function check_deplacement(parameters, piece_clicked, pieces_positions, event) {
  if (event.target.dataset.highlighted === "false") {
    return {
      "status": -2,
      "board": pieces_positions
    }; //On ne peux pas bouger sur des cases non highlited
  }

  var color = (0, _view_piece_deplacement.retrieve_piece_color)(piece_clicked);
  var piece_type = (0, _view_piece_deplacement.retrieve_piece_type)(piece_clicked);
  var square_to_move = event.target.id;

  var actual_board = _objectSpread({}, pieces_positions);

  var new_board = simulate_deplacement(piece_clicked, square_to_move, pieces_positions); //On check les échecs au roi

  var king_square = color === "black" ? new_board["black-king"] : new_board["white-king"];

  for (var _i = 0, _Object$entries = Object.entries(new_board); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        piece = _Object$entries$_i[0],
        square = _Object$entries$_i[1];

    if ((0, _view_piece_deplacement.retrieve_piece_color)(piece) !== color) {
      var opposite_color = (0, _view_piece_deplacement.retrieve_piece_color)(piece);
      var opposite_piece_type = (0, _view_piece_deplacement.retrieve_piece_type)(piece);
      var all_displacement = (0, _view_piece_deplacement.all_rules_displacement)(parameters, square, opposite_piece_type, opposite_color, new_board);

      if (all_displacement.includes(king_square)) {
        console.log("deplacement illegale : ", piece, " can take king");
        warn_illegal_deplacement(square);
        return {
          "status": -1,
          "board": actual_board
        };
      }
    }
  }

  console.log("deplacement autorisé");
  return {
    "status": 0,
    "board": new_board
  };
};

exports.check_deplacement = check_deplacement;

var simulate_deplacement = function simulate_deplacement(piece_clicked, square_to_move, pieces_positions) {
  var board = _objectSpread({}, pieces_positions);

  for (var _i2 = 0, _Object$entries2 = Object.entries(board); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        piece = _Object$entries2$_i[0],
        square = _Object$entries2$_i[1];

    if (square_to_move === square) {
      //Ca s'appuie sur le fait que le déplaement est permis
      delete board[piece];
    }
  }

  board[piece_clicked] = square_to_move; //console.log("simulated_board",board);

  return board;
};

exports.simulate_deplacement = simulate_deplacement;

var warn_illegal_deplacement = function warn_illegal_deplacement(square) {
  // Créer un contexte audio
  var audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Créer un oscillateur (pour générer le son)

  var oscillator = audioContext.createOscillator(); // Définir la fréquence du son (440 Hz pour un La)

  oscillator.frequency.value = 220; // Connecter l'oscillateur à la sortie audio

  oscillator.connect(audioContext.destination); // Démarrer l'oscillateur

  oscillator.start();
  (0, _view_piece_deplacement.downlight_square)();
  var test = [square];
  (0, _view_piece_deplacement.highlight_square)(test); //La fonction attent un tableau a la base
  // Mettre une pause avant d'arrêter l'oscillateur

  setTimeout(function () {
    // Arrêter l'oscillateur
    oscillator.stop();
    (0, _view_piece_deplacement.downlight_square)();
  }, 1000); // Mettre une pause de 1 seconde (1000 millisecondes) avant d'arrêter l'oscillateur
};

exports.warn_illegal_deplacement = warn_illegal_deplacement;

var check_endgame = function check_endgame(parameters, board, trait) {
  var opposite_color = trait === "white" ? "black" : "white"; //on change le trait

  var mat = check_mat(parameters, board, trait);
  var check = check_check(parameters, board, trait);
  console.log("mat : ", mat, " échec adverse : ", check);

  if (mat && check) {
    alert("fin de partie : victoire des " + opposite_color + " par échec et mat");
    return 1;
  } else if (mat) {
    alert("fin de partie : nulle par pat");
    return 2;
  } else {
    return 0;
  }

  return -1; //En cas d'erreur
};

exports.check_endgame = check_endgame;

var check_mat = function check_mat(parameters, board, trait) {
  for (var _i3 = 0, _Object$entries3 = Object.entries(board); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
        piece = _Object$entries3$_i[0],
        square = _Object$entries3$_i[1];

    if ((0, _view_piece_deplacement.retrieve_piece_color)(piece) === trait) {
      //Parcourir toute les pieces du trait
      var piece_type = (0, _view_piece_deplacement.retrieve_piece_type)(piece);
      var all_displacement = (0, _view_piece_deplacement.all_rules_displacement)(parameters, square, piece_type, trait, board);
      var check = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = all_displacement[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var square_to_move = _step.value;
          // Checker tous les deplacement de chaque piece
          var new_board = simulate_deplacement(piece, square_to_move, board);
          var king_square = trait === "black" ? new_board["black-king"] : new_board["white-king"];

          if (piece_type === "king") {
            console.log(all_displacement, new_board, king_square);
          }

          check = false;

          for (var _i4 = 0, _Object$entries4 = Object.entries(new_board); _i4 < _Object$entries4.length; _i4++) {
            var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
                piece2 = _Object$entries4$_i[0],
                square2 = _Object$entries4$_i[1];

            if ((0, _view_piece_deplacement.retrieve_piece_color)(piece2) !== trait) {
              var opposite_color = (0, _view_piece_deplacement.retrieve_piece_color)(piece2);
              var opposite_piece_type = (0, _view_piece_deplacement.retrieve_piece_type)(piece2);
              var all_displacement2 = (0, _view_piece_deplacement.all_rules_displacement)(parameters, square2, opposite_piece_type, opposite_color, new_board);

              if (all_displacement2.includes(king_square)) {
                console.warn(king_square);
                check = true;
              }
            }
          }

          if (!check) {
            console.log(square_to_move);
            console.log(piece, " from ", square, " to ", square_to_move, "can counter check");
            return check; //on peut bouger donc pas de mat
          }
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
    }
  }

  return true; //On est mat
};

exports.check_mat = check_mat;

var check_check = function check_check(parameters, board, trait) {
  var check = false;
  var king_square = trait === "black" ? board["black-king"] : board["white-king"];

  for (var _i5 = 0, _Object$entries5 = Object.entries(board); _i5 < _Object$entries5.length; _i5++) {
    var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
        piece = _Object$entries5$_i[0],
        square = _Object$entries5$_i[1];

    if ((0, _view_piece_deplacement.retrieve_piece_color)(piece) !== trait) {
      var opposite_color = (0, _view_piece_deplacement.retrieve_piece_color)(piece);
      var opposite_piece_type = (0, _view_piece_deplacement.retrieve_piece_type)(piece);
      var all_displacement = (0, _view_piece_deplacement.all_rules_displacement)(parameters, square, opposite_piece_type, opposite_color, board);

      if (all_displacement.includes(king_square)) {
        console.log(piece, " can eat king on ", king_square);
        check = true;
      }
    }
  }

  return check;
};

exports.check_check = check_check;