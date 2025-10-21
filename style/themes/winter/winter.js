const numberOfFlakes = 200;

for (let i = 0; i < numberOfFlakes; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.style.left = Math.random() * window.innerWidth + 'px';
    flake.style.fontSize = (Math.random() * 50 + 25) + 'px';
    flake.style.animationDuration = (Math.random() * 5 + 5) + 's';
    flake.style.animationDelay = Math.random() * 5 + 's';
    flake.textContent = '.';
    document.body.appendChild(flake);
}