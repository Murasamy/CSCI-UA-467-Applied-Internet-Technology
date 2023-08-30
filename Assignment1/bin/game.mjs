// game.mjs
const jsonFilepath = process.argv[2];
// let rawdata = readFileSync(jsonFilepath);
// rawdata = JSON.parse(rawdata);
// console.log(rawdata);

// let rawdata = reaeSync("../test/test-01-draw-and-find-an-8.json")

let testMode = false;

if (jsonFilepath !== undefined) {
    testMode = true; // testMode = true, if we need to read data from the Json File
}

let MaxTurn = process.argv[3]; // How many turns we want to play; default 1, which means one player turn and one computer turn



// ------------------------------------------------
// active this line if you want to play a complete game (the game will run 99999 turns);
// MaxTurn = 99999;
// ------------------------------------------------



if (MaxTurn === undefined) {
    MaxTurn = 1; // testMode = true, if we need to read data from the Json File
}

import * as cards from '../lib/cards.mjs';
import { question } from 'readline-sync';
// import clear from 'clear';
// import { readFile } from 'fs';
import { readFileSync } from 'fs';
// import { generateDeck, shuffle } from '../lib/cards.mjs';
// import { constants } from 'buffer';

// const suits = { SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️' };

// -------------link start-------------
let deckArr = [];
let playerHandArr = [];
let computerHandArr = [];
let discardPileArr = [];
let nextPlayObj = {};

function showCard(cardObj) {
    if (JSON.stringify(nextPlayObj) === '{}') {
        const ans = 'No card here';
        return ans;
    }
    if (cardObj['rank'] !== undefined && cardObj['suit'] !== undefined) {
        const ans = cardObj['rank'] + cardObj['suit'];
        return ans;
    } else if (cardObj['rank'] === undefined && cardObj['suit'] !== undefined) {
        const ans = cardObj['suit'];
        return ans;
    } else if (cardObj['rank'] !== undefined && cardObj['suit'] === undefined) {
        const ans = cardObj['rank'];
        return ans;
    }
}

function playable(cardsArray, cardNeed) {
    if (cardNeed['rank'] === undefined && cardNeed['suit'] === undefined) { return true; }
    for (let cardsArrayNum = 0; cardsArrayNum < cardsArray.length; cardsArrayNum++) {
        if (cardNeed['suit'] === cardsArray[cardsArrayNum]['suit'] || cardNeed['rank'] === cardsArray[cardsArrayNum]['rank'] || cardsArray[cardsArrayNum]["rank"] === "8") {
            return true;
        }
    }
    return false;
}

function displayBoard() {
    console.log("'CR🤪ZY 8's'");
    console.log('-----------------------------------------------');
    if (discardPileArr.length === 0) {
        console.log('Please Start');
    } else {
        console.log("Next suit/rank to play:=>" + showCard(nextPlayObj) + "<=");
    }

    console.log("-----------------------------------------------");
    if (discardPileArr.length === 0) {
        console.log('Discard pile is empty');
    } else {
        console.log('Top of discard pile: ' + discardPileArr[discardPileArr.length - 1]['rank'] + discardPileArr[discardPileArr.length - 1]['suit']);
    }
    // console.log(discardPileArr);

    console.log("Number of cards left in deck: " + deckArr.length);
    // console.log(deckArr);
    console.log("-----------------------------------------------");
    console.log("🤖✋ (computer hand): " + cards.handToString(computerHandArr, '  '));
    console.log("😊✋ (player hand): " + cards.handToString(playerHandArr, '  '));
    console.log("-----------------------------------------------");
}

