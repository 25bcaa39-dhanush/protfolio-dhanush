document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (data.success) {
            alert("Message Sent Successfully 🚀");
            document.getElementById("contactForm").reset();
        } else {
            alert("Something went wrong!");
        }

    } catch (error) {
        console.error(error);
        alert("Server not running!");
    }
});
