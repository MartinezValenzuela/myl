// script.js
function searchImage() {
    const imageName = document.getElementById('imageName').value.trim();
    const imageDisplay = document.getElementById('imageDisplay');
    
    if (imageName) {
        fetch(`/api/search-images?name=${imageName}`)
            .then(response => response.json())
            .then(data => {
                imageDisplay.innerHTML = '';
                
                if (data.images.length > 0) {
                    data.images.forEach(image => {
                        const imgElement = document.createElement('img');
                        imgElement.src = image.path;
                        imgElement.alt = image.name;
                        imageDisplay.appendChild(imgElement);
                    });
                } else {
                    imageDisplay.innerHTML = '<p>No se encontraron imágenes</p>';
                }
            })
            .catch(error => {
                imageDisplay.innerHTML = '<p>Error al buscar imágenes</p>';
            });
    } else {
        imageDisplay.innerHTML = '<p>Por favor, escribe el nombre de la imagen</p>';
    }
}

function clearImages() {
    document.getElementById('imageName').value = '';
    document.getElementById('imageDisplay').innerHTML = '';
}
