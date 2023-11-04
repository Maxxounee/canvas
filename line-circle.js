const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

c.fillStyle = 'rgba(255, 0, 0, 0.1)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(255, 255, 0, 0.4)';
c.fillRect(300, 400, 100, 100);
c.fillStyle = 'rgba(0, 255, 255, 0.4)';
c.fillRect(200, 200, 100, 100);

/* line */
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = 'blue';
c.stroke();
/* circle */

c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = 'red';
c.stroke();

for (let i = 0; i < 10; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    c.strokeStyle = `rgba(${r}, ${g}, ${b}, 1)`;
    c.beginPath();
    c.arc(x, y, 10 + 10 * i, 0, Math.PI * 2, false);
    c.stroke();
}
