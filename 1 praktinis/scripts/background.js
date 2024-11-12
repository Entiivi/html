document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
        console.error('Canvas element not found');
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context could not be retrieved');
    }

    // Adjust canvas size to fill the window
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log('Canvas size set to:', canvas.width, canvas.height);
    }

    setCanvasSize();
    window.addEventListener('resize', () => {
        setCanvasSize();
        init(); // Reinitialize particles on resize
    });

    // Particle array
    const particlesArray = [];

    // Particle class definition
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Update particle movement
        update() {
            // Reverse direction if particle hits the edge
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.directionY = -this.directionY;
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // Draw particle again
            this.draw();
        }
    }

    // Create particles
    function init() {
        particlesArray.length = 0; // Clear the particles array before initializing
        const numberOfParticles = Math.floor((canvas.height * canvas.width) / 30000);
        console.log('Initializing particles:', numberOfParticles);
        for (let i = 0; i < numberOfParticles; i++) {
            const size = (Math.random() * 1) + 1;
            const x = Math.random() * (canvas.width - size * 10) + size;
            const y = Math.random() * (canvas.height - size * 10) + size;
            const directionX = (Math.random() * 0.2) - 0.1;
            const directionY = (Math.random() * 0.2) - 0.1;
            const color = `rgba(255, 255, 255, 0.3)`;

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Animate particles
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw each particle
        particlesArray.forEach(particle => particle.update());
        connectParticles();
    }

    // Connect particles with lines
    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = dx * dx + dy * dy;

                if (distance < 10000) {
                    const opacity = 1 - (distance / 10000);
                    const colorA = particlesArray[a].color.match(/\d+/g);
                    const colorB = particlesArray[b].color.match(/\d+/g);
                    const avgRed = (parseInt(colorA[0]) + parseInt(colorB[0])) / 2;
                    const avgGreen = (parseInt(colorA[1]) + parseInt(colorB[1])) / 2;
                    const avgBlue = (parseInt(colorA[2]) + parseInt(colorB[2])) / 2;

                    ctx.strokeStyle = `rgba(${avgRed}, ${avgGreen}, ${avgBlue}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Mouse interaction effect
    window.addEventListener('mousemove', (event) => {
        particlesArray.forEach(particle => {
            const dx = event.clientX - particle.x;
            const dy = event.clientY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                particle.x -= dx / 20;
                particle.y -= dy / 20;
            }
        });
    });

    // Initialize and animate particles
    init();
    animate();
});
