document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const historyContainer = document.getElementById('history');
    if (generateButton) {
        generateButton.addEventListener('click', function () {
            const selectedKey = document.getElementById('key').value;
            const numChords = parseInt(document.getElementById('dispAmount').value, 10);
            const resultDiv = document.getElementById('result');
            console.log('Selected Key:', selectedKey);
            console.log('Number of Chords:', numChords);
            if (selectedKey !== 'default' && numChords > 0) {
                resultDiv.innerHTML = '<p>Loading...</p>';
                axios.get(`https://piano-chords.p.rapidapi.com/chords/${selectedKey}`, {
                    headers: {
                        'X-RapidAPI-Key': 'f5f910f28amsh351932cc806dd11p1f05a4jsn7c634d9b743a',
                        'X-RapidAPI-Host': 'piano-chords.p.rapidapi.com'
                    }
                })
                .then(response => {
                    console.log('API Response:', response.data);
                    const chords = response.data;
                    displayChords(chords);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    resultDiv.innerHTML = '<p>Error fetching data</p>';
                })
                function displayChords(chords) {
                    resultDiv.innerHTML = '<h3>Generated Chords:</h3>'
                    const allChords = []
                    for (const note in chords) {
                        if (chords.hasOwnProperty(note)) {
                            for (const chordType in chords[note]) {
                                if (chords[note].hasOwnProperty(chordType)) {
                                    const chordName = `${note} ${chordType}`;
                                    allChords.push(chordName);
                                }
                            }
                        }
                    }
                    shuffleArray(allChords);
                    const numChordsToDisplay = Math.min(allChords.length, numChords);
                    for (let i = 0; i < numChordsToDisplay; i++) {
                        resultDiv.innerHTML += `<p>${allChords[i]}</p>`;
                    }
                    addToHistory(allChords.slice(0, numChordsToDisplay));
                }
                function shuffleArray(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                }
                function addToHistory(chords) {
                    historyContainer.innerHTML += '<h3>Recent Progression:</h3>';
                    chords.forEach((chord, index) => {
                        historyContainer.innerHTML += `<p>${chord}</p>`;
                    });
                }
            } else {
                resultDiv.innerHTML = '';
            }
        });
    } else {
        console.error('Something went wrong.')
    }
});