export interface Board {
    "black-rook1": string;
    "black-knight1": string;
    "black-bishop1": string;
    "black-queen": string;
    "black-king": string;
    "black-bishop2": string;
    "black-knight2": string;
    "black-rook2": string;
    "black-pawn1": string;
    "black-pawn2": string;
    "black-pawn3": string;
    "black-pawn4": string;
    "black-pawn5": string;
    "black-pawn6": string;
    "black-pawn7": string;
    "black-pawn8": string;
    "white-rook1": string;
    "white-knight1": string;
    "white-bishop1": string;
    "white-queen": string;
    "white-king": string;
    "white-bishop2": string;
    "white-knight2": string;
    "white-rook2": string;
    "white-pawn1": string;
    "white-pawn2": string;
    "white-pawn3": string;
    "white-pawn4": string;
    "white-pawn5": string;
    "white-pawn6": string;
    "white-pawn7": string;
    "white-pawn8": string;
  };
  
export interface Parameters {

    columns: string[];
    rows: string[];
    board_height: number;
    board_width: number;
    piece_height: number;
    piece_width: number;
  };

export interface Section {

  title: string;
  id: string;
  subtitles: {
    title: string;
    id: string;
  }[];
  
}

export interface Profil {
  email: string;
  birthday: string;
  created_at: string;
  pseudo: string;
  last_name:string;
  first_name: string;

}

export interface Game {
  id: number;
  pseudo: string;
  color: string;
  trait: string;
  status: number;
  board: Board;
  updated_at: string,
  created_at: string,
}