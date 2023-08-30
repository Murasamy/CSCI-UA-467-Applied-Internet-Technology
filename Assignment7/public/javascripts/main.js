// function main() {
//     const startCards = [];
//     const buttom = document.querySelector('.playBtn');
//     buttom.addEventListener('click', (evt) => {
//         evt.preventDefault();

//         document.getElementById('startValues').value.split(',').forEach((value) => {
//             startCards.push(value);
//         });

//         const cards = generateDeck(startCards);
//         const userCards = [];
//         const computerCards = [];

//         userCards.push(cards.shift());
//         computerCards.push(cards.shift());
//         userCards.push(cards.shift());
//         computerCards.push(cards.shift());

//         const gameElement = document.querySelector('.game');

//         // add computer score and user score
//         // const userScore = document.createElement('p');
//         // const computerScore = document.createElement('p');

//         // const computerDiv = document.createElement('div');
//         // computerDiv.setAttribute('class', 'computer');
//         // computerDiv.appendChild(computerScore);

//         // const userDiv = document.createElement('div');
//         // userDiv.setAttribute('class', 'user');
//         // userDiv.appendChild(userScore);

//         // computerScore.appendChild(document.createTextNode("Computer Score - ?"));
//         // userScore.appendChild(document.createTextNode("User Score - " + calculateScore(userCards)));

//         // gameElement.appendChild(computerDiv);
//         // gameElement.appendChild(userDiv);

//         const computerDiv = document.createElement('div');
//         computerDiv.setAttribute('class', 'computer');
//         const computerScore = document.createElement('div');
//         computerScore.appendChild(document.createTextNode("Computer Score: ?"));
//         computerScore.setAttribute('class', 'computerScore');
//         computerDiv.appendChild(computerScore);
//         gameElement.appendChild(computerDiv);

//         const userDiv = document.createElement('div');
//         userDiv.setAttribute('class', 'user');
//         const userScore = document.createElement('div');
//         userScore.appendChild(document.createTextNode("User Score: " + calculateScore(userCards)));
//         userScore.setAttribute('class', 'userScore');
//         userDiv.appendChild(userScore);
//         gameElement.appendChild(userDiv);

//         // add div for buttoms 'hit' and 'stand'
//         const buttomDiv = document.createElement('div');
//         buttomDiv.setAttribute('class', 'buttomDiv');

//         const hitButtom = document.createElement('button');
//         hitButtom.setAttribute('class', 'hitButtom');
//         hitButtom.appendChild(document.createTextNode('Hit'));

//         const standButtom = document.createElement('button');
//         standButtom.setAttribute('class', 'standButtom');
//         standButtom.appendChild(document.createTextNode('Stand'));

//         buttomDiv.appendChild(hitButtom);
//         buttomDiv.appendChild(standButtom);

//         gameElement.appendChild(buttomDiv);

//         displayCards(computerCards, computerDiv, true);
//         displayCards(userCards, userDiv, false);

//         // let computerStanding = false;
//         let computerMove;

//         hitButtom.addEventListener('click', (evt) => {
//             evt.preventDefault();

//             // here may have bug
//             userCards.push(cards.shift());
//             displayCards(userCards, userDiv);

//             // refresh score
//             userScore.removeChild(userScore.childNodes[0]);
//             userScore.appendChild(document.createTextNode("User Score: " + calculateScore(userCards)));

//             if (isFinished(userCards, computerCards)) {
//                 displayCards(computerCards, computerDiv, false);
//                 showWinner(userCards, computerCards, gameElement, buttomDiv);

