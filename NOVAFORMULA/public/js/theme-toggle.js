"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var themeButton = document.getElementById("themeButton");
    var themeIcon = document.getElementById("themeIcon");
    var body = document.body;
    var updateIcon = function () {
        if (body.classList.contains("dark-theme")) {
            themeIcon.classList.remove("bi-sun-fill");
            themeIcon.classList.add("bi-moon-fill");
        }
        else {
            themeIcon.classList.remove("bi-moon-fill");
            themeIcon.classList.add("bi-sun-fill");
        }
    };
    themeButton.addEventListener("click", function () {
        body.classList.toggle("dark-theme");
        body.classList.toggle("light-theme");
        updateIcon();
    });
    updateIcon();
});
