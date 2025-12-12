"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("RcVR1FjWR03O_dV9H"); // Replace with your actual EmailJS public key

  // DOM Elements
  const contactForm = document.getElementById("Contact-Form");
  const confirmationMessage = document.createElement("div");
  confirmationMessage.id = "confirmation-message";
  confirmationMessage.style.marginTop = "1rem";
  confirmationMessage.style.color = "green";
  confirmationMessage.setAttribute("aria-live", "polite");
  contactForm.appendChild(confirmationMessage);

  // Toast Element
  const toast = document.getElementById("toast");

  // Form Submit Handler
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

    // Send message via EmailJS
    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send("service_ajmnzll", "template_c2492ud", templateParams)
      .then(() => {
        showConfirmation("✅ Your message has been sent successfully!");
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showConfirmation(
          "❌ Failed to send message. Please try again later.",
          true
        );
      });
  });

  // Helper Functions
  function showConfirmation(text, isError = false) {
    confirmationMessage.textContent = text;
    confirmationMessage.style.color = isError ? "red" : "green";
    showToast(text, isError);

    setTimeout(() => {
      confirmationMessage.textContent = "";
    }, 10000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showToast(message, isError = false) {
    if (!toast) return;

    toast.textContent = message;
    toast.style.backgroundColor = isError ? "#e74c3c" : "#2ecc71";
    toast.style.opacity = "1";

    setTimeout(() => {
      toast.style.opacity = "0";
    }, 3000);
  }
});
