// cards.mjs
// const suits = { SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️' };

function range(start = undefined, end = undefined, inc = undefined) {
    const ans = [];

    if (inc === undefined && end === undefined && start !== undefined) {
        for (let i = 0; i < start; i++) {
            ans.push(i);
        }
    } else if (inc === undefined && end !== undefined && start !== undefined) {
        for (let i = start; i < end; i++) {
            ans.push(i);
        }
    } else {
        for (let i = start; i < end; i = i + inc) {
            ans.push(i);
        }
    }
    return ans;
}

function generateDeck() {
    const ans = [];
    const rankList = ['J', 'Q', 'K', 'A',
        '2', '3', '4', '5', '6',
        '7', '8', '9', '10'];

    const suits = ['♠️', '❤️', '♣️', '♦️'];

    for (let rankListNum = 0; rankListNum < rankList.length; rankListNum++) {
        for (let suitsNum = 0; suitsNum < suits.length; suitsNum++) {
            const temp = { 'suit': suits[suitsNum], 'rank': rankList[rankListNum] };
            ans.push(temp);
        }
    }
    // console.log(ans);
    return ans;
}

function shuffle(arr) {
    const copyCardArray = [];
    for (let i = 0; i < arr.length; i++) {
        copyCardArray[i] = arr[i];
    }
    let l = copyCardArray.length;
    let index, temp;
    while (l > 0) {
        index = Math.floor(Math.random() * l);
        temp = copyCardArray[l - 1];
        copyCardArray[l - 1] = copyCardArray[index];
        copyCardArray[index] = temp;
        l--;
    }
    return copyCardArray;
}


function draw(cardsArray, n = undefined) {
    const copyCardArray = [];
    const dropper = [];
    for (let i = 0; i < cardsArray.length; i++) {
        copyCardArray[i] = cardsArray[i];
    }
    if (n === undefined) { n = 1; }

    for (let i = 0; i < n; i++) {
        dropper.push(copyCardArray.pop());
    }
    const ans = [];

    ans.push(copyCardArray);
    ans.push(dropper);

    return ans;
}


function deal(cardsArray, numHand = undefined, cardsPerHand = undefined) {
    if (numHand === undefined) { numHand = 2; }
    if (cardsPerHand === undefined) { cardsPerHand = 5; }
    // const deckArr = [];
    const numHandsArr = [];
    const copyCardArray = [];
    for (let i = 0; i < cardsArray.length; i++) {
        copyCardArray[i] = cardsArray[i];
    }

    for (let numHandNum = 0; numHandNum < numHand; numHandNum++) {
        const thisHand = [];
        for (let cardsPerHandNum = 0; cardsPerHandNum < cardsPerHand; cardsPerHandNum++) {
            thisHand.push(copyCardArray.pop());
        }
        numHandsArr.push(thisHand);
    }

    const ans = { deck: copyCardArray, hands: numHandsArr };
    return ans;

}

// const deck = generateDeck();


// console.log(deal(deck)['hands']);

function handToString(hand, sep = undefined, numbers = undefined) {
    if (sep === undefined) { sep = '  '; }
    if (numbers === undefined) { numbers = false; }
    const handCopy = [];
    for (let handNum = 0; handNum < hand.length; handNum++) {
        handCopy[handNum] = hand[handNum];
    }

    let ans = '';

    if (numbers === false) {

        while (handCopy.length >= 2) {
            const card = handCopy.shift();
            const suit = card['suit'];
            const rank = card['rank'];

            ans = ans + rank + suit + sep;
        }

        if (handCopy.length !== 0) {
            const card = handCopy.shift();
            const suit = card['suit'];
            const rank = card['rank'];
            ans = ans + rank + suit;
        }
    } else {
        let idx = 1;

        while (handCopy.length >= 2) {
            const card = handCopy.shift();
            const suit = card['suit'];
            const rank = card['rank'];
            ans = ans + idx + ': ' + rank + suit + sep;
            idx++;
        }

        if (handCopy.length !== 0) {
            const card = handCopy.shift();
            const suit = card['suit'];
            const rank = card['rank'];
            ans = ans + idx + ': ' + rank + suit;
            // console.log(card);
        }
    }

    return ans;
}

function matchesAnyProperty(obj, matchObj) {
    for (const objKey in obj) { 
        for (const matchObjKey in matchObj) { 
            if (matchObjKey === objKey){
                if(obj[objKey] === matchObj[matchObjKey]){
                    return true;
                }
            }
        } 
    }
    return false;
}

// const obj = {a: 1, b: 2, c: 3};
// const search = {x: 100, y: 200, b: 2};
// const res1 = matchesAnyProperty(obj, search); // res1 is true
// const res2 = matchesAnyProperty(obj, {a: 90, b: 91}); // res2 is false
// console.log(res1, res2);

function drawUntilPlayable(deck, matchObj) {
    const expectedDeck = []; 
    const expectedCardsDrawn = [];
    for(let i = 0; i < deck.length; i++){
        expectedDeck[i] = deck[i];
    }
    for(let i = deck.length - 1; i >= 0; i--){
        const popCard = expectedDeck.pop();
        expectedCardsDrawn.push(popCard);
        if(popCard['rank'] === matchObj['rank'] || popCard['suit'] === matchObj['suit'] || popCard['rank'] === '8'){
            break;
        }
    }

    const ans = [];
    ans.push(expectedDeck);
    ans.push(expectedCardsDrawn);
    return ans;
}

export{
    range,
    generateDeck,
    shuffle, 
    draw,
    deal,
    handToString,
    matchesAnyProperty,
    drawUntilPlayable,
};



