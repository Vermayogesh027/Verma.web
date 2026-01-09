function togglePass() {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
}

document.getElementById("password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") unlock();
});

function unlock() {
    const now = new Date();
    const pass = "VYOM" + now.getHours() + now.getMinutes().toString().padStart(2, '0') + "@";
    if (document.getElementById("password").value === pass) {
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("site").classList.remove("hidden");
        document.body.style.overflow = "auto";
        startMatrix();
    } else {
        document.getElementById("error").innerText = "ACCESS DENIED";
    }
}

function openFile(fileName) {
    alert("Opening: " + fileName);
    // Asli file kholne ke liye yahan window.open(fileName) use karein
}

function startMatrix() {
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = "01VYOM#$%&";
    const drops = Array(Math.floor(canvas.width / 16)).fill(1);
    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.05)"; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#00ff9c"; ctx.font = "16px monospace";
        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random()*chars.length)];
            ctx.fillText(text, i*16, y*16);
            if (y*16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }
    setInterval(draw, 33);
                                                     }