//                 // show computer score
//                 computerScore.removeChild(computerScore.childNodes[0]);
//                 computerScore.appendChild(document.createTextNode("Computer Score: " + calculateScore(computerCards)));
//             } else {
//                 computerMove = whetherComputerMove(computerCards);
//                 if (computerMove) {
//                     computerCards.push(cards.shift());
//                     displayCards(computerCards, computerDiv, true);
//                     if (isFinished(userCards, computerCards)) {
//                         displayCards(computerCards, computerDiv, false);
//                         showWinner(userCards, computerCards, gameElement, buttomDiv);
//                         // show computer score
//                         computerScore.removeChild(computerScore.childNodes[0]);
//                         computerScore.appendChild(document.createTextNode("Computer Score: " + calculateScore(computerCards)));
//                     }
//                 }
//             }

//         });

//         standButtom.addEventListener('click', (evt) => {
//             evt.preventDefault();
//             computerMove = whetherComputerMove(computerCards);
//             while (computerMove) {
//                 computerCards.push(cards.shift());
//                 if (isFinished(userCards, computerCards)) {
//                     displayCards(computerCards, computerDiv, false);
//                     showWinner(userCards, computerCards, gameElement, buttomDiv);
//                     // show computer score
//                     computerScore.removeChild(computerScore.childNodes[0]);
//                     computerScore.appendChild(document.createTextNode("Computer Score: " + calculateScore(computerCards)));
//                     break;
//                 }
//                 computerMove = whetherComputerMove(computerCards);
//             }
//             if (!computerMove) {
//                 displayCards(computerCards, computerDiv, false);
//                 showWinner(userCards, computerCards, gameElement, buttomDiv);
//                 // show computer score
//                 computerScore.removeChild(computerScore.childNodes[0]);
//                 computerScore.appendChild(document.createTextNode("Computer Score: " + calculateScore(computerCards)));
//             }
//         });

//     });
// }

/* eslint-disable */ 

function generateDeck(startCards) {
    // startValue should exist in topcards
    const cards = [];
    const topcards = [];
    const suits = ["hearts", "diamonds", "spades", "clubs"];
    const values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

    // generate cards array, which is an array of string, in the format of '1_of_hearts.png' or 'king_of_spades.png'
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            cards.push(`${values[j]}_of_${suits[i]}.png`);
        }
    }

    // add jokers
    cards.push('black_joker.png');
    cards.push('red_joker.png');

    for (let i = 0; i < startCards.length; i++) {
        const cardValue = startCards[i];
        const cardIndex = cards.findIndex(card => card.startsWith(`${cardValue}_`));
        if (cardIndex !== -1) {
            const [card] = cards.splice(cardIndex, 1);
            topcards.push(card);
        }
    }

    console.log(cards);
    console.log(topcards);

    // shuffle the cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return topcards.concat(cards);
}


function displayCards(cards, div, hide) {
    // userCards is an array of string, in the format of '1_of_hearts.png' or 'king_of_spades.png'
    // div is the div element that the cards will be appended to
    // hide is a boolean, if true, the cards will be hidden, which is 'card_back.png'
    // if the class of div is 'computer', and hide is true, then the cards will be hidden

    // remove all img elements in div
    const imgs = div.querySelectorAll('img');
    imgs.forEach(img => img.remove());

    if (div.getAttribute('class') === 'computer' && hide) {
        // display each cards
        cards.forEach((card) => {
            // hide the first card, show the rest
            if (card === cards[0]) {
                const img = document.createElement('img');
                img.setAttribute('src', `../cards/card_back.png`);
                img.setAttribute('class', 'displayCard');
                div.appendChild(img);
            } else {
                const img = document.createElement('img');
                img.setAttribute('src', `../cards/${card}`);
                img.setAttribute('class', 'displayCard');
                div.appendChild(img);
            }
        });
    } else {
        // display each cards
        cards.forEach((card) => {
            const img = document.createElement('img');
            img.setAttribute('src', `../cards/${card}`);
            img.setAttribute('class', 'displayCard');
            div.appendChild(img);
        });
    }


}


