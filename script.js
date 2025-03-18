const board = document.getElementById("board");
        const status = document.getElementById("status");
        let currentPlayer = "X";
        let gameBoard = Array(9).fill(null);

        function createBoard() {
            board.innerHTML = "";
            gameBoard.forEach((_, index) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = index;
                cell.addEventListener("click", handleMove);
                board.appendChild(cell);
            });
        }

        function handleMove(event) {
            const index = event.target.dataset.index;
            if (!gameBoard[index]) {
                gameBoard[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                event.target.classList.add("taken");
                if (checkWinner()) {
                    status.textContent = `Player ${currentPlayer} wins!`;
                    disableBoard();
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }

        function disableBoard() {
            document.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", handleMove));
        }

        function resetGame() {
            gameBoard = Array(9).fill(null);
            currentPlayer = "X";
            status.textContent = "Player X's turn";
            createBoard();
        }

        createBoard();