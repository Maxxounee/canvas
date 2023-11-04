const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
window.addEventListener('mousemove', animateMouse);

const mouse = {
    x: undefined,
    y: undefined,
};
const circles = [];

class Circle {
    deltaX = null;
    deltaY = null;
    x = null;
    y = null;

    constructor(obj = { x: null, y: null, radius: null, dx: null, dy: null }) {
        this.x = obj.x || this._getRandom(innerWidth);
        this.y = obj.y || this._getRandom(innerHeight);
        this.dx = obj.dx || this._getRandomWide(5);
        this.dy = obj.dy || this._getRandomWide(5);
        this.radius = obj.radius || this._getRandomRadius();
        this._getRandomDelta();
    }

    _getRandom(max) {
        return Math.random() * max;
    }

    _getRandomWide(max) {
        return (Math.random() - 0.5) * max * 2;
    }

    _getRandomDelta() {
        this.deltaX = (Math.random() * this.dx);
        this.deltaY = (Math.random() * this.dy);
    }

    _getRandomRadius() {
        return Math.random() * 100;
    }

    changePositions() {
        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.deltaX = -this.deltaX;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.deltaY = -this.deltaY;
        }
        this.x += this.deltaX;
        this.y += this.deltaY;

        const termX = mouse.x - this.x < 50 && mouse.x - this.x > -50;
        const termY = mouse.y - this.y < 50 && mouse.y - this.y > -50;
        if (termX && termY && this.radius < 100) {
            this.radius += 1;
        } else if (this.radius > 20) {
            this.radius--;
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.fill();
        c.stroke();
    }
}

for (let i = 0; i < 20; i++) {
    circles.push(new Circle());
}

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    circles.forEach((circle) => {
        circle.draw();
        circle.changePositions();
    });
    requestAnimationFrame(animate);
}

function animateMouse(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}

animate();
