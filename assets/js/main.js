const player1 = "🔴"
const player2 = "🟡"
let ScorePlayer1 = 0
let ScorePlayer2 = 0
let currentPlayer = player1
let turnPlayer = 1
let gameOver = false;
let conditionVictory = [
    //les victoires horizontales
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
    //les victoires verticales
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
    //les victoires diagonales haut -> droite
    [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
    [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
    [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],
    //les victoires diagonales haut -> gauche
    [6, 12, 18, 24], [5, 11, 17, 23], [4, 10, 16, 22], [3, 9, 15, 21],
    [13, 19, 25, 31], [12, 18, 24, 30], [11, 17, 23, 29], [10, 16, 22, 28],
    [20, 26, 32, 38], [19, 25, 31, 37], [18, 24, 30, 36], [17, 23, 29, 35]
];
let gridGravity = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41]
]
function aleatoire(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function displaySymbol(element) {
    element = gravity(element)
    if (element.innerText == "" && gameOver == false) {
        play2()
        element.innerText = currentPlayer
        victory()
        turnPlayer++
        setCurrentPlayer()
    }
}
function gravity(child) {
    let result;
    let parent = child.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, child);
    let grandParent = parent.parentNode
    let indexParent = Array.prototype.indexOf.call(grandParent.children, parent);
    for (let i = gridGravity.length - 1; i => 0; i--) {
        result = document.querySelectorAll('td')[gridGravity[i][index]]
        if (result.innerText != "") {
            continue
        }
        break
    }
    return result
}
function setCurrentPlayer() {
    if (turnPlayer % 2 == 0) {
        currentPlayer = player2
        setTimeout(function () {
            Ia()
        }, 750)
    } else {
        currentPlayer = player1
    }
}
function victory() {
    for (let i = 0; i < conditionVictory.length; i++) {
        let cell1 = document.querySelectorAll(".grid")[conditionVictory[i][0]].innerText
        let cell2 = document.querySelectorAll(".grid")[conditionVictory[i][1]].innerText
        let cell3 = document.querySelectorAll(".grid")[conditionVictory[i][2]].innerText
        let cell4 = document.querySelectorAll(".grid")[conditionVictory[i][3]].innerText
        if (cell1 == "" || cell2 == "" || cell3 == "" || cell4 == "") {
            continue
        }
        if (cell1 == cell2 && cell2 == cell3 && cell3 == cell4) {
            if (cell1 == player1) {
                document.querySelector("#win").innerText = "ROND 🔴 A GAGNÉ"
                ScorePlayer1++
                document.querySelector("#SPlayer1").innerText = `ScoreJoueur 🔴 :${ScorePlayer1}`
                gameOver = true
                break
            } else if (cell2 == player2) {
                document.querySelector("#win").innerText = "ROND 🟡 A GAGNÉ"
                ScorePlayer1++
                document.querySelector("#SPlayer2").innerText = `ScoreCPU 🟡 :${ScorePlayer2}`
                gameOver = true
                break
            }
        }
        loser()
    }
}
function loser() {
    let count = 0
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        let tab = document.querySelectorAll("td")[i].innerText;
        if (tab != "") {
            count++
        }
    }
    if (count == document.querySelectorAll("td").length) {
        document.querySelector("#win").innerText = "🔴 GAME OVER 🟡 "
        gameOver = true
    }
}
function refresh() {
    let elm = document.getElementById('win').innerText = "";
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        document.querySelectorAll("td")[i].innerText = ""
    }
    turnPlayer = 1
    gameOver = false
    currentPlayer = player1
}
function Ia() {
    for (let i = 0; i < document.querySelectorAll("td").length; i++) {
        random = aleatoire(0, document.querySelectorAll("td").length - 1)
        if (document.querySelectorAll("td")[random].innerText != "") {
            continue
        } else {
            document.querySelectorAll("td")[random].click()
            break
        }
    }
}
function play() {
    let audio = new Audio(
        'assets/audio/clic.wav');
    audio.play();
}
function play2() {
    let audio = new Audio(
        'assets/audio/clic2.wav');
    audio.play();
}
















