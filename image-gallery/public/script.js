document.addEventListener('DOMContentLoaded', () => {
    fetchImageList();
});

let totalSelectedCount = 0;

function fetchImageList() {
    fetch('http://localhost:3000/api/images')
        .then(response => response.json())
        .then(images => {
            const imageList = document.getElementById('imageList');
            imageList.innerHTML = '';  // Limpiar la lista actual
            
            images.forEach(imageName => {
                const img = document.createElement('img');
                img.src = `http://localhost:3000/images/${imageName}`;
                img.alt = imageName;
                img.onclick = () => addToImageStack(imageName, img.src);
                
                imageList.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de imágenes:', error);
        });
}

function addToImageStack(imageName, src) {
    const imageStackContainer = document.getElementById('imageStack');
    let stackGroup = document.querySelector(`#imageStack .stack-group[data-name="${imageName}"]`);
    
    if (!stackGroup) {
        // Crear un nuevo grupo para las imágenes
        stackGroup = document.createElement('div');
        stackGroup.className = 'stack-group';
        stackGroup.dataset.name = imageName;

        const count = document.createElement('div');
        count.className = 'count';
        count.textContent = '1';
        
        stackGroup.appendChild(count);
        imageStackContainer.appendChild(stackGroup);
    }

    const stackItems = stackGroup.querySelectorAll('.stack-item');
    const stackItemCount = stackItems.length;

    if (stackItemCount < 3) {
        // Añadir una nueva imagen al grupo
        const stackItem = document.createElement('div');
        stackItem.className = 'stack-item';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = imageName;
        
        stackItem.appendChild(img);
        stackGroup.appendChild(stackItem);

        // Actualizar el contador de imágenes
        const countDiv = stackGroup.querySelector('.count');
        countDiv.textContent = stackItemCount + 1;
    } else {
        alert(`Ya se han añadido 3 imágenes de este tipo.`);
    }

    // Actualizar el total de imágenes seleccionadas
    totalSelectedCount++;
    document.getElementById('totalCount').textContent = totalSelectedCount;
    
    // Hacer que la imagen seleccionada se pueda deseleccionar
    const selectedImage = document.getElementById('selectedImage');
    selectedImage.src = src;
    selectedImage.onclick = () => removeFromImageStack(imageName, src);
}

function removeFromImageStack(imageName, src) {
    const imageStackContainer = document.getElementById('imageStack');
    const stackGroup = document.querySelector(`#imageStack .stack-group[data-name="${imageName}"]`);
    
    if (stackGroup) {
        const stackItems = stackGroup.querySelectorAll('.stack-item');
        if (stackItems.length > 0) {
            const lastItem = stackItems[stackItems.length - 1];
            stackGroup.removeChild(lastItem);
            
            const countDiv = stackGroup.querySelector('.count');
            countDiv.textContent = stackItems.length;
            
            if (stackItems.length === 0) {
                imageStackContainer.removeChild(stackGroup);
            }

            // Actualizar el total de imágenes seleccionadas
            totalSelectedCount--;
            document.getElementById('totalCount').textContent = totalSelectedCount;
        }
    }
}
