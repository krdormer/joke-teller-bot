const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable Button
function toggleButton() {
    button.disabled = !button.disabled;

}

// Pass joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
            key: '9189a34fdd9843bdaf9e4b6e2459cfc7',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
    });
}

// Get Jokes from Jokes API
async function getJokes() {
    let joke = '';
    const apiURL = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-To-Speech
        tellMe(joke);
        // Button Disable
        toggleButton();
    } catch (err) {
        // Catch errors
        console.log("Error: ", err)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);