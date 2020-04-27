"use strict";
const endpoint = "";
const apiKey = "";
window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("DOMLOADED");
  formValidate();
  //post data
}
const form = document.querySelector("form");
const elements = form.elements;
window.elements = elements;
console.log(elements);
function formValidate() {}

function postData() {
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
    .then((data) => {
      console.log("thanks for subscribing!");
    });
}
