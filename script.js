document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Pega a foto que você enviou
    if (file) {
        const reader = new FileReader(); // Lê a foto
        reader.onload = function(e) {
            const img = new Image(); // Cria um objeto de imagem
            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d'); // Desenha na área de foto
                canvas.width = img.width; // Ajusta o tamanho do canvas para a foto
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0); // Desenha a foto no canvas

                // Adiciona a máscara PNG
                const maskImg = new Image();
                maskImg.src = 'mask.png'; // O nome da máscara PNG
                maskImg.onload = function() {
                    ctx.drawImage(maskImg, 0, 0, img.width, img.height); // Aplica a máscara sobre a foto
                };
            };
            img.src = e.target.result; // Mostra a foto no canvas
        };
        reader.readAsDataURL(file); // Lê a foto como um URL de dados
    }
});

document.getElementById('download').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'imagem_com_mascara.png'; // Nome do arquivo para download
    link.href = canvas.toDataURL('image/png'); // Converte o canvas para imagem PNG
    link.click(); // Inicia o download da imagem
});