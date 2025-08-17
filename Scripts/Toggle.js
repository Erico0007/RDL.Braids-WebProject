

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-theme");

  toggleButton.addEventListener("click", () => {
    const body = document.body;

    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("sepia-mode");
    } else {
      body.classList.remove("sepia-mode");
      body.classList.add("dark-mode");
    }
  });
});