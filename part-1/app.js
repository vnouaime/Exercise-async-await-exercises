const baseURL = "http://numbersapi.com";
const factTypes = ["math", "trivia", "date", "year"]

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Range Number Facts
async function rangeNumberFacts(minNum, maxNum) {
    /*
    Calls api to get response with data for range of numbers. If promise is fufilled, then function is called to generate HTML for fact. If tghere is an error, browser will alert user that something is wrong. 
    */

   try {
    let {data} = await axios.get(`${baseURL}/${minNum}..${maxNum}`);

    for (const [key, value] of Object.entries(data)) {
        generateFactHTML(value)
    }
   }
   catch {
    alert("Something went wrong")
   }
}

rangeNumberFacts(1, 5)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Favorite Number Facts
async function favoriteNumberFacts(number, fact) {
    /*
    Calls api to get response with data for favorite numbers. If promise if fulfilled, then function is called to generate HTML for fact. If there is an error, browser will alert user that something is wrong. 
    */

    try {
        let {data} = await axios.get(`${baseURL}/${number}/${fact}?json`)
        generateFactHTML(data.text)
    }
    catch {
        alert("Something went wrong")
    }
}

factTypes.forEach(function(fact) {
    // Loops through different types of facts from array into favoriteNumberFacts
    favoriteNumberFacts(10, fact)
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HTML Generator Function for Facts
function generateFactHTML(fact) {
    /* 
    Generates HTML for each fact generated in different arrays and appends to list
    */
    let $listOfFacts = $("#list_facts");
    let $fact = $("<li>");

    $listOfFacts.append($fact);
    $fact.html(`${fact}`);
}