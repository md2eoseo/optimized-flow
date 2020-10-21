// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js-landing.js":[function(require,module,exports) {
"use strict";

var DB_URL = "https://todoweb-a2c8.restdb.io/rest/client";
var API_KEY = "5e9e0988436377171a0c266d";
window.addEventListener("load", function () {
  var form = document.querySelector(".form form");
  form.setAttribute("novalidate", true);
  form.querySelectorAll("[required]").forEach(function (ele) {
    return ele.addEventListener("input", checkValidationBeforeSubmit);
  });
  form.addEventListener("submit", submitInfo);
  isClientSubmitted();
});

function checkValidationBeforeSubmit(e) {
  e.target.value = e.target.value;
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
  var elements = form.elements;
  var full_name = elements.full_name;
  var work_email = elements.work_email;
  var job_title = elements.job_title;
  var country = elements.country;
  var company = elements.company;
  var agree = elements.agree;
  var full_name_p = form.querySelector("#full_name_p");
  var work_email_p = form.querySelector("#work_email_p");
  var job_title_p = form.querySelector("#job_title_p");
  var agree_p = form.querySelector("#agree_p");
  full_name.value = full_name.value.trim();
  work_email.value = work_email.value.trim();
  job_title.value = job_title.value.trim();
  company.value = company.value.trim(); // initialize previous invalid inputs

  document.querySelectorAll("input, select").forEach(function (ele) {
    ele.classList.remove("invalid");
  });

  if (form.checkValidity()) {
    checkData({
      full_name: full_name.value,
      work_email: work_email.value,
      job_title: job_title.value,
      country: country.value,
      company: company.value
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

function checkData(data) {
  fetch("".concat(DB_URL, "?q={\"work_email\": \"").concat(data.work_email, "\"}"), {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache"
    }
  }).then(function (res) {
    return res.json();
  }).then(function (exist) {
    if (!exist.length) {
      data.cnt = 1;
      post(data);
    } else {
      data.$inc = {
        cnt: 1
      };
      put(data, exist[0]._id);
    }
  });
}

function put(data, id) {
  var putData = JSON.stringify(data);
  fetch("".concat(DB_URL, "/").concat(id), {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache"
    },
    body: putData
  }).then(function (res) {
    return res.json();
  }).then(function () {
    console.log("already ".concat(data.work_email, " existsd!"));
    localStorage.setItem("isClientSubmitted", [JSON.stringify(data)]);
  }).then(function () {
    return window.location = "asset.html";
  }).catch(function (error) {
    console.error("PUT ERROR: ".concat(error));
  });
}

function post(data) {
  var postData = JSON.stringify(data);
  fetch(DB_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": API_KEY,
      "cache-control": "no-cache"
    },
    body: postData
  }).then(function (res) {
    return res.json();
  }).then(function () {
    console.log("inserted ".concat(postData, " into client list!"));
    localStorage.setItem("isClientSubmitted", [JSON.stringify(data)]);
  }).then(function () {
    return window.location = "asset.html";
  }).catch(function (error) {
    console.error("POST ERROR: ".concat(error));
  });
}

function isClientSubmitted() {
  var client = JSON.parse(localStorage.getItem("isClientSubmitted"));

  if (client != null) {
    document.querySelector("#tagline3").textContent = "Welcome back, ".concat(client.full_name, "!");
    document.querySelector("#subs-btn").textContent = "To the Asset";
    document.querySelector("#subs-btn").addEventListener("click", function () {
      return window.location = "asset.html";
    });
  } else {
    document.querySelector("#subs-btn").addEventListener("click", function () {
      window.location = "#form";
      document.querySelector(".form form").elements.full_name.focus();
    });
  }
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49297" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js-landing.js"], null)
//# sourceMappingURL=/js-landing.d3950aa0.js.map