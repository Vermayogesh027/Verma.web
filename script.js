function togglePass() {
    const passInput = document.getElementById("password");
    const toggleBtn = document.getElementById("toggleBtn");
    if (passInput.type === "password") {
        passInput.type = "text";
        toggleBtn.innerText = "🔒"; // Hide icon
    } else {
        passInput.type = "password";
        toggleBtn.innerText = "👁️"; // Show icon
    }
}

function unlock() {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // Password Format: VYOM + Hour + Minute + @
    // Example: 5:01 AM -> VYOM501@ | 3:10 PM -> VYOM1510@
    const realPassword = "VYOM" + hour + minutes + "@";
    
    const userInput = document.getElementById("password").value;

    if (userInput === realPassword) {
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("site").classList.remove("hidden");
        startMatrix();
    } else {
        document.getElementById("error").innerText = "ACCESS DENIED";
        // Password hint for you during testing (Remove this line later)
        console.log("Correct Password is: " + realPassword);
    }
}

function startMatrix() {
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01VYOM#$%&";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff9c";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 33);
}
