import {useState} from 'react'
import { useSquares } from '../hooks/UseSquares'
import { CheckersSquare, SquareProps } from './CheckersSquare';
export interface Position {
    row: number,
    col: number
}

//red pieces are on the bottom, black are on the top. Top row is zero, bottom row is 7.
export interface Piece {
    color: "black" | "red"
    king: boolean
}

export interface Square{
    piece: Piece | null
    color: "white" | "black"
    highlighted: boolean,
    position: Position
}

export interface Move {
    deletes: Square | null
    destination: Square
    endsTurn: boolean
}

interface NoProps {

}


function getAdjacentSquares(square: Square, board: Array<Array<Square>>, piece?: Piece): Array<Square>{
    const up = [{row: square.position.row-1,col:square.position.col-1},{row:square.position.row-1,col:square.position.col+1}];
    const down = [{row: square.position.row+1,col:square.position.col-1},{row:square.position.row+1,col: square.position.col+1}]
    const upanddown = up.concat(down)
    let sqs = new Array<Position>();
    if(piece === undefined && square.piece === null){
        throw Error("No piece to get targets of!")
    }
    else if(piece === undefined){
        piece = (square.piece as Piece);
    }
    let output = new Array<Square>();
    if(piece.king){
        sqs = upanddown
    }
    else if(piece.color === "red"){
        sqs = up
    }
    else{
        sqs = down
    }
    for(const pos of sqs){
        if(pos.row >= 0 && pos.row <= 7 && pos.col >= 0 && pos.col <= 7){
            output.push(board[pos.row][pos.col]);
        }
    }
    return output;
}

export function getAdjacentEnemyPieces(square: Square | null,board: Array<Array<Square>>,piece?: Piece): Array<Square>{
    if(square === null){
        return [];
    }
    else if(square.piece === null && piece === undefined){
        throw Error("No piece to move!")
    }
    else if(piece === undefined){
        piece = (square.piece as Piece);
    }
    return getAdjacentSquares(square,board,piece).filter((sq: Square) => {
        return sq.piece !== null && sq.piece.color !== (piece as Piece).color
    })
}

export function getAdjacentEmptySquares(square: Square | null, board: Array<Array<Square>>,piece?: Piece): Array<Square>{
    if(square == null || square.piece === null){
        return [];
    }
    return getAdjacentSquares(square,board,piece).filter((sq: Square) => {
        return sq.piece === null;
    })
}

export function CheckersBoard(props: NoProps){
    const [squares, movePiece, setSquaresHighlighted] = useSquares();
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [redsTurn, setRedsTurn] = useState(true);
    const [isFirstMove, setIsFirstMove] = useState(true);
    const [selectedPiece, selectPiece] = useState<Piece | null>(null)
    const [startingSquare, setStartingSquare] = useState<Square | null>(null);
    const [winner, setWinner] = useState<"red" | "black" | "tie" | null>(null);
    const selectSquare = (sq: Square | null) => {
        let allSquares = new Array<Square>(64);
        for(let i = 0;i < 64;i++){
            allSquares[i] = squares[Math.floor(i/8)][i % 8]
        }
        setSquaresHighlighted(allSquares,false);
        setSelectedSquare(sq);
    }
    const endTurn = (redTurn: boolean) => {
        setRedsTurn(!redTurn);
        setIsFirstMove(true);
        selectSquare(null);
        setStartingSquare(null)
        selectPiece(null);
        let allSquares = new Array<Square>(64);
        for(let i = 0;i < 64;i++){
            allSquares[i] = squares[Math.floor(i/8)][i % 8]
        }
        setSquaresHighlighted(allSquares,false);
    }
    let moves = new Array<Move>();
    if(selectedSquare !== null && selectedPiece !== null && startingSquare !== null){

        //if this is the first move of the turn, allow moving into nearby empty spaces.
        if(isFirstMove || selectedSquare.piece !== selectedPiece){
            moves = moves.concat(getAdjacentEmptySquares(selectedSquare,squares,selectedPiece).map((square :Square) => {
                return {destination: square,deletes: (selectedSquare.piece as Piece).color !== selectedPiece.color ? selectedSquare : null, endsTurn: selectedSquare.piece === selectedPiece}
            })).filter((move: Move) => {
                return move.destination.position.row !== startingSquare.position.row || move.destination.position.col !== startingSquare.position.col
            })
        }
        if(selectedSquare.piece === selectedPiece || selectedSquare.piece === null){
            //Add any squares that kill nearby enemies.
            moves = moves.concat(getAdjacentEnemyPieces(selectedSquare,squares,selectedPiece).filter((sq: Square) => {
                return (getAdjacentEmptySquares(sq,squares,selectedPiece)).filter((empty: Square) => {
                    return empty.position.row !== selectedSquare.position.row || empty.position.col !== selectedSquare.position.col;
                }).length > 0
            }).map((place: Square) => {
                    return {destination: place,deletes: null, endsTurn: false}
            }));
        }


        
        //Currently breaks in a case where two different moves have the same destination; instead of highlighting destinations, it should highlight the piece to delete then let you select a square from that piece.
        //If no moves can be made, the other player gets their turn.
        if(moves.length === 0 && isFirstMove){
            setStartingSquare(null);
            selectSquare(null);
            selectPiece(null);
        }
        else if(moves.length === 0){
            endTurn(redsTurn);
        }
        else{
            for(const move of moves){
                if(!squares[move.destination.position.row][move.destination.position.col].highlighted){
                    setSquaresHighlighted([move.destination],true)  
                }
            }
        }
    }
        return (
        <>
        <p>{!winner ? redsTurn ? "red's turn" : "black's turn" : `${winner} wins!`}</p>
        <div className="container">
        {squares.map((row: Square[],rowIndex: number) => {
            return (
                    <div data-testid="checkers-row" className="board-row" key={rowIndex}>
                        {row.map((square: Square,col: number) => {
                            let output: SquareProps = {
                                square: squares[rowIndex][col],
                                redsTurn: redsTurn,
                                moves: moves,
                                selectSquare: selectSquare,
                                movePiece: (move: Move) => {setWinner(movePiece(startingSquare,move))},
                                firstMove: isFirstMove,
                                setFirstMove: setIsFirstMove,
                                selectPiece: selectPiece,
                                selectedPiece: selectedPiece,
                                startingSquare: startingSquare,
                                selectStartingSquare: setStartingSquare,
                                endTurn: () => {endTurn(redsTurn)},
                                child: <></>    
                            }
    
                            if(square.piece !== null && square.piece.color === "black"){
                                output.child = <span className="piece" data-testid="black-piece">{square.piece.king ? "*" : ""}</span>
                                return CheckersSquare(output);
                            }
                            else if(square.piece !== null && square.piece.color === "red"){
                                output.child = <span className="piece red" data-testid="red-piece">{square.piece.king ? "*" : ""}</span>
                                return CheckersSquare(output);
                            }
                            return CheckersSquare(output);
    
                        })
                    }
                </div>
                )
            })}
            </div>
            </>
        )
    }

