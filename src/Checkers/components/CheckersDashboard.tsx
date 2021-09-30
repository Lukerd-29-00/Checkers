
import { CheckersBoard } from "./CheckersBoard";

interface noprops {

}

export function CheckersDashboard(props: noprops){
    return (
        <section>
            <CheckersBoard/>
            <footer>
                <p><a href="https://lukerd-29-00.github.io/Portfolio/">Homepage</a></p>
                <p><a href="https://github.com/Lukerd-29-00/Checkers/tree/source/src/Checkers">Source code</a></p>
                <p><a href="https://github.com/Lukerd-29-00/Portfolio">Main repository</a></p>
            </footer>
        </section>
    )
}