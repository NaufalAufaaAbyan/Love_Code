const canvas = document.getElementById('pinkboard');
const ctx = canvas.getContext('2d');

// Atur ukuran canvas sesuai dengan ukuran layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Warna dan efek untuk hati
ctx.strokeStyle = '#ff00ff'; // Warna garis
ctx.lineWidth = 2; // Ketebalan garis
ctx.shadowBlur = 10; // Efek blur
ctx.shadowColor = '#ff00ff'; // Warna shadow

let hearts = []; // Array untuk menyimpan objek hati
let angle = 0; // Sudut untuk mengontrol animasi

// Kelas Heart untuk membuat objek hati
class Heart {
    constructor(x, y) {
        this.x = x; // Posisi X
        this.y = y; // Posisi Y
        this.size = Math.random() * 20 + 10; // Ukuran hati (10-30)
        this.speedX = Math.random() * 3 - 1.5; // Kecepatan horizontal
        this.speedY = Math.random() * 3 - 1.5; // Kecepatan vertikal
    }

    // Update posisi dan ukuran hati
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.5) this.size -= 0.1; // Kurangi ukuran hati secara bertahap
    }

    // Gambar hati
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); // Mulai dari titik tengah bawah hati

        // Gambar sisi kanan hati
        ctx.bezierCurveTo(
            this.x + 25 * (this.size / 50), this.y - 15 * (this.size / 50), // Titik kontrol 1
            this.x + 50 * (this.size / 50), this.y - 40 * (this.size / 50), // Titik kontrol 2
            this.x, this.y - 60 * (this.size / 50) // Titik akhir
        );

        // Gambar sisi kiri hati
        ctx.bezierCurveTo(
            this.x - 50 * (this.size / 50), this.y - 40 * (this.size / 50), // Titik kontrol 1
            this.x - 25 * (this.size / 50), this.y - 15 * (this.size / 50), // Titik kontrol 2
            this.x, this.y // Kembali ke titik awal
        );

        ctx.closePath(); // Tutup path
        ctx.stroke(); // Gambar garis
        ctx.fillStyle = '#ff00ff'; // Warna fill hati
        ctx.fill(); // Isi hati dengan warna
    }
}

// Fungsi animasi
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas

    // Tambahkan hati baru setiap 10 frame
    if (angle % 10 === 0) {
        hearts.push(new Heart(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    // Update dan gambar semua hati
    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        if (heart.size <= 0.5) { // Hapus hati jika ukurannya terlalu kecil
            hearts.splice(index, 1);
        }
    });

    angle++; // Tingkatkan sudut untuk kontrol animasi
    requestAnimationFrame(animate); // Lanjutkan animasi
}

animate(); // Mulai animasi

// Resize canvas saat ukuran layar berubah
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});