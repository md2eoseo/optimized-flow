"use strict";

window.addEventListener("load", () => {
  window.addEventListener("scroll", (e) => {
    if ((e.currentTarget.scrollTop || window.pageYOffset) != 0)
      document.querySelector("#topBtn").classList.remove("hidden");
    else document.querySelector("#topBtn").classList.add("hidden");
  });
});
