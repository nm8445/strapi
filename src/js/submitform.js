// /src/js/submitForm.js
document.getElementById("sendButton").addEventListener("click", function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(document.querySelector("form"));
    const data = {
        fullName: formData.get("fullName"),
        contactNumber: formData.get("contactNumber"),
        emailAddress: formData.get("emailAddress"),
        message: formData.get("message"),
        subscribeCheckbox: formData.get("subscribeCheckbox") ? "Yes" : "No"
    };

    fetch("/.netlify/functions/your-serverless-function", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("messageArea").innerHTML = "Message sent successfully!";
        document.querySelector("form").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("messageArea").innerHTML = "There was an error sending your message.";
    });
});