function computerPlayFun() {

    // let canPlayCards = [];
    // let crazyEightCards = [];

    // let ansSuit = "";
    // let ansRank = "";

    // if (JSON.stringify(nextPlayObj) === '{}') {
    //     for (let i = 0; i < playerHandArr)
    // }

    // for (let i = 0; i < computerHandArr.length; i++) {
    //     if (computerHandArr[i]["rank"] == nextPlayObj["rank"] || computerHandArr[i]["suit"] == nextPlayObj["suit"] || computerHandArr[i]["rank"] !== "8") {
    //         canPlayCards.push(computerHandArr[i]);
    //     }
    // }

    // for (let i = 0; i < computerHandArr.length; i++) {
    //     if (computerHandArr[i]["rank"] == "8") {
    //         crazyEightCards.push(computerHandArr[i]);
    //     }
    // }

    // console.log(canPlayCards);
    // console.log(crazyEightCards);

    // function canFollow(cardObj) {
    //     for (let i = 0; i < playerHandArr.length; i++) {
    //         if ((playerHandArr[i]['suit'] == cardObj['suit'] || playerHandArr[i]['rank'] == cardObj['rank']) && playerHandArr[i]['rank'] !== '8') {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function returnAns() {
    //     for (let i = 0; i < playerHandArr.length; i++) {
    //         if (playerHandArr[i]["rank"] == ansRank && playerHandArr[i]["suit"] == ansSuit) {
    //             return i
    //         }
    //     }
    // }

    // for (let i = 0; i < canPlayCards.length; i++) {
    //     if (canFollow(canPlayCards[i]) == false) {
    //         ansRank = canPlayCards[i]["rank"];
    //         ansSuit = canPlayCards[i]["suit"];
    //         let ans = returnAns();
    //         return ans;
    //     }
    // }

    if (JSON.stringify(nextPlayObj) === '{}') {
        return 0;
    }

    for (let i = 0; i < computerHandArr.length; i++) {
        if (computerHandArr[i]["rank"] === nextPlayObj["rank"] || computerHandArr[i]["suit"] === nextPlayObj["suit"] || computerHandArr[i]["rank"] === "8") {
            return i;
        }
    }
}

function computerChooseSuit() {
    const suitsArr = new Set();
    for (let i = 0; i < playerHandArr.length; i++) {
        suitsArr.add(playerHandArr[i]["suit"]);
    }

    if (suitsArr.size !== 4) {
        if (suitsArr.has('♠️') === false) {
            const ans = '1';
            return ans;
        } else if (suitsArr.has('❤️') === false) {
            const ans = '2';
            return ans;
        } else if (suitsArr.has('♣️') === false) {
            const ans = '3';
            return ans;
        } else if (suitsArr.has('♦️') === false) {
            const ans = '4';
            return ans;
        } else {
            return "1";
        }
    } else {
        return "1";
    }
}

function canPlay(playerCardNum) {
    if (nextPlayObj["rank"] === undefined && nextPlayObj["suit"] === undefined) { return true; }
    if (nextPlayObj["rank"] === undefined && nextPlayObj["suit"] !== undefined) {
        if (playerHandArr[playerCardNum]["rank"] === nextPlayObj["rank"] || playerHandArr[playerCardNum]["rank"] === '8') {
            return true;
        }
    }
    if (playerHandArr[playerCardNum]["suit"] === nextPlayObj["suit"] || playerHandArr[playerCardNum]["rank"] === nextPlayObj["rank"] || playerHandArr[playerCardNum]["rank"] === '8') {
        return true;
    }
    return false;
}

if (testMode === true) {
    console.log("TestMode, the game will run " + (MaxTurn * 2) + " turns");
    const rawdata = readFileSync(jsonFilepath);
    const readData = JSON.parse(rawdata);
    deckArr = readData['deck'];
    playerHandArr = readData['playerHand'];
    computerHandArr = readData['computerHand'];
    discardPileArr = readData['discardPile'];
    nextPlayObj = readData['nextPlay'];
} else {
    deckArr = cards.generateDeck();
    deckArr = cards.shuffle(deckArr);

    // console.log(deckArr.length);
    const getDeal = cards.deal(deckArr);
    deckArr = getDeal['deck'];
    computerHandArr = getDeal['hands'][0];
    playerHandArr = getDeal['hands'][1];

    for (let i = deckArr.length - 1; i >= 0; i--) {
        // console.log(deckArr[deckArr.length]);
        if (deckArr[i]['rank'] !== '8') {
            const firstCard = deckArr.pop();
            discardPileArr.push(firstCard);
            nextPlayObj = firstCard;
            break;
        }
    }
}

let turnNum = 0;
let playOrder = question("Player first, type 1; computer first, type 2\n>");
while (playOrder !== "1" && playOrder !== "2") {
    playOrder = question("Invalid input. Player first, type 1; computer first, type 2\n>");
}


