// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

// Servir imágenes del directorio 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint para buscar imágenes
app.get('/api/search-images', (req, res) => {
    const searchName = req.query.name.toLowerCase();
    const dirPath = path.join(__dirname, 'images');

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }

        const matchedImages = files.filter(file => file.toLowerCase().includes(searchName)).map(file => ({
            name: file,
            path: `/images/${file}`
        }));

        res.json({ images: matchedImages });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
