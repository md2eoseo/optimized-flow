"use strict";
const DB_URL = "https://todoweb-a2c8.restdb.io/rest/client";
const API_KEY = "5e9e0988436377171a0c266d";

window.addEventListener("load", () => {
  const form = document.querySelector(".form form");
  form.setAttribute("novalidate", true);
  form
    .querySelectorAll("[required]")
    .forEach((ele) =>
      ele.addEventListener("input", checkValidationBeforeSubmit)
    );
  form.addEventListener("submit", submitInfo);
  isClientSubmitted();
});

function checkValidationBeforeSubmit(e) {
  e.target.value = e.target.value.trim();
  e.target.classList.remove("invalid");
  if (!e.target.checkValidity()) {
    e.target.classList.add("invalid");
    e.target.parentNode.querySelector("p").classList.remove("hidden");
  } else {
    e.target.parentNode.querySelector("p").classList.add("hidden");
  }
}

function submitInfo(e) {
  e.preventDefault();
  checkValidation(e.target);
}

function checkValidation(form) {
  const elements = form.elements;
  const full_name = elements.full_name;
  const work_email = elements.work_email;
  const job_title = elements.job_title;
  const country = elements.country;
  const company = elements.company;
  const agree = elements.agree;
  const full_name_p = form.querySelector("#full_name_p");
  const work_email_p = form.querySelector("#work_email_p");
  const job_title_p = form.querySelector("#job_title_p");
  const agree_p = form.querySelector("#agree_p");
  full_name.value = full_name.value.trim();
  work_email.value = work_email.value.trim();
  job_title.value = job_title.value.trim();
  company.value = company.value.trim();

  // initialize previous invalid inputs
  document.querySelectorAll("input, select").forEach((ele) => {
    ele.classList.remove("invalid");
  });

  if (form.checkValidity()) {
    post({
      full_name: full_name.value,
      work_email: work_email.value,
      job_title: job_title.value,
      country: country.value,
      company: company.value,
    });
    console.log("submitted " + work_email.value.trim());
    return true;
  } else {
    // check every inputs' validity
    if (!job_title.checkValidity()) {
      job_title.classList.add("invalid");
      job_title_p.classList.remove("hidden");
      job_title.focus();
    } else {
      job_title_p.classList.add("hidden");
    }
    if (!work_email.checkValidity()) {
      work_email.classList.add("invalid");
      work_email_p.classList.remove("hidden");
      work_email.focus();
    } else {
      work_email_p.classList.add("hidden");
    }
    if (!full_name.checkValidity()) {
      full_name.classList.add("invalid");
      full_name_p.classList.remove("hidden");
      full_name.focus();
    } else {
      full_name_p.classList.add("hidden");
    }
    if (!agree.checkValidity()) {
      agree.classList.add("invalid");
      agree_p.classList.remove("hidden");
      agree.focus();
    } else {
      agree_p.classList.add("hidden");
    }

    console.error("Validation False!");
  }
}

function post(data) {
  const postData = JSON.stringify(data);
  fetch(DB_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then(() => {
      console.log(`inserted ${postData} into client list!`);
      localStorage.setItem("isClientSubmitted", [JSON.stringify(data)]);
    })
    .then(() => (window.location = "asset.html"))
    .catch((error) => {
      console.error(`POST ERROR: ${error}`);
    });
}

function isClientSubmitted() {
  const client = JSON.parse(localStorage.getItem("isClientSubmitted"));

  if (client != null) {
    document.querySelector(
      "#tagline3"
    ).textContent = `Welcome back, ${client.full_name}!`;
    document.querySelector("#subs-btn").textContent = "To the Asset";
    document
      .querySelector("#subs-btn")
      .addEventListener("click", () => (window.location = "asset.html"));
  } else {
    document.querySelector("#subs-btn").addEventListener("click", () => {
      window.location = "#form";
      document.querySelector(".form form").elements.full_name.focus();
    });
  }
}
