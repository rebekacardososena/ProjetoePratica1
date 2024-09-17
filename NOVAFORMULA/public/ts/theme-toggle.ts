document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("themeButton")!;
  const body = document.body;

  themeButton.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
    }
  });
});