if (playOrder === 1) {
    outer:
    while ((computerHandArr.length !== 0 || playerHandArr.length !== 0) && turnNum < MaxTurn) {
        displayBoard();
        console.log("😊 Player's turn...");
        if (playable(playerHandArr, nextPlayObj)) {
            console.log('Enter the number of the card you would like to play');
            console.log(cards.handToString(playerHandArr, '\n', true));

            let playerCardNum = question('>');

            // while(!(playerCardNum%1 === 0 && 1 <= playerCardNum && playerCardNum <= playerHandArr.length) && !canPlay((playerCardNum-1))){
            //     playerCardNum = question('Invalid input. Enter the number of the card you would like to play\n>');
            // }

            while (true) {
                // console.log(!(playerCardNum % 1 === 0 && 1 <= playerCardNum && playerCardNum <= playerHandArr.length));

                if (!(playerCardNum % 1 === 0 && 1 <= playerCardNum && playerCardNum <= playerHandArr.length)) {
                    playerCardNum = question('Invalid input. Enter the number of the card you would like to play\n>');
                    continue;
                }

                // console.log(canPlay(playerCardNum - 1));
                if (canPlay(playerCardNum - 1) === false) {
                    playerCardNum = question('You can not play this card. Please choose another\n>');
                    continue;
                }

                break;

            }

            const playerCard = playerHandArr[playerCardNum - 1];
            console.log("You played " + showCard(playerCard));
            // console.log(playerCard);

            if (playerCard['rank'] === 8) {
                console.log("Crazy eight!");
                const tempCard = { "suit": undefined, "rank": undefined };
                playerCardNum = question('Please choose the suit: \n1: ♠️\n2: ❤️\n3: ♣️\n4: ♦️\n');
                while (playerCardNum !== '1' && playerCardNum !== '2' && playerCardNum !== '3' && playerCardNum !== '4') {
                    playerCardNum = question('Invalid input. Please choose the suit:');
                }
                if (playerCardNum === '1') {
                    console.log("You choosed ♠️");
                    tempCard['suit'] = '♠️';
                } else if (playerCardNum === '2') {
                    console.log("You choosed ❤️");
                    tempCard['suit'] = '❤️';
                } else if (playerCardNum === '3') {
                    console.log("You choosed ♣️");
                    tempCard['suit'] = '♣️';
                } else {
                    console.log("You choosed ♦️");
                    tempCard['suit'] = '♦️';
                }

                nextPlayObj = tempCard;
                // console.log(tempCard);


            } else {
                nextPlayObj = playerCard;
            }

            discardPileArr.push(playerCard);
            playerHandArr.splice(playerCardNum - 1, 1);

            if (playerHandArr.length === 0) {
                console.log("Player win");
                break outer;
            }
            console.log("Now player's hand is: " + cards.handToString(playerHandArr, "  "));

            playerCardNum = question('Press Enter to continue');

        } else {

            console.log('😔 You have no playable cards');
            let playerCardNum;
            playerCardNum = question('Press ENTER to draw cards until matching: ' + showCard(nextPlayObj) + '\n');
            const observed = cards.drawUntilPlayable(deckArr, nextPlayObj);
            let drawnArr = [];
            [deckArr, drawnArr] = observed;
            if (deckArr.length === 0) {
                if (cards.matchesAnyProperty(drawnArr, nextPlayObj) === false && drawnArr[drawnArr.length - 1]['rank'] !== '8') {
                    deckArr = cards.shuffle(discardPileArr);
                    discardPileArr = [];
                    const observed2 = cards.drawUntilPlayable(deckArr, nextPlayObj);
                    let drawnArr2;
                    [deckArr, drawnArr2] = observed2;
                    drawnArr = drawnArr.concat(drawnArr2);
                } else {
                    deckArr = cards.shuffle(discardPileArr);
                    discardPileArr = [];
                }
            }

            console.log("CardDrawn: " + cards.handToString(drawnArr, '  '));


            const playerCard = drawnArr.pop();
            console.log('You play: ' + showCard(playerCard));
            playerHandArr = playerHandArr.concat(drawnArr);
            console.log("Now your card is: " + cards.handToString(playerHandArr, " "));

            if (playerCard['rank'] === 8) {
                console.log("Crazy eight!");
                const tempCard = { "suit": undefined, "rank": undefined };
                playerCardNum = question('Please choose the suit: \n1: ♠️\n2: ❤️\n3: ♣️\n4: ♦️\n>');
                while (playerCardNum !=='1' && playerCardNum !== '2' && playerCardNum !== '3' && playerCardNum !== '4') {
                    playerCardNum = question('Invalid input. Please choose the suit:');
                }
                if (playerCardNum === '1') {
                    console.log("You choosed ♠️");
                    tempCard['suit'] = '♠️';
                } else if (playerCardNum === '2') {
                    console.log("You choosed ❤️");
                    tempCard['suit'] = '❤️';
                } else if (playerCardNum === '3') {
                    console.log("You choosed ♣️");
                    tempCard['suit'] = '♣️';
                } else {
                    console.log("You choosed ♦️");
                    tempCard['suit'] = '♦️';
                }

                nextPlayObj = tempCard;

            } else {
                nextPlayObj = playerCard;
            }

            discardPileArr.push(playerCard);

            playerCardNum = question('Press Enter to continue');
        }

        console.clear();






        // computer's turn
        displayBoard();
        if (playable(computerHandArr, nextPlayObj)) {
            console.log("Computer's hand is: " + cards.handToString(computerHandArr, '  '));

            const computerPlayNum = computerPlayFun();

            const computerCard = computerHandArr[computerPlayNum];
            console.log("Computer plays " + showCard(computerCard));

            if (computerCard['rank'] === 8) {
                console.log("Crazy eight!");
                const tempCard = { "suit": undefined, "rank": undefined };
                const computerChooseSuitNum = computerChooseSuit();

                if (computerChooseSuitNum === '1') {
                    console.log("Computer choosed ");
                    tempCard['suit'] = '♠️';
                } else if (computerChooseSuitNum === '2') {
                    console.log("Computer choosed ❤️");
                    tempCard['suit'] = '❤️';
                } else if (computerChooseSuitNum === '3') {
                    console.log("Computer choosed ♣️");
                    tempCard['suit'] = '♣️';
                } else {
                    console.log("Computer choosed ♦️");
                    tempCard['suit'] = '♦️';
                }

                nextPlayObj = tempCard;




            } else {
                nextPlayObj = computerCard;
            }


            discardPileArr.push(computerCard);
            computerHandArr.splice(computerPlayNum, 1);

            if (computerHandArr.length === 0) {
                console.log("Computer win");
                break outer;
            }


            question('Press Enter to continue');

        } else {
            console.log('😔 Computer has no playable cards');

            const observed = cards.drawUntilPlayable(deckArr, nextPlayObj);
            let drawnArr = [];
            [deckArr, drawnArr] = observed;
            if (deckArr.length === 0) {
                if (cards.matchesAnyProperty(drawnArr, nextPlayObj) === false && drawnArr[drawnArr.length - 1]['rank'] !== '8') {
                    deckArr = cards.shuffle(discardPileArr);
                    discardPileArr = [];
                    const observed2 = cards.drawUntilPlayable(deckArr, nextPlayObj);
                    let drawnArr2;
                    [deckArr, drawnArr2] = observed2;
                    drawnArr = drawnArr.concat(drawnArr2);
                } else {
                    deckArr = cards.shuffle(discardPileArr);
                    discardPileArr = [];
                }


            }

            console.log("Computer draws card: " + cards.handToString(drawnArr, '  '));

            const computerCard = drawnArr.pop();
            console.log('Computer plays: ' + showCard(computerCard));
            computerHandArr = computerHandArr.concat(drawnArr);
            console.log("Now computer's hand is: " + cards.handToString(computerHandArr, " "));

            if (computerCard['rank'] === 8) {
                console.log("Crazy eight!");
                const tempCard = { "suit": undefined, "rank": undefined };
                const computerChooseSuitNum = computerChooseSuit();
                if (computerChooseSuitNum === '1') {
                    tempCard['suit'] = '♠️';
                    console.log("computer chooses suit " + "♠️");
                } else if (computerChooseSuitNum === '2') {
                    tempCard['suit'] = '❤️';
                    console.log("computer chooses suit " + "❤️");
                } else if (computerChooseSuitNum === '3') {
                    tempCard['suit'] = '♣️';
                    console.log("computer chooses suit " + "♣️");
                } else {
                    tempCard['suit'] = '♦️';
                    console.log("computer chooses suit " + "♦️");
                }

                nextPlayObj = tempCard;




            } else {
                nextPlayObj = computerCard;
            }

            discardPileArr.push(computerCard);
            question('Press Enter to continue');
        }

        console.clear();
        turnNum++;
    }
}
else {
    outer:
    while ((computerHandArr.length !== 0 || playerHandArr.length !== 0) && turnNum < MaxTurn) {
        displayBoard();
        if (playable(computerHandArr, nextPlayObj)) {
            console.log("Computer's hand is:" + cards.handToString(computerHandArr, '  '));

            const computerPlayNum = computerPlayFun();

            const computerCard = computerHandArr[computerPlayNum];
            console.log("Computer plays " + showCard(computerCard));

            if (computerCard['rank'] === 8) {
                console.log("Crazy eight!");
                const tempCard = { "suit": undefined, "rank": undefined };
                const computerChooseSuitNum = computerChooseSuit();

                if (computerChooseSuitNum === '1') {
                    console.log("Computer choosed suit ♠️");
                    tempCard['suit'] = '♠️';
                } else if (computerChooseSuitNum === '2') {
                    console.log("Computer choosed suit ❤️");
                    tempCard['suit'] = '❤️';
                } else if (computerChooseSuitNum === '3') {
                    console.log("Computer choosed suit ♣️");
                    tempCard['suit'] = '♣️';
                } else {
                    console.log("Computer choosed suit ♦️");
                    tempCard['suit'] = '♦️';
                }

                nextPlayObj = tempCard;





            } else {
                nextPlayObj = computerCard;
            }


            discardPileArr.push(computerCard);
            computerHandArr.splice(computerPlayNum, 1);

            if (computerHandArr.length === 0) {
                console.log("Computer win");
                break outer;
            }


            question('Press Enter to continue');

        } else {
            console.log('😔 Computer has no playable cards');

            const observed = cards.drawUntilPlayable(deckArr, nextPlayObj);
            let drawnArr = [];
            [deckArr, drawnArr] = observed;
            if (deckArr.length === 0) {
                if (cards.matchesAnyProperty(drawnArr, nextPlayObj) === false && drawnArr[drawnArr.length - 1]['rank'] !== '8') {
                    deckArr = cards.shuffle(discardPileArr);
                    discardPileArr = [];
                    const observed2 = cards.drawUntilPlayable(deckArr, nextPlayObj);
                    let drawnArr2;
                    [deckArr, drawnArr2] = observed2;
                    drawnArr = drawnArr.concat(drawnArr2);
                } else {
                    deckArr = cards.shuffle(discardPileArr);
                    discardPileArr = [];
                }
            }

            console.log("Computer draws card: " + cards.handToString(drawnArr, '  '));

            const computerCard = drawnArr.pop();
            console.log('Computer plays: ' + showCard(computerCard));
            computerHandArr = computerHandArr.concat(drawnArr);
            console.log("Now computer's hand is: " + cards.handToString(computerHandArr, " "));

            if (computerCard['rank'] === 8) {
                console.log("Crazy eight!");
                const tempCard = { "suit": undefined, "rank": undefined };

                const computerChooseSuitNum = computerChooseSuit();
                if (computerChooseSuitNum === '1') {
                    tempCard['suit'] = '♠️';
                    console.log("computer chooses suit " + "♠️");
                } else if (computerChooseSuitNum === '2') {
                    tempCard['suit'] = '❤️';
                    console.log("computer chooses suit " + "❤️");
                } else if (computerChooseSuitNum === '3') {
                    tempCard['suit'] = '♣️';
                    console.log("computer chooses suit " + "♣️");
                } else {
                    tempCard['suit'] = '♦️';
                    console.log("computer chooses suit " + "♦️");
                }

                nextPlayObj = tempCard;




            } else {
                nextPlayObj = computerCard;
            }


            discardPileArr.push(computerCard);
            question('Press Enter to continue');
        }

        console.clear();
        displayBoard();
        console.log("😊 Player's turn...");
        if (playable(playerHandArr, nextPlayObj)) {
            console.log('Enter the number of the card you would like to play');
            console.log(cards.handToString(playerHandArr, '\n', true));

            let playerCardNum = question('>');

            // while(!(playerCardNum%1 === 0 && 1 <= playerCardNum && playerCardNum <= playerHandArr.length) && !canPlay((playerCardNum-1))){
            //     playerCardNum = question('Invalid input. Enter the number of the card you would like to play\n>');
            // }

            while (true) {

                if (!(playerCardNum % 1 === 0 && 1 <= playerCardNum && playerCardNum <= playerHandArr.length)) {
                    playerCardNum = question('Invalid input. Enter the number of the card you would like to play\n>');
                    continue;
                }

                if (canPlay(playerCardNum - 1) === false) {
                    playerCardNum = question('You can not play this card. Please choose another\n>');
                    continue;
                }

                break;

            }

            const playerCard = playerHandArr[playerCardNum - 1];
            console.log("You played " + showCard(playerCard));

            if (playerCard['rank'] === 8) {
                console.log("Crazy eight!");
                const tempCard = { "suit": undefined, "rank": undefined };
                playerCardNum = question('Please choose the suit: \n1: ♠️\n2: ❤️\n3: ♣️\n4: ♦️\n>');
                while (playerCardNum !== '1' && playerCardNum !== '2' && playerCardNum !== '3' && playerCardNum !== '4') {
                    playerCardNum = question('Invalid input. Please choose the suit:');
                }
                if (playerCardNum === '1') {
                    console.log("You choosed ♠️");
                    tempCard['suit'] = '♠️';
                } else if (playerCardNum === '2') {
                    console.log("You choosed ❤️");
                    tempCard['suit'] = '❤️';
                } else if (playerCardNum === '3') {
                    console.log("You choosed ♣️");
                    tempCard['suit'] = '♣️';
                } else {
                    console.log("You choosed ♦️");
                    tempCard['suit'] = '♦️';
                }

                nextPlayObj = tempCard;




            } else {
                nextPlayObj = playerCard;
            }
            discardPileArr.push(playerCard);
            playerHandArr.splice(playerCardNum - 1, 1);

            if (playerHandArr.length === 0) {
                console.log("Player win");
                break outer;
            }
            console.log("Now player's hand is:" + cards.handToString(playerHandArr, "  "));

            playerCardNum = question('Press Enter to continue');

        } else {
            // eslint-disable-next-line no-use-before-define
            console.log('😔 You have no playable cards');
            let playerCardNum;
            playerCardNum = question('Press ENTER to draw cards until matching: ' + showCard(nextPlayObj) + '\n');
            const observed = cards.drawUntilPlayable(deckArr, nextPlayObj);
            let drawnArr = [];
            [deckArr, drawnArr] = observed;
            if (deckArr.length === 0) {
                if (cards.matchesAnyProperty(drawnArr, nextPlayObj) === false && drawnArr[drawnArr.length - 1]['rank'] !== '8'
                ) {
                    deckArr = cards.shuffle(discardPileArr);
                    discardPileArr = [];
                    const observed2 = cards.drawUntilPlayable(deckArr, nextPlayObj);
                    let drawnArr2;
                    [deckArr, drawnArr2] = observed2;
                    drawnArr = drawnArr.concat(drawnArr2);
                } else {
                    deckArr = cards.shuffle(discardPileArr);
                    discardPileArr = [];
                }
            }

            console.log("CardDrawn: " + cards.handToString(drawnArr, '  '));

            const playerCard = drawnArr.pop();
            console.log('You play: ' + showCard(playerCard));
            playerHandArr = playerHandArr.concat(drawnArr);
            console.log("Now your card is: " + cards.handToString(playerHandArr, " "));

            if (playerCard['rank'] === 8) {
                console.log("Crazy eight!");
                const tempCard = { "suit": undefined, "rank": undefined };
                playerCardNum = question('Please choose the suit: \n1: ♠️\n2: ❤️\n3: ♣️\n4: ♦️\n>');
                while (playerCardNum !== '1' && playerCardNum !== '2' && playerCardNum !== '3' && playerCardNum !== '4') {
                    playerCardNum = question('Invalid input. Please choose the suit:');
                }
                if (playerCardNum === '1') {
                    console.log("You choosed suit ");
                    tempCard['suit'] = '♠️';
                } else if (playerCardNum === '2') {
                    console.log("You choosed suit ❤️");
                    tempCard['suit'] = '❤️';
                } else if (playerCardNum === '3') {
                    console.log("You choosed suit ♣️");
                    tempCard['suit'] = '♣️';
                } else {
                    console.log("You choosed suit ♦️");
                    tempCard['suit'] = '♦️';
                }

                nextPlayObj = tempCard;

            } else {
                nextPlayObj = playerCard;
            }
            discardPileArr.push(playerCard);
            playerCardNum = question('Press Enter to continue');
        }

        console.clear();
        turnNum++;
    }
}

