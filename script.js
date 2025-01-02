function convertImage() {
    const inputFile = document.getElementById('inputFile').files[0];
    const formatSelect = document.getElementById('formatSelect').value;
    const downloadButton = document.getElementById('downloadButton');
    const formatText = document.getElementById('formatText');
    const downloadContainer = document.getElementById('downloadContainer');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!inputFile) {
        alert('Por favor selecciona una imagen.');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = function() {
            // Ajustar el tamaño del canvas al de la imagen
            canvas.width = img.width;
            canvas.height = img.height;

            // Dibujar la imagen en el canvas
            ctx.drawImage(img, 0, 0);

            // Obtener la imagen convertida en el formato seleccionado
            const convertedDataUrl = canvas.toDataURL(formatSelect);

            // Mostrar el contenedor de descarga
            downloadContainer.style.display = 'inline-block';

            // Establecer el enlace de descarga
            downloadButton.href = convertedDataUrl;
            downloadButton.download = `imagen_convertida.${formatSelect.split('/')[1]}`;

            // Actualizar el texto con el formato de la imagen
            const format = formatSelect.split('/')[1].toUpperCase();
            formatText.textContent = `Formato: ${format}`;
        };
    };
    
    reader.readAsDataURL(inputFile);
}
