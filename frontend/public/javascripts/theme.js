var body = document.body;
var theme = "dark";

function toggleTheme() {
  var button = document.querySelector(
    ".theme-switch .material-symbols-outlined",
  );

  if (theme == "dark") {
    theme = "light";
    button.textContent = `dark_mode`;
  } else {
    theme = "dark";
    button.textContent = `light_mode`;
  }

  body.setAttribute("data-bs-theme", theme);
}