// outer:
// while (computerHandArr.length !== 0 || playerHandArr.length !== 0) {
//     displayBoard();
//     console.log("😊 Player's turn...");
//     if (playable(playerHandArr, nextPlayObj)) {
//         console.log('Enter the number of the card you would like to play');
//         console.log(cards.handToString(playerHandArr, '\n', true));

//         let playerCardNum = question('>');

//         // while(!(playerCardNum%1 === 0 && 1 <= playerCardNum && playerCardNum <= playerHandArr.length) && !canPlay((playerCardNum-1))){
//         //     playerCardNum = question('Invalid input. Enter the number of the card you would like to play\n>');
//         // }

//         while (true) {
//             console.log(!(playerCardNum % 1 === 0 && 1 <= playerCardNum && playerCardNum <= playerHandArr.length));

//             if (!(playerCardNum % 1 === 0 && 1 <= playerCardNum && playerCardNum <= playerHandArr.length)) {
//                 playerCardNum = question('Invalid input. Enter the number of the card you would like to play\n>');
//                 continue;
//             }

//             console.log(canPlay(playerCardNum - 1));
//             if (canPlay(playerCardNum - 1) == false) {
//                 playerCardNum = question('You can not play this card. Please choose anoher\n>');
//                 continue;
//             }

//             break;

