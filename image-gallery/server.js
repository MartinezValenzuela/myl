const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Servir imágenes desde el directorio 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Ruta para obtener la lista de imágenes
app.get('/api/images', (req, res) => {
    fs.readdir(path.join(__dirname, 'images'), (err, files) => {
        if (err) {
            res.status(500).send('Error al leer el directorio de imágenes');
            return;
        }
        // Filtrar solo archivos de imagen
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(images);
    });
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});