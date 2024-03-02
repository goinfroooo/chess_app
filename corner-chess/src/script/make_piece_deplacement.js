import { all_piece_square, all_rules_displacement, downlight_square, highlight_square, retrieve_piece_color, retrieve_piece_type } from "./view_piece_deplacement";
//On a besoin de quelques fonctions deja definie. Peut etre resegmenter les fichiers et créer un script "utilitaire" ?

let pieceClicked = "";//Pas utile ?


export function initMakeDeplacement(initialPieceClicked) {
  pieceClicked = initialPieceClicked;
  // Autre initialisation si nécessaire
}

export const check_deplacement =(parameters,piece_clicked,pieces_positions, event) => {

    if ((event.target.dataset.highlighted==="false")) {
      return  {"status":-2,"board":pieces_positions} //On ne peux pas bouger sur des cases non highlited
    }
    let color = retrieve_piece_color(piece_clicked);
    let piece_type = retrieve_piece_type (piece_clicked) ;
    let square_to_move = event.target.id;
    let actual_board = {...pieces_positions};
    let new_board = simulate_deplacement (piece_clicked,square_to_move,pieces_positions);

    //On check les échecs au roi
    
    let king_square = (color==="black") ? new_board["black-king"] : new_board["white-king"];
    
    for (const [piece,square] of Object.entries(new_board)) {
      if (retrieve_piece_color(piece)!==color) {
        let opposite_color = retrieve_piece_color(piece);
        let opposite_piece_type = retrieve_piece_type (piece) ;
        let all_displacement = all_rules_displacement (parameters,square,opposite_piece_type,opposite_color,new_board);
        if (all_displacement.includes(king_square)){
          console.log ("deplacement illegale : ",piece, " can take king");
          warn_illegal_deplacement(square);
          
          return {"status":-1,"board":actual_board}
        }
      }
    }
    console.log ("deplacement autorisé");
    return {"status":0,"board":new_board};


}

export const simulate_deplacement =(piece_clicked,square_to_move,pieces_positions) => {

    let board = {...pieces_positions};

    
    for (const [piece,square] of Object.entries(board)) {
      if (square_to_move===square) { //Ca s'appuie sur le fait que le déplaement est permis
        delete board[piece];
      }
    }
    board[piece_clicked]=square_to_move;
    //console.log("simulated_board",board);
    return board;
}

export const warn_illegal_deplacement = (square) => {

// Créer un contexte audio
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Créer un oscillateur (pour générer le son)
var oscillator = audioContext.createOscillator();

// Définir la fréquence du son (440 Hz pour un La)
oscillator.frequency.value = 220;

// Connecter l'oscillateur à la sortie audio
oscillator.connect(audioContext.destination);

// Démarrer l'oscillateur
oscillator.start();
downlight_square();
let test = [square];
highlight_square(test);//La fonction attent un tableau a la base

// Mettre une pause avant d'arrêter l'oscillateur
setTimeout(function() {
    // Arrêter l'oscillateur
    oscillator.stop();
    downlight_square();
}, 1000); // Mettre une pause de 1 seconde (1000 millisecondes) avant d'arrêter l'oscillateur

}

export const check_endgame =(parameters, board,trait) => {

  let opposite_color = trait==="white" ? "black" : "white" //on change le trait
  
  let mat = check_mat (parameters, board,trait);
  let check = check_check (parameters, board,trait);

  console.log ("mat : ",mat," échec adverse : ",check);

    
  if (mat && check) {
    alert ("fin de partie : victoire des "+opposite_color+" par échec et mat")
  }

  else if (mat) {
    alert ("fin de partie : nulle par pat");
  }




}

export const check_mat =(parameters, board,trait) => {

  for (const [piece,square] of Object.entries(board)) {
    if (retrieve_piece_color(piece)===trait) { //Parcourir toute les pieces du trait
      
      let piece_type = retrieve_piece_type (piece) ;
      let all_displacement = all_rules_displacement (parameters,square,piece_type,trait,board);

      let check = false;
      
      for (let square_to_move of all_displacement) { // Checker tous les deplacement de chaque piece
        let new_board = simulate_deplacement (piece,square_to_move,board);
        let king_square = (trait==="black") ? new_board["black-king"] : new_board["white-king"];
        if (piece_type==="king"){
          console.log (all_displacement,new_board,king_square);
        }
        check=false;
        for (const [piece2,square2] of Object.entries(new_board)) {
          if (retrieve_piece_color(piece2)!==trait) {
            let opposite_color = retrieve_piece_color(piece2);
            let opposite_piece_type = retrieve_piece_type (piece2) ;
            let all_displacement2 = all_rules_displacement (parameters,square2,opposite_piece_type,opposite_color,new_board);
            if (all_displacement2.includes(king_square)){
              console.warn(king_square);
              check=true;
              
              
            }
          }
        }
        if (!check) {
          console.log (square_to_move);
          console.log (piece," from ",square," to ",square_to_move, "can counter check");
          return check; //on peut bouger donc pas de mat
        }

      }

      }
  }

  return true ;//On est mat

}

export const check_check =(parameters, board,trait) => {

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