//         }

//         let playerCard = playerHandArr[playerCardNum - 1];
//         console.log("You played " + showCard(playerCard));

//         if (playerCard['rank'] == 8) {
//             console.log("Crazy eight!");
//             playerCardNum = question('Please choose the suit: \n1: ♠️\n2: ❤️\n3: ♣️\n4: ♦️\n');
//             while (playerCardNum != '1' && playerCardNum != '2' && playerCardNum != '3' && playerCardNum != '4') {
//                 playerCardNum = question('Invalid input. Please choose the suit:');
//             }
//             if (playerCardNum == '1') {
//                 nextPlayObj['suit'] = '♠️';
//             } else if (playerCardNum == '2') {
//                 nextPlayObj['suit'] = '❤️';
//             } else if (playerCardNum == '3') {
//                 nextPlayObj['suit'] = '♣️';
//             } else {
//                 nextPlayObj['suit'] = '♦️';
//             }
//             nextPlayObj['rank'] = undefined;



//         } else {
//             nextPlayObj = playerCard;
//         }

//         discardPileArr.push(playerCard);
//         playerHandArr.splice(playerCardNum - 1, 1);

//         if (playerHandArr.length == 0) {
//             console.log("Player win");
//             break outer;
//         }
//         console.log("Now player's hand is:" + cards.handToString(playerHandArr, "  "));

