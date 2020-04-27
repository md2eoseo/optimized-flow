"use strict";
const endpoint = "https://todoweb-a2c8.restdb.io/rest/client";
const apiKey = "5e9e0988436377171a0c266d";
window.addEventListener("DOMContentLoaded", init);
function init() {
  //console.log("DOMLOADED");
  form.addEventListener("submit", formSubmit);
}
function formSubmit(e) {
  e.preventDefault();
  formValidate(e.target);
}
const form = document.querySelector("form");
const elements = form.elements;
window.elements = elements;
const full_name = elements.full_name;
const work_email = elements.work_email;
const job_title = elements.job_title;
const country = elements.country;
const company = elements.company;
const agree = elements.agree;
console.log(elements);

function formValidate() {
  form.setAttribute("novalidate", true);
  if (form.checkValidity()) {
    //postData
    postData({
      full_name: full_name.value,
      work_email: work_email.value,
      job_title: job_title.value,
      country: country.value,
      company: company.value,
    });
  } else {
    //loop checkValidity
    if (!full_name.checkValidity()) {
      //error message + getfocus
      elements.full_name.focus();
      console.log("Enter username");
    } else if (!work_email.checkValidity()) {
      elements.work_email.focus();
      console.log("Enter workEmail");
    } else if (!job_title.checkValidity()) {
      elements.job_title.focus();
      console.log("Enter jobtitle");
    } else {
      console.log("click agree");
    }
  }
}
function postData(data) {
  const postData = JSON.stringify(data);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then(() => {
      console.log("Thanks for subscribing");
    });
}
