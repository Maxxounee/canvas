const canvas = document.querySelector('canvas');
const particlesArray = [];
let hue = 0;

class Context2d {
    constructor(canvas) {
        this.instance = canvas.getContext('2d');
    }

    clear() {
        this.instance.clearRect(0, 0, innerWidth, innerHeight);
    }
}

const context = new Context2d(canvas);

class Mouse {
    static #instance = null;

    constructor() {
        if (Mouse.#instance) {
            return Mouse.#instance;
        }
        Mouse.#instance = this;
    }

    setCoords({ x, y }) {
        this.x = x;
        this.y = y;
    }

    get coords() {
        return { x: this.x, y: this.y };
    }
}

class Particle {
    constructor(obj) {
        const options = {
            x: 230,
            y: 340,
            sizeMultiplier: 30,
            speedMultiplier: 5,
            hue: null,
            ...obj,
        };
        this.x = options.x;
        this.y = options.y;
        this.size = Particle.#getSize(options.sizeMultiplier);
        this.speedX = Particle.#getSpeed(options.speedMultiplier);
        this.speedY = Particle.#getSpeed(options.speedMultiplier);
        this.hue = options.hue ?? Particle.#getHue();
    }

    static #getHue() {
        return Math.ceil(Math.random() * 360);
    }

    static #getSpeed(multiplier) {
        return (Math.random() - 0.5) * multiplier * 2;
    }

    static #getSize(multiplier) {
        return 1 + Math.random() * multiplier;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.color = `hsl(${this.hue}, 80%, 50%`;
        // this.hue = (this.hue + 1) % 360;
        if (this.size > 0.2) {
            this.size -= 0.05;
        }
    }

    draw(context) {
        if (!context) {
            return;
        }
        // context.fillStyle = `hsl(${this.hue}, 80%, 50%`;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

const mouse = new Mouse();

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function mouseEvent(event) {
    mouse.setCoords(event);
    const opt = {
        x: mouse.x,
        y: mouse.y,
        sizeMultiplier: 10,
        speedMultiplier: 2,
        hue,
    };
    const count = Math.ceil(Math.random() * 2);
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle(opt));
    }
}

function addEventListeners() {
    window.addEventListener('resize', resize);
    canvas.addEventListener('click', mouseEvent);
    canvas.addEventListener('mousemove', (event) => {
        requestAnimationFrame(mouseEvent.bind(this, event));
    });
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(context.instance);
        /* соединительные линии */
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                context.instance.beginPath();
                context.instance.strokeStyle = particlesArray[i].color;
                context.instance.moveTo(particlesArray[i].x, particlesArray[i].y);
                context.instance.lineTo(particlesArray[j].x, particlesArray[j].y);
                context.instance.stroke();
            }
        }
        if (particlesArray[i].size < 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    // context.clear();
    /* Перекрытие старого канваса новым. Иллюзия хвостов */
    context.instance.fillStyle = 'rgba(30,40,50,0.05)';
    context.instance.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 5;
    requestAnimationFrame(animate);
}

function getParticlesArr(count) {
    const arr = [];
    for (let i = 0; i < count; i++) {
        const particleOpt = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        };
        arr.push(new Particle(particleOpt));
    }
    return arr;
}

(function main() {
    resize();
    particlesArray.push(...getParticlesArr(100));
    addEventListeners();
    animate();
})();