//         playerCardNum = question('Press Enter to continue');

//     } else {
//         // eslint-disable-next-line no-use-before-define
//         console.log('😔 You have no playable cards');
//         let playerCardNum;
//         playerCardNum = question('Press ENTER to draw cards until matching: ' + showCard(nextPlayObj) + '\n');
//         let observed = cards.drawUntilPlayable(deckArr, nextPlayObj);
//         let drawnArr = [];
//         [deckArr, drawnArr] = observed;
//         if (deckArr.length == 0) {
//             deckArr = cards.shuffle(discardPileArr);
//             discardPileArr = [];
//             let observed2 = cards.drawUntilPlayable(deckArr, nextPlayObj);
//             let drawnArr2;
//             [deckArr, drawnArr2] = observed2;
//             drawnArr = drawnArr.concat(drawnArr2);
//         }

//         console.log("CardDrawn: " + cards.handToString(drawnArr, '  '));

//         let playerCard = drawnArr.pop();
//         console.log('You play: ' + showCard(playerCard));
//         playerHandArr = playerHandArr.concat(drawnArr);
//         console.log("Now your card is: " + cards.handToString(playerHandArr, " "));

//         if (playerCard['rank'] == 8) {
//             console.log("Crazy eight!");
//             playerCardNum = question('Please choose the suit: \n1: ♠️\n2: ❤️\n3: ♣️\n4: ♦️\n')
//             while (playerCardNum != '1' && playerCardNum != '2' && playerCardNum != '3' && playerCardNum != '4') {
//                 playerCardNum = question('Invalid input. Please choose the suit:');
//             }
//             if (playerCardNum == '1') {
//                 nextPlayObj['suit'] = '♠️';
//             } else if (playerCardNum == '2') {
//                 nextPlayObj['suit'] = '❤️';
//             } else if (playerCardNum == '3') {
//                 nextPlayObj['suit'] = '♣️';
//             } else {
//                 nextPlayObj['suit'] = '♦️';
//             }
//             nextPlayObj['rank'] = undefined;
//         } else {
//             nextPlayObj = playerCard;
//         }

