// Cristiano
// ICS2O-Assignment6-HTML
// May 30 2022

'use strict'
/**
 * Check service worker.
 */
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/ICS2O-Assignment6-HTML/sw.js", {
    scope: "/ICS2O-Assignment6-HTML/",
  })
}

/**
 * Fetches a word with the URL that is provided.
 */
const getWord = async (URL) => {
  try {
    const result = await fetch(URL)
    const jsonData = await result.json()
    const json = jsonData[0]
    const word = json.word
    const meanings = json.meanings
    let numberOfJsons = 1
    
    for (let count = 0; count != numberOfJsons + 1; count++) {
      // Checks if the word's URL contains more than one JSON
      if (jsonData[count] && count != 0) {
        numberOfJsons++
      }
    }
    if (numberOfJsons != 1) {
      // Method for fetching a word with multiple JSONs
      let jsonNumber = 0
      const pronounce = json.phonetic

      document.getElementById("info").innerHTML = "<h5>Meanings of " + word + ":</h5><br><p>Pronounciation: " + pronounce + "</p>"
      for (let count = 0; jsonNumber + 1 < numberOfJsons; count++) {
        let currentJson = jsonData[jsonNumber]
        let meaning = currentJson.meanings[0]
        let partOfSpeech = meaning.partOfSpeech
        
        if (meaning.definitions[count]) {
          let text = meaning.definitions[count].definition
        
          document.getElementById("info").innerHTML = document.getElementById("info").innerHTML + "<div><h6>Meaning #" + (count + 1) + "-" + jsonNumber + "</h6>" + "<p>" + partOfSpeech + "</p>" + "<p>Definition: " + text + "</p>" + "</div>"
        } else {
          jsonNumber++
          count = -1
        }
      }
    } else {
      // Method for fetching a word with a single JSON
      const pronounce = json.phonetics[1].text
      
      document.getElementById("info").innerHTML = "<h5>Meanings of " + word + ":</h5><br><p>Pronounciation: " + pronounce + "</p>"
      for (let count = 0; count < meanings.length; count++) {
        const meaning = meanings[count]
        const partOfSpeech = meaning.partOfSpeech
        const text = meaning.definitions[0].definition
        
        document.getElementById("info").innerHTML = document.getElementById("info").innerHTML + "<div><h6>Meaning #" + (count + 1) + ": </h6>" + "<p>" + partOfSpeech + "</p>" + "<p>Definition: " + text + "</p>" + "</div>"
      }
    }
  } catch (error) {
    console.log(error)
    document.getElementById("info").innerHTML = "<h5>An error occured fetching this word.</h5>"
  }
}

/**
 * Sends a request to get a word using an API.
 */
function onButtonClick() {
  const word = document.getElementById("word").value
  
  getWord("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
}