function calculateScore(hand) {
    // face card values are 10
    // ace is 1 or 11
    // other cards are their value
    // return the score that is closest to 21 without going over
    let score = 0;
    let aceCount = 0;
    hand.forEach((card) => {
        if (card.startsWith('ace')) {
            aceCount++;
        } else if (card.startsWith('jack') || card.startsWith('queen') || card.startsWith('king')) {
            score += 10;
        } else {
            score += parseInt(card);
        }
    });
    for (let i = 0; i < aceCount; i++) {
        if (score + 11 <= 21) {
            score += 11;
        } else {
            score += 1;
        }
    }
    return score;
}

function isFinished(userCards, computerCards) {
    // return true if the game is finished
    // return false if the game is not finished
    // game is finished if either the user or computer has a score of 21
    // or if both the user and computer have a score of over 21
    const userScore = calculateScore(userCards);
    const computerScore = calculateScore(computerCards);
    if (userScore === 21 || computerScore === 21 || userScore > 21 || computerScore > 21) {
        return true;
    } else {
        return false;
    }
}

async function getGameRecord(historyDiv) {
    console.log('Getting game records');
    const response = await fetch('/api/gameRecords');
    const gameRecords = await response.json();

    const table = document.createElement('table');
    const header = table.createTHead();
    const row = header.insertRow(0);
    const initialsHeader = document.createElement('th');
    initialsHeader.innerHTML = 'Initials';
    const computerScoreHeader = document.createElement('th');
    computerScoreHeader.innerHTML = 'Computer Score';
    const userScoreHeader = document.createElement('th');
    userScoreHeader.innerHTML = 'User Score';
    const dateHeader = document.createElement('th');
    dateHeader.innerHTML = 'Date';

    row.appendChild(initialsHeader);
    row.appendChild(computerScoreHeader);
    row.appendChild(userScoreHeader);
    row.appendChild(dateHeader);

    const tbody = table.createTBody();

    for (const game of gameRecords) {
        const row = tbody.insertRow(0);
        const initialsCell = row.insertCell(0);
        initialsCell.innerHTML = game.userInitials;
        const computerScoreCell = row.insertCell(1);
        computerScoreCell.innerHTML = game.computerScore;
        const userScoreCell = row.insertCell(2);
        userScoreCell.innerHTML = game.userScore;
        const dateCell = row.insertCell(3);
        dateCell.innerHTML = new Date(game.createdAt).toLocaleString();
    }
    // console.log(table);
    // const historyDiv = document.createElement('div');
    // historyDiv.setAttribute('class', 'history');
    // historyDiv.appendChild(table);
    // console.log(historyDiv);
    historyDiv.appendChild(table);

    return table;
}

