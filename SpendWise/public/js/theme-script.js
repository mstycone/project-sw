let darkmode = localStorage.getItem("darkmode");
const themeToggle = document.getElementById("themeToggle");

const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
    //localStorage store strings only
}

const disableDarkmode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkmode", null);// => laisse subsister la clé
    //localStorage.removeItem("darkmode");
}

if (darkmode === "active") enableDarkmode();

themeToggle.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
