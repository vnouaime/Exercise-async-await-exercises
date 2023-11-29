const baseURL = "https://deckofcardsapi.com/api/deck";
const $draw_card_button = $("#draw_card_button");
const $cards = $("#cards")

// Used to set deckID if there is one
let deckID;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw one Card From Newly Shuffled Deck
async function drawCard() {
    /*
    Gets response from api in form of object and console.logs value and suit to console. 
    If rejected, console.logs error. 
    */

    try {
        let {data} = await axios.get(`${baseURL}/new/draw/?count=1`)

        data.cards.forEach(index => console.log(`${index.value} of ${index.suit.toLowerCase()}`))
    }
    catch (e) {
        console.log(e)
    }
}

drawCard()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw Multiple Cards From Newly Shuffled Deck


async function createOrDraw() {
    /*
    If there is no deckID, requests to api and retrieves new shuffled deck and draws one card.
    Stores deckID in variable and generates HTML for card. 
    
    If there is a deckID, requests to api and draws another card from the existing deck. 
    Generates HTML for card. If remaining cards = 0, the draw card button is removed from the browser.

    If any are rejected, console.logs error.
    */

    if (!deckID) {
        try {
            let {data} = await axios.get(`${baseURL}/new/draw/?count=1`)

            deckID = data.deck_id
            generateCardHTML(data)

        }
        catch (e) {
            console.log(e)
        }
    } else {
        try {
            let {data} = await axios.get(`${baseURL}/${deckID}/draw/?count=1`)

            generateCardHTML(data)

            if (data.remaining === 0) {
                $draw_card_button.remove()
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

$draw_card_button.on("click", createOrDraw)


function generateCardHTML(cardData) {
    /*
    Generates HTML for each card.
    */

    let $div = $("<div>")
    let $img = $("<img>")

    $div.addClass("card")
    $img.addClass("card_image")  
     
    $cards.append($div)
    $div.append($img)
    $img.attr("src", cardData.cards[0].image)

    
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;

    $img.css({
        "transform": `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
    })

 
}