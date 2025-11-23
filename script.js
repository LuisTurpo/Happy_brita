document.addEventListener('DOMContentLoaded', function() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const photoFrame = document.getElementById('photoFrame');
    const closeFrame = document.getElementById('closeFrame');
    const confettiContainer = document.querySelector('.confetti-container');
    
    // Efecto de confeti
    function createConfetti() {
        // Limpiar confeti anterior
        confettiContainer.innerHTML = '';
        
        // Crear nuevo confeti
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Colores aleatorios
            const colors = ['#ff4081', '#4caf50', '#2196f3', '#ffeb3b', '#9c27b0', '#ff9800'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.background = randomColor;
            
            // Posición y animación aleatoria
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 2) + 's';
            
            // Tamaño y forma aleatoria
            const size = Math.random() * 10 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Rotación aleatoria
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            confettiContainer.appendChild(confetti);
            
            // Eliminar confeti después de la animación
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Reproducir música de cumpleaños
    function playBirthdaySong() {
        // Crear contexto de audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Notas de "Cumpleaños Feliz" en Hz
        const notes = [
            392, 392, 440, 392, 523, 494,
            392, 392, 440, 392, 587, 523,
            392, 392, 784, 659, 523, 494, 440,
            698, 698, 659, 523, 587, 523
        ];
        
        // Duración de cada nota
        const durations = [
            0.5, 0.5, 1, 1, 1, 2,
            0.5, 0.5, 1, 1, 1, 2,
            0.5, 0.5, 1, 1, 1, 1, 2,
            0.5, 0.5, 1, 1, 1, 2
        ];
        
        let time = audioContext.currentTime;
        
        // Crear oscilador para cada nota
        notes.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, time);
            oscillator.type = 'sine';
            
            // Configurar volumen (envelope)
            gainNode.gain.setValueAtTime(0, time);
            gainNode.gain.linearRampToValueAtTime(0.3, time + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, time + durations[index]);
            
            oscillator.start(time);
            oscillator.stop(time + durations[index]);
            
            time += durations[index];
        });
    }
    
    // Mostrar mensaje especial
    function showSpecialMessage() {
        // Cambiar el mensaje principal
        const message = document.querySelector('.message');
        message.innerHTML = `
            <p>¡Yulis, eres una persona increíble!</p>
            <p>Que todos tus sueños se hagan realidad y que este nuevo año de vida te traiga</p>
            <p>mucha felicidad, amor y éxito en todo lo que te propongas.</p>
            <p>¡Te mereces lo mejor! 🎉🎂</p>
        `;
        
        // Cambiar color de fondo
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        // Agregar efecto de brillo al nombre
        const nameElement = document.querySelector('.birthday-girl');
        nameElement.style.textShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff4081';
        nameElement.style.animation = 'pulse 1s infinite';
    }
    
    // Botón de sorpresa
    surpriseBtn.addEventListener('click', function() {
        // Crear confeti
        createConfetti();
        
        // Reproducir canción
        playBirthdaySong();
        
        // Mostrar mensaje especial
        showSpecialMessage();
        
        // Mostrar marco de foto después de un breve retraso
        setTimeout(() => {
            photoFrame.classList.remove('hidden');
        }, 2000);
        
        // Cambiar texto del botón
        this.textContent = '¡Más sorpresas!';
        this.style.background = '#9c27b0';
    });
    
    // Cerrar marco de foto
    closeFrame.addEventListener('click', function() {
        photoFrame.classList.add('hidden');
    });
    
    // Efecto adicional: hacer que los globos sean arrastrables
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        balloon.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.animation = 'float 6s ease-in-out infinite';
            }, 500);
        });
    });
    
    // Efecto de escritura para el mensaje (opcional)
    function typeWriterEffect() {
        const message = document.querySelector('.message p');
        const text = message.textContent;
        message.textContent = '';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                message.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50);
    }
    
    // Iniciar efecto de escritura después de cargar la página
    setTimeout(typeWriterEffect, 1000);
});