const wheel = document.getElementById('wheel');
const thumbs = document.querySelectorAll('.thumb');
const bg = document.getElementById('mainBg');

const colors = ["#FFA500", "#FF4747", "#2ECC71", "#9B59B6"];
const titles = ["Orange Juice", "Berry Blast", "Kiwi Fresh", "Wild Grape"];

// UPDATED: Array holding your background images. 
// Replace 'orange-bg.jpg' etc. with your actual file names.
const bgImages = [
    "url('orange-bg.webp')",   // Matches index 0 (Orange)
    "url('berry-bg.webp')",    // Matches index 1 (Strawberry)
    "url('kiwi-bg.webp')",     // Matches index 2 (Kiwi)
    "url('grape-bg.webp')"     // Matches index 3 (Grape)
];

thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        // Rotate wheel
        wheel.style.transform = `rotate(${index * -90}deg)`;

        // Update Text & Colors
        document.getElementById('title').innerText = titles[index];
        document.getElementById('btn').style.background = colors[index];
        
        // UPDATED: Apply the new background image layered with a colored glow
        bg.style.backgroundImage = `radial-gradient(circle at 80% 50%, ${colors[index]}88, transparent 60%), ${bgImages[index]}`;

        // Active class
        document.querySelector('.thumb.active').classList.remove('active');
        thumb.classList.add('active');
    });
});