// when someone wins, the game is finished
function showWinner(userCards, computerCards, gameElement, buttomDiv) {
    // display the winner
    const userScore = calculateScore(userCards);
    const computerScore = calculateScore(computerCards);

    const p = document.createElement('div');
    // the one who is closer to 21 wins
    if (userScore > 21 && computerScore > 21) {
        // both over 21, so no one wins
        p.appendChild(document.createTextNode('No one wins'));
    } else if (userScore > 21) {
        // user over 21, computer wins
        p.appendChild(document.createTextNode('Computer wins'));
    } else if (computerScore > 21) {
        // computer over 21, user wins
        p.appendChild(document.createTextNode('User wins'));
    } else if (userScore > computerScore) {
        // user closer to 21, user wins
        p.appendChild(document.createTextNode('User wins'));
    } else if (userScore < computerScore) {
        // computer closer to 21, computer wins
        p.appendChild(document.createTextNode('Computer wins'));
    } else {
        // tie
        p.appendChild(document.createTextNode('Tie'));
    }
    // replace bottomDiv with 'p' element
    gameElement.removeChild(buttomDiv);
    gameElement.appendChild(p);

    // add a button, when clicked, delete all other element and show previous hands played
    const showHistoryButton = document.createElement('button');
    const startDiv = document.getElementsByClassName('start')[0];
    // remove all elements
    while (startDiv.firstChild) {
        startDiv.removeChild(startDiv.firstChild);
    }

    startDiv.appendChild(showHistoryButton);
    showHistoryButton.appendChild(document.createTextNode('Show History'));

    // create a form to inter initial
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'initial');
    input.setAttribute('placeholder', 'Enter your initial');
    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Submit');
    submit.setAttribute('id', 'submitInitial');
    form.appendChild(input);
    form.appendChild(submit);
    startDiv.appendChild(form);

    // add event listener to the button
    const submitInitial = document.getElementById('submitInitial');
    submitInitial.addEventListener('click', async (evt) => {
        console.log('submit initial');
        evt.preventDefault();
        const initial = document.getElementsByName('initial')[0].value;
        // if initial is not empty, save the game record
        if (initial !== '') {
            const userScore = calculateScore(userCards);
            const computerScore = calculateScore(computerCards);

            try {
                const response = await fetch('/api/gameRecords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userInitials: initial,
                        computerScore,
                        userScore
                    })
                });
                const gameRecord = await response.json();
                console.log(`Game record saved: ${JSON.stringify(gameRecord)}`);
            } catch (err) {
                console.error(`Failed to save game record: ${err}`);
            }

            // remove the form and button
            startDiv.removeChild(form);
            // getGameRecord(gameDiv);
        }
    });

    showHistoryButton.addEventListener('click', () => {
        // remove all elements in the div with class 'game'
        const gameDiv = document.getElementsByClassName('game')[0];
        while (gameDiv.firstChild) {
            gameDiv.removeChild(gameDiv.firstChild);
        }
        // show previous hands played

        // const historyDiv = document.createElement('div');
        // historyDiv.setAttribute('class', 'history');
        // gameDiv.appendChild(historyDiv);
        console.log('show history');
        getGameRecord(gameDiv);
    });
}

function whetherComputerMove(computerCards) {
    const totalScore = calculateScore(computerCards);
    if (totalScore < 17) {
        return true;
    }
    return false;
}
// In many variations of the game of Blackjack,
// the dealer must hit on a hand total of 16 or less 
// and stand on a hand total of 17 or more. This is 
// because the dealer's hand is compared against each player's 
// hand individually, and the dealer's objective is simply to beat 
// each player's hand, without regard to the total of all player's 
// hands.

// Additionally, in most variations of the game, the 
// player has the advantage of playing their hand first, 
// and if they bust (go over 21), they lose, even if the 
// dealer also busts. Therefore, the dealer must stand on 
// a total of 17 or more, to increase the likelihood that 
// they will not bust and to allow the players to bust first.

// So, choosing 17 as the stand value for the dealer in 
// this function follows the general rule used in most 
// variations of the game, and it is a common strategy 
// used by dealers to optimize their chances of winning 
// against the players.



