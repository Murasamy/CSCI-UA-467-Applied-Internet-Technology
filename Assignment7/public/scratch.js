function generateDeck(startValues) {
    const suits = ["hearts", "diamonds", "spades", "clubs"];
    const cards = [];
    const topCards = [];

    for (let i = 0; i < startValues.length; i++) {
        const suit = suits[Math.floor(Math.random() * 4)];
        if (startValues[i] === "A") {
            if (topCards.indexOf("ace_of_" + suit + ".png") > -1) {
                i--;
            } else {
                topCards.push("ace_of_" + suit + ".png");
            }
        } else if (startValues[i] === "J") {
            if (topCards.indexOf("jack_of_" + suit + "2.png") > -1) {
                i--;
            } else {
                topCards.push("jack_of_" + suit + "2.png");
            }
        } else if (startValues[i] === "Q") {
            if (topCards.indexOf("queen_of_" + suit + "2.png") > -1) {
                i--;
            } else {
                topCards.push("queen_of_" + suit + "2.png");
            }
        } else if (startValues[i] === "K") {
            if (topCards.indexOf("king_of_" + suit + "2.png") > -1) {
                i--;
            } else {
                topCards.push("king_of_" + suit + "2.png");
            }
        } else {
            if (topCards.indexOf(startValues[i] + "_of_" + suit + ".png") > -1) {
                i--;
            } else {
                topCards.push(startValues[i] + "_of_" + suit + ".png");
            }
        }
    }

    for (let i = 1; i <= 52; i++) {
        let card = "";
        if (i % 13 === 1) {
            card = "ace_of_" + suits[Math.floor((i - 1) / 13)] + ".png";
        } else if (i % 13 === 11) {
            card = "jack_of_" + suits[Math.floor((i - 1) / 13)] + "2.png";
        } else if (i % 13 === 12) {
            card = "queen_of_" + suits[Math.floor((i - 1) / 13)] + "2.png";
        } else if (i % 13 === 0) {
            card = "king_of_" + suits[Math.floor((i - 1) / 13)] + "2.png";
        } else {
            card = i % 13 + "_of_" + suits[Math.floor((i - 1) / 13)] + ".png";
        }

        if (topCards.indexOf(card) === - 1) {
            cards.push(card);
        }
    }
    shuffle(cards);

    return topCards.concat(cards);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

console.log(generateDeck(['5', '2','3', '4']))




console.log("===displayCards===", div);
console.log('===cards===', cards);
if (div.childNodes.length > 0) {
    div.childNodes.forEach((node) => {
        console.log("===node===", node);
        if (node.nodeName === 'IMG') {
            // console.log("===remove img===", node);
            div.removeChild(node);
        }
    })
    console.log("===after remove===", div.childNodes);
}
