const canvas = document.querySelector('canvas');
const particlesArray = [];

class Context2d {
    constructor(canvas) {
        this.instanse = canvas.getContext('2d');
    }

    clear() {
        this.instanse.clearRect(0, 0, innerWidth, innerHeight);
    }

    resize(container) {
        const width = container.width || window.innerWidth;
        const height = container.height || window.innerHeight;
        // console.log(width);
        this.instanse.width = width;
        this.instanse.height = height;
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
            ...obj,
        };
        this.x = options.x;
        this.y = options.y;
        this.size = Particle.#getSize(options.sizeMultiplier);
        this.speedX = Particle.#getSpeed(options.speedMultiplier);
        this.speedY = Particle.#getSpeed(options.speedMultiplier);
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
    }

    draw(context) {
        if (!context) {
            return;
        }
        context.fillStyle = 'blue';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

const mouse = new Mouse();
const particle = new Particle();

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function mouseEvent(event) {
    mouse.setCoords(event);
}

function addEventListeners() {
    window.addEventListener('resize', resize);
    canvas.addEventListener('click', mouseEvent);
    canvas.addEventListener('mousemove', mouseEvent);
}

function animate() {
    context.clear();
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw(context.instanse);
    });
    requestAnimationFrame(animate);
}

(function main() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
    resize();
    addEventListeners();
    animate();
})();
