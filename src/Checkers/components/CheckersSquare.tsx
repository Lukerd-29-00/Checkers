import {Piece, Square, Move} from "./CheckersBoard"
export interface SquareProps {
    square: Square
    redsTurn: boolean
    moves: Array<Move>
    selectSquare: (square: Square | null) => void
    movePiece: (move: Move) => void
    firstMove: boolean
    setFirstMove: (firstMove: boolean) => void
    selectPiece: (piece: Piece | null) => void
    selectStartingSquare: (square: Square | null) => void
    selectedPiece: Piece | null
    startingSquare: Square | null
    endTurn: () => void
    child: JSX.Element
}

export function CheckersSquare(props: SquareProps){
    const deselect = props.square.position.row === props.startingSquare?.position.row && props.square.position.col === props.startingSquare?.position.col && props.firstMove
    const moving: boolean = props.moves.length > 0
    const onClick = () => {
        if(deselect){
            props.selectStartingSquare(null);
            props.selectSquare(null);
            props.selectPiece(null);
            props.setFirstMove(true);
        }
        else if(moving){
            for(const move of props.moves){
                if(move.destination.position.row === props.square.position.row && move.destination.position.col === props.square.position.col){
                    if(move.destination.piece === null){
                        props.movePiece(move);
                        props.setFirstMove(false);
                        if(move.destination.position.row === 0 && (props.selectedPiece as Piece).color === "red" && !(props.selectedPiece as Piece).king){
                            const newPiece = {color: ("red" as "black" | "red"),king: true}
                            const newSquare = {position: move.destination.position, color: move.destination.color, highlighted: move.destination.highlighted, piece: newPiece} 
                            props.selectStartingSquare(newSquare)
                            props.selectPiece(newPiece); 
                            props.selectSquare(newSquare) 
                        }
                        else if(move.destination.position.row === 7 && (props.selectedPiece as Piece).color === "black" && !(props.selectedPiece as Piece).king){
                            const newPiece = {color: ("black" as "black" | "red"),king: true}
                            const newSquare = {position: move.destination.position, color: move.destination.color, highlighted: move.destination.highlighted, piece: newPiece} 
                            props.selectStartingSquare(newSquare)
                            props.selectPiece(newPiece); 
                            props.selectSquare(newSquare) 
                        }
                        else{
                            props.selectSquare(move.destination);
                            props.selectStartingSquare(move.destination)
                        }
                        if(move.endsTurn){
                            props.endTurn();
                        }
                        
                    }
                    else{
                        props.selectSquare(props.square)
                    }
                }
            }
        }
        else{
            props.selectStartingSquare(props.square);
            props.selectSquare(props.square);
            props.selectPiece(props.square.piece)
        }
    }
    return (
            <button data-testid="checkers-square" className={props.square.highlighted ? "square highlighted" : props.square.color === "black" ? "square dark" : "square"} onClick={onClick} disabled={moving ? !deselect && !props.square.highlighted : !(props.square.piece !== null && ((props.redsTurn && props.square.piece.color === "red") || (!props.redsTurn && props.square.piece.color === "black")))} key={props.square.position.col}>{props.child}</button>
    )

}