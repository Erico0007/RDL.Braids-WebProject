"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("Contact-Form");
  const confirmationMessage = document.createElement("div");
  confirmationMessage.style.marginTop = "1rem";
  confirmationMessage.style.color = "green";
  contactForm.appendChild(confirmationMessage);

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showConfirmation("❗ Please fill in all fields!", true);
      return;
    }

    if (!validateEmail(email)) {
      showConfirmation("❗ Please enter a valid email address!", true);
      return;
    }

    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    showConfirmation("✅ Your message has been sent successfully!");
    contactForm.reset();
    
  });

  function showConfirmation(text, isError = false) {
    alert(isError
      ? text
      : "Thank you for contacting us! We will get back to you soon.");

    confirmationMessage.textContent = text;
    confirmationMessage.style.color = isError ? "red" : "green";
    showToast(text, isError);

    setTimeout(() => {
      confirmationMessage.textContent = "";
    }, 30000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.backgroundColor = isError ? "#e74c3c" : "#2ecc71";
    toast.style.opacity = "1";

    setTimeout(() => {
      toast.style.opacity = "0";
    }, 3000); // Shorter duration for better UX
  }
});
