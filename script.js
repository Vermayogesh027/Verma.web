// Password Toggle (Show/Hide)
function togglePass() {
    const passInput = document.getElementById("password");
    const eye = document.getElementById("eyeBtn");
    
    if (passInput.type === "password") {
        passInput.type = "text";
        eye.innerText = "🔒"; // Band aankh ya lock icon
    } else {
        passInput.type = "password";
        eye.innerText = "👁️";
    }
}

// Unlock Logic
function unlock() {
    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes().toString().padStart(2, '0');
    
    // Format: VYOM + HH + MM + @
    const correctPass = "VYOM" + hh + mm + "@";
    const userTyped = document.getElementById("password").value;

    if (userTyped === correctPass) {
        document.getElementById("lockScreen").classList.add("hidden");
        document.getElementById("mainSite").classList.remove("hidden");
        document.body.style.overflow = "auto";
        initMatrix();
    } else {
        document.getElementById("errorMsg").innerText = "WRONG PASSWORD!";
        // console.log("Try: " + correctPass); // Testing ke liye
    }
}

// Matrix Effect
function initMatrix() {
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01VYOM$#%&YOGESH";
    const size = 16;
    const cols = canvas.width / size;
    const drops = Array(Math.floor(cols)).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff9c";
        ctx.font = size + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * size, drops[i] * size);
            if (drops[i] * size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 35);
}

// Enter Key se bhi unlock ho jaye
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") unlock();
});