//         discardPileArr.push(playerCard);
//         playerCardNum = question('Press Enter to continue');
//     }

//     console.clear();






//     // computer's turn
//     displayBoard();
//     if (playable(computerHandArr, nextPlayObj)) {
//         console.log("Computer's hand is:" + cards.handToString(computerHandArr, '  '));

//         let computerPlayNum = computerPlayFun();

//         let computerCard = computerHandArr[computerPlayNum];
//         console.log("Computer plays " + showCard(computerCard));

//         if (computerCard['rank'] == 8) {
//             console.log("Crazy eight!");
//             let computerChooseSuitNum = computerChooseSuit();

//             if (computerChooseSuitNum == '1') {
//                 nextPlayObj['suit'] = '♠️';
//             } else if (computerChooseSuitNum == '2') {
//                 nextPlayObj['suit'] = '❤️';
//             } else if (computerChooseSuitNum == '3') {
//                 nextPlayObj['suit'] = '♣️';
//             } else {
//                 nextPlayObj['suit'] = '♦️';
//             }

//             nextPlayObj['rank'] = undefined;



//         } else {
//             nextPlayObj = computerCard;
//         }

//         discardPileArr.push(computerCard);
//         computerHandArr.splice(computerPlayNum, 1);

//         if (computerHandArr.length == 0) {
//             console.log("Computer win");
//             break outer;
//         }