function main() {
    const startCards = [];
    const buttom = document.querySelector('.playBtn');
    buttom.addEventListener('click', (evt) => {
        evt.preventDefault();

        document.getElementById('startValues').value.split(',').forEach((value) => {
            startCards.push(value);
        });

        const cards = generateDeck(startCards);
        const userCards = [];
        const computerCards = [];

        userCards.push(cards.shift());
        computerCards.push(cards.shift());
        userCards.push(cards.shift());
        computerCards.push(cards.shift());

        const gameElement = document.querySelector('.game');

        // add computer score and user score
        // const userScore = document.createElement('p');
        // const computerScore = document.createElement('p');

        // const computerDiv = document.createElement('div');
        // computerDiv.setAttribute('class', 'computer');
        // computerDiv.appendChild(computerScore);

        // const userDiv = document.createElement('div');
        // userDiv.setAttribute('class', 'user');
        // userDiv.appendChild(userScore);

        // computerScore.appendChild(document.createTextNode("Computer Score - ?"));
        // userScore.appendChild(document.createTextNode("User Score - " + calculateScore(userCards)));

        // gameElement.appendChild(computerDiv);
        // gameElement.appendChild(userDiv);

        const computerDiv = document.createElement('div');
        computerDiv.setAttribute('class', 'computer');
        const computerScore = document.createElement('div');
        computerScore.appendChild(document.createTextNode("Computer Score: ?"));
        computerScore.setAttribute('class', 'computerScore');
        computerDiv.appendChild(computerScore);
        gameElement.appendChild(computerDiv);

        const userDiv = document.createElement('div');
        userDiv.setAttribute('class', 'user');
        const userScore = document.createElement('div');
        userScore.appendChild(document.createTextNode("User Score: " + calculateScore(userCards)));
        userScore.setAttribute('class', 'userScore');
        userDiv.appendChild(userScore);
        gameElement.appendChild(userDiv);

        // add div for buttoms 'hit' and 'stand'
        const buttomDiv = document.createElement('div');
        buttomDiv.setAttribute('class', 'buttomDiv');

        const hitButtom = document.createElement('button');
        hitButtom.setAttribute('class', 'hitButtom');
        hitButtom.appendChild(document.createTextNode('Hit'));

        const standButtom = document.createElement('button');
        standButtom.setAttribute('class', 'standButtom');
        standButtom.appendChild(document.createTextNode('Stand'));

        buttomDiv.appendChild(hitButtom);
        buttomDiv.appendChild(standButtom);

        gameElement.appendChild(buttomDiv);

        displayCards(computerCards, computerDiv, true);
        displayCards(userCards, userDiv, false);

        // let computerStanding = false;
        let computerMove;

        hitButtom.addEventListener('click', (evt) => {
            evt.preventDefault();

            // here may have bug
            userCards.push(cards.shift());
            displayCards(userCards, userDiv);

            // refresh score
            userScore.removeChild(userScore.childNodes[0]);
            userScore.appendChild(document.createTextNode("User Score: " + calculateScore(userCards)));

            if (isFinished(userCards, computerCards)) {
                displayCards(computerCards, computerDiv, false);
                showWinner(userCards, computerCards, gameElement, buttomDiv);

                // show computer score
                computerScore.removeChild(computerScore.childNodes[0]);
                computerScore.appendChild(document.createTextNode("Computer Score: " + calculateScore(computerCards)));
            } else {
                computerMove = whetherComputerMove(computerCards);
                if (computerMove) {
                    computerCards.push(cards.shift());
                    displayCards(computerCards, computerDiv, true);
                    if (isFinished(userCards, computerCards)) {
                        displayCards(computerCards, computerDiv, false);
                        showWinner(userCards, computerCards, gameElement, buttomDiv);
                        // show computer score
                        computerScore.removeChild(computerScore.childNodes[0]);
                        computerScore.appendChild(document.createTextNode("Computer Score: " + calculateScore(computerCards)));
                    }
                }
            }

        });

        standButtom.addEventListener('click', (evt) => {
            evt.preventDefault();
            computerMove = whetherComputerMove(computerCards);
            while (computerMove) {
                computerCards.push(cards.shift());
                if (isFinished(userCards, computerCards)) {
                    displayCards(computerCards, computerDiv, false);
                    showWinner(userCards, computerCards, gameElement, buttomDiv);
                    // show computer score
                    computerScore.removeChild(computerScore.childNodes[0]);
                    computerScore.appendChild(document.createTextNode("Computer Score: " + calculateScore(computerCards)));
                    break;
                }
                computerMove = whetherComputerMove(computerCards);
            }
            if (!computerMove) {
                displayCards(computerCards, computerDiv, false);
                showWinner(userCards, computerCards, gameElement, buttomDiv);
                // show computer score
                computerScore.removeChild(computerScore.childNodes[0]);
                computerScore.appendChild(document.createTextNode("Computer Score: " + calculateScore(computerCards)));
            }
        });

    });
}

document.addEventListener('DOMContentLoaded', main);
