const express = require('express');
const axios = require('axios'); // Untuk melakukan request HTTP ke Pokémon API
const app = express();
const port = 3000;

// Middleware untuk parsing JSON request body
app.use(express.json());

//  GET untuk mendapatkan data dari Pokémon API
app.get('/pokemon/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  POST untuk menambahkan data Pokémon 
app.post('/pokemon', (req, res) => {
    const newPokemon = req.body;
    res.status(201).json({ message: 'insert pokemon', pokemon: newPokemon });
});

//  PUT untuk mengupdate data Pokémon
app.put('/pokemon/:name', (req, res) => {
    const name = req.params.name;
    const updatedPokemon = req.body;
    res.json({ message: 'ini operasi put', name, updatedPokemon });
});

// PATCH untuk melakukan partial update data Pokémon 
app.patch('/pokemon/:name', (req, res) => {
    const name = req.params.name;
    const updates = req.body;
    res.json({ message: 'ini operasi put patch', name, updates });
});

// DELETE untuk menghapus data Pokémon 
app.delete('/pokemon/:name', (req, res) => {
    const name = req.params.name;
    res.json({ message: 'ini operasi delete', name });
});

// HEAD untuk memeriksa apakah Pokémon ada
app.head('/pokemon/:name', async (req, res) => {
    try {
        const name = req.params.name;
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        // Hanya kirimkan status code 200 jika data ada, tanpa body
        res.status(200).end();
    } catch {
        // Kirimkan status code 404 jika data tidak ditemukan
        res.status(404).end();
    }
});


// OPTIONS untuk melihat metode yang didukung
app.options('/pokemon', (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(204).end();
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:3000/`);
});
