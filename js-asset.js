"use strict";

const client = JSON.parse(localStorage.getItem("isClientSubmitted"));
if (client == null) {
  window.location = "/landing.html";
}

window.addEventListener("load", () => {
  window.addEventListener("scroll", (e) => {
    if ((e.currentTarget.scrollTop || window.pageYOffset) != 0)
      document.querySelector("#topBtn").classList.remove("hidden");
    else document.querySelector("#topBtn").classList.add("hidden");
  });

  document.querySelectorAll(".sub-info").forEach((ele) => {
    ele.addEventListener("mouseover", () => {
      document.querySelector(`.${ele.dataset.info}`).classList.remove("hidden");
    });
    ele.addEventListener("mouseout", () => {
      document.querySelector(`.${ele.dataset.info}`).classList.add("hidden");
    });
  });
});