//         let playerCardNum = question('Press Enter to continue');

//     } else {
//         console.log('😔 Computer have no playable cards');

//         let observed = cards.drawUntilPlayable(deckArr, nextPlayObj);
//         let drawnArr = [];
//         [deckArr, drawnArr] = observed;
//         if (deckArr.length == 0) {
//             deckArr = cards.shuffle(discardPileArr);
//             discardPileArr = [];
//             let observed2 = cards.drawUntilPlayable(deckArr, nextPlayObj);
//             let drawnArr2;
//             [deckArr, drawnArr2] = observed2;
//             drawnArr = drawnArr.concat(drawnArr2);
//         }

//         console.log("Computer draws card: " + cards.handToString(drawnArr, '  '));

//         let computerCard = drawnArr.pop();
//         console.log('Computer plays: ' + showCard(computerCard));
//         computerHandArr = computerHandArr.concat(drawnArr);
//         console.log("Now computer's hand is: " + cards.handToString(computerHandArr, " "));

//         if (computerCard['rank'] == 8) {
//             console.log("Crazy eight!");

//             let computerChooseSuitNum = computerChooseSuit();
//             if (computerChooseSuitNum == '1') {
//                 nextPlayObj['suit'] = '♠️';
//                 console.log("computer chooses suit " + "♠️");
//             } else if (computerChooseSuitNum == '2') {
//                 nextPlayObj['suit'] = '❤️';
//                 console.log("computer chooses suit " + "❤️");
//             } else if (computerChooseSuitNum == '3') {
//                 nextPlayObj['suit'] = '♣️';
//                 console.log("computer chooses suit " + "♣️");
//             } else {
//                 nextPlayObj['suit'] = '♦️';
//                 console.log("computer chooses suit " + "♦️");
//             }
//             nextPlayObj['rank'] = undefined;



//         } else {
//             nextPlayObj = computerCard;
//         }

//         discardPileArr.push(computerCard);
//         let playerCardNum = question('Press Enter to continue');
//     }

//     console.clear();

// }
