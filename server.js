const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/chords/:key', async (req, res) => {
    const key = req.params.key;
    try {
        const response = await axios.get(`https://piano-chords.p.rapidapi.com/chords/${key}`, {
            headers: {
                'X-RapidAPI-Key': 'f5f910f28amsh351932cc806dd11p1f05a4jsn7c634d9b743a',
                'X-RapidAPI-Host': 'piano-chords.p.rapidapi.com'
            }
        });
        const chords = response.data;
        res.status(200).json(chords);
    } catch (error) {
        console.error('Error fetching chords:', error);
        res.status(500).json({ error: 'Failed to fetch chords' });
    }
});

app.post('/api/history', (req, res) => {
    const chords = req.body && req.body.chords;
    
    if (chords) {
        res.status(200).json({ message: 'Chord progression saved successfully' });
    } else {
        res.status(400).json({ error: 'No chords provided' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});