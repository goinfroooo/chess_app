import { all_piece_square, all_rules_displacement, downlight_square, highlight_square, retrieve_piece_color, retrieve_piece_type } from "./view_piece_deplacement";
import { BoardError,CriticalError } from "./error_class";
import { Parameters,Board } from "./interface";
let pieceClicked = "";//Pas utile ?


export function initMakeDeplacement(initialPieceClicked:string) {
  pieceClicked = initialPieceClicked;
  // Autre initialisation si nécessaire
}

export const check_deplacement = (parameters: Parameters, piece_clicked: string, pieces_positions: Board, event: MouseEvent) => {
  const target = event.target as HTMLElement;
  
  if (target?.dataset?.highlighted === "false") {
    return { "status": -2, "board": pieces_positions } // On ne peut pas bouger sur des cases non highlightées
  }

  let color = retrieve_piece_color(piece_clicked);
  let piece_type = retrieve_piece_type(piece_clicked);
  let square_to_move = target.id;
  let actual_board = { ...pieces_positions };

  // Assurez-vous que piece_clicked est de type keyof Board
  if (!(piece_clicked in pieces_positions)) {
    throw new Error("Piece clicked is not a valid key of Board");
  }

  let new_board = simulate_deplacement(piece_clicked as keyof Board, square_to_move, pieces_positions);

  // On check les échecs au roi
  let king_square = (color === "black") ? new_board["black-king"] : new_board["white-king"];

  for (const [piece, square] of Object.entries(new_board)) {
    if (retrieve_piece_color(piece) !== color) {
      let opposite_color = retrieve_piece_color(piece);
      let opposite_piece_type = retrieve_piece_type(piece);
      let all_displacement = all_rules_displacement(parameters, square, opposite_piece_type, opposite_color, new_board);
      if (all_displacement.includes(king_square)) {
        console.log("Déplacement illégal : ", piece, " peut prendre le roi");
        warn_illegal_deplacement(square);

        return { "status": -1, "board": actual_board }
      }
    }
  }
  console.log("Déplacement autorisé");
  return { "status": 0, "board": new_board };
}



export type BoardKey = keyof Board;

export const simulate_deplacement = (piece_clicked: BoardKey, square_to_move: string, pieces_positions: Board): Board => {
    let board: Board = { ...pieces_positions };

    for (const [piece, square] of Object.entries(board)) {
        if (square_to_move === square) {
            delete board[piece as BoardKey];
        }
    }
    board[piece_clicked] = square_to_move;
    return board;
}


export const warn_illegal_deplacement = (square:string) => {

// Créer un contexte audio
let audioContext = new window.AudioContext();
let oscillator = audioContext.createOscillator();

oscillator.frequency.value = 220;
oscillator.connect(audioContext.destination);
oscillator.start();

downlight_square();//just to be sure
highlight_square([square]);//La fonction attent un tableau a la base

// Mettre une pause avant d'arrêter l'oscillateur
setTimeout(function() {
    // Arrêter l'oscillateur
    oscillator.stop();
    downlight_square();
}, 1000); // Mettre une pause de 1 seconde (1000 millisecondes) avant d'arrêter l'oscillateur

}

export const check_endgame =(parameters:Parameters, board:Board,trait:string) => {

  let opposite_color = trait==="white" ? "black" : "white" //on change le trait
  
  let mat = check_mat (parameters, board,trait);
  let check = check_check (parameters, board,trait);

  console.log ("mat : ",mat," échec adverse : ",check);

    
  if (mat && check) {
    alert ("fin de partie : victoire des "+opposite_color+" par échec et mat")
    return 1;
  }

  else if (mat) {
    alert ("fin de partie : nulle par pat");
    return 2;
  }

  else {
    return 0;
  }

  return -1; //En cas d'erreur

}

export const check_mat = (parameters: Parameters, board: Board, trait: string): boolean => {
  for (const [piece, square] of Object.entries(board)) {
      if (retrieve_piece_color(piece) === trait) { // Parcourir toutes les pièces du trait
          let piece_type = retrieve_piece_type(piece);
          let all_displacement = all_rules_displacement(parameters, square, piece_type, trait, board);

          let check = false;

          for (let square_to_move of all_displacement) { // Vérifier tous les déplacements de chaque pièce
              let new_board = simulate_deplacement(piece as keyof Board, square_to_move, board);
              let king_square = (trait === "black") ? new_board["black-king"] : new_board["white-king"];
              if (piece_type === "king") {
                  console.log(all_displacement, new_board, king_square);
              }
              check = false;
              for (const [piece2, square2] of Object.entries(new_board)) {
                  if (retrieve_piece_color(piece2) !== trait) {
                      let opposite_color = retrieve_piece_color(piece2);
                      let opposite_piece_type = retrieve_piece_type(piece2);
                      let all_displacement2 = all_rules_displacement(parameters, square2, opposite_piece_type, opposite_color, new_board);
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
}


export const check_check =(parameters:Parameters, board:Board,trait:string) => {

  let check = false;
  let king_square = (trait==="black") ? board["black-king"] : board["white-king"];
  for (const [piece,square] of Object.entries(board)) {
    if (retrieve_piece_color(piece)!==trait) {
      let opposite_color = retrieve_piece_color(piece);
      let opposite_piece_type = retrieve_piece_type (piece) ;
      let all_displacement = all_rules_displacement (parameters,square,opposite_piece_type,opposite_color,board);
      if (all_displacement.includes(king_square)){
        console.log (piece," can eat king on ",king_square);
        check=true;
      }
    }
  }

  return check;

}
