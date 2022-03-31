"use strict";

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var router;

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    this.init();
  }

  _createClass(App, [{
    key: "createRouter",
    value: function createRouter() {
      var _this = this;

      router = new JetRouter({
        routes: _defineProperty({}, global.root, function (e) {
          _this.page.load("".concat(global.root, "/"), e, function () {
            return new Index();
          });
        }),
        notFound: function notFound(e) {
          _this.page.load("".concat(global.root, "/pagina-nao-encontrada.php"), e);
        },
        onInit: function onInit() {
          return _this.popState();
        },
        onHash: function onHash(e) {
          var t = document.querySelector(e);
          t && setTimeout(function () {
            t.scrollIntoView({
              behavior: "smooth"
            });
          }, 300);
        }
      });
    }
  }, {
    key: "popState",
    value: function popState() {
      var _this2 = this;

      window.addEventListener("popstate", function () {
        _this2.page.pop = !0, _this2.runRouter();
      });
    }
  }, {
    key: "addRoutes",
    value: function addRoutes() {
      var _this3 = this;

      config.pages.forEach(function (e) {
        var t = ["".concat(global.root, "/").concat(e[0]), "".concat(global.root, "/").concat(e[0], "/*parameters")];
        t.forEach(function (i, s) {
          router.add(i, function (o) {
            var n = i;
            global.root && (n = t[s].split(global.root)[1]), (t[s].includes("*") || t[s].includes(":")) && (n = n.split("/"), n = n.slice(0, n.length - 1).join("/")), n = n.replace(/\//g, "-"), n.startsWith("-") && (n = n.substr(1)), _this3.page.load("".concat(global.root, "/").concat(n, ".php"), o, function () {
              if (e[1]) {
                var _t = new Function("new ".concat(e[1]));

                _t();
              }
            });
          });
        });
      });
    }
  }, {
    key: "runRouter",
    value: function runRouter() {
      var e = "".concat(location.pathname).concat(location.search);
      router.listen(e);
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;

      window.onload = function () {
        _this4.page = new Page(), new JetBrowser(), _this4.createRouter(), _this4.addRoutes(), _this4.runRouter();
      };
    }
  }]);

  return App;
}();

new App();

var Card =
/*#__PURE__*/
function () {
  function Card() {
    _classCallCheck(this, Card);

    this.init();
  }

  _createClass(Card, [{
    key: "gallery",
    value: function gallery() {
      var _this5 = this;

      var e = document.querySelectorAll(".card__gallery-slider");
      e.forEach(function (e) {
        var t = e.classList[1].replace("card__gallery-slider--", ""),
            i = document.querySelector(".card__gallery-number--".concat(t));
        _this5["".concat(t, "GallerySlider")] = new JetSlider({
          element: ".card__gallery-slider--".concat(t),
          prev: ".card__gallery-prev--".concat(t),
          next: ".card__gallery-next--".concat(t),
          gap: 10,
          loop: !0,
          onChange: function onChange(e) {
            i.innerHTML = e;
          }
        });
      });
    }
  }, {
    key: "galleryExpand",
    value: function galleryExpand() {
      var _this6 = this;

      if (window.innerWidth > 1080) {
        var e = document.querySelectorAll(".card__gallery-options-btn--expand, .card__gallery-close-btn"),
            t = document.querySelector("html");
        e.forEach(function (e) {
          e.addEventListener("click", function () {
            t.classList.toggle("expand"), _this6.resizeSliders();
          });
        }), window.addEventListener("resize", function () {
          window.innerWidth < 1081 && (t.classList.remove("expand"), _this6.resizeSliders());
        });
      }
    }
  }, {
    key: "resizeSliders",
    value: function resizeSliders() {
      var _this7 = this;

      var e = document.querySelectorAll(".card__gallery-slider");
      e.forEach(function (e) {
        var t = e.classList[1].replace("card__gallery-slider--", "");

        _this7["".concat(t, "GallerySlider")].resize();
      });
    }
  }, {
    key: "galleryChange",
    value: function galleryChange() {
      var _this8 = this;

      var e = document.querySelectorAll("button.card__gallery-change-btn"),
          t = document.querySelector(".card__gallery-container");
      e.forEach(function (i) {
        var s = _toConsumableArray(i.classList).filter(function (e) {
          return e.includes("card__gallery-change-btn--");
        })[0].replace("card__gallery-change-btn--", "");

        i.addEventListener("click", function () {
          if (t.classList.contains(s) || (t.classList.remove(t.classList[1]), t.classList.add(s)), e.forEach(function (e) {
            return e.classList.remove("card__gallery-change-btn--active");
          }), i.classList.add("card__gallery-change-btn--active"), "map" === s && !_this8.map) {
            var _e = ["css/leaflet.min.css", "js/leaflet.min.js"];

            _this8.loadScript(_e, _this8.createMap.bind(_this8));
          }
        });
      });
    }
  }, {
    key: "loadScript",
    value: function loadScript(e, t) {
      var _this9 = this;

      var i = e.map(function (e) {
        return _this9.createTag(e);
      });
      Promise.all(i).then(t);
    }
  }, {
    key: "createTag",
    value: function createTag(e) {
      return new Promise(function (t) {
        var i = e.split(".").pop(),
            s = "js" === i ? "script" : "link",
            o = "js" === i ? "src" : "href",
            n = document.createElement(s),
            a = document.querySelector("".concat(s, "[").concat(o, "=\"").concat(e, "\"]"));
        a && a.remove(), n[o] = e, "css" === i && (n.rel = "stylesheet"), document.body.appendChild(n), n.onload = function () {
          return t(e);
        };
      });
    }
  }, {
    key: "createMap",
    value: function createMap() {
      var e = document.querySelector("#map"),
          t = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
          i = e.dataset.latitude,
          s = e.dataset.longitude;
      this.map = L.map("map").setView([i, s], 15), L.tileLayer(t, {
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map);
      var o = L.icon({
        iconUrl: "svg/marker.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
      L.marker([i, s], {
        icon: o
      }).addTo(this.map);
    }
  }, {
    key: "similar",
    value: function similar() {
      return new JetSlider({
        element: ".similar",
        prev: ".similar__pagination-prev",
        next: ".similar__pagination-next",
        slidesToShow: {
          0: 1,
          568: 2,
          821: 3,
          1081: 4
        },
        slidesToScroll: {
          0: 1,
          568: 2,
          821: 3,
          1081: 4
        },
        speed: 650,
        gap: 30,
        loop: !1,
        pagination: ".similar__pagination"
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.gallery(), this.galleryExpand(), this.galleryChange(), this.similar();
    }
  }]);

  return Card;
}();

var Client =
/*#__PURE__*/
function () {
  function Client(e) {
    _classCallCheck(this, Client);

    this.inputUser = document.querySelector(".client__id"), this.inputPassword = document.querySelector(".client__password"), this.sliderContainer = document.querySelector(".client__slider-container"), this.enterBtn = document.querySelector(".client__btn"), this.exitBtn = document.querySelector(".client__logout"), this.recoverPasswordBtn = document.querySelector(".client__recover-password"), this.inputCurrentPassword = document.querySelector(".client__current-password"), this.inputNewPassword = document.querySelector(".client__new-password"), this.inputConfirmPassword = document.querySelector(".client__confirm-password"), this.changePasswordBtn = document.querySelector(".client__btn-password"), this.welcome = document.querySelector(".client__welcome"), this.init(e);
  }

  _createClass(Client, [{
    key: "getUserSubmit",
    value: function getUserSubmit() {
      var _this10 = this;

      var e = document.querySelector(".client__get-user");
      e && e.addEventListener("submit", function (t) {
        t.preventDefault();
        var i = new FormData(e),
            s = i.get("user");

        _this10.getUser(s);
      });
    }
  }, {
    key: "getUser",
    value: function getUser(e) {
      var _this11 = this;

      return new JetLoader({
        url: "".concat(config.pcoBaseUrl, "api/usuarios/accounts?model.usuario=").concat(e),
        onSuccess: function onSuccess(e) {
          return _this11.user(e);
        },
        onError: function onError() {
          return _this11.loginError("Usuário inexistente");
        }
      });
    }
  }, {
    key: "user",
    value: function user(e) {
      var t = document.querySelector(".client__user-box");
      t.innerHTML = "";

      for (var i in e) {
        t.insertAdjacentHTML("beforeend", "<button class=\"client__user-box-item\" data-id=\"".concat(e[i].ClienteReferencia, "\">").concat(e[i].ClienteNome, "<br>").concat(e[i].ClienteEmail, "</button>"));
      }

      this.sliderContainer.style.transform = "translateX(-33.333333%)", this.setUserButton();
    }
  }, {
    key: "setUserButton",
    value: function setUserButton() {
      var _this12 = this;

      var e = document.querySelectorAll(".client__user-box-item");
      e.forEach(function (e) {
        e.addEventListener("click", function (t) {
          t.stopImmediatePropagation();
          var i = e.dataset.id;
          _this12.inputUser.value = i, _this12.sliderContainer.style.transform = "translateX(-66.666666%)";
        });
      });
    }
  }, {
    key: "loginButton",
    value: function loginButton() {
      var _this13 = this;

      this.enterBtn && this.enterBtn.addEventListener("click", function () {
        var e = _this13.inputUser.value,
            t = _this13.inputPassword.value,
            i = _this13.inputUser.checkValidity(),
            s = _this13.inputPassword.checkValidity(),
            o = document.querySelector(".client__login"),
            n = document.querySelector(".client__preloader");

        i && s && (_this13.loginAuth(e, t), o.classList.add("client__login--active"), n.classList.add("client__preloader--active"));
      });
    }
  }, {
    key: "loginAuth",
    value: function loginAuth(e, t) {
      var _this14 = this;

      return new JetLoader({
        url: "".concat(config.pcoBaseUrl, "token"),
        method: "post",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        body: "username=".concat(e, "&password=").concat(t, "&grant_type=password&empresa=").concat(config.idCliente),
        onSuccess: function onSuccess(t) {
          return _this14.login(e, t.access_token);
        },
        onError: function onError() {
          return _this14.loginError("Usuário ou senha incorreta");
        }
      });
    }
  }, {
    key: "login",
    value: function login(e, t) {
      var _this15 = this;

      var i = new FormData();
      i.append("idcliente", config.idCliente), i.append("username", e), i.append("token", t), sessionStorage.setItem("token", t);
      new JetLoader({
        url: "".concat(global.base, "form/login.php"),
        method: "post",
        body: i,
        onSuccess: function onSuccess(e) {
          "pageProprietario" === e ? router.listen(config.pageProprietario) : "pageInquilino" === e ? router.listen(config.pageInquilino) : "pageProprietarioIr" === e ? router.listen(config.pageProprietarioIr) : "inquilinoIr" === e ? router.listen(config.pageInquilinoIr) : router.listen("".concat(config.pageAviso, "?msn=doc"));
        },
        onError: function onError() {
          return _this15.loginError("Usuário ou senha incorreta.");
        }
      });
    }
  }, {
    key: "loginError",
    value: function loginError(e) {
      var t = document.querySelector(".client__login"),
          i = document.querySelector(".client__preloader"),
          s = document.querySelector(".client__preloader-icon"),
          o = document.querySelector(".client__preloader-text"),
          n = o.innerHTML;
      s.style.display = "none", o.innerHTML = e, setTimeout(function () {
        t.classList.remove("client__login--active"), i.classList.remove("client__preloader--active"), s.style.display = "flex", o.innerHTML = n;
      }, 3e3);
    }
  }, {
    key: "autoLogin",
    value: function autoLogin() {
      var e = new URLSearchParams(window.location.search);
      e.get("id") && (this.inputUser.value = e.get("id"), this.inputPassword.value = e.get("pwd"), this.loginAuth(e.get("id"), e.get("pwd")));
    }
  }, {
    key: "logout",
    value: function logout() {
      this.exitBtn && this.exitBtn.addEventListener("click", function () {
        var e = new FormData();
        e.append("idcliente", config.idCliente);
        new JetLoader({
          url: "".concat(global.base, "form/logout.php"),
          method: "post",
          body: e,
          onSuccess: function onSuccess() {
            router.listen(config.pageSouCliente);
          }
        });
      });
    }
  }, {
    key: "recoverPasswordButton",
    value: function recoverPasswordButton() {
      var _this16 = this;

      this.recoverPasswordBtn && this.recoverPasswordBtn.addEventListener("click", function () {
        var e = _this16.inputUser.value,
            t = _this16.inputUser.checkValidity();

        t && _this16.recoverPassword(e);
      });
    }
  }, {
    key: "recoverPassword",
    value: function recoverPassword(e) {
      var _this17 = this;

      return new JetLoader({
        url: "".concat(config.pcoBaseUrl, "api/usuarios/recuperarsenha?usuario=").concat(e, "&empresa=").concat(config.idCliente),
        method: "post",
        header: {
          authorization: "bearer ".concat(sessionStorage.getItem("token"))
        },
        onSuccess: function onSuccess(e) {
          return _this17.recoverPasswordSuccess(e);
        },
        onError: function onError() {
          return _this17.loginError();
        }
      });
    }
  }, {
    key: "recoverPasswordSuccess",
    value: function recoverPasswordSuccess(e) {
      this.loginError("Sua senha foi envida para seu email!"), router.listen(config.pageSouCliente);
    }
  }, {
    key: "changePasswordButton",
    value: function changePasswordButton() {
      var _this18 = this;

      this.changePasswordBtn && this.changePasswordBtn.addEventListener("click", function () {
        var e = _this18.inputCurrentPassword.value,
            t = _this18.inputNewPassword.value,
            i = _this18.inputConfirmPassword.value,
            s = _this18.inputCurrentPassword.checkValidity(),
            o = _this18.inputNewPassword.checkValidity(),
            n = _this18.inputCurrentPassword.checkValidity();

        s && o && n && _this18.changePassword(e, t, i);
      });
    }
  }, {
    key: "changePassword",
    value: function changePassword(e, t, i) {
      var _this19 = this;

      return new JetLoader({
        url: "".concat(config.pcoBaseUrl, "api/usuarios/trocarsenha?senha=").concat(e, "&senhaNova=").concat(t, "&confirmarSenha=").concat(i),
        method: "post",
        header: {
          authorization: "bearer ".concat(sessionStorage.getItem("token"))
        },
        onSuccess: function onSuccess(e) {
          return _this19.changePasswordSuccess(e);
        },
        onError: function onError() {
          return _this19.loginError();
        }
      });
    }
  }, {
    key: "changePasswordSuccess",
    value: function changePasswordSuccess(e) {
      router.listen(config.pageSouCliente);
    }
  }, {
    key: "boletoBtns",
    value: function boletoBtns() {
      var _this20 = this;

      var e = document.querySelectorAll(".client__download");
      e.forEach(function (e) {
        e.addEventListener("click", function () {
          var t = e.dataset.codigo,
              i = e.dataset.token;

          _this20.boleto(t, i);
        });
      });
    }
  }, {
    key: "boleto",
    value: function boleto(e, t) {
      var _this21 = this;

      return new JetLoader({
        url: "".concat(config.pcoBaseUrl, "api/prestacao-contas/inquilinos/boleto/").concat(e, "/pdf"),
        header: {
          authorization: "bearer ".concat(t)
        },
        onSuccess: function onSuccess(t) {
          return _this21.boletoSuccess(t, e);
        }
      });
    }
  }, {
    key: "boletoSuccess",
    value: function boletoSuccess(e, t) {
      var i = new Blob([e], {
        type: "application/pdf"
      }),
          s = window.URL.createObjectURL(i),
          o = document.createElement("a");
      o.href = s, o.download = "boleto-".concat(t, ".pdf"), document.querySelector("body").appendChild(o), o.click(), window.URL.revokeObjectURL(s), o.remove();
    }
  }, {
    key: "printButton",
    value: function printButton() {
      var _this22 = this;

      var e = document.querySelector(".client__print");
      e && e.addEventListener("click", function () {
        return _this22.print();
      });
    }
  }, {
    key: "print",
    value: function print() {
      var e = document.querySelector("#toPrint"),
          t = window.open("");
      setTimeout(function () {
        t.document.write('<style>body{font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif}</style>'), t.document.write(e.innerHTML), t.print(), t.close();
      }, 30);
    }
  }, {
    key: "init",
    value: function init(e) {
      this.autoLogin(), this.getUserSubmit(), this.loginButton(), this.logout(), this.recoverPasswordButton(), this.changePasswordButton(), this.boletoBtns(), this.printButton();
    }
  }]);

  return Client;
}();

var Favorite =
/*#__PURE__*/
function () {
  function Favorite() {
    _classCallCheck(this, Favorite);

    this.init();
  }

  _createClass(Favorite, [{
    key: "favorite",
    value: function favorite() {
      var _this23 = this;

      new JetFavorite({
        form: ".favorite__form",
        pageLink: ".favorite__link",
        favorite: ".favorite__btn",
        deleteAll: ".favorite__delete",
        counter: ".favorite__counter",
        idType: "cliente",
        id: config.id,
        onInit: function onInit() {},
        onLogin: function onLogin() {
          return _this23.login();
        },
        onNoLogin: function onNoLogin() {
          return _this23.noLogin();
        },
        onRemove: function onRemove() {
          return _this23.remove();
        },
        onRemoveAll: function onRemoveAll() {
          return _this23.removeAll();
        }
      });
    }
  }, {
    key: "login",
    value: function login() {
      var e = document.querySelector(".favorite__form"),
          t = document.querySelector(".favorite__login-input"),
          i = document.querySelector(".favorite"),
          s = sessionStorage.getItem("favorite-user-".concat(config.id)),
          o = "".concat(config.pageFavoritos, "?user=").concat(s),
          n = e.querySelector(".form__content"),
          a = e.querySelector(".form__success");
      n.classList.add("form__content--hidden"), a.classList.add("form__success--active"), setTimeout(function () {
        t.checked = !1, n.classList.remove("form__content--hidden"), a.classList.remove("form__success--active"), i && router.listen(o);
      }, 3e3);
    }
  }, {
    key: "noLogin",
    value: function noLogin() {
      var e = document.querySelector(".favorite__login-input");
      e.checked = !0;
    }
  }, {
    key: "remove",
    value: function remove() {
      var e = document.querySelector(".favorite"),
          t = "".concat(config.pageFavoritos).concat(window.location.search);
      e && router.listen(t);
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      var e = document.querySelector(".favorite__delete-input"),
          t = "".concat(config.pageFavoritos).concat(window.location.search),
          i = document.querySelector(".favorite__delete-content"),
          s = document.querySelector(".favorite__delete-success");
      i.classList.add("form__content--hidden"), s.classList.add("form__success--active"), setTimeout(function () {
        e.checked = !1, router.listen(t), i.classList.remove("form__content--hidden"), s.classList.remove("form__success--active");
      }, 3e3);
    }
  }, {
    key: "exit",
    value: function exit() {
      var e = document.querySelector(".favorite__exit");
      e && e.addEventListener("click", this.exitHandler.bind(this));
    }
  }, {
    key: "exitHandler",
    value: function exitHandler() {
      sessionStorage.removeItem("favorite-token-".concat(config.id)), sessionStorage.removeItem("favorite-user-".concat(config.id)), router.listen(config.pageFavoritos);
    }
  }, {
    key: "pagination",
    value: function pagination() {
      var e = document.querySelector(".ui__pagination-box");

      if (e) {
        new JetPagination({
          container: ".ui__pagination",
          previous: ".ui__pagination-previous",
          next: ".ui__pagination-next",
          active: e.dataset.page,
          total: e.dataset.total,
          left: {
            568: 2,
            0: 1
          },
          right: {
            568: 2,
            0: 1
          },
          concatenateWith: "/",
          onComplete: function onComplete() {
            return router.updateLinks();
          }
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.favorite(), this.exit(), this.pagination();
    }
  }]);

  return Favorite;
}();

var Filters =
/*#__PURE__*/
function () {
  function Filters(e) {
    _classCallCheck(this, Filters);

    this.page = e;
  }

  _createClass(Filters, [{
    key: "filtersUrl",
    value: function filtersUrl(e) {
      var t = sessionStorage.getItem("filtro.tipodivulgacao"),
          i = sessionStorage.getItem("filters-".concat(t));
      if (i) e(JSON.parse(i));else {
        var _i$push;

        var _i = config.filters.map(function (e) {
          return e[1] ? "" : "".concat(e, "=true");
        });

        _i[0] && (_i.push((_i$push = {
          "filtro.tipodivulgacao": t
        }, _defineProperty(_i$push, "filtro.".concat(config.tipoCliente, "id"), config.id), _defineProperty(_i$push, "maximo", 999999), _defineProperty(_i$push, "pagina", 1), _i$push)), this.createUrl(t, _i, e));
      }
    }
  }, {
    key: "dynamicFiltersUrl",
    value: function dynamicFiltersUrl(e) {
      var _this24 = this;

      var t = sessionStorage.getItem("filtro.tipodivulgacao"),
          i = sessionStorage.getItem("filters-".concat(t));

      if (i) {
        var _e2 = JSON.parse(i);

        this.dynamicsFilters.forEach(function (t) {
          return delete _e2[t];
        }), t ? sessionStorage.setItem("filters-".concat(t), JSON.stringify(_e2)) : sessionStorage.setItem("filters", JSON.stringify(_e2));
      }

      config.filters.forEach(function (i) {
        if (i[1]) {
          var _o;

          var s = [],
              o = (_o = {
            "filtro.tipodivulgacao": t
          }, _defineProperty(_o, "filtro.".concat(config.tipoCliente, "id"), config.id), _defineProperty(_o, "maximo", 999999), _defineProperty(_o, "pagina", 1), _o);
          i[1].forEach(function (e) {
            o["filtro.".concat(e)] = sessionStorage.getItem("filtro.".concat(e));
          }), s.push("".concat(i[0], "=true"), o), _this24.createUrl(t, s, e, !0);
        }
      });
    }
  }, {
    key: "createUrl",
    value: function createUrl(e, t, i, s) {
      var _this25 = this;

      new JetSearch({
        baseUrl: "".concat(config.filterBaseUrl, "?"),
        parameters: t,
        joinWith: "=",
        concatenateWith: "&",
        onComplete: function onComplete(t) {
          return _this25.loadFilters(e, t, i, s);
        }
      });
    }
  }, {
    key: "loadFilters",
    value: function loadFilters(e, t, i, s) {
      var _this26 = this;

      this.loader = new JetLoader({
        url: t,
        onSuccess: function onSuccess(t) {
          var o;
          o = e ? sessionStorage.getItem("filters-".concat(e)) : sessionStorage.getItem("filters"), t = _this26.joinJson(t.data), s && _this26.dynamicsFilters.push(Object.keys(t)[0]), o && (t = Object.assign(JSON.parse(o), t)), e ? sessionStorage.setItem("filters-".concat(e), JSON.stringify(t)) : sessionStorage.setItem("filters", JSON.stringify(t)), Object.keys(t).length === config.filters.length && i(t);
        }
      });
    }
  }, {
    key: "joinJson",
    value: function joinJson(e) {
      var t = {};

      for (var i in e) {
        var s = i.toLowerCase();

        if (e[i] && e[i].resultado) {
          var o = this.combineJson(e[i].resultado);
          t[s] = o;
        }
      }

      return t;
    }
  }, {
    key: "combineJson",
    value: function combineJson(e) {
      var t = {};
      return e.forEach(function (e) {
        for (var i in e) {
          t[i] || (t[i] = []), t[i].push(e[i]);
        }
      }), t;
    }
  }, {
    key: "createFilters",
    value: function createFilters(e) {
      var t = sessionStorage.getItem("filtro.tipodivulgacao"),
          i = JSON.parse(sessionStorage.getItem("filters-".concat(t)));
      this.dynamicsFilters = [], i && Object.keys(i).length !== config.filters.length && sessionStorage.removeItem("filters-".concat(t)), this.loader && this.loader.abort(), this.filtersUrl(e), this.dynamicFiltersUrl(e);
    }
  }, {
    key: "checkFilter",
    value: function checkFilter(e) {
      var t = sessionStorage.getItem(e);
      if (t) {
        if ("filtro.tipodivulgacao" === e) t = "a" === t ? "comprar alugar" : "v" === t ? "comprar" : "l" === t ? "alugar" : "temporada";else if ("filtro.vagagaragem" === e || "filtro.vagaini" === e) t -= 2;else if ("filtro.finalidade" === e) t = "r" === t ? "residenciais" : "c" === t ? "comerciais" : "ambos";else if ("filtro.mobiliado" === e) t && (t = "mobiliado");else if ("filtro.condominio" === e) {
          if (t) return "em condominio";
        } else "filtro.cobertura" === e && t && (t = "cobertura");
      } else t = "";
      return t;
    }
  }, {
    key: "createPath",
    value: function createPath(e) {
      return new JetSearch({
        button: ".search__btn",
        baseUrl: "".concat(this.page, "/"),
        concatenateWith: "-",
        parameters: [sessionStorage.getItem("filtro.tiposimoveis"), this.checkFilter("filtro.finalidade"), this.checkFilter("filtro.mobiliado"), this.checkFilter("filtro.condominio"), this.checkFilter("filtro.cobertura"), this.checkFilter("filtro.tipodivulgacao"), sessionStorage.getItem("filtro.cidade"), sessionStorage.getItem("filtro.bairro"), sessionStorage.getItem("filtro.estado"), [sessionStorage.getItem("filtro.quarto"), "quartos"], [sessionStorage.getItem("filtro.quartoini"), "ou mais quartos"], [sessionStorage.getItem("filtro.suite"), "suites"], [sessionStorage.getItem("filtro.suiteini"), "ou mais suites"], [sessionStorage.getItem("filtro.banheiro"), "banheiros"], [sessionStorage.getItem("filtro.banheiroini"), "ou mais banheiros"], [this.checkFilter("filtro.vagagaragem"), "vagas"], [this.checkFilter("filtro.vagaini"), "ou mais vagas"], ["de", sessionStorage.getItem("filtro.valorminimo")], ["ate", sessionStorage.getItem("filtro.valormaximo")], ["de", "".concat(sessionStorage.getItem("filtro.areautilminima"), "m2")], ["ate", "".concat(sessionStorage.getItem("filtro.areautilmaxima"), "m2")], ["de", "".concat(sessionStorage.getItem("filtro.areatotalminima"), "m2 total")], ["ate", "".concat(sessionStorage.getItem("filtro.areatotalmaxima"), "m2 total")]],
        query: {
          foto: sessionStorage.getItem("filtro.comfoto"),
          regiao: sessionStorage.getItem("filtro.regiaocidade"),
          cat: sessionStorage.getItem("filtro.categoriaid"),
          ord: this.checkFilter("ordenacao"),
          ascdesc: this.checkFilter("ascdesc")
        },
        alternative: {
          referencia: [["referencia", sessionStorage.getItem("filtro.referencia")]],
          edificio: [["edificio", sessionStorage.getItem("filtro.edificio")]],
          endereco: [["endereco", sessionStorage.getItem("filtro.endereco")]]
        },
        regex: [[/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, " "], [/\s+/g, "-"], [/ç/g, "c"], [/[àáâãäå]/g, "a"], [/[èéêë]/g, "e"], [/[ìíîï]/g, "i"], [/[òóôõö]/g, "o"], [/[ùúûü]/g, "u"]],
        onComplete: function onComplete(t) {
          e && router.listen(t);
        }
      });
    }
  }, {
    key: "search",
    value: function search() {
      this.createPath(!0);
    }
  }, {
    key: "addData",
    value: function addData(e) {
      e.filter.remove(), e.filter.add(e), e.filter.update();
    }
  }, {
    key: "removeStorage",
    value: function removeStorage() {
      var e = new JetSearch();
      e.removeStorage("session", "filtro", "filtro.tipodivulgacao");
    }
  }]);

  return Filters;
}();

var Form =
/*#__PURE__*/
function () {
  function Form() {
    _classCallCheck(this, Form);

    this.init();
  }

  _createClass(Form, [{
    key: "form",
    value: function form() {
      var _this27 = this;

      var e = document.querySelectorAll("form[id]");
      e.forEach(function (e) {
        _this27["inputsFile".concat(e.id)] = e.querySelectorAll('[type="file"]'), _this27["inputsRequired".concat(e.id)] = _toConsumableArray(_this27["inputsFile".concat(e.id)]).map(function (e) {
          return e.required;
        }), e.addEventListener("submit", _this27.submit.bind(_this27, e)), _this27.fileAttachment(e);
      });
    }
  }, {
    key: "submit",
    value: function submit(e) {
      var _this28 = this;

      event.preventDefault(), this.inputFileManager(e);
      var t = e.id,
          i = new FormData(e),
          s = e.querySelector(".form__content"),
          o = e.querySelector(".form__sending");
      s.classList.add("form__content--hidden"), o.classList.add("form__sending--active"), this.updateFormData(e, i);
      new JetLoader({
        url: "".concat(global.base, "form/").concat(t, ".php"),
        method: "post",
        body: i,
        onSuccess: function onSuccess() {
          return _this28.submitSuccess(e);
        }
      });
    }
  }, {
    key: "submitSuccess",
    value: function submitSuccess(e) {
      var t = e.querySelector(".form__sending"),
          i = e.querySelector(".form__success");
      t.classList.remove("form__sending--active"), i.classList.add("form__success--active"), this.inputFileManager(e), this.successButton(e), this.resetInputFile(e), this.clearFileList(e), e.reset();
    }
  }, {
    key: "successButton",
    value: function successButton(e) {
      var t = e.querySelector(".form__success-btn");
      t.addEventListener("click", this.successButtonHandler.bind(this, e));
    }
  }, {
    key: "successButtonHandler",
    value: function successButtonHandler(e) {
      var t = e.querySelector(".form__content"),
          i = e.querySelector(".form__sending"),
          s = e.querySelector(".form__success");
      t.classList.remove("form__content--hidden"), i.classList.remove("form__status--active"), s.classList.remove("form__success--active");
    }
  }, {
    key: "inputFileManager",
    value: function inputFileManager(e) {
      this["inputsFile".concat(e.id)].forEach(function (e) {
        e.disabled = !e.disabled;
      });
    }
  }, {
    key: "fileAttachment",
    value: function fileAttachment(e) {
      var _this29 = this;

      this["inputsFile".concat(e.id)].forEach(function (e) {
        var t = e.name,
            i = e.required;
        _this29["fileList".concat(t)] = {}, e.addEventListener("change", _this29.fileAttachmentHandler.bind(_this29, e, t, i));
      });
    }
  }, {
    key: "fileAttachmentHandler",
    value: function fileAttachmentHandler(e, t, i) {
      var _this30 = this;

      var s = e.nextElementSibling,
          o = _toConsumableArray(e.files);

      o.forEach(function (o) {
        var n = o.name.replace(/[/[ .]/g, "-"),
            a = _this30.fileTemplate(o, n);

        _this30["fileList".concat(t)][n] = o, s.append(a), _this30.fileDelete(e, a, _this30["fileList".concat(t)], n, i);
      }), e.value = "", this.checkDisabled(e, this["fileList".concat(t)], i);
    }
  }, {
    key: "updateFormData",
    value: function updateFormData(e, t) {
      var _this31 = this;

      this["inputsFile".concat(e.id)].forEach(function (e) {
        var i = e.name;
        Object.values(_this31["fileList".concat(i)]).forEach(function (e) {
          return t.append(i, e);
        });
      });
    }
  }, {
    key: "fileTemplate",
    value: function fileTemplate(e, t) {
      var i = document.createElement("li"),
          s = document.createElement("button"),
          o = document.createElement("div"),
          n = document.createElement("img");
      return i.className = "form__input-file-item", s.className = "form__input-file-btn", s.id = t, o.className = "form__input-file-text", o.innerHTML = e.name, n.className = "form__input-file-icon", n.src = "svg/trash.svg", s.appendChild(o), s.appendChild(n), i.appendChild(s), i;
    }
  }, {
    key: "fileDelete",
    value: function fileDelete(e, t, i, s, o) {
      var n = t.querySelector("button");
      t.addEventListener("click", this.fileDeleteHandler.bind(this, e, n, i, s, o));
    }
  }, {
    key: "fileDeleteHandler",
    value: function fileDeleteHandler(e, t, i, s, o) {
      delete i[s], t.parentElement.remove(), this.checkDisabled(e, i, o);
    }
  }, {
    key: "resetInputFile",
    value: function resetInputFile(e) {
      var _this32 = this;

      this["inputsFile".concat(e.id)].forEach(function (t, i) {
        var s = _this32["inputsRequired".concat(e.id)][i];

        s && (t.required = !0);
      });
    }
  }, {
    key: "clearFileList",
    value: function clearFileList(e) {
      this["inputsFile".concat(e.id)].forEach(function (e) {
        var t = e.nextElementSibling;
        t.innerHTML = "";
      });
    }
  }, {
    key: "checkDisabled",
    value: function checkDisabled(e, t, i) {
      if (i) {
        var _i2 = Object.keys(t)[0];
        e.required = !_i2;
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.form();
    }
  }]);

  return Form;
}();

var Index =
/*#__PURE__*/
function () {
  function Index() {
    _classCallCheck(this, Index);

    this.init();
  }

  _createClass(Index, [{
    key: "init",
    value: function init() {
      new Search();
    }
  }]);

  return Index;
}();

var JetBrowser =
/*#__PURE__*/
function () {
  function JetBrowser(e) {
    _classCallCheck(this, JetBrowser);

    this.config = JetBrowser.extend(e), this.userAgent = navigator.userAgent, this.vendor = navigator.vendor, this.browser, this.device, this.orientation, this.touch, this.eventTimeout, this.chrome, this.firefox, this.safari, this.opera, this.edge, this.ie, this.init(), this.config.onInit();
  }

  _createClass(JetBrowser, [{
    key: "browserName",
    value: function browserName() {
      return this.isChrome(), this.isFirefox(), this.isSafari(), this.isOpera(), this.isEdge(), this.isIe(), this.browser;
    }
  }, {
    key: "deviceType",
    value: function deviceType() {
      return /Mobi|Android/i.test(this.userAgent) ? this.device = "mobile" : this.device = "desktop", this.device;
    }
  }, {
    key: "addClass",
    value: function addClass(e) {
      document.documentElement.classList.add("jetbrowser__".concat(e));
    }
  }, {
    key: "removeClass",
    value: function removeClass(e) {
      document.documentElement.classList.remove("jetbrowser__".concat(e));
    }
  }, {
    key: "isChrome",
    value: function isChrome() {
      return /Chrome/.test(this.userAgent) && /Google Inc/.test(this.vendor) && (this.browser = "chrome", this.chrome = !0), this.chrome;
    }
  }, {
    key: "isFirefox",
    value: function isFirefox() {
      return "undefined" != typeof InstallTrigger && (this.browser = "firefox", this.firefox = !0), this.firefox;
    }
  }, {
    key: "isSafari",
    value: function isSafari() {
      return (/constructor/i.test(window.HTMLElement) || function (e) {
        return "[object SafariRemoteNotification]" === e.toString();
      }(!window.safari || void 0 !== this.safari && this.safari.pushNotification)) && (this.browser = "safari", this.safari = !0), this.safari;
    }
  }, {
    key: "isOpera",
    value: function isOpera() {
      return (window.opr && opr.addons || window.opera || this.userAgent.indexOf(" OPR/") >= 0) && (this.browser = "opera", this.opera = !0), this.opera;
    }
  }, {
    key: "isEdge",
    value: function isEdge() {
      return !this.isIe() && window.StyleMedia && (this.browser = "edge", this.edge = !0), this.edge;
    }
  }, {
    key: "isIe",
    value: function isIe() {
      return document.documentMode && (this.browser = "ie", this.ie = !0), this.ie;
    }
  }, {
    key: "getOrientation",
    value: function getOrientation() {
      return window.innerHeight > window.innerWidth ? (this.orientation = "portrait", this.removeClass("landscape"), this.addClass("portrait")) : (this.orientation = "landscape", this.removeClass("portrait"), this.addClass("landscape")), this.orientation;
    }
  }, {
    key: "isTouch",
    value: function isTouch() {
      return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? (this.touch = "touchevents", this.removeClass("no-touchevents"), this.addClass("touchevents")) : (this.touch = "no-touchevents", this.removeClass("touchevents"), this.addClass("no-touchevents")), this.touch;
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this33 = this;

      this.eventTimeout || (this.eventTimeout = setTimeout(function () {
        _this33.eventTimeout = null, _this33.getOrientation();
      }, 250));
    }
  }, {
    key: "init",
    value: function init() {
      window.onresize = this.resize.bind(this), this.browserName(), this.deviceType(), this.addClass(this.browser), this.addClass(this.device), this.getOrientation(), this.isTouch(), this.resize(), this.config.onDetect({
        browser: this.browser,
        device: this.device,
        orientation: this.orientation
      });
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        onInit: function onInit() {},
        onDetect: function onDetect(e) {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetBrowser;
}();

var JetCheckbox =
/*#__PURE__*/
function () {
  function JetCheckbox(e) {
    _classCallCheck(this, JetCheckbox);

    this.config = JetCheckbox.extend(e), this.elements = "string" == typeof this.config.element ? document.querySelectorAll(this.config.element) : [this.config.element], this.names = "string" == typeof this.config.name ? [this.config.name] : this.config.name, this.optionsText = this.config.optionsText, this.optionsValue = this.config.optionsValue, this.optionsCounter = this.config.counter, this.activeClass = "jetcheckbox__item--active", this.valueObject = {}, this.labelObject = {}, this.sortMap = {}, this.baseName, this.titles, this.storage, this.init(), this.config.onInit();
  }

  _createClass(JetCheckbox, [{
    key: "arrayLowerCase",
    value: function arrayLowerCase(e) {
      e.forEach(function (t, i) {
        Array.isArray(t) ? t.forEach(function (e, i) {
          isNaN(e) && (t[i] = e.toLowerCase());
        }) : isNaN(t) && (e[i] = t.toLowerCase());
      });
    }
  }, {
    key: "setBaseName",
    value: function setBaseName(e) {
      var _this34 = this;

      var t = e.getAttribute("class");
      var i;
      "string" == typeof this.config.element ? i = this.config.element.split(",") : (i = this.config.element.className, i = i.split(" ")), i.forEach(function (s) {
        s = "string" == typeof _this34.config.element ? s.trim().substr(1) : i[0], t.indexOf(s) > -1 && (e.dataset.jetcheckboxName = s);
      }), this.baseName = e.dataset.jetcheckboxName;
    }
  }, {
    key: "storageType",
    value: function storageType() {
      "local" === this.config.storage ? this.storage = localStorage : this.storage = sessionStorage;
    }
  }, {
    key: "storageCheck",
    value: function storageCheck() {
      var _this35 = this;

      this.names.forEach(function (e) {
        if (_this35.storage.getItem(e)) {
          var t = _this35.storage.getItem(e),
              i = t.split(",");

          _this35.valueObject[e] || (_this35.valueObject[e] = []), i.forEach(function (t) {
            t = t.toString().toLowerCase(), _this35.valueObject[e].push(t);
          });
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this36 = this;

      this.storageCheck(), this.names.forEach(function (e) {
        _this36.storage.getItem(e) || (_this36.valueObject[e] || (_this36.valueObject[e] = []), _this36.valueObject[e].push(""));
      }), this.elements.forEach(function (e) {
        _this36.updateCheckbox(e), _this36.config.tags && _this36.updateTags(e);
      });
    }
  }, {
    key: "updateTags",
    value: function updateTags(e) {
      var _this37 = this;

      var t,
          i = document.createDocumentFragment();
      t = this.config.tagsTarget ? document.querySelectorAll(this.config.tagsTarget) : e.querySelectorAll(".jetcheckbox__label"), t.forEach(function (e) {
        for (var s in _this37.labelObject) {
          _this37.labelObject[s].forEach(function (s) {
            var o = "[data-jetcheckbox-id=\"".concat(_this37.config.name, "\"][data-jetcheckbox-label=\"").concat(s, "\"]"),
                n = e.querySelector(o),
                a = document.querySelector(".".concat(_this37.baseName, "-item[data-jetcheckbox-text=\"").concat(s, "\"]")),
                r = a.dataset.jetcheckboxValue.split(",");

            if (_this37.config.tagsTarget || (t[0].innerHTML = ""), !n) {
              var _e3 = _this37.createTag(s, r);

              i.appendChild(_e3);
            }
          });
        }

        e.appendChild(i);
      });
    }
  }, {
    key: "addTags",
    value: function addTags(e, t) {
      var _this38 = this;

      var i,
          s = document.createDocumentFragment();
      this.config.tagsTarget ? i = document.querySelectorAll(this.config.tagsTarget) : (i = e.querySelectorAll(".jetcheckbox__label"), i[0].querySelector(".jetcheckbox__tag") || (i[0].innerHTML = "")), i.forEach(function (i) {
        var o = "[data-jetcheckbox-id=\"".concat(_this38.config.name, "\"][data-jetcheckbox-label=\"").concat(t, "\"]"),
            n = i.querySelector(o),
            a = e.querySelector("[data-jetcheckbox-text=\"".concat(t, "\"]")),
            r = a.dataset.jetcheckboxValue.split(",");

        if (!n) {
          var _e4 = _this38.createTag(t, r);

          s.appendChild(_e4), i.appendChild(s);
        }
      });
    }
  }, {
    key: "removeTags",
    value: function removeTags(e, t) {
      var _this39 = this;

      var i;
      i = this.config.tagsTarget ? document.querySelectorAll(this.config.tagsTarget) : e.querySelectorAll(".jetcheckbox__label"), i.forEach(function (e) {
        var i = e.querySelector("[data-jetcheckbox-id=\"".concat(_this39.config.name, "\"][data-jetcheckbox-label=\"").concat(t, "\"]"));
        i && i.parentNode.removeChild(i), _this39.config.tagsTarget || e.querySelector(".jetcheckbox__tag") || (e.innerHTML = _this39.config.label);
      });
    }
  }, {
    key: "createTag",
    value: function createTag(e, t) {
      var _this40 = this;

      var i = document.createElement("span"),
          s = document.createElement("span"),
          o = document.createElement("span");
      return this.config.name.constructor !== Array && (t = t.toString()), i.addEventListener("click", function () {
        _this40.clickTag(t);
      }), o.className = "".concat(this.baseName, "-delete-btn jetcheckbox__delete-btn"), s.className = "".concat(this.baseName, "-tag-text jetcheckbox__tag-text"), i.className = "".concat(this.baseName, "-tag jetcheckbox__tag"), i.dataset.jetcheckboxId = this.config.name, i.dataset.jetcheckboxLabel = e, s.innerHTML = e, i.appendChild(s), i.appendChild(o), i;
    }
  }, {
    key: "setLabel",
    value: function setLabel(e) {
      var _this41 = this;

      var t = e.querySelectorAll(".".concat(this.activeClass)),
          i = e.querySelector(".jetcheckbox__label");
      var s = [];
      var o = this.config.name;
      this.labelObject[o] || (this.labelObject[o] = []), t.forEach(function (e) {
        var t = e.dataset.jetcheckboxText,
            i = _this41.labelObject[o].indexOf(t);

        s.push(t), -1 === i && _this41.labelObject[o].push(t);
      }), this.config.label && (s[0] ? i.innerHTML = s.join(", ") : i.innerHTML = this.config.label);
    }
  }, {
    key: "updateCheckbox",
    value: function updateCheckbox(e) {
      var _this42 = this;

      var t = this.names.map(function (e) {
        return "";
      });
      var i = Object.entries(this.valueObject);
      var s = {};
      i.forEach(function (e) {
        var i = _this42.names.indexOf(e[0]);

        t[i] = e;
      }), t.forEach(function (e, t) {
        e[1].forEach(function (e, t) {
          s[t] || (s[t] = []), s[t].push(e);
        });
      });

      for (var _t2 in s) {
        var _i3 = s[_t2],
            o = e.querySelector("[data-jetcheckbox-value=\"".concat(_i3, "\"]:not(.jetcheckbox__item--uncheck-all)"));
        o && (o.classList.add(this.activeClass), o.classList.add("".concat(this.baseName, "-item--active")));
      }

      this.setLabel(e);
    }
  }, {
    key: "createCheckbox",
    value: function createCheckbox(e, t) {
      var i = document.createDocumentFragment(),
          s = document.createElement("ul"),
          o = document.createElement("div"),
          n = document.createElement("span"),
          a = document.createElement("span");
      o.className = "".concat(this.baseName, "-btn jetcheckbox__btn"), n.className = "".concat(this.baseName, "-label jetcheckbox__label"), n.innerHTML = this.config.label, a.className = "".concat(this.baseName, "-icon jetcheckbox__icon"), s.className = "".concat(this.baseName, "-list jetcheckbox__list"), this.createList({
        element: e,
        list: s,
        text: this.optionsText,
        value: this.optionsValue,
        counter: this.optionsCounter,
        addIndex: 0,
        index: t
      }), o.appendChild(n), o.appendChild(a), i.appendChild(o), i.appendChild(s), this.optionsText.toString() || e.classList.add("jetcheckbox--disabled"), e.classList.add("jetcheckbox"), e.appendChild(i), this.createTotal(e);
    }
  }, {
    key: "createList",
    value: function createList(e) {
      var _this43 = this;

      this.config.filter && this.createSearchInput(e.element, e.list, e.index), this.config.uncheckAll && this.createCheck({
        element: e.element,
        list: e.list,
        itemClass: " jetcheckbox__option--uncheck-all",
        btnClass: " jetcheckbox__item--uncheck-all",
        text: this.config.uncheckAll,
        value: "",
        addIndex: e.addIndex,
        index: e.index
      }), this.config.checkAll && this.createCheck({
        element: e.element,
        list: e.list,
        itemClass: " jetcheckbox__option--check-all",
        btnClass: " jetcheckbox__item--check-all",
        text: this.config.checkAll,
        value: "*",
        addIndex: e.addIndex,
        index: e.index
      }), e.text.forEach(function (t, i) {
        _this43.config.sortTitle && _this43.createTitle({
          list: e.list,
          text: _this43.sortMap[i]
        }), _this43.createCheck({
          element: e.element,
          list: e.list,
          itemClass: "",
          btnClass: "",
          text: t,
          value: _this43.optionsValue[i],
          counter: _this43.optionsCounter,
          optionIndex: i,
          addIndex: e.addIndex,
          index: e.index
        });
      });
    }
  }, {
    key: "createTitle",
    value: function createTitle(e) {
      if (-1 === this.titles.indexOf(e.text)) {
        var t = document.createElement("ul"),
            i = document.createElement("div"),
            s = document.createElement("span"),
            o = document.createElement("span");
        this.titles.push(e.text), t.className = "".concat(this.baseName, "-group jetcheckbox__group"), i.className = "".concat(this.baseName, "-title jetcheckbox__title"), s.className = "".concat(this.baseName, "-name jetcheckbox__name"), o.className = "".concat(this.baseName, "-total jetcheckbox__total"), t.dataset.jetcheckboxTitle = e.text, s.innerHTML = e.text, i.appendChild(s), i.appendChild(o), t.appendChild(i), e.list.appendChild(t);
      }
    }
  }, {
    key: "createTotal",
    value: function createTotal(e) {
      var _this44 = this;

      if (this.config.sortTitle && this.config.sortTotal) {
        var t = e.querySelectorAll(".jetcheckbox__group");
        t.forEach(function (e) {
          var t = e.querySelector(".jetcheckbox__total");
          var i = e.querySelectorAll("li");
          var s = 0;
          i.forEach(function (e) {
            if (_this44.optionsCounter && _this44.optionsCounter.length) {
              var _t3 = e.querySelector(".jetcheckbox__counter");

              s = Number(_t3.innerHTML);
            } else s = i.length;
          }), t.innerHTML = s;
        });
      }
    }
  }, {
    key: "createCheck",
    value: function createCheck(e) {
      var _this45 = this;

      var t = document.createElement("li"),
          i = document.createElement("label"),
          s = document.createElement("span");
      var o = e.list.querySelector('[jetcheckbox-title="' + this.sortMap[e.optionIndex] + '"]');
      t.className = "".concat(this.baseName, "-option jetcheckbox__option").concat(e.itemClass), i.className = "".concat(this.baseName, "-item jetcheckbox__item").concat(e.btnClass), s.className = "".concat(this.baseName, "-text jetcheckbox__text"), i.dataset.jetcheckboxText = e.text, i.dataset.jetcheckboxValue = e.value, s.innerHTML = e.text, i.appendChild(s), t.appendChild(i), o ? (o.appendChild(t), this.addAtIndex(o, t, e.addIndex)) : (e.list.appendChild(t), this.addAtIndex(e.list, t, e.addIndex));
      var n = document.createElement("span");

      if (n.className = "".concat(this.baseName, "-checkbox jetcheckbox__checkbox"), i.insertBefore(n, s), e.counter && e.counter.length) {
        var _t4 = document.createElement("span");

        _t4.className = "".concat(this.baseName, "-counter jetcheckbox__counter"), _t4.innerHTML = e.counter[e.optionIndex], i.appendChild(_t4);
      }

      i.addEventListener("click", function () {
        _this45.clickEvent(e.value);
      });
    }
  }, {
    key: "addAtIndex",
    value: function addAtIndex(e, t, i) {
      var s = e.children.length;
      i || (i = s), i >= e.children.length ? e.appendChild(t) : e.insertBefore(t, e.children[i]);
    }
  }, {
    key: "add",
    value: function add(e) {
      var _this46 = this;

      this.optionsText = e.text, this.optionsValue = e.value, this.optionsCounter = e.counter, e.sort && (this.titles = [], this.sort(e.sort)), this.elements.forEach(function (t, i) {
        var s = t.querySelector("ul");
        _this46.optionsText.toString() ? t.classList.remove("jetcheckbox--disabled") : t.classList.add("jetcheckbox--disabled"), _this46.createList({
          element: t,
          list: s,
          text: _this46.optionsText,
          value: _this46.arrayLowerCase(_this46.optionsValue),
          counter: _this46.optionsCounter,
          addIndex: e.addIndex,
          index: i
        }), _this46.createTotal(t);
      });
    }
  }, {
    key: "remove",
    value: function remove(e) {
      var _this47 = this;

      this.elements.forEach(function (t) {
        var i = t.querySelector("ul");
        e ? e.forEach(function (e) {
          var t = i.querySelector("[data-jetcheckbox-text=\"".concat(e, "\"]")),
              s = t.dataset.jetcheckboxValue,
              o = _this47.optionsText.indexOf(e),
              n = _this47.optionsValue.indexOf(s);

          -1 !== o && (_this47.optionsText.splice(o, 1), _this47.optionsValue.splice(n, 1), t.parentNode.removeChild(t));
        }) : (t.classList.add("jetcheckbox--disabled"), _this47.valueObject = {}, _this47.labelObject = {}, _this47.sortMap = {}, _this47.optionsText = [], _this47.optionsValue = [], i.innerHTML = "");
      });
    }
  }, {
    key: "createSearchInput",
    value: function createSearchInput(e, t, i) {
      var _this48 = this;

      var s = document.createElement("div"),
          o = document.createElement("input");
      s.className = "".concat(this.baseName, "-filter jetcheckbox__filter"), o.className = "".concat(this.baseName, "-input jetcheckbox__input"), o.type = this.config.filterType, this.config.filterPlaceholder && (o.placeholder = this.config.filterPlaceholder), o.addEventListener("focus", this.config.focus), o.addEventListener("blur", this.config.blur), o.addEventListener("keyup", function (e) {
        _this48.keyUp(i, e);
      }), this.config.filterTarget && (t = document.querySelector(this.config.filterTarget)), s.appendChild(o), this.config.filterEmpty && s.appendChild(this.emptyBtn(o, i)), t.appendChild(s);
    }
  }, {
    key: "emptyBtn",
    value: function emptyBtn(e, t) {
      var _this49 = this;

      var i = document.createElement("a");
      return i.className = "".concat(this.baseName, "-empty-btn jetcheckbox__empty-btn"), i.addEventListener("click", function (i) {
        e.value = "", _this49.manageEmptyBtn("", t), _this49.manageFilter("", t), _this49.notFound(t), _this49.config.onKeyUp();
      }), i;
    }
  }, {
    key: "manageEmptyBtn",
    value: function manageEmptyBtn(e, t) {
      var i = this.elements[t].querySelector(".jetcheckbox__empty-btn");
      i && (i.style.display = e ? "block" : "none");
    }
  }, {
    key: "setStorage",
    value: function setStorage(e) {
      var _this50 = this;

      var t;
      this.valueObject = {}, this.storageCheck(), this.names.forEach(function (i, s) {
        _this50.valueObject[i] || (_this50.valueObject[i] = []), t = _this50.config.name.constructor === Array ? e[s] : e;

        var o = _this50.valueObject[i].indexOf(t);

        -1 === o ? _this50.config.checkLimit && _this50.config.checkLimit <= _this50.valueObject[i].length ? _this50.config.onLimit() : _this50.valueObject[i].push(t) : _this50.valueObject[i].splice(o, 1), _this50.valueObject[i][0] ? _this50.storage.setItem(i, _this50.valueObject[i]) : _this50.storage.removeItem(i);
      });
    }
  }, {
    key: "removeStorage",
    value: function removeStorage() {
      var _this51 = this;

      this.names.forEach(function (e) {
        _this51.valueObject[e] = [], _this51.storage.removeItem(e);
      });
    }
  }, {
    key: "validateNumber",
    value: function validateNumber(e) {
      var t = this.storage.getItem(this.config.validateTarget),
          i = "<" === this.config.validateOperator && t > e,
          s = ">" === this.config.validateOperator && t < e;
      if (null === t || i || s) return !0;
    }
  }, {
    key: "clickEvent",
    value: function clickEvent(e) {
      !e || this.validateNumber(e) ? (this.selectOption(e), e && "*" !== e && this.setStorage(e), e || this.config.onUncheckAll(), "*" === e && this.config.onCheckAll(), e && this.config.onChange(this.valueObject)) : this.config.onValidateError();
    }
  }, {
    key: "checkAll",
    value: function checkAll(e, t) {
      var _this52 = this;

      var i = this.config.tags && this.config.tagsTarget;
      this.optionsValue.forEach(function (i, s) {
        if (!_this52.config.checkLimit || s < _this52.config.checkLimit) {
          var _s = e.querySelector("[data-jetcheckbox-value=\"".concat(i, "\"]")),
              o = _s.dataset.jetcheckboxText;

          _s.classList.contains(_this52.activeClass) && option.selected || (_s.classList.add(_this52.activeClass), _s.classList.add("".concat(_this52.baseName, "-item--active")), _this52.config.tags && _this52.addTags(e, o, t), 0 === t && _this52.setStorage(i));
        }
      }), !this.config.label || this.config.tags && !i || this.setLabel(e);
    }
  }, {
    key: "uncheckAll",
    value: function uncheckAll(e) {
      var _this53 = this;

      var t = this.config.tags && this.config.tagsTarget;
      this.optionsValue.forEach(function (t) {
        var i = e.querySelector("[data-jetcheckbox-value=\"".concat(t, "\"]"));
        var s;
        i && (s = i.dataset.jetcheckboxText, i.classList.remove(_this53.activeClass), i.classList.remove("".concat(_this53.baseName, "-item--active")), _this53.config.tags && _this53.removeTags(e, s));
      }), this.removeStorage(), !this.config.label || this.config.tags && !t || this.setLabel(e);
    }
  }, {
    key: "sort",
    value: function sort(e) {
      var _this54 = this;

      this.sortMap = e.map(function (e, t) {
        return {
          index: t,
          value: e
        };
      }), this.sortMap.sort(function (e, t) {
        return isNaN(e.value) && isNaN(t.value) ? +(e.value > t.value) || +(e.value === t.value) - 1 : e.value - t.value;
      }), this.optionsText = this.sortMap.map(function (e) {
        return _this54.optionsText[e.index];
      }), this.optionsValue = this.sortMap.map(function (e) {
        return _this54.optionsValue[e.index];
      }), this.optionsCounter && this.optionsCounter.length && (this.optionsCounter = this.sortMap.map(function (e) {
        return _this54.optionsCounter[e.index];
      })), this.sortMap = this.sortMap.map(function (e) {
        return e[Object.keys(e)[1]];
      }), "descending" === this.config.sortOrder && (this.optionsText.reverse(), this.optionsValue.reverse(), this.optionsCounter.reverse(), this.sortMap.reverse());
    }
  }, {
    key: "filter",
    value: function filter(e, t) {
      var i = t.split(" ");
      var s, o;

      for (var _t5 = 0; o = i[_t5++];) {
        if (s = new RegExp(o, "ig"), !s.test(e)) return !1;
        e = e.replace(s, "");
      }

      return !0;
    }
  }, {
    key: "manageFilter",
    value: function manageFilter(e, t) {
      var _this55 = this;

      var i = this.elements[t].querySelectorAll("li:not(.jetcheckbox__option--uncheck-all):not(.jetcheckbox__option--check-all)"),
          s = "jetcheckbox__option--hidden";
      i.forEach(function (i, o) {
        var n = _this55.elements[t].querySelector("[data-jetcheckbox-title=\"".concat(_this55.sortMap[o], "\"]"));

        var a;

        if (n && (a = n.querySelectorAll("li")), e) {
          var _t6 = i.querySelector("label");

          var _o2 = _t6.innerHTML;
          if (_this55.filter(_o2, e)) i.classList.remove(s), n && a[0] && n.classList.remove(s);else if (i.classList.add(s), n) {
            var _e5 = n.querySelectorAll("li.".concat(s));

            a.length === _e5.length && n.classList.add(s);
          }
        } else i.classList.remove(s), n && n.classList.remove(s);
      });
    }
  }, {
    key: "selectOption",
    value: function selectOption(e) {
      var _this56 = this;

      this.elements.forEach(function (t, i) {
        var s = t.querySelector("[data-jetcheckbox-value=\"".concat(e, "\"]")),
            o = s.dataset.jetcheckboxText,
            n = s.classList.contains(_this56.activeClass),
            a = _this56.config.tags && _this56.config.tagsTarget,
            r = _this56.valueObject[Object.keys(_this56.valueObject)[0]],
            l = r ? r.length : 1;

        e ? "*" === e && _this56.checkAll(t, i) : _this56.uncheckAll(t), e && "*" !== e && (n ? (s.classList.remove(_this56.activeClass), s.classList.remove("".concat(_this56.baseName, "-item--active")), _this56.config.tags && _this56.removeTags(t, o)) : (!_this56.config.checkLimit || l < _this56.config.checkLimit) && (s.classList.add(_this56.activeClass), s.classList.add("".concat(_this56.baseName, "-item--active")), _this56.config.tags && _this56.config.tagsOnChange && _this56.addTags(t, o))), !_this56.config.label || _this56.config.tags && !a || _this56.setLabel(t);
      });
    }
  }, {
    key: "clickTag",
    value: function clickTag(e) {
      var _this57 = this;

      var t;
      this.valueObject = {}, this.storageCheck(), this.names.forEach(function (i, s) {
        _this57.valueObject[i] || (_this57.valueObject[i] = []), t = _this57.config.name.constructor === Array ? e[s] : e;

        var o = _this57.valueObject[i].indexOf(t);

        -1 !== o && _this57.valueObject[i].splice(o, 1), _this57.storage.setItem(i, _this57.valueObject[i]), _this57.storage.getItem(i) || _this57.storage.removeItem(i);
      }), this.elements.forEach(function (t, i) {
        var s = t.querySelector("[data-jetcheckbox-value=\"".concat(e, "\"]")),
            o = s.dataset.jetcheckboxText,
            n = _this57.config.tags && _this57.config.tagsTarget;
        s.classList.remove(_this57.activeClass), s.classList.remove("".concat(_this57.baseName, "-item--active")), _this57.removeTags(t, o), _this57.config.tags && !n || _this57.setLabel(t);
      }), this.config.onClickTag(e);
    }
  }, {
    key: "keyUp",
    value: function keyUp(e, t) {
      var i = t.target.value;
      this.manageFilter(i, e), this.manageEmptyBtn(i, e), this.notFound(e), this.config.onKeyUp();
    }
  }, {
    key: "notFound",
    value: function notFound(e) {
      var t = this.elements[e].querySelector("ul"),
          i = "jetcheckbox__option--hidden",
          s = t.querySelectorAll("li.".concat(i, ":not(.jetcheckbox__option--uncheck-all):not(.jetcheckbox__option--check-all)")),
          o = t.querySelector(".jetcheckbox__option--uncheck-all"),
          n = t.querySelector(".jetcheckbox__option--check-all"),
          a = t.querySelector(".jetcheckbox__not-found");

      if (s.length >= this.optionsText.length) {
        if (o && o.classList.add(i), n && n.classList.add(i), !a && this.config.filterNotFound) {
          var _e6 = document.createElement("div");

          var _i4 = document.createTextNode(this.config.filterNotFound);

          _e6.className = "jetcheckbox__not-found", _e6.appendChild(_i4), t.appendChild(_e6);
        }
      } else o && o.classList.remove(i), n && n.classList.remove(i), a && a.parentNode.removeChild(a);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.elements.forEach(function (e) {
        for (; e.firstChild;) {
          e.removeChild(e.firstChild);
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this58 = this;

      this.storageType(), this.config.sortBy[0] && this.sort(this.config.sortBy), this.arrayLowerCase(this.optionsValue), this.elements.forEach(function (e, t) {
        e.classList.remove("jetcheckbox"), e.innerHTML = "", _this58.titles = [], _this58.setBaseName(e), _this58.createCheckbox(e, t);
      });
      var e = this.names.some(function (e) {
        return _this58.storage.getItem(e);
      });
      e && this.update();
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        element: "",
        name: "",
        checkLimit: "",
        optionsText: [],
        optionsValue: [],
        counter: [],
        uncheckAll: "",
        checkAll: "",
        label: "",
        sortBy: [],
        sortOrder: "ascending",
        sortTitle: !1,
        sortTotal: !1,
        tags: !1,
        tagsOnChange: !0,
        tagsTarget: "",
        filter: !1,
        filterEmpty: !0,
        filterTarget: "",
        filterPlaceholder: "",
        filterNotFound: "",
        filterType: "text",
        validateOperator: "",
        validateTarget: "",
        storage: "session",
        onInit: function onInit() {},
        onChange: function onChange(e) {},
        onUncheckAll: function onUncheckAll() {},
        onCheckAll: function onCheckAll() {},
        onKeyUp: function onKeyUp() {},
        onKeyDown: function onKeyDown() {},
        onKeyEnter: function onKeyEnter() {},
        onFocus: function onFocus() {},
        onBlur: function onBlur() {},
        onClickTag: function onClickTag(e) {},
        onValidateError: function onValidateError() {},
        onLimit: function onLimit() {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetCheckbox;
}();

var JetFavorite =
/*#__PURE__*/
function () {
  function JetFavorite(e) {
    _classCallCheck(this, JetFavorite);

    this.config = JetFavorite.extend(e), this.idParameter = "cliente" === this.config.idType ? "filtro.clienteid=" : "filtro.parceriaid=", this.baseUrl = this.config.favoriteApi, this.baseUrlLogin = this.config.loginApi, this.baseUrlSearch = "".concat(this.baseUrl, "/pesquisar?").concat(this.idParameter).concat(this.config.id, "&pagina=1&maximo=999999"), this.baseUrlDeleteAll = "".concat(this.baseUrl, "/excluirtodos/").concat(this.config.id), this.activeClass = "".concat(this.config.favorite.substr(1), "--checked"), this.tokenStorage = "favorite-token-".concat(this.config.id), this.userStorage = "favorite-user-".concat(this.config.id), this.total = 0, this.config.onInit(), this.init();
  }

  _createClass(JetFavorite, [{
    key: "loginSubmit",
    value: function loginSubmit() {
      var _this59 = this;

      var e = "string" == typeof this.config.form ? document.querySelectorAll(this.config.form) : this.config.form;
      e.forEach(function (e) {
        e.addEventListener("submit", function (t) {
          t.preventDefault();
          var i = new FormData(e);
          i.get("nome") || i.append("nome", ""), i.get("sobrenome") || i.append("sobrenome", ""), i.get("telefone") || i.append("telefone", ""), i.append("keySecret", _this59.config.key), "cliente" === _this59.config.idType ? (i.append("clienteId", _this59.config.id), i.append("parceriaId", "")) : (i.append("clienteId", ""), i.append("parceriaId", _this59.config.id)), i.append("moduloId", 1), _this59.login(i);
        });
      });
    }
  }, {
    key: "login",
    value: function login(e) {
      var _this60 = this;

      fetch(this.baseUrlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: "{\"email\":\"".concat(e.get("email"), "\",\"firstName\":\"").concat(e.get("nome"), "\",\"lastName\":\"").concat(e.get("sobrenome"), "\",\"telephone\":\"").concat(e.get("telefone"), "\",\"keySecret\":\"").concat(this.config.key, "\",\"clienteId\":\"").concat(e.clienteId, "\",\"parceriaId\":\"").concat(e.parceriaId, "\",\"moduloId\":\"1\"}")
      }).then(function (e) {
        if (!e.ok) throw _this60.config.onError("login"), new Error("JetFavorite: An error has occured trying to return the favorites login request \uD83D\uDE2D: ".concat(e.status));
        return e.json();
      }).then(function (e) {
        sessionStorage.setItem(_this60.tokenStorage, e.data.accessToken), sessionStorage.setItem(_this60.userStorage, e.data.userToken.email), _this60.get(), _this60.config.onLogin();
      })["catch"](function (e) {
        return console.log(e);
      });
    }
  }, {
    key: "get",
    value: function get() {
      var _this61 = this;

      sessionStorage.getItem(this.tokenStorage) && fetch("".concat(this.baseUrlSearch, "&filtro.email=").concat(sessionStorage.getItem(this.userStorage)), {
        headers: {
          authorization: "bearer ".concat(sessionStorage.getItem(this.tokenStorage))
        }
      }).then(function (e) {
        if (!e.ok) throw _this61.config.onError("get"), new Error("JetFavorite: An error has occured trying to return the favorites search request \uD83D\uDE2D: ".concat(e.status));
        return e.json();
      }).then(function (e) {
        return _this61.update(e);
      })["catch"](function (e) {
        return console.log(e);
      });
    }
  }, {
    key: "update",
    value: function update(e) {
      if (sessionStorage.getItem(this.tokenStorage)) {
        this.total = e.data.total;
        var t = [],
            i = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = e.data.resultado[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var s = _step.value;

            var _e7 = void 0;

            _e7 = s.imovelVenda && s.imovelLocacao ? "a" : s.imovelVenda && !s.imovelLocacao ? "v" : s.imovelLocacao && !s.imovelVenda ? "l" : "t", t.push("".concat(s.clienteId, ",").concat(s.imovelId, ",").concat(_e7)), i.push(s.imovelFavoritoId);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.checkButton(t, i), this.counter(e.data.total), this.action(), this.pageLink(), this.config.onChange(e);
      }
    }
  }, {
    key: "action",
    value: function action() {
      if (this.actionElement) {
        var e = JSON.parse(this.actionElement.dataset.jetfavorite);
        e ? this.actionElement.classList.contains(this.activeClass) ? this["delete"](e) : this.actionElement.classList.contains(this.activeClass) || this.add(e) : this.deleteAll(), this.actionElement = null;
      }
    }
  }, {
    key: "checkButton",
    value: function checkButton(e, t) {
      var _this62 = this;

      var i = "string" == typeof this.config.favorite ? document.querySelectorAll(this.config.favorite) : this.config.favorite;
      i.forEach(function (i) {
        var s = JSON.parse(i.dataset.jetfavorite),
            o = "".concat(s.clienteId, ",").concat(s.imovelId, ",").concat(s.imovelPara),
            n = e.indexOf(o);
        n > -1 ? (s.favoritoId = t[n], i.dataset.jetfavorite = JSON.stringify(s), i.classList.add(_this62.activeClass)) : i.classList.contains(_this62.activeClass) && (delete s.favoritoId, i.dataset.jetfavorite = JSON.stringify(s), i.classList.remove(_this62.activeClass));
      });
    }
  }, {
    key: "counter",
    value: function counter(e) {
      var t = "string" == typeof this.config.counter ? document.querySelectorAll(this.config.counter) : this.config.counter;
      t.forEach(function (t) {
        t.innerHTML = e;
      });
    }
  }, {
    key: "add",
    value: function add(e) {
      var _this63 = this;

      sessionStorage.getItem(this.tokenStorage) ? fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: "bearer ".concat(sessionStorage.getItem(this.tokenStorage)),
          "Content-Type": "application/json"
        },
        body: "{\"clienteId\":\"".concat(e.clienteId, "\",\"imovelId\":").concat(e.imovelId, ",\"imovelPara\":\"").concat(e.imovelPara, "\"}")
      }).then(function (e) {
        if (!e.ok) throw _this63.config.onError("add"), new Error("JetFavorite: An error has occured trying to return the favorites add request \uD83D\uDE2D: ".concat(e.status));
        return e.json();
      }).then(function (e) {
        _this63.get(), _this63.config.onAdd();
      })["catch"](function (e) {
        return console.log(e);
      }) : this.config.onNoLogin();
    }
  }, {
    key: "delete",
    value: function _delete(e) {
      var _this64 = this;

      sessionStorage.getItem(this.tokenStorage) ? fetch("".concat(this.baseUrl, "/").concat(e.favoritoId), {
        method: "DELETE",
        headers: {
          authorization: "bearer ".concat(sessionStorage.getItem(this.tokenStorage))
        }
      }).then(function (e) {
        if (!e.ok) throw _this64.config.onError("delete"), new Error("JetFavorite: An error has occured trying to return the favorites delete request \uD83D\uDE2D: ".concat(e.status));
        return e.json();
      }).then(function (e) {
        _this64.get(), _this64.config.onRemove();
      })["catch"](function (e) {
        return console.log(e);
      }) : this.config.onNoLogin();
    }
  }, {
    key: "favoriteButtonEvent",
    value: function favoriteButtonEvent() {
      var _this65 = this;

      var e = "string" == typeof this.config.favorite ? document.querySelectorAll(this.config.favorite) : this.config.favorite;
      e.forEach(function (e) {
        e.addEventListener("click", _this65.favoriteButton.bind(_this65, e));
      });
    }
  }, {
    key: "favoriteButton",
    value: function favoriteButton(e) {
      event.stopImmediatePropagation();
      var t = JSON.parse(e.dataset.jetfavorite);
      sessionStorage.getItem(this.tokenStorage) ? e.classList.contains(this.activeClass) ? this["delete"](t) : this.add(t) : (this.actionElement = e, this.config.onNoLogin()), this.config.onClick(e, this.total);
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      var _this66 = this;

      sessionStorage.getItem(this.tokenStorage) ? fetch(this.baseUrlDeleteAll, {
        method: "DELETE",
        headers: {
          authorization: "bearer ".concat(sessionStorage.getItem(this.tokenStorage))
        }
      }).then(function (e) {
        if (!e.ok) throw _this66.config.onError("deleteAll"), new Error("JetFavorite: An error has occured trying to return the favorites delete all request \uD83D\uDE2D: ".concat(e.status));
        return e.json();
      }).then(function (e) {
        _this66.get(), _this66.config.onRemoveAll();
      })["catch"](function (e) {
        return console.log(e);
      }) : this.config.onNoLogin();
    }
  }, {
    key: "deleteAllEvent",
    value: function deleteAllEvent() {
      var _this67 = this;

      var e = "string" == typeof this.config.deleteAll ? document.querySelectorAll(this.config.deleteAll) : this.config.deleteAll;
      e.forEach(function (e) {
        e.addEventListener("click", function (t) {
          t.stopImmediatePropagation(), sessionStorage.getItem(_this67.tokenStorage) || (_this67.actionElement = e), _this67.deleteAll();
        });
      });
    }
  }, {
    key: "pageLink",
    value: function pageLink() {
      if (this.config.pageLink) {
        var e = document.querySelectorAll(this.config.pageLink),
            t = sessionStorage.getItem(this.userStorage);
        e.forEach(function (e) {
          if (t && !e.href.includes("user=")) {
            var i = e.href.replace(/^.*\/\/[^\/]+/, "");
            i = "".concat(i, "?user=").concat(t), e.href = i;
          }
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.loginSubmit(), this.favoriteButtonEvent(), this.deleteAllEvent(), this.get();
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        form: "",
        pageLink: "",
        favorite: "",
        deleteAll: "",
        counter: "",
        loginApi: "https://casasoftautorizacao.azurewebsites.net/api/v1/Account/external/login/portal",
        favoriteApi: "https://portalapi.casasoftsig.com/api/v3/imoveisfavoritos",
        key: "1add169cbb1244d1aaadad282dc16425",
        idType: "cliente",
        id: "",
        onInit: function onInit() {},
        onLogin: function onLogin() {},
        onNoLogin: function onNoLogin() {},
        onClick: function onClick(e, t) {},
        onChange: function onChange(e) {},
        onAdd: function onAdd() {},
        onRemove: function onRemove() {},
        onRemoveAll: function onRemoveAll() {},
        onError: function onError(e) {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetFavorite;
}();

var JetInput =
/*#__PURE__*/
function () {
  function JetInput(e) {
    _classCallCheck(this, JetInput);

    this.config = JetInput.extend(e), this.elements = document.querySelectorAll(this.config.element), this.names = "string" == typeof this.config.name ? [this.config.name] : this.config.name, this.optionsText = this.config.optionsText, this.optionsValue = this.config.optionsValue, this.optionsCounter = this.config.counter, this.activeClass = "jetinput__item--active", this.valueObject = {}, this.labelObject = {}, this.sortMap = {}, this.selectedOptions = [], this.tabIndex = null, this.baseName, this.titles, this.storage, this.init(), this.config.onInit();
  }

  _createClass(JetInput, [{
    key: "arrayLowerCase",
    value: function arrayLowerCase(e) {
      e.forEach(function (t, i) {
        Array.isArray(t) ? t.forEach(function (e, i) {
          isNaN(e) && (t[i] = e.toLowerCase());
        }) : isNaN(t) && (e[i] = t.toLowerCase());
      });
    }
  }, {
    key: "setBaseName",
    value: function setBaseName(e) {
      var t = e.getAttribute("class"),
          i = this.config.element.split(",");
      i.forEach(function (i) {
        i = i.trim().substr(1), t.indexOf(i) > -1 && (e.dataset.jetinputName = i);
      }), this.baseName = e.dataset.jetinputName;
    }
  }, {
    key: "storageType",
    value: function storageType() {
      "local" === this.config.storage ? this.storage = localStorage : this.storage = sessionStorage;
    }
  }, {
    key: "storageCheck",
    value: function storageCheck() {
      var _this68 = this;

      this.names.forEach(function (e) {
        if (_this68.storage.getItem(e)) {
          var t = _this68.storage.getItem(e),
              i = t.split(",");

          _this68.valueObject[e] || (_this68.valueObject[e] = []), i.forEach(function (t) {
            t = t.toString().toLowerCase(), _this68.valueObject[e].push(t);
          });
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this69 = this;

      this.storageCheck(), this.elements.forEach(function (e, t) {
        _this69.updateSelect(e), _this69.config.tags && _this69.updateTags(e, t);
      });
    }
  }, {
    key: "updateTags",
    value: function updateTags(e, t) {
      var _this70 = this;

      var i,
          s = document.createDocumentFragment();
      i = this.config.tagsTarget ? document.querySelectorAll(this.config.tagsTarget) : e.querySelectorAll(".jetinput"), i.forEach(function (e) {
        for (var o in _this70.labelObject) {
          console.log(_this70.labelObject), _this70.labelObject[o].forEach(function (o) {
            var n = "[data-jetinput-id=\"".concat(_this70.config.name, "\"][data-jetinput-label=\"").concat(o, "\"]"),
                a = e.querySelector(n);
            var r;

            if (_this70.config.autocomplete) {
              var _e8 = document.querySelector(".".concat(_this70.baseName, "-item[data-jetinput-text=\"").concat(o, "\"]"));

              r = _e8.dataset.jetinputValue.split(",");
            } else r = o;

            if (_this70.config.tagsTarget || (i[0].innerHTML = ""), !a) {
              var _e9 = _this70.createTag(o, r, t);

              s.appendChild(_e9);
            }
          });
        }

        e.appendChild(s);
      });
    }
  }, {
    key: "addTags",
    value: function addTags(e, t, i) {
      var _this71 = this;

      var s,
          o = document.createDocumentFragment();
      this.config.tagsTarget ? s = document.querySelectorAll(this.config.tagsTarget) : (s = e.querySelectorAll(".jetinput"), s[0].querySelector(".jetinput__tag") || (s[0].innerHTML = "")), s.forEach(function (s) {
        var n = "[data-jetinput-id=\"".concat(_this71.config.name, "\"][data-jetinput-label=\"").concat(t, "\"]"),
            a = s.querySelector(n),
            r = e.querySelector("[data-jetinput-text=\"".concat(t, "\"]")),
            l = r.dataset.jetinputValue.split(",");

        if (!a) {
          var _e10 = _this71.createTag(t, l, i);

          o.appendChild(_e10), s.appendChild(o);
        }
      });
    }
  }, {
    key: "removeTags",
    value: function removeTags(e, t) {
      var _this72 = this;

      var i;
      i = this.config.tagsTarget ? document.querySelectorAll(this.config.tagsTarget) : e.querySelectorAll(".jetinput"), i.forEach(function (e) {
        var i = e.querySelector("[data-jetinput-label=\"".concat(t, "\"]"));
        i && i.parentNode.removeChild(i), _this72.config.tagsTarget || e.querySelector(".jetinput__tag") || (e.innerHTML = _this72.config.label);
      });
    }
  }, {
    key: "createTag",
    value: function createTag(e, t, i) {
      var _this73 = this;

      var s = document.createElement("span"),
          o = document.createElement("span"),
          n = document.createElement("span");
      return "multiple" === this.config.type ? this.config.name.constructor !== Array && (t = t.toString()) : t = "", s.addEventListener("click", function () {
        _this73.config.filter && _this73.config.autocomplete && _this73.manageFilter("", i), _this73.clickEvent(t, i), _this73.config.onClickTag(t);
      }), n.className = "".concat(this.baseName, "-delete-btn jetinput__delete-btn"), o.className = "".concat(this.baseName, "-tag-text jetinput__tag-text"), s.className = "".concat(this.baseName, "-tag jetinput__tag"), s.dataset.jetinputId = this.config.name, s.dataset.jetinputLabel = e, o.innerHTML = e, s.appendChild(o), s.appendChild(n), s;
    }
  }, {
    key: "setLabel",
    value: function setLabel(e) {
      var _this74 = this;

      var t = e.querySelectorAll(".".concat(this.activeClass)),
          i = e.querySelector("input"),
          s = this.config.name;
      var o = [];
      this.labelObject[s] || (this.labelObject[s] = []), this.config.autocomplete ? t.forEach(function (e) {
        var t = e.dataset.jetinputText,
            i = _this74.labelObject[s].indexOf(t);

        o.push(t), -1 === i && _this74.labelObject[s].push(t);
      }) : this.labelObject[s].push(this.storage.getItem(s)), o[0] ? i.innerHTML = o.join(", ") : i.innerHTML = "";
    }
  }, {
    key: "updateSelect",
    value: function updateSelect(e) {
      var t = {};

      for (var _e11 in this.valueObject) {
        this.valueObject[_e11].forEach(function (e, i) {
          t[i] || (t[i] = []), t[i].push(e);
        });
      }

      for (var i in t) {
        var s = t[i],
            o = e.querySelector("[data-jetinput-value=\"".concat(s, "\"]"));
        o && (o.classList.add(this.activeClass), o.classList.add("".concat(this.baseName, "-item--active")));
      }

      this.setLabel(e);
    }
  }, {
    key: "createSelect",
    value: function createSelect(e, t) {
      var _this75 = this;

      var i = document.createDocumentFragment(),
          s = document.createElement("ul");
      s.className = "".concat(this.baseName, "-list jetinput__list"), this.createList({
        element: e,
        list: s,
        text: this.optionsText,
        value: this.optionsValue,
        counter: this.optionsCounter,
        addIndex: 0,
        index: t
      }), window.addEventListener("click", function (e) {
        _this75.clickInside(t, e);
      }), i.appendChild(s), e.appendChild(i), this.createTotal(e);
    }
  }, {
    key: "createList",
    value: function createList(e) {
      var _this76 = this;

      var t = e.element.querySelector(".jetinput__option--deselect-all"),
          i = e.element.querySelector(".jetinput__option--deselect-all");
      !t && this.config.deselectAll && this.createOption({
        element: e.element,
        list: e.list,
        itemClass: " jetinput__option--deselect-all",
        btnClass: " jetinput__item--deselect-all",
        text: this.config.deselectAll,
        value: "",
        addIndex: e.addIndex,
        index: e.index
      }), !i && this.config.selectAll && "multiple" === this.config.type && this.createOption({
        element: e.element,
        list: e.list,
        itemClass: " jetinput__option--select-all",
        btnClass: " jetinput__item--select-all",
        text: this.config.selectAll,
        value: "*",
        addIndex: e.addIndex,
        index: e.index
      }), e.text.forEach(function (t, i) {
        _this76.config.sortTitle && _this76.createTitle({
          list: e.list,
          text: _this76.sortMap[i]
        }), _this76.createOption({
          element: e.element,
          list: e.list,
          itemClass: "",
          btnClass: "",
          text: t,
          value: _this76.optionsValue[i],
          counter: _this76.optionsCounter,
          optionIndex: i,
          addIndex: e.addIndex,
          index: e.index
        });
      });
    }
  }, {
    key: "createTitle",
    value: function createTitle(e) {
      if (-1 === this.titles.indexOf(e.text)) {
        var t = document.createElement("ul"),
            i = document.createElement("div"),
            s = document.createElement("span"),
            o = document.createElement("span");
        this.titles.push(e.text), t.className = "".concat(this.baseName, "-group jetinput__group"), i.className = "".concat(this.baseName, "-title jetinput__title"), s.className = "".concat(this.baseName, "-name jetinput__name"), o.className = "".concat(this.baseName, "-total jetinput__total"), t.dataset.jetinputTitle = e.text, s.innerHTML = e.text, i.appendChild(s), i.appendChild(o), t.appendChild(i), e.list.appendChild(t);
      }
    }
  }, {
    key: "createTotal",
    value: function createTotal(e) {
      var _this77 = this;

      if (this.config.sortTitle && this.config.sortTotal) {
        var t = e.querySelectorAll(".jetinput__group");
        t.forEach(function (e) {
          var t = e.querySelector(".jetinput__total");
          var i = e.querySelectorAll("li");
          var s = 0;
          i.forEach(function (e) {
            if (_this77.optionsCounter && _this77.optionsCounter.length) {
              var _t7 = e.querySelector(".jetinput__counter");

              s = Number(_t7.innerHTML);
            } else s = i.length;
          }), t.innerHTML = s;
        });
      }
    }
  }, {
    key: "createOption",
    value: function createOption(e) {
      var _this78 = this;

      var t = document.createElement("li"),
          i = document.createElement("a"),
          s = document.createElement("span");
      var o = e.list.querySelector("[data-jetinput-title=\"".concat(this.sortMap[e.optionIndex], "\"]"));

      if (t.className = "".concat(this.baseName, "-option jetinput__option").concat(e.itemClass), i.className = "".concat(this.baseName, "-item jetinput__item").concat(e.btnClass), s.className = "".concat(this.baseName, "-text jetinput__text"), i.dataset.jetinputText = e.text, i.dataset.jetinputValue = e.value, s.innerHTML = e.text, i.appendChild(s), t.appendChild(i), o ? (o.appendChild(t), this.addAtIndex(o, t, e.addIndex)) : (e.list.appendChild(t), this.addAtIndex(e.list, t, e.addIndex)), "multiple" === this.config.type) {
        var _e12 = document.createElement("span");

        _e12.className = "".concat(this.baseName, "-checkbox jetinput__checkbox"), i.insertBefore(_e12, s);
      }

      if (e.counter && e.counter.length && e.counter[e.optionIndex]) {
        var _t8 = document.createElement("span");

        _t8.className = "".concat(this.baseName, "-counter jetinput__counter"), _t8.innerHTML = e.counter[e.optionIndex], i.appendChild(_t8);
      }

      i.addEventListener("click", function () {
        _this78.clickEvent(e.value, e.index);
      }), i.addEventListener("mouseover", function (t) {
        var i = e.list.querySelector(".jetinput__item--focused");
        _this78.tabIndex = e.optionIndex, i && _this78.removeFocus(i), _this78.addFocus(t.target.parentElement);
      });
    }
  }, {
    key: "addAtIndex",
    value: function addAtIndex(e, t, i) {
      var s = e.children.length;
      i || (i = s), i >= e.children.length ? e.appendChild(t) : e.insertBefore(t, e.children[i]);
    }
  }, {
    key: "add",
    value: function add(e) {
      var _this79 = this;

      this.optionsText = e.text, this.optionsValue = e.value, this.optionsCounter = e.counter, this.tabIndex = null, this.arrayLowerCase(this.optionsValue), e.sort && (this.titles = [], this.sort(e.sort)), this.elements.forEach(function (t, i) {
        var s = t.querySelector("input"),
            o = t.querySelector("ul");
        _this79.optionsText.toString() ? t.classList.remove("jetinput--disabled") : t.classList.add("jetinput--disabled"), _this79.createList({
          element: t,
          list: o,
          text: _this79.optionsText,
          value: _this79.optionsValue,
          counter: _this79.optionsCounter,
          addIndex: e.addIndex,
          index: i
        }), _this79.createTotal(t), s === document.activeElement && _this79.open(i);
      });
    }
  }, {
    key: "remove",
    value: function remove(e) {
      var _this80 = this;

      this.elements.forEach(function (t) {
        var i = t.querySelector("ul");
        e ? e.forEach(function (e) {
          var t = i.querySelector("[data-jetinput-text=\"".concat(e, "\"]")),
              s = t.dataset.jetinputValue,
              o = _this80.optionsText.indexOf(e),
              n = _this80.optionsValue.indexOf(s);

          -1 !== o && (_this80.optionsText.splice(o, 1), _this80.optionsValue.splice(n, 1), t.parentNode.removeChild(t));
        }) : (_this80.valueObject = {}, _this80.labelObject = {}, _this80.sortMap = {}, _this80.optionsText = [], _this80.optionsValue = [], i && (i.innerHTML = ""));
      });
    }
  }, {
    key: "sum",
    value: function sum() {
      var e = this.config.min,
          t = this.config.max,
          i = this.config.step;
      var s;
      this.elements.forEach(function (o, n) {
        var a = o.querySelector("input"),
            r = o.querySelector(".jetinput__empty-btn");
        s = parseInt(a.value, 10), s = isNaN(s) ? e : s, isNaN(t) ? s++ : (s = Number(s) + Number(i), s >= t && (s = t)), r && (r.style.display = "block"), a.value = s;
      }), this.removeStorage(), this.setStorage(s), this.config.onChange(s), this.config.update && this.update();
    }
  }, {
    key: "reduce",
    value: function reduce() {
      var e = this.config.min,
          t = this.config.step;
      var i;
      this.elements.forEach(function (s, o) {
        var n = s.querySelector("input"),
            a = s.querySelector(".jetinput__empty-btn");
        i = parseInt(n.value, 10), i = isNaN(i) ? e : i, isNaN(e) ? i-- : (i = Number(i) - Number(t), i <= e && (i = e)), a && (a.style.display = "block"), n.value = i;
      }), this.removeStorage(), this.setStorage(i), this.config.onChange(i), this.config.update && this.update();
    }
  }, {
    key: "createSearchInput",
    value: function createSearchInput(e, t) {
      var _this81 = this;

      var i = document.createDocumentFragment();
      var s = document.createElement("div"),
          o = document.createElement("input");
      s.className = "".concat(this.baseName, "-filter jetinput__filter"), o.className = "".concat(this.baseName, "-input jetinput__input"), o.placeholder = this.config.placeholder, o.type = this.config.inputType, "" !== this.config.value && (o.value = this.config.value), isNaN(this.config.min) || (o.min = this.config.min), isNaN(this.config.max) || (o.max = this.config.max), isNaN(this.config.maxlength) || (o.maxLength = this.config.maxlength), isNaN(this.config.step) || (o.step = this.config.step), o.addEventListener("paste", function (e) {
        _this81.paste(t, e);
      }), o.addEventListener("focus", function () {
        _this81.focus(t);
      }), o.addEventListener("blur", function () {
        _this81.config.onBlur();
      }), o.addEventListener("keyup", function (e) {
        _this81.keyUp(t, e);
      }), o.addEventListener("keydown", function (e) {
        _this81.keyDown(t, e);
      }), s.appendChild(o), this.config.empty && s.appendChild(this.emptyBtn(o, t)), i.appendChild(s), this.config.reduceButton && i.appendChild(this.reduceBtn()), this.config.sumButton && i.appendChild(this.sumBtn()), e.appendChild(i), e.classList.add("jetinput");
    }
  }, {
    key: "empty",
    value: function empty() {
      var _this82 = this;

      this.elements.forEach(function (e, t) {
        var i = e.querySelector("input");
        i.value = "", _this82.config.autocomplete && (_this82.close(t), _this82.config.filter ? _this82.manageFilter("", t) : _this82.remove()), _this82.config.empty && _this82.manageEmptyBtn("", t), _this82.config.storeOnKeyUp && _this82.removeStorage();
      }), this.config.onEmpty();
    }
  }, {
    key: "emptyBtn",
    value: function emptyBtn(e, t) {
      var i = document.createElement("a");
      return i.className = "".concat(this.baseName, "-empty-btn jetinput__empty-btn"), i.addEventListener("click", this.empty.bind(this)), i;
    }
  }, {
    key: "manageEmptyBtn",
    value: function manageEmptyBtn(e, t) {
      var i = this.elements[t].querySelector(".jetinput__empty-btn");
      i && (i.style.display = e ? "block" : "none");
    }
  }, {
    key: "sumBtn",
    value: function sumBtn() {
      var e = document.createElement("div");
      return e.className = "".concat(this.baseName, "-sum-btn jetinput__sum-btn"), this.config.sumButtonLabel && (e.innerText = this.config.sumButtonLabel), e.addEventListener("click", this.sum.bind(this)), e;
    }
  }, {
    key: "reduceBtn",
    value: function reduceBtn() {
      var e = document.createElement("div");
      return e.className = "".concat(this.baseName, "-reduce-btn jetinput__reduce-btn"), this.config.reduceButtonLabel && (e.innerText = this.config.reduceButtonLabel), e.addEventListener("click", this.reduce.bind(this)), e;
    }
  }, {
    key: "clickInside",
    value: function clickInside(e, t) {
      var i = this.elements[e].contains(t.target),
          s = this.elements[e].classList.contains("jetinput--opened");
      s && !i && this.config.closeOnBlur && this.close(e);
    }
  }, {
    key: "open",
    value: function open(e) {
      var t = this.elements[e].querySelector("ul");
      this.elements[e].classList.add("jetinput--opened"), t.classList.add("jetinput__list--opened"), this.config.onOpen();
    }
  }, {
    key: "close",
    value: function close(e) {
      if (this.config.autocomplete) {
        var t = this.elements[e].querySelector("ul"),
            i = t.querySelector(".jetinput__item--focused");
        i && (this.removeFocus(i), this.tabIndex = null), this.elements[e].classList.remove("jetinput--opened"), t.classList.remove("jetinput__list--opened"), t.classList.remove("jetinput__list--opened-top");
      }

      this.config.onClose();
    }
  }, {
    key: "setStorage",
    value: function setStorage(e) {
      var _this83 = this;

      var t;
      this.valueObject = {}, this.storageCheck(), this.names.forEach(function (i, s) {
        _this83.valueObject[i] || (_this83.valueObject[i] = []), t = _this83.config.name.constructor === Array ? e[s] : e;

        var o = _this83.valueObject[i].indexOf(t);

        -1 === o ? _this83.config.selectionLimit && _this83.config.selectionLimit <= _this83.valueObject[i].length ? _this83.config.onLimit() : _this83.valueObject[i].push(t) : _this83.valueObject[i].splice(o, 1), _this83.valueObject[i][0] ? _this83.storage.setItem(i, _this83.valueObject[i]) : _this83.storage.removeItem(i);
      });
    }
  }, {
    key: "removeStorage",
    value: function removeStorage() {
      var _this84 = this;

      this.names.forEach(function (e) {
        _this84.valueObject[e] = [], _this84.storage.removeItem(e);
      });
    }
  }, {
    key: "validateNumber",
    value: function validateNumber(e) {
      var t = this.storage.getItem(this.config.validateTarget),
          i = "<" === this.config.validateOperator && t > e,
          s = ">" === this.config.validateOperator && t < e;
      if (null === t || i || s) return !0;
    }
  }, {
    key: "clickEvent",
    value: function clickEvent(e, t) {
      if (!e || this.validateNumber(e)) {
        var i = this.elements[t].querySelector("input");
        this.selectOption(e), e && "*" !== e && this.setStorage(e), "multiple" === this.config.type && e && "*" !== e || this.close(t), this.config.empty && this.manageEmptyBtn(i.value, t), e || this.config.onDeselectAll(), "*" === e && this.config.onSelectAll(), this.config.onChange(this.valueObject);
      } else this.config.onValidateError();
    }
  }, {
    key: "checkAll",
    value: function checkAll(e, t) {
      var _this85 = this;

      var i = this.config.tags && this.config.tagsTarget;
      this.optionsValue.forEach(function (i, s) {
        if (!_this85.config.selectionLimit || s < _this85.config.selectionLimit) {
          var _s2 = e.querySelector("[data-jetinput-value=\"".concat(i, "\"]")),
              o = _s2.dataset.jetinputText;

          _s2.classList.contains(_this85.activeClass) && option.selected || (_s2.classList.add(_this85.activeClass), _s2.classList.add("".concat(_this85.baseName, "-item--active")), _this85.config.tags && _this85.addTags(e, o, t), 0 === t && _this85.setStorage(i));
        }
      }), this.config.tags && !i || this.setLabel(e);
    }
  }, {
    key: "uncheckAll",
    value: function uncheckAll(e) {
      var _this86 = this;

      var t = this.config.tags && this.config.tagsTarget;
      this.optionsValue.forEach(function (t) {
        var i = e.querySelector("[data-jetinput-value=\"".concat(t, "\"]"));
        var s;
        i && (s = i.dataset.jetinputText, i.classList.remove(_this86.activeClass), i.classList.remove("".concat(_this86.baseName, "-item--active")), _this86.config.tags && _this86.removeTags(e, s));
      }), this.removeStorage(), this.config.tags && !t || this.setLabel(e);
    }
  }, {
    key: "sort",
    value: function sort(e) {
      var _this87 = this;

      this.sortMap = e.map(function (e, t) {
        return {
          index: t,
          value: e
        };
      }), this.sortMap.sort(function (e, t) {
        return isNaN(e.value) && isNaN(t.value) ? +(e.value > t.value) || +(e.value === t.value) - 1 : e.value - t.value;
      }), this.optionsText = this.sortMap.map(function (e) {
        return _this87.optionsText[e.index];
      }), this.optionsValue = this.sortMap.map(function (e) {
        return _this87.optionsValue[e.index];
      }), this.optionsCounter && this.optionsCounter.length && (this.optionsCounter = this.sortMap.map(function (e) {
        return _this87.optionsCounter[e.index];
      })), this.sortMap = this.sortMap.map(function (e) {
        return e[Object.keys(e)[1]];
      }), "descending" === this.config.sortOrder && (this.optionsText.reverse(), this.optionsValue.reverse(), this.optionsCounter.reverse(), this.sortMap.reverse());
    }
  }, {
    key: "filter",
    value: function filter(e, t) {
      var i = t.split(" ");
      var s, o;

      for (var _t9 = 0; o = i[_t9++];) {
        if (s = new RegExp(o, "ig"), !s.test(e)) return !1;
        e = e.replace(s, "");
      }

      return !0;
    }
  }, {
    key: "manageFilter",
    value: function manageFilter(e, t) {
      var _this88 = this;

      var i = this.elements[t].querySelectorAll("li:not(.jetinput__option--deselect-all):not(.jetinput__option--select-all)"),
          s = "jetinput__option--hidden";
      i.forEach(function (i, o) {
        var n = _this88.elements[t].querySelector("[data-jetinput-title=\"".concat(_this88.sortMap[o], "\"]"));

        var a;

        if (n && (a = n.querySelectorAll("li")), e) {
          var _t10 = i.querySelector("a");

          var _o3 = _t10.innerHTML;
          if (_this88.filter(_o3, e)) i.classList.remove(s), n && a[0] && n.classList.remove(s);else if (i.classList.add(s), n) {
            var _e13 = n.querySelectorAll("li.".concat(s));

            a.length === _e13.length && n.classList.add(s);
          }
        } else i.classList.remove(s), n && n.classList.remove(s);
      });
    }
  }, {
    key: "selectOption",
    value: function selectOption(e) {
      var _this89 = this;

      this.elements.forEach(function (t, i) {
        var s, o, n;
        e && (s = t.querySelector("[data-jetinput-value=\"".concat(e, "\"]")), o = s.dataset.jetinputText, n = s.classList.contains(_this89.activeClass) && "multiple" === _this89.config.type);

        var a = _this89.config.tags && _this89.config.tagsTarget,
            r = _this89.valueObject[Object.keys(_this89.valueObject)[0]],
            l = r ? r.length : 1;

        "multiple" === _this89.config.type && e ? "*" === e && _this89.checkAll(t, i) : _this89.uncheckAll(t), e && "*" !== e && (n ? (s.classList.remove(_this89.activeClass), s.classList.remove("".concat(_this89.baseName, "-item--active")), _this89.config.tags && _this89.removeTags(t, o)) : (!_this89.config.selectionLimit || l < _this89.config.selectionLimit) && (s.classList.add(_this89.activeClass), s.classList.add("".concat(_this89.baseName, "-item--active")), _this89.config.tags && _this89.config.tagsOnChange && _this89.addTags(t, o, i))), _this89.config.tags && !a || _this89.setLabel(t);
      });
    }
  }, {
    key: "paste",
    value: function paste(e, t) {
      var _this90 = this;

      setTimeout(function () {
        var e = t.target.value;
        _this90.setStorage(e), _this90.config.onPaste();
      });
    }
  }, {
    key: "focus",
    value: function focus(e) {
      this.config.autocomplete && this.optionsText[0] && this.open(e), this.config.onFocus();
    }
  }, {
    key: "keyUp",
    value: function keyUp(e, t) {
      var i = this.elements[e].querySelector("input"),
          s = t.target.value;
      38 !== t.keyCode && 40 !== t.keyCode && 13 !== t.keyCode && 17 !== t.keyCode && (this.manageEmptyBtn(s, e), this.removeStorage()), (8 === t.keyCode || 32 === t.keyCode || 46 === t.keyCode || t.keyCode >= 48 && t.keyCode <= 57 || t.keyCode >= 65 && t.keyCode <= 90 || t.keyCode >= 96 && t.keyCode <= 105 || t.keyCode >= 187 && t.keyCode <= 190 || 229 === t.keyCode) && (!this.config.pattern || this.config.pattern && this.pattern(s, this.config.pattern) ? (s && this.config.storeOnKeyUp && (this.setStorage(s), this.config.onChange(s)), this.config.filter && this.config.autocomplete && this.manageFilter(s, e), this.config.onKeyUp(s)) : i.value = this.removeLastDigit(s));
    }
  }, {
    key: "keyDown",
    value: function keyDown(e, t) {
      var i,
          s = t.target.value;

      if (this.config.autocomplete) {
        var _s3 = this.elements[e].querySelector("ul"),
            o = _s3.offsetHeight;

        i = _s3.querySelectorAll("li"), 38 === t.keyCode && (t.preventDefault(), this.keyUpList(i, _s3, o)), 40 === t.keyCode && (t.preventDefault(), this.keyDownList(i, _s3, o));
      }

      13 === t.keyCode && (this.config.autocomplete ? this.keyEnterList(i) : this.keyEnterList()), this.config.onKeyDown(s);
    }
  }, {
    key: "keyUpList",
    value: function keyUpList(e, t) {
      this.removeFocus(e[this.tabIndex]), this.tabIndex > 0 ? this.tabIndex-- : this.tabIndex = e.length - 1, this.addFocus(e[this.tabIndex]), this.scrollUp(e, t);
    }
  }, {
    key: "keyDownList",
    value: function keyDownList(e, t, i) {
      this.removeFocus(e[this.tabIndex]), null === this.tabIndex || this.tabIndex === e.length - 1 ? this.tabIndex = 0 : this.tabIndex++, this.addFocus(e[this.tabIndex]), this.scrollDown(e, t, i);
    }
  }, {
    key: "keyEnterList",
    value: function keyEnterList(e) {
      this.tabIndex && e[this.tabIndex].querySelector("a").click(), this.config.onKeyEnter();
    }
  }, {
    key: "scrollUp",
    value: function scrollUp(e, t) {
      var i = e[this.tabIndex].offsetTop;
      t.scrollTop >= i ? t.scrollTop = i : this.tabIndex === e.length - 1 && (t.scrollTop = t.scrollHeight);
    }
  }, {
    key: "scrollDown",
    value: function scrollDown(e, t, i) {
      var s = e[this.tabIndex].offsetTop,
          o = e[this.tabIndex].offsetHeight,
          n = s - i + o;
      t.scrollTop <= n ? t.scrollTop = n : s < t.scrollTop ? t.scrollTop = s : 0 === this.selectedOptions && (t.scrollTop = 0);
    }
  }, {
    key: "addFocus",
    value: function addFocus(e) {
      e.classList.add("".concat(this.baseName, "-item--focused")), e.classList.add("jetinput__item--focused");
    }
  }, {
    key: "removeFocus",
    value: function removeFocus(e) {
      e && (e.classList.remove("".concat(this.baseName, "-item--focused")), e.classList.remove("jetinput__item--focused"));
    }
  }, {
    key: "pattern",
    value: function pattern(e, t) {
      return t.test(e);
    }
  }, {
    key: "removeLastDigit",
    value: function removeLastDigit(e) {
      return e.substr(0, e.length - 1);
    }
  }, {
    key: "notFound",
    value: function notFound(e) {
      var t = this.elements[e].querySelector("ul"),
          i = "jetinput__option--hidden",
          s = t.querySelectorAll("li.".concat(i, ":not(.jetinput__option--deselect-all):not(.jetinput__option--select-all)")),
          o = t.querySelector(".jetinput__option--deselect-all"),
          n = t.querySelector(".jetinput__option--select-all"),
          a = t.querySelector(".jetinput__not-found");

      if (s.length >= this.optionsText.length) {
        if (o && o.classList.add(i), n && n.classList.add(i), !a && this.config.filterNotFound) {
          var _e14 = document.createElement("div");

          var _i5 = document.createTextNode(this.config.filterNotFound);

          _e14.className = "jetinput__not-found", _e14.appendChild(_i5), t.appendChild(_e14);
        }
      } else o && o.classList.remove(i), n && n.classList.remove(i), a && a.parentNode.removeChild(a), this.open(e);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.elements.forEach(function (e) {
        for (; e.firstChild;) {
          e.removeChild(e.firstChild);
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this91 = this;

      this.storageType(), this.config.sortBy[0] && this.sort(this.config.sortBy), this.arrayLowerCase(this.optionsValue), this.elements.forEach(function (e, t) {
        e.classList.remove("jetinput"), e.classList.remove("jetinput--opened"), e.tabIndex = "0", e.innerHTML = "", _this91.titles = [], _this91.setBaseName(e), _this91.createSearchInput(e, t), _this91.config.autocomplete && _this91.createSelect(e, t);
      }), this.storage.getItem(this.names[0]) && this.update();
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        element: "",
        name: "",
        type: "",
        autocomplete: !1,
        selectionLimit: "",
        optionsText: [],
        optionsValue: [],
        counter: [],
        deselectAll: "",
        selectAll: "",
        inputType: "text",
        placeholder: "Digite para filtrar",
        value: "",
        update: !1,
        empty: !0,
        min: 0,
        max: Number,
        maxlength: Number,
        step: 1,
        pattern: "",
        closeOnBlur: !0,
        sortBy: [],
        sortOrder: "ascending",
        sortTitle: !1,
        sortTotal: !1,
        tags: !1,
        tagsOnChange: !0,
        tagsTarget: "",
        filter: !1,
        sumButton: !1,
        sumButtonLabel: "",
        reduceButton: !1,
        reduceButtonLabel: "",
        validateOperator: "",
        validateTarget: "",
        storeOnKeyUp: !0,
        storage: "session",
        onInit: function onInit() {},
        onOpen: function onOpen() {},
        onClose: function onClose() {},
        onChange: function onChange(e) {},
        onDeselectAll: function onDeselectAll() {},
        onSelectAll: function onSelectAll() {},
        onKeyUp: function onKeyUp(e) {},
        onKeyDown: function onKeyDown(e) {},
        onKeyEnter: function onKeyEnter() {},
        onFocus: function onFocus() {},
        onBlur: function onBlur() {},
        onPaste: function onPaste() {},
        onClickTag: function onClickTag(e) {},
        onEmpty: function onEmpty() {},
        onValidateError: function onValidateError() {},
        onLimit: function onLimit() {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetInput;
}();

var JetLoader =
/*#__PURE__*/
function () {
  function JetLoader(e) {
    _classCallCheck(this, JetLoader);

    this.config = JetLoader.extend(e), this.controller = new AbortController(), this.signal = this.controller.signal, this.init();
  }

  _createClass(JetLoader, [{
    key: "load",
    value: function load(e) {
      var _this92 = this;

      var t = this.controller.signal;
      fetch(e, {
        method: this.config.method,
        referrer: this.config.referrer,
        redirect: this.config.redirect,
        headers: new Headers(this.config.header),
        mode: this.config.mode,
        credentials: this.config.credentials,
        integrity: this.config.integrity,
        cache: this.config.cache,
        body: this.config.body,
        signal: t
      }).then(this.handleErrors.bind(this))["catch"](function (e) {
        return _this92.config.onError(e.status);
      });
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(e) {
      return e.ok ? this.getResponse(e) : Promise.reject(e);
    }
  }, {
    key: "getResponse",
    value: function getResponse(e) {
      var t = e.headers.get("content-type");
      if (t.includes("application/json")) this.getJson(e);else if (t.includes("text/html")) this.getText(e);else {
        if (!t.includes("application/octet-stream") && !t.includes("application/pdf")) throw new Error("JetLoader Error \uD83D\uDE2D - Sorry, content-type ".concat(t, " not supported"));
        this.getBlob(e);
      }
    }
  }, {
    key: "getJson",
    value: function getJson(e) {
      var _this93 = this;

      return e.json().then(function (t) {
        e.ok && _this93.config.onSuccess(t);
      });
    }
  }, {
    key: "getText",
    value: function getText(e) {
      var _this94 = this;

      return e.text().then(function (t) {
        e.ok && _this94.config.onSuccess(t);
      });
    }
  }, {
    key: "getBlob",
    value: function getBlob(e) {
      var _this95 = this;

      return e.blob().then(function (t) {
        e.ok && _this95.config.onSuccess(t);
      });
    }
  }, {
    key: "abort",
    value: function abort() {
      this.controller.abort(), this.config.onAbort();
    }
  }, {
    key: "init",
    value: function init() {
      this.config.onInit(), this.load(this.config.url);
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        url: "",
        method: void 0,
        referrer: void 0,
        mode: void 0,
        redirect: void 0,
        credentials: void 0,
        integrity: void 0,
        header: {},
        cache: void 0,
        body: void 0,
        onInit: function onInit() {},
        onProgress: function onProgress(e) {},
        onSuccess: function onSuccess(e) {},
        onError: function onError(e) {},
        onAbort: function onAbort() {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetLoader;
}();

var JetPagination =
/*#__PURE__*/
function () {
  function JetPagination(e) {
    _classCallCheck(this, JetPagination);

    this.config = JetPagination.extend(e), this.container = this.config.container ? "string" == typeof this.config.container ? document.querySelector(this.config.container) : this.config.container : "", this.previous = this.config.previous ? "string" == typeof this.config.previous ? document.querySelector(this.config.previous) : this.config.previous : "", this.next = this.config.next ? "string" == typeof this.config.next ? document.querySelector(this.config.next) : this.config.next : "", this.first = this.config.first ? "string" == typeof this.config.first ? document.querySelector(this.config.first) : this.config.first : "", this.last = this.config.last ? "string" == typeof this.config.last ? document.querySelector(this.config.last) : this.config.last : "", this.active = this.config.active ? Number(this.config.active) : 1, this.total = Number(this.config.total), this.baseClass = "jetpagination__", this.itemClass = "".concat(this.baseClass, "item"), this.buttonClass = "".concat(this.baseClass, "btn"), this.init(), this.config.onInit();
  }

  _createClass(JetPagination, [{
    key: "createPagesArray",
    value: function createPagesArray(e, t) {
      var _this96 = this;

      return this.range(t).reduce(function (i, s) {
        var o = s + 1,
            n = o <= _this96.start;
        var a = o >= e - _this96.left && o <= e + _this96.right;
        var r = o >= t - _this96.end + 1,
            l = i[i.length - 1] !== _this96.gap;
        var c;
        return e <= _this96.left + 1 ? a = o >= 1 && o <= 1 + _this96.left + _this96.right : e >= t - _this96.right && (a = o >= t - (_this96.left + _this96.right) && o <= t), c = n || a || r ? o : l ? _this96.gap : [], i.concat(c);
      }, []);
    }
  }, {
    key: "range",
    value: function range(e) {
      return Array.apply(null, Array(e)).map(function (e, t) {
        return t;
      });
    }
  }, {
    key: "createElement",
    value: function createElement(e, t, i, s) {
      var o = document.createElement(e);
      return o.className = i, s && (o.innerHTML = s), t.appendChild(o), o;
    }
  }, {
    key: "createPages",
    value: function createPages(e) {
      var _this97 = this;

      var t = this.createPagesArray(this.active, this.total),
          i = this.config.container.slice(1),
          s = "".concat(i, "-item"),
          o = "".concat(i, "-btn");
      var n, a;
      e.innerHTML = "", t.forEach(function (t) {
        t !== _this97.gap ? (a = _this97.createElement("li", e, "".concat(_this97.itemClass, " ").concat(s)), n = _this97.createElement("a", a, "".concat(_this97.buttonClass, " ").concat(o), t), t === _this97.active ? (a.classList.add("".concat(_this97.itemClass, "--active"), "".concat(s, "--active")), n.classList.add("".concat(_this97.buttonClass, "--active"), "".concat(o, "--active"))) : _this97.config.link ? _this97.setLink(n, t) : n.addEventListener("click", _this97.gotoPage.bind(_this97, t))) : a = _this97.createElement("li", e, "".concat(_this97.baseClass, "gap ").concat(i, "-gap"), _this97.gap);
      }), this.config.onComplete();
    }
  }, {
    key: "gotoPage",
    value: function gotoPage(e) {
      this.active = Number(e), this.container && this.checkBreakpoints(), this.checkButton(), this.config.onChange(e);
    }
  }, {
    key: "prevPage",
    value: function prevPage(e) {
      this.active--, this.config.link ? this.setLink(e, this.active) : this.gotoPage(this.active);
    }
  }, {
    key: "nextPage",
    value: function nextPage(e) {
      this.active++, this.config.link ? this.setLink(e, this.active + 1) : this.gotoPage(this.active);
    }
  }, {
    key: "firstPage",
    value: function firstPage(e) {
      this.config.link ? this.setLink(e, 1) : (this.active = 1, this.gotoPage(this.active));
    }
  }, {
    key: "lastPage",
    value: function lastPage(e) {
      this.config.link ? this.setLink(e, this.total) : (this.active = this.total, this.gotoPage(this.active));
    }
  }, {
    key: "cleanBaseUrl",
    value: function cleanBaseUrl() {
      var e = this.config.parameter,
          t = this.config.concatenateWith;
      var i = this.config.baseUrl;

      if (i.includes(e)) {
        var s = i.split("".concat(t).concat(e))[0];

        if (i.includes("?")) {
          var _e15 = i.split("?"),
              o = _e15[0],
              n = _e15[1];

          i = "query" === this.config.parameterType ? n.includes(t) ? s : o : "".concat(s, "?").concat(n);
        } else i = s;
      }

      return i;
    }
  }, {
    key: "setLink",
    value: function setLink(e, t) {
      var i = this.cleanBaseUrl();

      if (t > 1) {
        var s = "".concat(this.config.parameter).concat(this.config.joinWith).concat(t),
            o = "".concat(this.config.concatenateWith).concat(s);
        if (i.includes("?")) {
          if ("query" === this.config.parameterType) e.href = "".concat(i).concat(o);else {
            var _t11 = i.split("?");

            e.href = "".concat(_t11[0]).concat(o, "?").concat(_t11[1]);
          }
        } else "query" === this.config.parameterType ? e.href = "".concat(i, "?").concat(s) : e.href = "".concat(i).concat(o);
      } else e.href = i;

      this.config.linkTarget && (e.target = this.config.linkTarget);
    }
  }, {
    key: "buttonEvents",
    value: function buttonEvents() {
      var _this98 = this;

      var e = [this.previous, this.next, this.first, this.last],
          t = [this.prevPage, this.nextPage, this.firstPage, this.lastPage];
      e.forEach(function (e, i) {
        e && (_this98.config.link ? t[i].call(_this98, e) : e.addEventListener("click", t[i].bind(_this98)));
      });
    }
  }, {
    key: "buttonState",
    value: function buttonState(e, t, i, s) {
      if (t) {
        var o = "".concat(this.baseClass).concat(s, "--disabled"),
            n = "".concat(i.slice(1), "--disabled");
        e ? t.classList.remove(o, n) : (t.classList.add(o, n), this.config.link && t.removeAttribute("href"));
      }
    }
  }, {
    key: "checkButton",
    value: function checkButton() {
      var e = 1 !== this.active,
          t = 1 !== this.active,
          i = this.active !== this.total,
          s = this.active !== this.total;
      this.buttonState(e, this.first, this.config.first, "first"), this.buttonState(t, this.previous, this.config.previous, "previous"), this.buttonState(i, this.next, this.config.next, "next"), this.buttonState(s, this.last, this.config.last, "last");
    }
  }, {
    key: "checkBreakpoints",
    value: function checkBreakpoints() {
      var _this99 = this;

      this.start = this.config.start, this.left = this.config.left, this.right = this.config.right, this.end = this.config.end, this.gap = this.config.gap;
      var e = [this.start, this.end, this.left, this.right, this.gap],
          t = window.innerWidth;
      e.forEach(function (e) {
        for (var i in e) {
          t >= Number(i) && (e === _this99.config.start ? _this99.start = _this99.config.start[i] : e === _this99.config.end ? _this99.end = _this99.config.end[i] : e === _this99.config.left ? _this99.left = _this99.config.left[i] : e === _this99.config.right ? _this99.right = _this99.config.right[i] : "object" == _typeof(_this99.config.gap) && (_this99.gap = _this99.config.gap[i]));
        }
      }), this.createPages(this.container);
    }
  }, {
    key: "addClasses",
    value: function addClasses() {
      var _this100 = this;

      var e = [this.container, this.previous, this.next, this.first, this.last],
          t = ["list", "previous", "next", "first", "last"];
      e.forEach(function (e, i) {
        e && e.classList.add("".concat(_this100.baseClass).concat(t[i]));
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var e = [this.previous, this.next, this.first, this.last];
      this.container.innerHTML = "", e.forEach(function (e) {
        var t = e.cloneNode(!0),
            i = e.parentNode;
        i.replaceChild(t, e);
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.container && (window.addEventListener("resize", this.checkBreakpoints.bind(this)), this.checkBreakpoints()), this.buttonEvents(), this.checkButton(), this.addClasses();
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        container: "",
        previous: "",
        next: "",
        first: "",
        last: "",
        active: 1,
        start: 0,
        left: 4,
        right: 4,
        end: 0,
        gap: [],
        total: "",
        link: !0,
        linkTarget: "",
        baseUrl: "".concat(location.pathname).concat(location.search),
        parameter: "pagina",
        parameterType: "normal",
        concatenateWith: "-",
        joinWith: "-",
        onInit: function onInit() {},
        onChange: function onChange(e) {},
        onComplete: function onComplete() {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetPagination;
}();

var JetRouter =
/*#__PURE__*/
function () {
  function JetRouter(e) {
    _classCallCheck(this, JetRouter);

    this.config = JetRouter.extend(e), this.decode = decodeURIComponent, this.routes = {}, this.init(), this.config.onInit();
  }

  _createClass(JetRouter, [{
    key: "cleanUp",
    value: function cleanUp(e) {
      return ~e.indexOf("/?") && (e = e.replace("/?", "?")), "/" == e[0] && (e = e.slice(1)), "/" == e[e.length - 1] && (e = e.slice(0, -1)), e;
    }
  }, {
    key: "recurseUrl",
    value: function recurseUrl(e, t, i, s, o) {
      if (!s) return;

      if (i >= e.length) {
        var _e16 = s["@"];
        return _e16 && {
          cb: _e16,
          params: o.reduce(function (e, t) {
            return e[t[0]] = t[1], e;
          }, {})
        };
      }

      var n = t(e[i]),
          a = o.length;
      return this.recurseUrl(e, t, i + 1, s[n.toLowerCase()], o) || this.recurseNamedUrl(e, t, i + 1, s, ":", n, o, a) || this.recurseNamedUrl(e, t, e.length, s, "*", e.slice(i).join("/"), o, a);
    }
  }, {
    key: "recurseNamedUrl",
    value: function recurseNamedUrl(e, t, i, s, o, n, a, r) {
      a.length = r;
      var l = s[o];
      return l && a.push([l["~"], n]), this.recurseUrl(e, t, i, l, a);
    }
  }, {
    key: "processQuery",
    value: function processQuery(e, t, i) {
      if (e && t.cb) {
        var s = e.indexOf("#"),
            o = (s < 0 ? e : e.slice(0, s)).split("&");

        for (var _e17 = 0; _e17 < o.length; ++_e17) {
          var _s4 = o[_e17].split("=");

          t.params[_s4[0]] = i(_s4[1]);
        }
      }

      return t;
    }
  }, {
    key: "noResult",
    value: function noResult(e) {
      return e;
    }
  }, {
    key: "lookup",
    value: function lookup(e) {
      var t = this.cleanUp(e).split("?");
      var i = ~e.indexOf("%") ? this.decode : this.noResult;
      return t[0].includes("#") && (t = t[0].split("#")[0], "/" === t.slice(-1) && (t = t.slice(0, -1)), t = [t]), this.processQuery(t[1], this.recurseUrl(t[0].split("/"), i, 0, this.routes, []) || {}, i);
    }
  }, {
    key: "add",
    value: function add(e, t) {
      var i = e.split("/"),
          s = this.routes;

      for (var _t12 = +("/" === e[0]); _t12 < i.length; ++_t12) {
        var _e18 = i[_t12];
        var o = ":" == _e18[0] ? ":" : "*" == _e18[0] ? "*" : _e18.toLowerCase();
        s = s[o] || (s[o] = {}), (":" == o || "*" == o) && (s["~"] = _e18.slice(1));
      }

      s["@"] = t;
    }
  }, {
    key: "listen",
    value: function listen(e, t) {
      var i = this.lookup(e);
      return (i.cb || this.config.notFound)(e, t, i.params);
    }
  }, {
    key: "findLinks",
    value: function findLinks() {
      return document.querySelectorAll(this.config.link);
    }
  }, {
    key: "updateLinks",
    value: function updateLinks() {
      var _this101 = this;

      "undefined" != typeof document && this.findLinks().forEach(function (e) {
        var t = !e.target,
            i = !e.hasAttribute("data-jetrouter-disabled"),
            s = !e.hasAttribute("download"),
            o = e.href.includes(":") && !e.href.includes("http");
        !e.hasListener && t && i && s && !o && (e.addEventListener("click", function (t) {
          t.preventDefault(), t.stopImmediatePropagation();
          var i = e.getAttribute("href");
          t.ctrlKey ? window.open(e, "_blank") : (_this101.config.onClick(_this101, i), _this101.listen(i));
        }), e.hasListener = !0);
      });
    }
  }, {
    key: "hash",
    value: function hash() {
      history.pushState = function (e) {
        return function () {
          var t = e.apply(this, arguments);
          return window.dispatchEvent(new Event("pushState")), window.dispatchEvent(new Event("locationchange")), t;
        };
      }(history.pushState), history.replaceState = function (e) {
        return function () {
          var t = e.apply(this, arguments);
          return window.dispatchEvent(new Event("replaceState")), window.dispatchEvent(new Event("locationchange")), t;
        };
      }(history.replaceState), this.hashEvent();
    }
  }, {
    key: "hashEvent",
    value: function hashEvent() {
      var _this102 = this;

      window.addEventListener("locationchange", function () {
        var e = location.hash;
        e && setTimeout(function () {
          return _this102.config.onHash(e);
        }, 250);
      }), window.dispatchEvent(new Event("locationchange"));
    }
  }, {
    key: "init",
    value: function init() {
      for (var e in this.config.routes) {
        this.add(e, this.config.routes[e]);
      }

      this.updateLinks(), this.hash();
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        link: "a[href]",
        routes: {},
        notFound: function notFound() {},
        onInit: function onInit() {},
        onClick: function onClick(e, t) {},
        onHash: function onHash(e) {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetRouter;
}();

var JetSearch =
/*#__PURE__*/
function () {
  function JetSearch(e) {
    _classCallCheck(this, JetSearch);

    this.config = JetSearch.extend(e), this.parameters = this.config.parameters, this.query = this.config.query, this.alternative = this.config.alternative, this.ignoreStorages = "string" == typeof this.config.ignoreStorages ? [this.config.ignoreStorages] : this.config.ignoreStorages, this.joinWith = this.config.joinWith, this.windowStorage, this.storage, this.url, this.init(), this.config.onInit();
  }

  _createClass(JetSearch, [{
    key: "storageType",
    value: function storageType() {
      "local" === this.config.checkStorage ? (this.storage = localStorage, this.windowStorage = window.localStorage) : (this.storage = sessionStorage, this.windowStorage = window.sessionStorage);
    }
  }, {
    key: "arrayRemove",
    value: function arrayRemove(e, t) {
      return e.filter(function (e) {
        return e != t;
      });
    }
  }, {
    key: "getParameters",
    value: function getParameters() {
      var _this103 = this;

      var e = [];
      return this.parameters && this.parameters.forEach(function (t) {
        if ("object" == _typeof(t)) {
          if (Array.isArray(t)) t.toString().includes("null") || t.includes(null) || t.includes("") || t.forEach(function (t) {
            e.push(t);
          });else for (var i in t) {
            var s = t[i];
            i && s && e.push("".concat(i).concat(_this103.joinWith).concat(s));
          }
        } else t && e.push(t);
      }), e;
    }
  }, {
    key: "getParametersAuto",
    value: function getParametersAuto() {
      var _this104 = this;

      var e = [];

      if ("auto" === this.config.mode) {
        var _loop = function _loop(t) {
          var i = _this104.storage.getItem(t);

          i && !t.indexOf(_this104.config.storagePrefix) && (_this104.ignoreStorages ? _this104.ignoreStorages.forEach(function (s) {
            t !== s && e.push("".concat(t).concat(_this104.joinWith).concat(i));
          }) : e.push("".concat(t).concat(_this104.joinWith).concat(i)));
        };

        for (var t in this.windowStorage) {
          _loop(t);
        }
      }

      return e;
    }
  }, {
    key: "getQueries",
    value: function getQueries() {
      var e = new URLSearchParams();

      if (this.query) {
        for (var _i6 = 0, _Object$entries = Object.entries(this.query); _i6 < _Object$entries.length; _i6++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i6], 2),
              t = _Object$entries$_i[0],
              i = _Object$entries$_i[1];

          i && e.append(t, i);
        }
      }

      return e.toString() ? "?".concat(e) : "";
    }
  }, {
    key: "getAlternative",
    value: function getAlternative() {
      var _this105 = this;

      var e = [];

      for (var t in this.alternative) {
        var i = this.alternative[t];

        var _loop2 = function _loop2(_t13) {
          var s = i[_t13];
          if ("object" == _typeof(s)) {
            if (Array.isArray(s)) s.forEach(function (t) {
              s.toString().includes("null") || s.includes(null) || s.includes("") ? e = _this105.arrayRemove(e, t) : e.push(t);
            });else for (var _t14 in s) {
              var _i7 = s[_t14],
                  o = "".concat(_t14).concat(_this105.config.joinWith).concat(_i7);
              _t14 && _i7 ? e.push("".concat(_t14).concat(_this105.joinWith).concat(_i7)) : e = _this105.arrayRemove(e, o);
            }
          } else s ? e.push(s) : e = _this105.arrayRemove(e, s);
        };

        for (var _t13 in i) {
          _loop2(_t13);
        }
      }

      return e;
    }
  }, {
    key: "createUrl",
    value: function createUrl() {
      var e = [],
          t = this.getParameters(),
          i = this.getAlternative(),
          s = this.getQueries();
      this.getParametersAuto(), i.length && (t = i), t.forEach(function (t) {
        e.push(t);
      });
      var o = e.join(this.config.concatenateWith);
      this.config.regex && (o = this.doRegex(o)), this.url = "".concat(this.config.baseUrl).concat(o).concat(this.config.endUrl).concat(s), this.config.lowerCase && (this.url = this.url.toLowerCase());
    }
  }, {
    key: "doRegex",
    value: function doRegex(e) {
      return Array.isArray(this.config.regex[0]) ? this.config.regex.forEach(function (t) {
        e = e.replace(t[0], t[1]);
      }) : e = e.replace(this.config.regex[0], this.config.regex[1]), e;
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.createUrl(), this.url;
    }
  }, {
    key: "btnClick",
    value: function btnClick(e) {
      this.getUrl(), this.config.onClick(this.url, e);
    }
  }, {
    key: "createBtnEvent",
    value: function createBtnEvent() {
      var _this106 = this;

      if (this.config.button) {
        var e = document.querySelectorAll(this.config.button);
        e.forEach(function (e) {
          "A" === e.tagName ? e.href = _this106.getUrl() : e.addEventListener("click", function (e) {
            e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation(), _this106.btnClick(e.target);
          }, !0);
        });
      }
    }
  }, {
    key: "removeStorage",
    value: function removeStorage(e, t, i) {
      var s = sessionStorage,
          o = window.sessionStorage;
      if ("local" === e && (s = localStorage, o = window.localStorage), "string" == typeof i && (i = [i]), "object" == _typeof(t)) t.forEach(function (e) {
        (!i || i && -1 === i.indexOf(e)) && s.removeItem(e);
      });else for (var _e19 in o) {
        var _o4 = -1 !== _e19.indexOf(t),
            n = i ? -1 === i.indexOf(_e19) : "";

        (_o4 && !i || _o4 && i && n) && s.removeItem(_e19);
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.storageType(), this.createUrl(), this.createBtnEvent(), this.config.onComplete(this.url);
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        mode: "",
        button: "",
        baseUrl: "",
        parameters: [],
        alternative: {},
        endUrl: "",
        ignoreStorages: "",
        storagePrefix: "",
        joinWith: "",
        concatenateWith: "",
        lowerCase: !0,
        regex: [],
        checkStorage: "session",
        onInit: function onInit() {},
        onClick: function onClick(e, t) {},
        onComplete: function onComplete(e) {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetSearch;
}();

var JetSelect =
/*#__PURE__*/
function () {
  function JetSelect(e) {
    _classCallCheck(this, JetSelect);

    this.config = JetSelect.extend(e), this.elements = document.querySelectorAll(this.config.element), this.names = "string" == typeof this.config.name ? [this.config.name] : this.config.name, this.optionsText = this.config.optionsText, this.optionsValue = this.config.optionsValue, this.optionsCounter = this.config.counter, this.activeClass = "jetselect__item--active", this.valueObject = {}, this.labelObject = {}, this.sortMap = {}, this.selectedOptions = [], this.tabIndex = null, this.baseName, this.titles, this.storage, this.init(), this.config.onInit();
  }

  _createClass(JetSelect, [{
    key: "arrayLowerCase",
    value: function arrayLowerCase(e) {
      e.forEach(function (t, i) {
        Array.isArray(t) ? t.forEach(function (e, i) {
          isNaN(e) && (t[i] = e.toLowerCase());
        }) : isNaN(t) && (e[i] = t.toLowerCase());
      });
    }
  }, {
    key: "setBaseName",
    value: function setBaseName(e) {
      var t = e.getAttribute("class"),
          i = this.config.element.split(",");
      i.forEach(function (i) {
        i = i.trim().substr(1), t.indexOf(i) > -1 && (e.dataset.jetselectName = i);
      }), this.baseName = e.dataset.jetselectName;
    }
  }, {
    key: "storageType",
    value: function storageType() {
      "local" === this.config.storage ? this.storage = localStorage : this.storage = sessionStorage;
    }
  }, {
    key: "storageCheck",
    value: function storageCheck() {
      var _this107 = this;

      this.names.forEach(function (e) {
        if (_this107.storage.getItem(e)) {
          var t = _this107.storage.getItem(e),
              i = t.split(",");

          _this107.valueObject[e] || (_this107.valueObject[e] = []), i.forEach(function (t) {
            t = t.toString().toLowerCase(), _this107.valueObject[e].push(t);
          });
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this108 = this;

      this.storageCheck(), this.names.forEach(function (e) {
        _this108.storage.getItem(e) || (_this108.valueObject[e] || (_this108.valueObject[e] = []), _this108.valueObject[e].push(""));
      }), this.elements.forEach(function (e, t) {
        _this108.updateSelect(e), _this108.config.tags && _this108.updateTags(e, t);
      });
    }
  }, {
    key: "updateTags",
    value: function updateTags(e, t) {
      var _this109 = this;

      var i,
          s = document.createDocumentFragment();
      i = this.config.tagsTarget ? document.querySelectorAll(this.config.tagsTarget) : e.querySelectorAll(".jetselect__label"), i.forEach(function (e) {
        for (var o in _this109.labelObject) {
          _this109.labelObject[o].forEach(function (o) {
            var n = "[data-jetselect-id=\"".concat(_this109.config.name, "\"][data-jetselect-label=\"").concat(o, "\"]"),
                a = e.querySelector(n),
                r = document.querySelector(".".concat(_this109.baseName, "-item[data-jetselect-text=\"").concat(o, "\"]")),
                l = r.dataset.jetselectValue.split(",");

            if (_this109.config.tagsTarget || (i[0].innerHTML = ""), !a) {
              var _e20 = _this109.createTag(o, l, t);

              s.appendChild(_e20);
            }
          });
        }

        e.appendChild(s);
      });
    }
  }, {
    key: "addTags",
    value: function addTags(e, t, i) {
      var _this110 = this;

      var s,
          o = document.createDocumentFragment();
      this.config.tagsTarget ? s = document.querySelectorAll(this.config.tagsTarget) : (s = e.querySelectorAll(".jetselect__label"), s[0].querySelector(".jetselect__tag") || (s[0].innerHTML = "")), s.forEach(function (s) {
        var n = "[data-jetselect-id=\"".concat(_this110.config.name, "\"][data-jetselect-label=\"").concat(t, "\"]"),
            a = s.querySelector(n),
            r = e.querySelector("[data-jetselect-text=\"".concat(t, "\"]")),
            l = r.dataset.jetselectValue.split(",");

        if (!a) {
          var _e21 = _this110.createTag(t, l, i);

          o.appendChild(_e21), s.appendChild(o);
        }
      });
    }
  }, {
    key: "removeTags",
    value: function removeTags(e, t) {
      var _this111 = this;

      var i;
      i = this.config.tagsTarget ? document.querySelectorAll(this.config.tagsTarget) : e.querySelectorAll(".jetselect__label"), i.forEach(function (e) {
        var i = e.querySelector("[data-jetselect-label=\"".concat(t, "\"]"));
        i && i.parentNode.removeChild(i), _this111.config.tagsTarget || e.querySelector(".jetselect__tag") || (e.innerHTML = _this111.config.label);
      });
    }
  }, {
    key: "createTag",
    value: function createTag(e, t, i) {
      var _this112 = this;

      var s = document.createElement("span"),
          o = document.createElement("span"),
          n = document.createElement("span");
      return "multiple" === this.config.type ? this.config.name.constructor !== Array && (t = t.toString()) : t = t.toString(), s.addEventListener("click", function (e) {
        _this112.clickTag(t);
      }), n.className = "".concat(this.baseName, "-delete-btn jetselect__delete-btn"), o.className = "".concat(this.baseName, "-tag-text jetselect__tag-text"), s.className = "".concat(this.baseName, "-tag jetselect__tag"), s.dataset.jetselectId = this.config.name, s.dataset.jetselectLabel = e, o.innerHTML = e, s.appendChild(o), s.appendChild(n), s;
    }
  }, {
    key: "setLabel",
    value: function setLabel(e) {
      var _this113 = this;

      var t = e.querySelectorAll(".".concat(this.activeClass)),
          i = e.querySelector(".jetselect__label"),
          s = this.config.name;
      var o = [];
      this.labelObject[s] || (this.labelObject[s] = []), t.forEach(function (e) {
        var t = e.dataset.jetselectText,
            i = _this113.labelObject[s].indexOf(t);

        o.push(t), -1 === i && _this113.labelObject[s].push(t);
      }), o[0] ? i.innerHTML = o.join(", ") : i.innerHTML = this.config.label;
    }
  }, {
    key: "updateSelect",
    value: function updateSelect(e) {
      var _this114 = this;

      var t = this.names.map(function (e) {
        return "";
      });
      var i = Object.entries(this.valueObject);
      var s = {};
      i.forEach(function (e) {
        var i = _this114.names.indexOf(e[0]);

        t[i] = e;
      }), t.forEach(function (e, t) {
        e[1].forEach(function (e, t) {
          s[t] || (s[t] = []), s[t].push(e);
        });
      });

      for (var _t15 in s) {
        var _i8 = s[_t15],
            o = e.querySelector("[data-jetselect-value=\"".concat(_i8, "\"]:not(.jetselect__item--deselect-all)")),
            n = e.querySelector("[value=\"".concat(_i8, "\"]"));
        o && (o.classList.add(this.activeClass), o.classList.add("".concat(this.baseName, "-item--active")), n.selected = !0);
      }

      this.setLabel(e);
    }
  }, {
    key: "createSelect",
    value: function createSelect(e, t) {
      var _this115 = this;

      var i = document.createDocumentFragment(),
          s = document.createElement("select"),
          o = document.createElement("div"),
          n = document.createElement("ul"),
          a = document.createElement("div"),
          r = document.createElement("span"),
          l = document.createElement("span");
      a.className = "".concat(this.baseName, "-btn jetselect__btn"), r.className = "".concat(this.baseName, "-label jetselect__label"), r.innerHTML = this.config.label, l.className = "".concat(this.baseName, "-icon jetselect__icon"), o.className = "".concat(this.baseName, "-box jetselect__box"), n.className = "".concat(this.baseName, "-list jetselect__list"), s.className = "jetselect__default", this.isMobile() && this.config.defaultMobile ? (s.style.width = "100%", s.style.position = "absolute", s.style.top = "0", s.style.left = "0", s.style.opacity = "0", s.style.zIndex = "9") : s.style.display = "none", "multiple" === this.config.type && (s.multiple = !0), this.createList({
        element: e,
        select: s,
        list: n,
        text: this.optionsText,
        value: this.optionsValue,
        counter: this.optionsCounter,
        addIndex: 0,
        index: t
      }), s.addEventListener("change", this.change), a.appendChild(r), a.appendChild(l), i.appendChild(a), o.appendChild(n), i.appendChild(o), i.appendChild(s), a.addEventListener("click", function () {
        _this115.openClose(t);
      }), window.addEventListener("mousedown", function (e) {
        _this115.clickInside(t, e);
      }), window.addEventListener("touchstart", function (e) {
        _this115.clickInside(t, e);
      }), this.optionsText.toString() ? e.classList.remove("jetselect--disabled") : e.classList.add("jetselect--disabled"), e.classList.add("jetselect"), e.appendChild(i), this.createTotal(e);
    }
  }, {
    key: "createList",
    value: function createList(e) {
      var _this116 = this;

      var t = e.element.querySelector(".jetselect__option--deselect-all"),
          i = e.element.querySelector(".jetselect__option--deselect-all");
      this.config.filter && this.createSearchInput(e.element, e.list, e.index), !t && this.config.deselectAll && this.createOption({
        element: e.element,
        select: e.select,
        list: e.list,
        itemClass: " jetselect__option--deselect-all",
        btnClass: " jetselect__item--deselect-all",
        text: this.config.deselectAll,
        value: "",
        addIndex: e.addIndex,
        index: e.index
      }), !i && this.config.selectAll && "multiple" === this.config.type && this.createOption({
        element: e.element,
        select: e.select,
        list: e.list,
        itemClass: " jetselect__option--select-all",
        btnClass: " jetselect__item--select-all",
        text: this.config.selectAll,
        value: "*",
        addIndex: e.addIndex,
        index: e.index
      }), e.text.forEach(function (t, i) {
        _this116.config.sortTitle && _this116.createTitle({
          select: e.select,
          list: e.list,
          text: _this116.sortMap[i]
        }), _this116.createOption({
          element: e.element,
          select: e.select,
          list: e.list,
          itemClass: "",
          btnClass: "",
          text: t,
          value: _this116.optionsValue[i],
          counter: _this116.optionsCounter,
          optionIndex: i,
          addIndex: e.addIndex,
          index: e.index
        });
      });
    }
  }, {
    key: "createTitle",
    value: function createTitle(e) {
      if (-1 === this.titles.indexOf(e.text)) {
        var t = document.createElement("optgroup"),
            i = document.createElement("ul"),
            s = document.createElement("div"),
            o = document.createElement("span"),
            n = document.createElement("span");
        this.titles.push(e.text), t.label = e.text, i.className = "".concat(this.baseName, "-group jetselect__group"), s.className = "".concat(this.baseName, "-title jetselect__title"), o.className = "".concat(this.baseName, "-name jetselect__name"), n.className = "".concat(this.baseName, "-total jetselect__total"), i.dataset.jetselectTitle = e.text, o.innerHTML = e.text, e.select.appendChild(t), s.appendChild(o), s.appendChild(n), i.appendChild(s), e.list.appendChild(i);
      }
    }
  }, {
    key: "createTotal",
    value: function createTotal(e) {
      var _this117 = this;

      if (this.config.sortTitle && this.config.sortTotal) {
        var t = e.querySelectorAll(".jetselect__group");
        t.forEach(function (e) {
          var t = e.querySelector(".jetselect__total");
          var i = e.querySelectorAll("li");
          var s = 0;
          i.forEach(function (e) {
            if (_this117.optionsCounter && _this117.optionsCounter.length) {
              var _t16 = e.querySelector(".jetselect__counter");

              s = Number(_t16.innerHTML);
            } else s = i.length;
          }), t.innerHTML = s;
        });
      }
    }
  }, {
    key: "createOption",
    value: function createOption(e) {
      var _this118 = this;

      var t = document.createElement("option"),
          i = document.createElement("li"),
          s = document.createElement("a"),
          o = document.createElement("span");
      var n = e.select.querySelector("[label=\"".concat(this.sortMap[e.optionIndex], "\"]")),
          a = e.list.querySelector("[data-jetselect-title=\"".concat(this.sortMap[e.optionIndex], "\"]"));

      if (i.className = "".concat(this.baseName, "-option jetselect__option").concat(e.itemClass), s.className = "".concat(this.baseName, "-item jetselect__item").concat(e.btnClass), o.className = "".concat(this.baseName, "-text jetselect__text"), s.dataset.jetselectText = e.text, s.dataset.jetselectValue = e.value, t.value = e.value, t.innerHTML = e.text, o.innerHTML = e.text, s.appendChild(o), i.appendChild(s), a ? (a.appendChild(i), n.appendChild(t), this.addAtIndex(a, i, e.addIndex), this.addAtIndex(n, t, e.addIndex)) : (e.list.appendChild(i), this.addAtIndex(e.list, i, e.addIndex), this.addAtIndex(e.select, t, e.addIndex)), "multiple" === this.config.type) {
        var _e22 = document.createElement("span");

        _e22.className = "".concat(this.baseName, "-checkbox jetselect__checkbox"), s.insertBefore(_e22, o);
      }

      if (e.counter && e.counter.length && e.counter[e.optionIndex]) {
        var _t17 = document.createElement("span");

        _t17.className = "".concat(this.baseName, "-counter jetselect__counter"), _t17.innerHTML = e.counter[e.optionIndex], s.appendChild(_t17);
      }

      s.addEventListener("click", function () {
        _this118.clickEvent(e.value, e.index);
      });
    }
  }, {
    key: "addAtIndex",
    value: function addAtIndex(e, t, i) {
      var s = e.children.length;
      i || (i = s), i >= e.children.length ? e.appendChild(t) : e.insertBefore(t, e.children[i]);
    }
  }, {
    key: "add",
    value: function add(e) {
      var _this119 = this;

      this.optionsText = e.text, this.optionsValue = e.value, this.optionsCounter = e.counter, this.tabIndex = null, e.sort && (this.titles = [], this.sort(e.sort)), this.elements.forEach(function (t, i) {
        var s = t.querySelector("select"),
            o = t.querySelector("ul");
        _this119.optionsText.toString() ? t.classList.remove("jetselect--disabled") : t.classList.add("jetselect--disabled"), _this119.createList({
          element: t,
          select: s,
          list: o,
          text: _this119.optionsText,
          value: _this119.arrayLowerCase(_this119.optionsValue),
          counter: _this119.optionsCounter,
          addIndex: e.addIndex,
          index: i
        }), _this119.createTotal(t);
      });
    }
  }, {
    key: "remove",
    value: function remove(e) {
      var _this120 = this;

      this.elements.forEach(function (t) {
        var i = t.querySelector("select"),
            s = t.querySelector("ul");
        e ? e.forEach(function (e) {
          var t = s.querySelector("[data-jetselect-text=\"".concat(e, "\"]")),
              o = t.dataset.jetselectValue,
              n = i.querySelector("[value=\"".concat(o, "\"]")),
              a = _this120.optionsText.indexOf(e),
              r = _this120.optionsValue.indexOf(o);

          -1 !== a && (_this120.optionsText.splice(a, 1), _this120.optionsValue.splice(r, 1), n.parentNode.removeChild(n), t.parentNode.removeChild(t));
        }) : (t.classList.add("jetselect--disabled"), _this120.valueObject = {}, _this120.labelObject = {}, _this120.sortMap = {}, _this120.optionsText = [], _this120.optionsValue = [], i.innerHTML = "", s.innerHTML = "");
      });
    }
  }, {
    key: "createSearchInput",
    value: function createSearchInput(e, t, i) {
      var _this121 = this;

      var s = document.createElement("div"),
          o = document.createElement("input");
      s.className = "".concat(this.baseName, "-filter jetselect__filter"), o.className = "".concat(this.baseName, "-input jetselect__input"), o.type = this.config.filterType, this.config.filterPlaceholder && (o.placeholder = this.config.filterPlaceholder), o.addEventListener("focus", function () {
        _this121.focus(i);
      }), o.addEventListener("blur", function () {
        _this121.blur(i);
      }), o.addEventListener("keyup", function (e) {
        _this121.keyUp(i, e);
      }), this.config.filterTarget && (t = document.querySelector(this.config.filterTarget)), s.appendChild(o), this.config.filterEmpty && s.appendChild(this.emptyBtn(o, i)), t.appendChild(s);
    }
  }, {
    key: "emptyBtn",
    value: function emptyBtn(e, t) {
      var _this122 = this;

      var i = document.createElement("a");
      return i.className = "".concat(this.baseName, "-empty-btn jetselect__empty-btn"), i.addEventListener("click", function (i) {
        e.value = "", _this122.manageEmptyBtn("", t), _this122.manageFilter("", t), _this122.notFound(t), _this122.config.onKeyUp();
      }), i;
    }
  }, {
    key: "manageEmptyBtn",
    value: function manageEmptyBtn(e, t) {
      var i = this.elements[t].querySelector(".jetselect__empty-btn");
      i && (i.style.display = e ? "block" : "none");
    }
  }, {
    key: "clickInside",
    value: function clickInside(e, t) {
      var i = this.elements[e].contains(t.target),
          s = this.elements[e].classList.contains("jetselect--opened");
      s && !i && this.close(e);
    }
  }, {
    key: "openClose",
    value: function openClose(e) {
      var t = this.elements[e].classList.contains("jetselect--opened");
      t ? this.close(e) : this.open(e);
    }
  }, {
    key: "open",
    value: function open(e) {
      var t = this.elements[e].querySelector("ul");
      this.elements[e].classList.add("jetselect--opened"), t.classList.add("jetselect__list--opened"), this.config.onOpen();
    }
  }, {
    key: "close",
    value: function close(e) {
      var t = this.elements[e].querySelector("ul"),
          i = t.querySelector(".jetselect__item--focused");
      i && (this.removeFocus(i), this.tabIndex = null), this.elements[e].classList.remove("jetselect--opened"), t.classList.remove("jetselect__list--opened"), t.classList.remove("jetselect__list--opened-top"), this.config.onClose();
    }
  }, {
    key: "setStorage",
    value: function setStorage(e) {
      var _this123 = this;

      var t;
      this.valueObject = {}, this.storageCheck(), this.names.forEach(function (i, s) {
        _this123.valueObject[i] || (_this123.valueObject[i] = []), t = _this123.config.name.constructor === Array ? e[s] : e;

        var o = _this123.valueObject[i].indexOf(t);

        if (-1 === o) _this123.config.selectionLimit && _this123.config.selectionLimit <= _this123.valueObject[i].length ? _this123.config.onLimit() : _this123.valueObject[i].push(t);else {
          var _s5;

          _this123.elements.forEach(function (t) {
            _s5 = t.querySelector("[data-jetselect-value=\"".concat(e, "\"]"));
          }), _s5.classList.contains(_this123.activeClass) ? _this123.valueObject[i].splice(o, 1) : _this123.valueObject[i].push(t);
        }
        _this123.valueObject[i][0] ? _this123.storage.setItem(i, _this123.valueObject[i]) : _this123.storage.removeItem(i);
      });
    }
  }, {
    key: "removeStorage",
    value: function removeStorage() {
      var _this124 = this;

      this.names.forEach(function (e) {
        _this124.valueObject[e] = [], _this124.storage.removeItem(e);
      });
    }
  }, {
    key: "validateNumber",
    value: function validateNumber(e) {
      var t = this.storage.getItem(this.config.validateTarget),
          i = "<" === this.config.validateOperator && t > e,
          s = ">" === this.config.validateOperator && t < e;
      if (null === t || i || s) return !0;
    }
  }, {
    key: "change",
    value: function change() {
      var _this125 = this;

      var e = this.querySelectorAll("option");
      var t,
          i = [];
      e.forEach(function (e) {
        var t = e.selected;

        if (t) {
          var _t18 = e.value;
          i.push(_t18);
        }
      });
      var s = this.selectedOptions.filter(function (e) {
        return i.indexOf(e) < 0;
      }),
          o = i.filter(function (e) {
        return _this125.selectedOptions.indexOf(e) < 0;
      });
      t = "multiple" !== this.config.type ? i.toString() : (s.length ? s : o)[0], this.selectedOptions = i;
      var n = this.optionsValue.indexOf(t);
      if (this.config.name.constructor === Array && (t = t.split(",")), s.length) this.clickEvent(t, n);else if (!this.config.selectionLimit || this.config.selectionLimit && this.selectedOptions.length <= this.config.selectionLimit) this.clickEvent(t, n);else {
        var _e23 = this.querySelector("option[value=".concat(t, "]"));

        _e23.selected = !1;
      }
    }
  }, {
    key: "clickEvent",
    value: function clickEvent(e, t) {
      !e || this.validateNumber(e) ? ("multiple" !== this.config.type && this.selectOption(e), e && "*" !== e && this.setStorage(e), "multiple" === this.config.type && this.selectOption(e), "multiple" === this.config.type && e && "*" !== e || (this.isMobile() || this.config.defaultMobile) && (this.isMobile() || !this.config.defaultMobile) || this.close(t), e || this.config.onDeselectAll(), "*" === e && this.config.onSelectAll(), e && this.config.onChange(this.valueObject)) : this.config.onValidateError();
    }
  }, {
    key: "checkAll",
    value: function checkAll(e, t) {
      var _this126 = this;

      var i = this.config.tags && this.config.tagsTarget;
      this.optionsValue.forEach(function (i, s) {
        if (!_this126.config.selectionLimit || s < _this126.config.selectionLimit) {
          var _s6 = e.querySelector("[data-jetselect-value=\"".concat(i, "\"]")),
              o = e.querySelector("[value=\"".concat(i, "\"]")),
              n = _s6.dataset.jetselectText;

          _s6.classList.contains(_this126.activeClass) && o.selected || (_s6.classList.add(_this126.activeClass), _s6.classList.add("".concat(_this126.baseName, "-item--active")), o.selected = !0, _this126.config.tags && _this126.addTags(e, n, t), 0 === t && _this126.setStorage(i));
        }
      }), this.config.tags && !i || this.setLabel(e);
    }
  }, {
    key: "uncheckAll",
    value: function uncheckAll(e) {
      var _this127 = this;

      var t = this.config.tags && this.config.tagsTarget;
      this.optionsValue.forEach(function (t) {
        var i = e.querySelector("[data-jetselect-value=\"".concat(t, "\"]")),
            s = e.querySelector("[value=\"".concat(t, "\"]"));
        var o;
        i && (o = i.dataset.jetselectText, i.classList.remove(_this127.activeClass), i.classList.remove("".concat(_this127.baseName, "-item--active")), s.selected = !1, _this127.config.tags && _this127.removeTags(e, o));
      }), this.removeStorage(), this.config.tags && !t || this.setLabel(e);
    }
  }, {
    key: "sort",
    value: function sort(e) {
      var _this128 = this;

      this.sortMap = e.map(function (e, t) {
        return {
          index: t,
          value: e
        };
      }), this.sortMap.sort(function (e, t) {
        return isNaN(e.value) && isNaN(t.value) ? +(e.value > t.value) || +(e.value === t.value) - 1 : e.value - t.value;
      }), this.optionsText = this.sortMap.map(function (e) {
        return _this128.optionsText[e.index];
      }), this.optionsValue = this.sortMap.map(function (e) {
        return _this128.optionsValue[e.index];
      }), this.optionsCounter && this.optionsCounter.length && (this.optionsCounter = this.sortMap.map(function (e) {
        return _this128.optionsCounter[e.index];
      })), this.sortMap = this.sortMap.map(function (e) {
        return e[Object.keys(e)[1]];
      }), "descending" === this.config.sortOrder && (this.optionsText.reverse(), this.optionsValue.reverse(), this.optionsCounter.reverse(), this.sortMap.reverse());
    }
  }, {
    key: "filter",
    value: function filter(e, t) {
      var i = t.split(" ");
      var s, o;

      for (var _t19 = 0; o = i[_t19++];) {
        if (s = new RegExp(o, "ig"), !s.test(e)) return !1;
        e = e.replace(s, "");
      }

      return !0;
    }
  }, {
    key: "manageFilter",
    value: function manageFilter(e, t) {
      var _this129 = this;

      var i = this.elements[t].querySelectorAll("li:not(.jetselect__option--deselect-all):not(.jetselect__option--select-all)"),
          s = "jetselect__option--hidden";
      i.forEach(function (i, o) {
        var n = _this129.elements[t].querySelector("[data-jetselect-title=\"".concat(_this129.sortMap[o], "\"]"));

        var a;

        if (n && (a = n.querySelectorAll("li")), e) {
          var _t20 = i.querySelector("a");

          var _o5 = _t20.innerHTML;
          if (_this129.filter(_o5, e)) i.classList.remove(s), n && a[0] && n.classList.remove(s);else if (i.classList.add(s), n) {
            var _e24 = n.querySelectorAll("li.".concat(s));

            a.length === _e24.length && n.classList.add(s);
          }
        } else i.classList.remove(s), n && n.classList.remove(s);
      });
    }
  }, {
    key: "selectOption",
    value: function selectOption(e) {
      var _this130 = this;

      this.elements.forEach(function (t, i) {
        var s = t.querySelector("[data-jetselect-value=\"".concat(e, "\"]")),
            o = t.querySelector("[value=\"".concat(e, "\"]")),
            n = s.dataset.jetselectText,
            a = s.classList.contains(_this130.activeClass) && "multiple" === _this130.config.type,
            r = _this130.config.tags && _this130.config.tagsTarget,
            l = _this130.valueObject[Object.keys(_this130.valueObject)[0]],
            c = l ? l.length : 1;

        "multiple" === _this130.config.type && e ? "*" === e && _this130.checkAll(t, i) : _this130.uncheckAll(t), e && "*" !== e && (a ? (s.classList.remove(_this130.activeClass), s.classList.remove("".concat(_this130.baseName, "-item--active")), o.selected = !1, _this130.config.tags && _this130.removeTags(t, n)) : (!_this130.config.selectionLimit || c < _this130.config.selectionLimit) && (s.classList.add(_this130.activeClass), s.classList.add("".concat(_this130.baseName, "-item--active")), o.selected = !0, _this130.config.tags && _this130.config.tagsOnChange && _this130.addTags(t, n, i))), _this130.config.tags && !r || _this130.setLabel(t);
      });
    }
  }, {
    key: "clickTag",
    value: function clickTag(e) {
      var _this131 = this;

      var t;
      this.valueObject = {}, this.storageCheck(), this.names.forEach(function (i, s) {
        _this131.valueObject[i] || (_this131.valueObject[i] = []), t = _this131.config.name.constructor === Array ? e[s] : e;

        var o = _this131.valueObject[i].indexOf(t);

        -1 !== o && _this131.valueObject[i].splice(o, 1), _this131.storage.setItem(i, _this131.valueObject[i]), _this131.storage.getItem(i) || _this131.storage.removeItem(i);
      }), this.elements.forEach(function (t, i) {
        var s = t.querySelector("[data-jetselect-value=\"".concat(e, "\"]")),
            o = s.dataset.jetselectText,
            n = _this131.config.tags && _this131.config.tagsTarget;
        s.classList.remove(_this131.activeClass), s.classList.remove("".concat(_this131.baseName, "-item--active")), _this131.removeTags(t, o), _this131.config.tags && !n || _this131.setLabel(t);
      }), this.config.onClickTag(e);
    }
  }, {
    key: "focus",
    value: function focus(e) {
      this.config.filterOpenOnFocus && this.config.filterTarget && this.open(e), this.config.onFocus();
    }
  }, {
    key: "blur",
    value: function blur(e) {
      this.config.filterCloseOnBlur && this.config.filterTarget && this.close(e), this.config.onBlur();
    }
  }, {
    key: "keyUp",
    value: function keyUp(e, t) {
      var i = t.target.value;
      this.manageFilter(i, e), this.manageEmptyBtn(i, e), this.notFound(e), this.config.onKeyUp();
    }
  }, {
    key: "keyDown",
    value: function keyDown(e, t) {
      var i = this.elements[e].querySelector("ul"),
          s = i.offsetHeight,
          o = i.querySelectorAll("li"),
          n = t.target.value;
      38 === t.keyCode && (t.preventDefault(), this.keyUpList(o, i, s)), 40 === t.keyCode && (t.preventDefault(), this.keyDownList(o, i, s)), 13 === t.keyCode && this.keyEnterList(o), this.config.onKeyDown(n);
    }
  }, {
    key: "keyUpList",
    value: function keyUpList(e, t) {
      this.removeFocus(e[this.tabIndex]), this.tabIndex > 0 ? this.tabIndex-- : this.tabIndex = e.length - 1, this.addFocus(e[this.tabIndex]), this.scrollUp(e, t);
    }
  }, {
    key: "keyDownList",
    value: function keyDownList(e, t, i) {
      this.removeFocus(e[this.tabIndex]), null === this.tabIndex || this.tabIndex === e.length - 1 ? this.tabIndex = 0 : this.tabIndex++, this.addFocus(e[this.tabIndex]), this.scrollDown(e, t, i);
    }
  }, {
    key: "keyEnterList",
    value: function keyEnterList(e) {
      this.tabIndex && e[this.tabIndex].querySelector("a").click(), this.config.onKeyEnter();
    }
  }, {
    key: "scrollUp",
    value: function scrollUp(e, t) {
      var i = e[this.tabIndex].offsetTop;
      t.scrollTop >= i ? t.scrollTop = i : this.tabIndex === e.length - 1 && (t.scrollTop = t.scrollHeight);
    }
  }, {
    key: "scrollDown",
    value: function scrollDown(e, t, i) {
      var s = e[this.tabIndex].offsetTop,
          o = e[this.tabIndex].offsetHeight,
          n = s - i + o;
      t.scrollTop <= n ? t.scrollTop = n : s < t.scrollTop ? t.scrollTop = s : 0 === this.selectedOptions && (t.scrollTop = 0);
    }
  }, {
    key: "addFocus",
    value: function addFocus(e) {
      e.classList.add("".concat(this.baseName, "-item--focused")), e.classList.add("jetselect__item--focused");
    }
  }, {
    key: "removeFocus",
    value: function removeFocus(e) {
      e && (e.classList.remove("".concat(this.baseName, "-item--focused")), e.classList.remove("jetselect__item--focused"));
    }
  }, {
    key: "notFound",
    value: function notFound(e) {
      var t = this.elements[e].querySelector("ul"),
          i = "jetselect__option--hidden",
          s = t.querySelectorAll("li.".concat(i, ":not(.jetselect__option--deselect-all):not(.jetselect__option--select-all)")),
          o = t.querySelector(".jetselect__option--deselect-all"),
          n = t.querySelector(".jetselect__option--select-all"),
          a = t.querySelector(".jetselect__not-found");

      if (s.length >= this.optionsText.length) {
        if (o && o.classList.add(i), n && n.classList.add(i), !a && this.config.filterNotFound) {
          var _e25 = document.createElement("div");

          var _i9 = document.createTextNode(this.config.filterNotFound);

          _e25.className = "jetselect__not-found", _e25.appendChild(_i9), t.appendChild(_e25);
        }
      } else o && o.classList.remove(i), n && n.classList.remove(i), a && a.parentNode.removeChild(a);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.elements.forEach(function (e) {
        for (; e.firstChild;) {
          e.removeChild(e.firstChild);
        }
      });
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
  }, {
    key: "init",
    value: function init() {
      var _this132 = this;

      this.storageType(), this.config.sortBy[0] && this.sort(this.config.sortBy), this.arrayLowerCase(this.optionsValue), this.elements.forEach(function (e, t) {
        e.classList.remove("jetselect"), e.classList.remove("jetselect--opened"), e.tabIndex = "0", e.innerHTML = "", _this132.titles = [], e.addEventListener("keydown", function (e) {
          _this132.keyDown(t, e);
        }), _this132.setBaseName(e), _this132.createSelect(e, t);
      });
      var e = this.names.some(function (e) {
        return _this132.storage.getItem(e);
      });
      e && this.update();
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        element: "",
        name: "",
        type: "",
        selectionLimit: "",
        optionsText: [],
        optionsValue: [],
        counter: [],
        deselectAll: "",
        selectAll: "",
        label: "",
        sortBy: [],
        sortOrder: "ascending",
        sortTitle: !1,
        sortTotal: !1,
        tags: !1,
        tagsOnChange: !1,
        tagsTarget: "",
        filter: !1,
        filterEmpty: !0,
        filterTarget: "",
        filterOpenOnFocus: !0,
        filterCloseOnBlur: !0,
        filterPlaceholder: "",
        filterNotFound: "",
        filterType: "text",
        validateOperator: "",
        validateTarget: "",
        defaultMobile: !1,
        storage: "session",
        onInit: function onInit() {},
        onOpen: function onOpen() {},
        onClose: function onClose() {},
        onChange: function onChange(e) {},
        onDeselectAll: function onDeselectAll() {},
        onSelectAll: function onSelectAll() {},
        onKeyUp: function onKeyUp() {},
        onKeyDown: function onKeyDown() {},
        onKeyEnter: function onKeyEnter() {},
        onFocus: function onFocus() {},
        onBlur: function onBlur() {},
        onClickTag: function onClickTag(e) {},
        onValidateError: function onValidateError() {},
        onLimit: function onLimit() {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetSelect;
}();

var JetSlider =
/*#__PURE__*/
function () {
  function JetSlider(e) {
    var _this133 = this;

    _classCallCheck(this, JetSlider);

    this.config = JetSlider.extend(e), this.element = "string" == typeof this.config.element ? document.querySelector(this.config.element) : this.config.element, this.prevBtn = this.config.prev && "string" == typeof this.config.prev ? document.querySelector(this.config.prev) : this.config.prev, this.nextBtn = this.config.next && "string" == typeof this.config.next ? document.querySelector(this.config.next) : this.config.next, this.pagination = this.config.pagination && "string" == typeof this.config.pagination ? document.querySelector(this.config.pagination) : this.config.pagination, this.slidesToShow = this.config.slidesToShow, this.slidesToScroll = this.config.slidesToScroll, "string" == typeof this.config.element ? this.baseClass = this.config.element.substr(1) : this.config.element.className.includes(" ") ? this.baseClass = this.config.element.className.split(" ")[0] : this.baseClass = this.config.element.className;
    var t = ["resize", "touchstartHandler", "touchendHandler", "touchmoveHandler", "mousedownHandler", "mouseupHandler", "mouseleaveHandler", "mousemoveHandler", "keyDown", "clickHandler"];
    if (null === this.element) return !1;
    this.element.classList.add("jetslider"), this.resolveSlidesToShow(), this.resolveSlidesToScroll(), this.elementWidth = this.element.offsetWidth + this.config.gap, this.innerElements = [].slice.call(this.element.children), this.currentSlideCheck = this.config.startIndex % this.innerElements.length, this.currentSlide = this.config.loop ? this.config.startIndex % this.innerElements.length : Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.slidesToShow)), t.forEach(function (e) {
      _this133[e] = _this133[e].bind(_this133);
    }), this.config.onChange(this.currentSlide + 1, this.innerElements.length), this.init();
  }

  _createClass(JetSlider, [{
    key: "attachEvents",
    value: function attachEvents() {
      var _this134 = this;

      window.addEventListener("resize", this.resize), this.config.draggable && (this.pointerDown = !1, this.drag = {
        startX: 0,
        endX: 0,
        startY: 0,
        letItGo: null,
        preventClick: !1
      }, this.element.addEventListener("touchstart", this.touchstartHandler, {
        passive: !0
      }), this.element.addEventListener("touchend", this.touchendHandler), this.element.addEventListener("touchmove", this.touchmoveHandler, {
        passive: !0
      }), this.element.addEventListener("mousedown", this.mousedownHandler), this.element.addEventListener("mouseup", this.mouseupHandler), this.element.addEventListener("mouseleave", this.mouseleaveHandler), this.element.addEventListener("mousemove", this.mousemoveHandler), this.element.addEventListener("click", this.clickHandler)), this.config.keyboard && (this.element.tabIndex = "0", this.element.focus(), this.element.addEventListener("keydown", this.keyDown)), this.config.autoplay && this.config.stopOnOver && (this.element.addEventListener("mouseover", this.stopAutoplay.bind(this)), this.element.addEventListener("mouseout", this.restartAutoplay.bind(this))), this.prevBtn && this.prevBtn.addEventListener("click", function () {
        _this134.prev(_this134.slidesToScroll);
      }), this.nextBtn && this.nextBtn.addEventListener("click", function () {
        _this134.next(_this134.slidesToScroll);
      });
    }
  }, {
    key: "detachEvents",
    value: function detachEvents() {
      var _this135 = this;

      window.removeEventListener("resize", this.resize), this.element.removeEventListener("touchstart", this.touchstartHandler, {
        passive: !0
      }), this.element.removeEventListener("touchend", this.touchendHandler), this.element.removeEventListener("touchmove", this.touchmoveHandler, {
        passive: !0
      }), this.element.removeEventListener("mousedown", this.mousedownHandler), this.element.removeEventListener("mouseup", this.mouseupHandler), this.element.removeEventListener("mouseleave", this.mouseleaveHandler), this.element.removeEventListener("mousemove", this.mousemoveHandler), this.element.removeEventListener("click", this.clickHandler), this.config.keyboard && this.element.removeEventListener("keydown", this.keyDown), this.config.autoplay && this.config.stopOnOver && (this.element.removeEventListener("mouseover", this.stopAutoplay.bind(this)), this.element.removeEventListener("mouseout", this.restartAutoplay.bind(this))), this.prevBtn && this.prevBtn.removeEventListener("click", function () {
        _this135.prev(_this135.slidesToScroll);
      }), this.nextBtn && this.nextBtn.removeEventListener("click", function () {
        _this135.next(_this135.slidesToScroll);
      });
    }
  }, {
    key: "addDots",
    value: function addDots() {
      var _this136 = this;

      this.pagination.classList.add("jetslider__pagination", "".concat(this.baseClass, "__pagination"));
      var e = Math.ceil(this.innerElements.length / this.slidesToScroll);
      this.pagination.innerHTML = "";

      for (var t = 0; t < e; t++) {
        var _e26 = document.createElement("li"),
            i = document.createElement("button");

        _e26.classList.add("jetslider__pagination-item", "".concat(this.baseClass, "__pagination-item")), i.classList.add("jetslider__bullet", "".concat(this.baseClass, "__bullet")), i.dataset.jetsliderBullet = 0 === t ? t : t * this.slidesToScroll, i.addEventListener("click", function (e) {
          _this136.goTo(e.target.dataset.jetsliderBullet);
        }), _e26.appendChild(i), this.pagination.appendChild(_e26);
      }
    }
  }, {
    key: "updateDots",
    value: function updateDots() {
      var _this137 = this;

      var e = this.pagination.querySelectorAll("li"),
          t = this.element.querySelector(".".concat(this.baseClass, "__item--active"));
      t || (this.innerElements[0].classList.add("jetslider__item--active", "".concat(this.baseClass, "__item--active")), t = this.element.querySelector(".".concat(this.baseClass, "__item--active"))), e.forEach(function (e, i) {
        var s = Number(t.dataset.jetsliderPage) === i ? "add" : "remove";
        e.querySelector("button").classList[s]("jetslider__bullet--active", "".concat(_this137.baseClass, "__bullet--active"));
      });
    }
  }, {
    key: "startAutoplay",
    value: function startAutoplay() {
      var _this138 = this;

      this.autoplayIntervalInstace = setInterval(function () {
        _this138.pointerDown || _this138.next(_this138.slidesToScroll);
      }, this.config.autoplaySpeed);
    }
  }, {
    key: "stopAutoplay",
    value: function stopAutoplay() {
      clearInterval(this.autoplayIntervalInstace);
    }
  }, {
    key: "restartAutoplay",
    value: function restartAutoplay() {
      this.stopAutoplay(), this.config.autoplay && this.startAutoplay();
    }
  }, {
    key: "init",
    value: function init() {
      this.attachEvents(), this.element.style.overflow = "hidden", this.element.style.direction = this.config.rtl ? "rtl" : "ltr", this.createContainer(), this.updateItens(), this.config.autoplay && this.startAutoplay(), this.pagination && (this.addDots(), this.updateDots(), this.pagination.classList.toggle("jetslider__pagination--disabled", this.innerElements.length <= this.slidesToShow)), this.config.onInit.call(this);
      var e = new IntersectionObserver(this.resize);
      e.observe(this.element);
    }
  }, {
    key: "createContainer",
    value: function createContainer() {
      var e = this.elementWidth / this.slidesToShow,
          t = this.config.loop ? this.innerElements.length + 2 * this.slidesToShow : this.innerElements.length;
      var i = 0;
      this.sliderFrame = document.createElement("div"), this.sliderFrame.classList.add("jetslider__container", "".concat(this.baseClass, "__container")), this.sliderFrame.style.width = "".concat(e * t, "px"), this.sliderFrame.style.height = "100%", this.sliderFrame.style.display = "inline-block", this.enableTransition(), this.config.draggable && (this.element.style.cursor = "-webkit-grab");
      var s = document.createDocumentFragment();
      if (this.config.loop && this.innerElements.length > this.slidesToShow) for (var _e27 = this.innerElements.length - this.slidesToShow; _e27 < this.innerElements.length; _e27++) {
        var _t21 = this.createItem(this.innerElements[_e27].cloneNode(!0)),
            _i10 = Math.ceil(this.innerElements.length / this.slidesToScroll);

        _t21.setAttribute("data-jetslider-page", _i10 - 1), s.appendChild(_t21);
      }

      for (var _e28 = 0; _e28 < this.innerElements.length; _e28++) {
        var _t22 = this.createItem(this.innerElements[_e28]);

        _e28 % this.slidesToShow == 0 && 0 !== _e28 && i++, _t22.setAttribute("data-jetslider-page", i), s.appendChild(_t22);
      }

      if (this.config.loop && this.innerElements.length > this.slidesToShow) for (var _e29 = 0; _e29 < this.slidesToShow; _e29++) {
        var _t23 = this.createItem(this.innerElements[_e29].cloneNode(!0));

        _t23.setAttribute("data-jetslider-page", 0), s.appendChild(_t23);
      }
      this.sliderFrame.appendChild(s), this.element.innerHTML = "", this.element.appendChild(this.sliderFrame), this.slideToCurrent();
    }
  }, {
    key: "createItem",
    value: function createItem(e) {
      var t = document.createElement("div"),
          i = "".concat(this.config.loop ? 100 / (this.innerElements.length + 2 * this.slidesToShow) : 100 / this.innerElements.length, "%");
      return t.classList.add("jetslider__item", "".concat(this.baseClass, "__item")), t.style.cssFloat = this.config.rtl ? "right" : "left", t.style["float"] = this.config.rtl ? "right" : "left", t.style.marginRight = "".concat(this.config.gap, "px"), t.style.width = "calc(".concat(i, " - ").concat(this.config.gap, "px)"), t.appendChild(e), t;
    }
  }, {
    key: "resolveSlidesToShow",
    value: function resolveSlidesToShow() {
      if ("number" == typeof this.config.slidesToShow) this.slidesToShow = this.config.slidesToShow;else if ("object" == _typeof(this.config.slidesToShow)) {
        this.slidesToShow = 1;

        for (var e in this.config.slidesToShow) {
          document.documentElement.clientWidth >= e && (this.slidesToShow = this.config.slidesToShow[e]);
        }
      }
    }
  }, {
    key: "resolveSlidesToScroll",
    value: function resolveSlidesToScroll() {
      if ("number" == typeof this.config.slidesToScroll) this.slidesToScroll = this.config.slidesToScroll;else if ("object" == _typeof(this.config.slidesToScroll)) {
        this.slidesToScroll = 1;

        for (var e in this.config.slidesToScroll) {
          document.documentElement.clientWidth >= e && (this.slidesToScroll = this.config.slidesToScroll[e]);
        }
      }
    }
  }, {
    key: "prev",
    value: function prev() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var t = arguments.length > 1 ? arguments[1] : undefined;
      if (this.innerElements.length <= this.slidesToShow) return;
      this.restartAutoplay();
      var i = this.currentSlide;

      if (this.config.loop) {
        var _t24 = this.currentSlide - e < 0;

        if (_t24) {
          this.disableTransition();

          var _t25 = this.currentSlide + this.innerElements.length,
              _i11 = this.slidesToShow,
              s = _t25 + _i11,
              o = (this.config.rtl ? 1 : -1) * s * (this.elementWidth / this.slidesToShow),
              n = this.config.draggable ? this.drag.endX - this.drag.startX : 0;

          this.sliderFrame.style.transform = "translate3d(".concat(o + n, "px, 0, 0)"), this.currentSlide = _t25 - e;
        } else this.currentSlide = this.currentSlide - e;
      } else this.currentSlide = Math.max(this.currentSlide - e, 0);

      this.currentSlideCheck = this.currentSlide, i !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.updateItens(), this.config.pagination && this.updateDots(), this.config.onChange(this.currentSlide + 1, this.innerElements.length), t && t.call(this));
    }
  }, {
    key: "next",
    value: function next() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var t = arguments.length > 1 ? arguments[1] : undefined;
      if (this.innerElements.length <= this.slidesToShow) return;
      this.restartAutoplay();
      var i = this.currentSlide;

      if (this.config.loop) {
        var _t26 = this.currentSlide + e > this.innerElements.length - this.slidesToShow;

        if (_t26) {
          this.disableTransition();

          var _t27 = this.currentSlide - this.innerElements.length,
              _i12 = this.slidesToShow,
              s = _t27 + _i12,
              o = (this.config.rtl ? 1 : -1) * s * (this.elementWidth / this.slidesToShow),
              n = this.config.draggable ? this.drag.endX - this.drag.startX : 0;

          this.sliderFrame.style.transform = "translate3d(".concat(o + n, "px, 0, 0)"), this.currentSlide = _t27 + e;
        } else this.currentSlide = this.currentSlide + e;
      } else this.currentSlide = Math.min(this.currentSlide + e, this.innerElements.length - this.slidesToShow);

      this.currentSlideCheck = this.currentSlide, i !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.updateItens(), this.config.pagination && this.updateDots(), this.config.onChange(this.currentSlide + 1, this.innerElements.length), t && t.call(this));
    }
  }, {
    key: "disableTransition",
    value: function disableTransition() {
      this.sliderFrame.style.transition = "transform 0ms ".concat(this.config.easing);
    }
  }, {
    key: "enableTransition",
    value: function enableTransition() {
      this.sliderFrame.style.transition = "transform ".concat(this.config.speed, "ms ").concat(this.config.easing);
    }
  }, {
    key: "goTo",
    value: function goTo(e, t) {
      if (this.innerElements.length <= this.slidesToShow) return;
      this.restartAutoplay();
      var i = this.currentSlide;
      this.currentSlide = this.config.loop ? e % this.innerElements.length : Math.min(Math.max(e, 0), this.innerElements.length - this.slidesToShow), this.currentSlideCheck = e % this.innerElements.length, this.updateItens(), i !== this.currentSlide && (this.slideToCurrent(), this.config.pagination && this.updateDots(), this.config.onChange(this.currentSlide + 1, this.innerElements.length), t && t.call(this));
    }
  }, {
    key: "updateItens",
    value: function updateItens() {
      var _this139 = this;

      var e = document.querySelectorAll(".".concat(this.baseClass, "__item")),
          t = this.currentSlideCheck;
      this.config.loop && e.length > this.slidesToShow && (t += this.slidesToShow), e.forEach(function (e, i) {
        var s = t === i ? "add" : "remove";
        e.classList[s]("jetslider__item--active", "".concat(_this139.baseClass, "__item--active"));
      });
    }
  }, {
    key: "slideToCurrent",
    value: function slideToCurrent(e) {
      var _this140 = this;

      var t = this.config.loop ? this.currentSlide + this.slidesToShow : this.currentSlide,
          i = (this.config.rtl ? 1 : -1) * t * (this.elementWidth / this.slidesToShow);
      this.innerElements.length > this.slidesToShow ? e ? requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          _this140.enableTransition(), _this140.sliderFrame.style.transform = "translate3d(".concat(i, "px, 0, 0)");
        });
      }) : this.sliderFrame.style.transform = "translate3d(".concat(i, "px, 0, 0)") : this.sliderFrame.style.transform = "translate3d(0, 0, 0)";
    }
  }, {
    key: "updateAfterDrag",
    value: function updateAfterDrag() {
      var e = (this.config.rtl ? -1 : 1) * (this.drag.endX - this.drag.startX),
          t = Math.abs(e),
          i = this.config.multipleDrag ? Math.ceil(t / (this.elementWidth / this.slidesToShow)) : 1,
          s = e > 0 && this.currentSlide - i < 0,
          o = e < 0 && this.currentSlide + i > this.innerElements.length - this.slidesToShow;
      this.restartAutoplay(), e > 0 && t > this.config.threshold && this.innerElements.length > this.slidesToShow ? this.prev(i) : e < 0 && t > this.config.threshold && this.innerElements.length > this.slidesToShow && this.next(i), this.slideToCurrent(s || o);
    }
  }, {
    key: "resize",
    value: function resize() {
      this.resolveSlidesToShow(), this.resolveSlidesToScroll(), this.currentSlide + this.slidesToShow > this.innerElements.length && (this.currentSlide = this.innerElements.length <= this.slidesToShow ? 0 : this.innerElements.length - this.slidesToShow, this.currentSlideCheck = this.currentSlide), this.elementWidth = this.element.offsetWidth + this.config.gap;
      this.elementWidth, this.slidesToShow, this.config.loop ? (this.innerElements.length, this.slidesToShow) : this.innerElements.length;
      this.createContainer(), this.slideToCurrent(), this.updateItens(), this.pagination && (this.addDots(), this.updateDots(), this.pagination.classList.toggle("jetslider__pagination--disabled", this.innerElements.length <= this.slidesToShow)), this.config.onResize.call(this);
    }
  }, {
    key: "clearDrag",
    value: function clearDrag() {
      this.drag = {
        startX: 0,
        endX: 0,
        startY: 0,
        letItGo: null,
        preventClick: this.drag.preventClick
      };
    }
  }, {
    key: "touchstartHandler",
    value: function touchstartHandler(e) {
      var t = -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(e.target.nodeName);
      t || (e.stopPropagation(), this.pointerDown = !0, this.drag.startX = e.touches[0].pageX, this.drag.startY = e.touches[0].pageY);
    }
  }, {
    key: "touchendHandler",
    value: function touchendHandler(e) {
      e.stopPropagation(), this.pointerDown = !1, this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag();
    }
  }, {
    key: "touchmoveHandler",
    value: function touchmoveHandler(e) {
      if (e.stopPropagation(), null === this.drag.letItGo && (this.drag.letItGo = Math.abs(this.drag.startY - e.touches[0].pageY) < Math.abs(this.drag.startX - e.touches[0].pageX)), this.pointerDown && this.drag.letItGo) if (e.preventDefault(), this.drag.endX = e.touches[0].pageX, this.sliderFrame.style.transition = "transform 0ms ".concat(this.config.easing), this.innerElements.length > this.slidesToShow) {
        var _e30 = this.config.loop ? this.currentSlide + this.slidesToShow : this.currentSlide,
            t = _e30 * (this.elementWidth / this.slidesToShow),
            i = this.drag.endX - this.drag.startX,
            s = this.config.rtl ? t + i : t - i;

        this.sliderFrame.style.transform = "translate3d(".concat((this.config.rtl ? 1 : -1) * s, "px, 0, 0)");
      } else this.sliderFrame.style.transform = "(0, 0, 0)";
    }
  }, {
    key: "mousedownHandler",
    value: function mousedownHandler(e) {
      var t = -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(e.target.nodeName);
      t || (e.preventDefault(), e.stopPropagation(), this.pointerDown = !0, this.drag.startX = e.pageX);
    }
  }, {
    key: "mouseupHandler",
    value: function mouseupHandler(e) {
      e.stopPropagation(), this.pointerDown = !1, this.element.style.cursor = "-webkit-grab", this.innerElements.forEach(function (e) {
        e.style.pointerEvents = "";
      }), this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag();
    }
  }, {
    key: "mousemoveHandler",
    value: function mousemoveHandler(e) {
      if (e.preventDefault(), this.pointerDown) if (this.drag.preventClick = !0, e.pageX !== this.drag.startX && this.innerElements.forEach(function (e) {
        e.style.pointerEvents = "none";
      }), this.drag.endX = e.pageX, this.element.style.cursor = "-webkit-grabbing", this.sliderFrame.style.transition = "transform 0ms ".concat(this.config.easing), this.innerElements.length > this.slidesToShow) {
        var _e31 = this.config.loop ? this.currentSlide + this.slidesToShow : this.currentSlide,
            t = _e31 * (this.elementWidth / this.slidesToShow),
            i = this.drag.endX - this.drag.startX,
            s = this.config.rtl ? t + i : t - i;

        this.sliderFrame.style.transform = "translate3d(".concat((this.config.rtl ? 1 : -1) * s, "px, 0, 0)");
      } else this.sliderFrame.style.transform = "translate3d(0, 0, 0)";
    }
  }, {
    key: "mouseleaveHandler",
    value: function mouseleaveHandler(e) {
      this.pointerDown && (this.pointerDown = !1, this.element.style.cursor = "-webkit-grab", this.drag.endX = e.pageX, this.drag.preventClick = !1, this.enableTransition(), this.updateAfterDrag(), this.clearDrag(), this.innerElements.forEach(function (e) {
        e.style.pointerEvents = "";
      }));
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      switch (e.keyCode) {
        case 37:
          this.prev(this.slidesToShow);
          break;

        case 39:
          this.next(this.slidesToShow);
      }

      this.config.onKeyDown(e.keyCode);
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      this.drag.preventClick && e.preventDefault(), this.drag.preventClick = !1;
    }
  }, {
    key: "remove",
    value: function remove(e, t) {
      (e < 0 || e >= this.innerElements.length) && console.error("Item to remove doesn't exist 😭");
      var i = e < this.currentSlide,
          s = this.currentSlide + this.slidesToShow - 1 === e;
      (i || s) && this.currentSlide--, this.innerElements.splice(e, 1), this.createContainer(), t && t.call(this);
    }
  }, {
    key: "insert",
    value: function insert(e, t, i) {
      (t < 0 || t > this.innerElements.length + 1) && console.error("Unable to inset it at this index 😭"), -1 !== this.innerElements.indexOf(e) && console.error("The same item in a slider? Really? Nope 😭");
      var s = t <= this.currentSlide > 0 && this.innerElements.length;
      this.currentSlide = s ? this.currentSlide + 1 : this.currentSlide, this.innerElements.splice(t, 0, e), this.createContainer(), i && i.call(this);
    }
  }, {
    key: "prepend",
    value: function prepend(e, t) {
      this.insert(e, 0), t && t.call(this);
    }
  }, {
    key: "append",
    value: function append(e, t) {
      this.insert(e, this.innerElements.length + 1), t && t.call(this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      var t = arguments.length > 1 ? arguments[1] : undefined;

      if (this.detachEvents(), this.element.style.cursor = "auto", e) {
        var _e32 = document.createDocumentFragment();

        this.innerElements.forEach(function (t) {
          _e32.appendChild(t);
        }), this.element.innerHTML = "", this.element.appendChild(_e32), this.element.removeAttribute("style");
      }

      t && t.call(this);
    }
  }], [{
    key: "extend",
    value: function extend(e) {
      var t = {
        element: "",
        prev: "",
        next: "",
        speed: 450,
        easing: "ease",
        slidesToShow: 1,
        slidesToScroll: 1,
        startIndex: 0,
        gap: 0,
        draggable: !0,
        multipleDrag: !0,
        threshold: 20,
        keyboard: !1,
        loop: !1,
        rtl: !1,
        autoplay: !1,
        autoplaySpeed: 5e3,
        stopOnOver: !0,
        pagination: "",
        onInit: function onInit() {},
        onChange: function onChange(e, t) {},
        onKeyDown: function onKeyDown(e) {},
        onResize: function onResize() {}
      };

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    }
  }]);

  return JetSlider;
}();

var Launch =
/*#__PURE__*/
function () {
  function Launch() {
    _classCallCheck(this, Launch);

    this.panorama, this.map, this.photoCounter = document.querySelector(".launch__photo-counter"), this.videoCounter = document.querySelector(".launch__video-counter"), this.init();
  }

  _createClass(Launch, [{
    key: "photoGallery",
    value: function photoGallery() {
      var _this141 = this;

      this.photo = new JetSlider({
        element: ".launch__photo",
        prev: ".launch__photo-prev",
        next: ".launch__photo-next",
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 650,
        gap: 30,
        momentum: !0,
        weight: 100,
        loop: !0,
        onChange: function onChange(e) {
          _this141.photoCounter.innerHTML = e, _this141.photoThumb && _this141.photoThumb.goTo(e - 1);
        }
      });
    }
  }, {
    key: "videoGallery",
    value: function videoGallery() {
      var _this142 = this;

      this.video = new JetSlider({
        element: ".launch__video",
        prev: ".launch__video-prev",
        next: ".launch__video-next",
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 650,
        gap: 30,
        momentum: !0,
        weight: 100,
        loop: !0,
        onChange: function onChange(e) {
          _this142.videoCounter.innerHTML = e, _this142.videoThumb && _this142.videoThumb.goTo(e - 1);
        }
      });
    }
  }, {
    key: "photoGalleryThumb",
    value: function photoGalleryThumb() {
      var _this143 = this;

      this.photoThumb = new JetSlider({
        element: ".launch__photo-thumb",
        prev: ".launch__photo-thumb-prev",
        next: ".launch__photo-thumb-next",
        slidesToShow: {
          568: 3,
          821: 5,
          1081: 7,
          1341: 9,
          1601: 12
        },
        slidesToScroll: {
          568: 1
        },
        speed: 650,
        gap: 30,
        momentum: !0,
        weight: 100,
        onResize: function onResize() {
          return _this143.photoThumbClick();
        },
        onComplete: function onComplete() {
          return _this143.photoThumbClick();
        }
      });
    }
  }, {
    key: "videoGalleryThumb",
    value: function videoGalleryThumb() {
      var _this144 = this;

      this.videoThumb = new JetSlider({
        element: ".launch__video-thumb",
        prev: ".launch__video-thumb-prev",
        next: ".launch__video-thumb-next",
        slidesToShow: {
          568: 3,
          821: 5,
          1081: 7,
          1341: 9,
          1601: 12
        },
        slidesToScroll: {
          568: 1
        },
        speed: 650,
        gap: 30,
        momentum: !0,
        weight: 100,
        onResize: function onResize() {
          return _this144.videoThumbClick();
        },
        onComplete: function onComplete() {
          return _this144.videoThumbClick();
        }
      });
    }
  }, {
    key: "photoThumbClick",
    value: function photoThumbClick() {
      var _this145 = this;

      var e = document.querySelectorAll(".launch__photo-thumb__item");
      e.forEach(function (e, t) {
        e.addEventListener("click", function () {
          _this145.photo.goTo(t), _this145.photoThumb.goTo(t);
        });
      });
    }
  }, {
    key: "videoThumbClick",
    value: function videoThumbClick() {
      var _this146 = this;

      var e = document.querySelectorAll(".launch__video-thumb__item");
      e.forEach(function (e, t) {
        e.addEventListener("click", function () {
          _this146.video.goTo(t), _this146.videoThumb.goTo(t);
        });
      });
    }
  }, {
    key: "expandBtn",
    value: function expandBtn() {
      var _this147 = this;

      var e = document.querySelectorAll(".launch__gallery-expand");
      e.forEach(function (e) {
        e.addEventListener("click", function () {
          setTimeout(function () {
            _this147.photo.resize(), _this147.photoThumb.resize();
          });
        });
      });
    }
  }, {
    key: "photoBtn",
    value: function photoBtn() {
      var e = document.querySelector(".launch__gallery-photo"),
          t = document.querySelector(".launch__gallery-video"),
          i = document.querySelector(".launch__photo-box"),
          s = document.querySelector(".launch__video-box"),
          o = document.querySelector(".launch__photo-thumb-box"),
          n = document.querySelector(".launch__video-thumb-box");
      e && e.classList.add("active"), e && e.addEventListener("click", function () {
        e && e.classList.add("active"), t && t.classList.remove("active"), i.classList.remove("active"), s.classList.remove("active"), o.classList.remove("active"), n.classList.remove("active");
      });
    }
  }, {
    key: "videoBtn",
    value: function videoBtn() {
      var e = document.querySelector(".launch__gallery-photo"),
          t = document.querySelector(".launch__gallery-video"),
          i = document.querySelector(".launch__photo-box"),
          s = document.querySelector(".launch__video-box"),
          o = document.querySelector(".launch__photo-thumb-box"),
          n = document.querySelector(".launch__video-thumb-box");
      t && t.addEventListener("click", function () {
        e && e.classList.remove("active"), t && t.classList.add("active"), i.classList.add("active"), s.classList.add("active"), o.classList.add("active"), n.classList.add("active");
      });
    }
  }, {
    key: "unity",
    value: function unity() {
      return new JetSlider({
        element: ".unity",
        prev: ".unity__prev",
        next: ".unity__next",
        slidesToShow: {
          0: 1,
          568: 2,
          821: 3,
          1081: 4
        },
        slidesToScroll: {
          0: 1,
          568: 2,
          821: 3,
          1081: 4
        },
        speed: 650,
        gap: 30,
        momentum: !0,
        weight: 100,
        loop: !1,
        autoplay: !1,
        autoplaySpeed: 5e3,
        stopOnOver: !0,
        pagination: ".unity__pagination"
      });
    }
  }, {
    key: "img",
    value: function img() {
      var e = document.querySelectorAll(".unity__hover");
      e.forEach(function (e) {
        var t = e.querySelector(".unity__box");

        if (t && t.children.length > 0) {
          var i = e.querySelector(".unity__photo-prev"),
              s = e.querySelector(".unity__photo-next"),
              o = e.querySelector(".unity__photo-bullets");
          return new JetSlider({
            element: t,
            speed: 650,
            draggable: !1,
            prev: i,
            next: s,
            pagination: o
          });
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      window.scrollTo(0, 0), this.photoGallery(), this.videoGallery(), this.photoGalleryThumb(), this.videoGalleryThumb(), this.expandBtn(), this.photoBtn(), this.videoBtn(), this.unity(), this.img();
    }
  }]);

  return Launch;
}();

var List =
/*#__PURE__*/
function () {
  function List() {
    _classCallCheck(this, List);

    this.init();
  }

  _createClass(List, [{
    key: "closeSearch",
    value: function closeSearch() {
      var e = document.querySelector("#jetwindow-search"),
          t = document.querySelector(".search__btn");
      t.addEventListener("click", function () {
        e.checked = !1;
      });
    }
  }, {
    key: "pagination",
    value: function pagination() {
      var e = document.querySelector(".ui__pagination-box");

      if (e) {
        new JetPagination({
          container: ".ui__pagination",
          previous: ".ui__pagination-previous",
          next: ".ui__pagination-next",
          active: sessionStorage.getItem("pagina"),
          total: e.dataset.total,
          left: {
            568: 2,
            0: 1
          },
          right: {
            568: 2,
            0: 1
          },
          onComplete: function onComplete() {
            return router.updateLinks();
          }
        });
      }
    }
  }, {
    key: "mapButton",
    value: function mapButton() {
      var e = document.querySelector(".list__map-btn");
      e && e.addEventListener("click", this.mapButtonHandler.bind(this));
    }
  }, {
    key: "mapButtonHandler",
    value: function mapButtonHandler() {
      var e = document.querySelector(".list"),
          t = ["css/leaflet.min.css", "js/leaflet.min.js"];
      this.map ? (e.classList.toggle("list--map-opened"), this.checkMapButton(e)) : this.loadScript(t, this.createMap.bind(this));
    }
  }, {
    key: "checkMapButton",
    value: function checkMapButton(e) {
      setTimeout(function () {
        var t = document.querySelectorAll(".list__map-btn-text");
        t.forEach(function (t) {
          e.classList.contains("list--map-opened") ? t.innerHTML = "Fechar mapa" : t.innerHTML = "Imóveis no mapa";
        });
      }, 100);
    }
  }, {
    key: "loadScript",
    value: function loadScript(e, t) {
      var _this148 = this;

      var i = e.map(function (e) {
        return _this148.createTag(e);
      });
      Promise.all(i).then(t);
    }
  }, {
    key: "createTag",
    value: function createTag(e) {
      return new Promise(function (t) {
        var i = e.split(".").pop(),
            s = "js" === i ? "script" : "link",
            o = "js" === i ? "src" : "href",
            n = document.createElement(s),
            a = document.querySelector("".concat(s, "[").concat(o, "=\"").concat(e, "\"]"));
        a && a.remove(), n[o] = e, "css" === i && (n.rel = "stylesheet"), document.body.appendChild(n), n.onload = function () {
          return t(e);
        };
      });
    }
  }, {
    key: "createMap",
    value: function createMap() {
      var _this149 = this;

      var e = document.querySelector(".list"),
          t = this.data.map(function (e) {
        return [e.lat, e.lng];
      });
      this.map = L.map("map"), this.createTile(), this.data.forEach(function (e) {
        return _this149.createMarker(e, _this149.createIcon());
      }), e.classList.add("list--map-opened"), this.checkMapButton(e), this.removeHashLink(), setTimeout(function () {
        return _this149.map.fitBounds(t);
      }, 1e3), router.updateLinks();
    }
  }, {
    key: "updateMap",
    value: function updateMap() {
      var e = document.querySelector(".list");
      this.checkMapButton(e), e.classList.contains("list--map-opened") && this.createMap();
    }
  }, {
    key: "getMapData",
    value: function getMapData() {
      var e = document.querySelectorAll(".list__map-infos");
      this.data = _toConsumableArray(e).map(function (e) {
        return JSON.parse(e.value);
      });
    }
  }, {
    key: "createTile",
    value: function createTile() {
      var e = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
      L.tileLayer(e, {
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map);
    }
  }, {
    key: "createMarker",
    value: function createMarker(e, t) {
      var _this150 = this;

      L.marker([e.lat, e.lng], {
        icon: t
      }).addTo(this.map).bindPopup(this.createPopUp(e)).on("click", function () {
        setTimeout(function () {
          _this150.removeHashLink(), router.updateLinks();
        });
      });
    }
  }, {
    key: "createIcon",
    value: function createIcon() {
      return L.icon({
        iconUrl: "svg/marker.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
    }
  }, {
    key: "createPopUp",
    value: function createPopUp(e) {
      return "<a href=\"".concat(e.url, "\">\n            <img class=\"list__map-img\" src=\"").concat(e.img, "\" width=\"150\" height=\"50\">\n            <div class=\"list__map-content\">\n                ").concat(e.referencia, "\n                <strong class=\"list__map-type\">").concat(e.tipoimovel, "</strong>\n                ").concat(e.tipoendereco, ". ").concat(e.endereco, "<br>\n                ").concat(e.bairro, " - ").concat(e.cidade, "/").concat(e.estado, "\n                <div class=\"list__map-price\">\n                    ").concat(e.valorVenda ? "Venda: <strong>R$ ".concat(e.valorVenda.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      }), "</strong>") : "", "\n                    ").concat(e.valorLocacao ? "Loca\xE7\xE3o: <strong>R$ ".concat(e.valorLocacao.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      }), "</strong>") : "", "\n                </div>\n                ").concat(e.areaTotal > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/area.svg\"></span>\n                        ".concat(e.areaTotal.toLocaleString("pt-BR"), "m\xB2 total\n                    </div>") : "", "\n                ").concat(e.areaUtil > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/area.svg\"></span>\n                        ".concat(e.areaUtil.toLocaleString("pt-BR"), "m\xB2 \xFAtil\n                    </div>") : "", "\n                ").concat(e.banheiro > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/bathroom.svg\"></span>\n                        ".concat(e.banheiro, " banheiro(s)\n                    </div>") : "", "\n                ").concat(e.vaga > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/garage.svg\"></span>\n                        ".concat(e.vaga, " vaga(s)\n                    </div>") : "", "\n                ").concat(e.quarto > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/bedroom.svg\"></span>\n                        ".concat(e.quarto, " quarto(s)\n                    </div>") : "", "\n            </div>\n        </a>");
    }
  }, {
    key: "removeHashLink",
    value: function removeHashLink() {
      var e = document.querySelectorAll(".list__map a[href]");
      e.forEach(function (e) {
        e.href.includes("#") && e.removeAttribute("href");
      });
    }
  }, {
    key: "closeMap",
    value: function closeMap() {
      var _this151 = this;

      var e = document.querySelector(".list__map-close"),
          t = document.querySelector(".list");
      e.addEventListener("click", function () {
        t.classList.remove("list--map-opened"), _this151.checkMapButton(t);
      });
    }
  }, {
    key: "noResult",
    value: function noResult() {
      var e = document.querySelector(".list__no-result");

      if (e) {
        new JetSlider({
          element: ".list__no-result",
          prev: ".list__no-result-prev",
          next: ".list__no-result-next",
          slidesToShow: {
            0: 1,
            568: 2,
            821: 3,
            1081: 4
          },
          slidesToScroll: {
            0: 1,
            568: 2,
            821: 3,
            1081: 4
          },
          speed: 650,
          gap: 30,
          pagination: ".list__no-result-pagination"
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      router.updateLinks(), new Search(), this.closeSearch(), this.pagination(), this.getMapData(), this.updateMap(), this.mapButton(), this.closeMap(), this.noResult();
    }
  }]);

  return List;
}();

var List2 =
/*#__PURE__*/
function () {
  function List2() {
    _classCallCheck(this, List2);

    this.init();
  }

  _createClass(List2, [{
    key: "closeSearch",
    value: function closeSearch() {
      var e = document.querySelector("#jetwindow-search"),
          t = document.querySelector(".search__btn");
      t.addEventListener("click", function () {
        e.checked = !1;
      });
    }
  }, {
    key: "pagination",
    value: function pagination() {
      var e = document.querySelector(".ui__pagination-box");

      if (e) {
        new JetPagination({
          container: ".ui__pagination",
          previous: ".ui__pagination-previous",
          next: ".ui__pagination-next",
          active: sessionStorage.getItem("pagina"),
          total: e.dataset.total,
          left: {
            568: 2,
            0: 1
          },
          right: {
            568: 2,
            0: 1
          },
          onComplete: function onComplete() {
            return router.updateLinks();
          }
        });
      }
    }
  }, {
    key: "mapButton",
    value: function mapButton() {
      var e = document.querySelector(".list__map-btn");
      e && e.addEventListener("click", this.mapButtonHandler.bind(this));
    }
  }, {
    key: "mapButtonHandler",
    value: function mapButtonHandler() {
      var _this152 = this;

      var e = document.querySelector(".list"),
          t = ["css/leaflet.min.css", "js/leaflet.min.js"];
      this.map ? (e.classList.toggle("list--map-opened"), this.checkMapButton(e)) : this.loadScript(t, function () {
        var t = sessionStorage.getItem("filtro.tipodivulgacao"),
            i = sessionStorage.getItem("map-".concat(t));
        e.classList.add("list--map-opened"), i ? (_this152.data = JSON.parse(i), _this152.createMap()) : _this152.loadData();
      });
    }
  }, {
    key: "checkMapButton",
    value: function checkMapButton(e) {
      setTimeout(function () {
        var t = document.querySelectorAll(".list__map-btn-text");
        t.forEach(function (t) {
          e.classList.contains("list--map-opened") ? t.innerHTML = "Fechar mapa" : t.innerHTML = "Imóveis no mapa";
        });
      }, 100);
    }
  }, {
    key: "loadScript",
    value: function loadScript(e, t) {
      var _this153 = this;

      var i = e.map(function (e) {
        return _this153.createTag(e);
      });
      Promise.all(i).then(t);
    }
  }, {
    key: "createTag",
    value: function createTag(e) {
      return new Promise(function (t) {
        var i = e.split(".").pop(),
            s = "js" === i ? "script" : "link",
            o = "js" === i ? "src" : "href",
            n = document.createElement(s),
            a = document.querySelector("".concat(s, "[").concat(o, "=\"").concat(e, "\"]"));
        a && a.remove(), n[o] = e, "css" === i && (n.rel = "stylesheet"), document.body.appendChild(n), n.onload = function () {
          return t(e);
        };
      });
    }
  }, {
    key: "createMap",
    value: function createMap() {
      var _this154 = this;

      var e = document.querySelector(".list"),
          t = this.data.map(function (e) {
        return [e.lat, e.lng];
      });
      this.map = L.map("map");
      var i = ["js/leaflet.markercluster.min.js"];
      this.loadScript(i, function () {
        _this154.clusters = L.markerClusterGroup({
          chunkedLoading: !0
        }), _this154.createTile(), _this154.data.forEach(function (e) {
          return _this154.createMarker(e, _this154.createIcon(e.tipoImovelPadrao));
        }), _this154.map.addLayer(_this154.clusters), _this154.checkMapButton(e), _this154.removeHashLink(), setTimeout(function () {
          return _this154.map.fitBounds(t);
        }, 1e3), router.updateLinks();
      });
    }
  }, {
    key: "updateMap",
    value: function updateMap() {
      var e = document.querySelector(".list");
      this.checkMapButton(e), e.classList.contains("list--map-opened") && this.createMap();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this155 = this;

      new JetLoader({
        url: "".concat(config.imoveisBaseUrl, "?filtro.").concat(config.tipoCliente, "id=").concat(config.id, "&filtro.tipodivulgacao=").concat(sessionStorage.getItem("filtro.tipodivulgacao"), "&pagina=1&maximo=999999"),
        onSuccess: function onSuccess(e) {
          var t = sessionStorage.getItem("filtro.tipodivulgacao");
          _this155.getMapData(e), sessionStorage.setItem("map-".concat(t), JSON.stringify(_this155.data)), _this155.createMap();
        }
      });
    }
  }, {
    key: "getMapData",
    value: function getMapData(e) {
      var t = e.data.buscaImovelId,
          i = e.data.resultado;
      this.data = [];

      for (var _e33 in i) {
        var s = i[_e33],
            o = this.cleanUrl(s.tipoImovelDescricao),
            n = s.imovelQuartos ? "-".concat(s.imovelQuartos, "-quartos") : "",
            a = s.imovelEnderecoBairro ? "-".concat(this.cleanUrl(s.imovelEnderecoBairro)) : "",
            r = s.imovelEnderecoCidade ? "-".concat(this.cleanUrl(s.imovelEnderecoCidade)) : "",
            l = s.imovelVagas ? "-com-garagem" : "",
            c = s.imovelAreaUtil ? "-".concat(Math.floor(s.imovelAreaUtil), "m2") : "",
            h = s.imovelValorVenda,
            d = s.imovelValorAluguel - s.imovelValorMultaDesconto;
        var u = "-venda-locacao-rs-".concat(h, "-rs-").concat(d);
        s.imovelVenda && !s.imovelLocacao ? u = "-venda-rs-".concat(h) : !s.imovelVenda && s.imovelLocacao && (u = "-locacao-rs-".concat(d));
        var m = "".concat(config.pageImovel, "/").concat(o).concat(n).concat(a).concat(r).concat(l).concat(c).concat(u, "?id=").concat(s.clienteId, "&ref=").concat(s.imovelReferencia, "&search=").concat(t),
            g = {
          referencia: s.imovelReferencia,
          img: s.urlFotoPrincipalMedia,
          tipoimovel: s.tipoImovelDescricao,
          tipoImovelPadrao: s.tipoImovelPadrao,
          tipoendereco: s.imovelTipoEndereco,
          endereco: s.imovelEndereco,
          estado: s.imovelEnderecoEstado,
          cidade: s.imovelEnderecoCidade,
          bairro: s.imovelEnderecoBairro,
          banheiro: s.imovelBanheiros || 0,
          quarto: s.imovelQuartos,
          vaga: s.imovelVagas > 2 ? s.imovelVagas - 2 : 0,
          areaTotal: s.imovelAreaTotal,
          areaUtil: s.imovelAreaUtil,
          valorVenda: s.imovelVenda ? s.imovelValorVenda : "",
          valorLocacao: s.imovelLocacao ? s.imovelValorAluguel - s.imovelValorMultaDesconto : "",
          lat: s.imovelEnderecoLatitude,
          lng: s.imovelEnderecoLongitude,
          url: m
        };
        this.data.push(g);
      }
    }
  }, {
    key: "cleanUrl",
    value: function cleanUrl(e) {
      return e = e.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, " "), e = e.replace(/\s+/g, "-"), e = e.toLowerCase(), e;
    }
  }, {
    key: "createTile",
    value: function createTile() {
      var e = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
      L.tileLayer(e, {
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map);
    }
  }, {
    key: "createMarker",
    value: function createMarker(e, t) {
      var _this156 = this;

      this.clusters.addLayer(L.marker([e.lat, e.lng], {
        icon: t
      }).bindPopup(this.createPopUp(e)).on("click", function () {
        setTimeout(function () {
          _this156.removeHashLink(), router.updateLinks();
        });
      }));
    }
  }, {
    key: "createIcon",
    value: function createIcon(e) {
      return L.icon({
        iconUrl: "svg/".concat(e, ".svg"),
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
    }
  }, {
    key: "createPopUp",
    value: function createPopUp(e) {
      return "<a href=\"".concat(e.url, "\">\n            <img class=\"list__map-img\" src=\"").concat(e.img, "\" width=\"150\" height=\"50\">\n            <div class=\"list__map-content\">\n                ").concat(e.referencia, "\n                <strong class=\"list__map-type\">").concat(e.tipoimovel, "</strong>\n                ").concat(e.tipoendereco, ". ").concat(e.endereco, "<br>\n                ").concat(e.bairro, " - ").concat(e.cidade, "/").concat(e.estado, "\n                <div class=\"list__map-price\">\n                    ").concat(e.valorVenda ? "Venda: <strong>R$ ".concat(e.valorVenda.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      }), "</strong>") : "", "\n                    ").concat(e.valorLocacao ? "Loca\xE7\xE3o: <strong>R$ ".concat(e.valorLocacao.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      }), "</strong>") : "", "\n                </div>\n                ").concat(e.areaTotal > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/area.svg\"></span>\n                        ".concat(e.areaTotal.toLocaleString("pt-BR"), "m\xB2 total\n                    </div>") : "", "\n                ").concat(e.areaUtil > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/area.svg\"></span>\n                        ".concat(e.areaUtil.toLocaleString("pt-BR"), "m\xB2 \xFAtil\n                    </div>") : "", "\n                ").concat(e.banheiro > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/bathroom.svg\"></span>\n                        ".concat(e.banheiro, " banheiro(s)\n                    </div>") : "", "\n                ").concat(e.vaga > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/garage.svg\"></span>\n                        ".concat(e.vaga, " vaga(s)\n                    </div>") : "", "\n                ").concat(e.quarto > 0 ? "<div class=\"list__map-feature\">\n                        <span class=\"list__map-feature-icon\"><img src=\"svg/bedroom.svg\"></span>\n                        ".concat(e.quarto, " quarto(s)\n                    </div>") : "", "\n            </div>\n        </a>");
    }
  }, {
    key: "removeHashLink",
    value: function removeHashLink() {
      var e = document.querySelectorAll(".list__map a[href]");
      e.forEach(function (e) {
        e.href.includes("#") && e.removeAttribute("href");
      });
    }
  }, {
    key: "closeMap",
    value: function closeMap() {
      var _this157 = this;

      var e = document.querySelector(".list__map-close"),
          t = document.querySelector(".list");
      e.addEventListener("click", function () {
        t.classList.remove("list--map-opened"), _this157.checkMapButton(t);
      });
    }
  }, {
    key: "noResult",
    value: function noResult() {
      var e = document.querySelector(".list__no-result");

      if (e) {
        new JetSlider({
          element: ".list__no-result",
          prev: ".list__no-result-prev",
          next: ".list__no-result-next",
          slidesToShow: {
            0: 1,
            568: 2,
            821: 3,
            1081: 4
          },
          slidesToScroll: {
            0: 1,
            568: 2,
            821: 3,
            1081: 4
          },
          speed: 650,
          gap: 30,
          pagination: ".list__no-result-pagination"
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      router.updateLinks(), new Search(), this.closeSearch(), this.pagination(), this.updateMap(), this.mapButton(), this.closeMap(), this.noResult();
    }
  }]);

  return List2;
}();

var Main =
/*#__PURE__*/
function () {
  function Main(e, t) {
    _classCallCheck(this, Main);

    this.init(e, t);
  }

  _createClass(Main, [{
    key: "setStorage",
    value: function setStorage(e) {
      sessionStorage.setItem("maximo", config.imoveisPagina), sessionStorage.getItem("filtro.tipodivulgacao") || sessionStorage.setItem("filtro.tipodivulgacao", config.imovelpara);

      for (var t in e) {
        if (e[t]) {
          var i = e[t];
          sessionStorage.setItem(t, i);
        } else sessionStorage.removeItem(t);
      }
    }
  }, {
    key: "setClasses",
    value: function setClasses(e) {
      global.root && (e = e.split(global.root)[1]), e = "/" === e ? "index" : e.split("/").join("-").substring(1).split(".")[0], document.body.className = "body__".concat(e);
    }
  }, {
    key: "asideAnimation",
    value: function asideAnimation() {
      var _this158 = this;

      var e = document.querySelector("html");

      if (e.classList.contains("jetbrowser__desktop")) {
        var _e34 = document.querySelectorAll("[data-depth]");

        _e34.forEach(function (e) {
          window.addEventListener("mousemove", _this158.mouseMoveHandler.bind(_this158, e), {
            passive: !0
          });
        });
      }
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(e) {
      var t = e.dataset.depth,
          i = -(event.clientX - window.innerWidth / 2),
          s = i / t;
      e.style.transform = "translateX(".concat(s, "%)");
    }
  }, {
    key: "visited",
    value: function visited() {
      var e = document.querySelectorAll(".ui__card-link"),
          t = window.location.host,
          i = window.location.pathname;
      localStorage.setItem("visited-".concat(i), !0), e.forEach(function (e) {
        var i = localStorage.getItem("visited-".concat(e.pathname));
        e.host === t && i && (e.dataset.visited = !0);
      });
    }
  }, {
    key: "lgpd",
    value: function lgpd() {
      var e = document.querySelector(".lgpd__input"),
          t = document.querySelector(".lgpd__close"),
          i = localStorage.getItem("lgpd");
      t.addEventListener("click", function () {
        return localStorage.setItem("lgpd", !0);
      }), e.checked = !i;
    }
  }, {
    key: "init",
    value: function init(e, t) {
      this.setStorage(parameters), this.setClasses(e), this.asideAnimation(), this.visited(), this.lgpd(), new Navigation(t), new Favorite(), new Form();
    }
  }]);

  return Main;
}();

var Navigation =
/*#__PURE__*/
function () {
  function Navigation(e) {
    _classCallCheck(this, Navigation);

    this.init(e);
  }

  _createClass(Navigation, [{
    key: "selectButton",
    value: function selectButton(e) {
      e = e.replace(/(\?.*)/g, "");
      var t = this.getPath(e);
      this.deselectButton(), t.forEach(function (e, i) {
        e === global.root && 1 === t.length && (e = "".concat(e, "/"));
        var s = document.querySelectorAll("nav [href=\"".concat(e, "\"]"));

        if (0 === i && e !== "".concat(global.root, "/")) {
          var _t28 = e.substring(e.lastIndexOf("/") + 1).split("-")[0];
          e = e.substring(0, e.lastIndexOf("/")), e = "".concat(e, "/").concat(_t28), s = document.querySelectorAll("nav [href^=\"".concat(e, "\"]"));
        }

        s.forEach(function (e) {
          return e.classList.add("active");
        });
      }), this.closeNav();
    }
  }, {
    key: "getPath",
    value: function getPath(e) {
      var t = e.split("/").reduce(function (e, t) {
        return "" !== t && e && e.push(t), e;
      }, []).reduce(function (e, t, i, s) {
        return e.push("/".concat(s.slice(0, s.length - i).join("/"))), e;
      }, []);
      return "/" === e && (t = ["/"]), t;
    }
  }, {
    key: "deselectButton",
    value: function deselectButton() {
      var e = document.querySelectorAll(".nav__btn, .footer__btn");
      e.forEach(function (e) {
        e.classList.remove("active");
      });
    }
  }, {
    key: "closeNav",
    value: function closeNav() {
      var e = document.querySelector("#jetwindow-nav");
      e.checked = !1;
    }
  }, {
    key: "init",
    value: function init(e) {
      this.selectButton(e);
    }
  }]);

  return Navigation;
}();

var Page =
/*#__PURE__*/
function () {
  function Page() {
    _classCallCheck(this, Page);
  }

  _createClass(Page, [{
    key: "setMetas",
    value: function setMetas(e) {
      var t = document.querySelectorAll('meta[name*="title"]'),
          i = document.querySelectorAll('meta[name*="description"], meta[itemprop*="description"]'),
          s = document.querySelectorAll('meta[name*="keywords"]'),
          o = document.querySelectorAll('meta[name*="image"], meta[itemprop*="image"]'),
          n = document.querySelectorAll('meta[name="robots"]'),
          a = document.querySelectorAll('meta[name*="url"]'),
          r = document.querySelector('[rel="canonical"]'),
          l = [[t, e.title], [i, e.description], [s, e.keywords], [o, e.image], [n, e.robots], [a, e.url]];
      document.title = e.title, r.setAttribute("href", e.url), l.forEach(function (e) {
        e[0].forEach(function (t) {
          t.setAttribute("content", e[1]);
        });
      });
    }
  }, {
    key: "addPreloader",
    value: function addPreloader(e) {
      var _this159 = this;

      var t = document.querySelector(".ui__preloader");
      this.finishAnimation = !1, t.classList.add("ui__preloader--in"), e(), setTimeout(function () {
        _this159.finishAnimation = !0;
      }, 700);
    }
  }, {
    key: "removePreloader",
    value: function removePreloader(e) {
      var _this160 = this;

      var t = document.querySelector(".ui__preloader"),
          i = setInterval(function () {
        _this160.finishAnimation && (_this160.finishAnimation = !1, t.classList.add("ui__preloader--out"), clearInterval(i), e(), setTimeout(function () {
          t.classList.remove("ui__preloader--in", "ui__preloader--out");
        }, 700));
      }, 10);
    }
  }, {
    key: "load",
    value: function load(e, t, i) {
      this.lastPage ? this.addPreloader(this.ajaxLoad.bind(this, e, t, i)) : this.init(e, t, i);
    }
  }, {
    key: "ajaxLoad",
    value: function ajaxLoad(e, t, i) {
      var _this161 = this;

      var s = new FormData();
      s.append("url", t);
      new JetLoader({
        url: e,
        method: "post",
        header: {
          "X-Requested-With": "XMLHttpRequest"
        },
        body: s,
        onSuccess: function onSuccess(s) {
          s = JSON.parse(s), config = s.config, parameters = s.parameters, _this161.setMetas(s.seo), _this161.removePreloader(_this161.render.bind(_this161, e, t, s.content, i));
        }
      });
    }
  }, {
    key: "render",
    value: function render(e, t, i, s) {
      e !== this.lastPage ? this.pageRender(i) : this.templateRender(i), this.setState(t), this.goToTop(), this.init(e, t, s);
    }
  }, {
    key: "pageRender",
    value: function pageRender(e) {
      var t = document.querySelector(".container");
      t.innerHTML = e;
    }
  }, {
    key: "templateRender",
    value: function templateRender(e) {
      var t = document.createDocumentFragment(),
          i = document.createElement("div");
      i.innerHTML = e, t.appendChild(i);
      var s = t.querySelectorAll("[data-template]"),
          o = document.querySelectorAll("[data-template]");
      s.forEach(function (e, t) {
        o[t].innerHTML = e.innerHTML;
      });
    }
  }, {
    key: "setState",
    value: function setState(e, t) {
      history.state === e || this.pop || history.pushState({
        url: e,
        title: t
      }, t, e);
    }
  }, {
    key: "goToTop",
    value: function goToTop() {
      this.pop || window.scrollTo(0, 0);
    }
  }, {
    key: "init",
    value: function init(e, t, i) {
      new Main(e, t), i && i(), this.pop = !1, this.lastPage = e, router.updateLinks();
    }
  }]);

  return Page;
}();

var Release =
/*#__PURE__*/
function () {
  function Release() {
    _classCallCheck(this, Release);

    this.init();
  }

  _createClass(Release, [{
    key: "pagination",
    value: function pagination() {
      var e = document.querySelector(".ui__pagination-box");

      if (e) {
        new JetPagination({
          container: ".ui__pagination",
          previous: ".ui__pagination-previous",
          next: ".ui__pagination-next",
          active: e.dataset.page,
          total: e.dataset.total,
          left: {
            568: 2,
            0: 1
          },
          right: {
            568: 2,
            0: 1
          },
          concatenateWith: "/",
          onComplete: function onComplete() {
            return router.updateLinks();
          }
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.pagination();
    }
  }]);

  return Release;
}();

var Search =
/*#__PURE__*/
function (_Filters) {
  _inherits(Search, _Filters);

  function Search(e) {
    var _this162;

    _classCallCheck(this, Search);

    _this162 = _possibleConstructorReturn(this, _getPrototypeOf(Search).call(this, config.pageImoveis)), _this162.init();
    return _this162;
  }

  _createClass(Search, [{
    key: "imovelpara",
    value: function imovelpara() {
      var _this163 = this;

      new JetSelect({
        element: ".search__type",
        name: ["filtro.tipodivulgacao"],
        optionsText: ["Comprar", "Alugar"],
        optionsValue: ["v", "l"],
        label: "Selecione",
        tags: !0,
        tagsTarget: ".list__tags",
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this163).call(_this163);
        },
        onChange: function onChange() {
          _get(_getPrototypeOf(Search.prototype), "removeStorage", _this163).call(_this163), _get(_getPrototypeOf(Search.prototype), "createFilters", _this163).call(_this163, _this163.filters.bind(_this163)), _this163.referenciaFilter.empty(), _this163.enderecoFilter.empty(), _get(_getPrototypeOf(Search.prototype), "createPath", _this163).call(_this163);
        }
      });
    }
  }, {
    key: "tipoimovel",
    value: function tipoimovel(e) {
      var _this164 = this;

      new JetSelect({
        element: ".search__property",
        name: "filtro.tiposimoveis",
        optionsText: e.tipoImovelDescricao,
        optionsValue: e.tipoImovelDescricao,
        type: "multiple",
        deselectAll: "Limpar seleção",
        label: "Selecione",
        tags: !0,
        tagsTarget: ".list__tags",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this164).call(_this164);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this164).call(_this164);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this164).call(_this164);
        }
      });
    }
  }, {
    key: "valorMinimo",
    value: function valorMinimo() {
      var _this165 = this;

      var e, t;
      "v" === sessionStorage.getItem("filtro.tipodivulgacao") ? (e = ["De R$ 50.000", "De R$ 100.000", "De R$ 150.000", "De R$ 200.000", "De R$ 250.000", "De R$ 300.000", "De R$ 400.000", "De R$ 500.000", "De R$ 600.000", "De R$ 700.000", "De R$ 800.000", "De R$ 900.000", "De R$ 1.000.000"], t = [5e4, 1e5, 15e4, 2e5, 25e4, 3e5, 4e5, 5e5, 6e5, 7e5, 8e5, 9e5, 1e6]) : (e = ["Até R$ 400", "Até R$ 800", "Até R$ 1.000", "Até R$ 1500", "Até R$ 2.000", "Até R$ 3.000", "Até R$ 4.000", "Até R$ 5.000", "Até R$ 6.000", "Até R$ 7.000", "Até R$ 8.000", "Até R$ 9.000", "Até R$ 10.000", "Até R$ 15.000"], t = [400, 800, 1e3, 1500, 2e3, 3e3, 4e3, 5e3, 6e3, 7e3, 8e3, 9e3, 1e4, 15e3]);
      new JetSelect({
        element: ".search__min-price",
        name: "filtro.valorminimo",
        optionsText: e,
        optionsValue: t,
        deselectAll: "Limpar seleção",
        label: "Selecione",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this165).call(_this165);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this165).call(_this165);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this165).call(_this165);
        }
      });
    }
  }, {
    key: "valorMaximo",
    value: function valorMaximo() {
      var _this166 = this;

      var e, t;
      "v" === sessionStorage.getItem("filtro.tipodivulgacao") ? (e = ["Até R$ 100.000", "Até R$ 150.000", "Até R$ 200.000", "Até R$ 300.000", "Até R$ 400.000", "Até R$ 600.000", "Até R$ 800.000", "Até R$ 1.000.000", "Até R$ 1.500.000", "Até R$ 2.000.000", "Até R$ 3.000.000", "Acima de R$ 3.000.000"], t = [1e5, 15e4, 2e5, 3e5, 4e5, 6e5, 8e5, 1e6, 15e5, 2e6, 3e6, 999999999999]) : (e = ["Até R$ 400", "Até R$ 800", "Até R$ 1.000", "Até R$ 1500", "Até R$ 2.000", "Até R$ 3.000", "Até R$ 4.000", "Até R$ 5.000", "Até R$ 6.000", "Até R$ 7.000", "Até R$ 8.000", "Até R$ 9.000", "Até R$ 10.000", "Até R$ 15.000", "Acima de R$ 15.000"], t = [400, 800, 1e3, 1500, 2e3, 3e3, 4e3, 5e3, 6e3, 7e3, 8e3, 9e3, 1e4, 15e3, 99999999]);
      new JetSelect({
        element: ".search__max-price",
        name: "filtro.valormaximo",
        optionsText: e,
        optionsValue: t,
        deselectAll: "Limpar seleção",
        label: "Selecione",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this166).call(_this166);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this166).call(_this166);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this166).call(_this166);
        }
      });
    }
  }, {
    key: "cidade",
    value: function cidade(e) {
      var _this167 = this;

      new JetSelect({
        element: ".search__city",
        name: "filtro.cidade",
        optionsText: e.cidadeNome,
        optionsValue: e.cidadeNome,
        type: "multiple",
        deselectAll: "Limpar seleção",
        label: "Selecione",
        tags: !0,
        tagsTarget: ".list__tags",
        onDeselectAll: function onDeselectAll() {
          _get(_getPrototypeOf(Search.prototype), "createFilters", _this167).call(_this167, _this167.filters.bind(_this167)), _get(_getPrototypeOf(Search.prototype), "createPath", _this167).call(_this167);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this167).call(_this167);
        },
        onChange: function onChange() {
          _this167.bairroFilter.removeStorage(), _get(_getPrototypeOf(Search.prototype), "createFilters", _this167).call(_this167, _this167.filters.bind(_this167)), _get(_getPrototypeOf(Search.prototype), "createPath", _this167).call(_this167);
        }
      });
    }
  }, {
    key: "bairro",
    value: function bairro(e) {
      var _this168 = this;

      this.bairroFilter || (this.bairroFilter = new JetSelect({
        element: ".search__neighborhood",
        name: "filtro.bairro",
        type: "multiple",
        deselectAll: "Limpar seleção",
        label: "Selecione",
        sortTitle: !0,
        tags: !0,
        tagsTarget: ".list__tags",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this168).call(_this168);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this168).call(_this168);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this168).call(_this168);
        }
      })), _get(_getPrototypeOf(Search.prototype), "addData", this).call(this, {
        filter: this.bairroFilter,
        text: e.bairroNome,
        value: e.bairroNome,
        sort: e.bairroCidade
      });
    }
  }, {
    key: "regiao",
    value: function regiao(e) {
      var _this169 = this;

      new JetSelect({
        element: ".search__region",
        name: "filtro.regiaocidade",
        optionsText: e.opcoes[0].split(";"),
        optionsValue: e.valor,
        deselectAll: "Limpar seleção",
        label: "Selecione",
        tags: !0,
        tagsTarget: ".list__tags",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this169).call(_this169);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this169).call(_this169);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this169).call(_this169);
        }
      });
    }
  }, {
    key: "quarto",
    value: function quarto() {
      var _this170 = this;

      new JetSelect({
        element: ".search__bedroom",
        name: ["filtro.quarto", "filtro.quartoini"],
        optionsText: ["1", "2", "3", "4+"],
        optionsValue: [["1", null], ["2", null], ["3", null], [null, "4"]],
        deselectAll: "Limpar seleção",
        label: "Selecione",
        tags: !0,
        tagsOnChange: !1,
        tagsTarget: ".list__tags",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this170).call(_this170);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this170).call(_this170);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this170).call(_this170);
        }
      });
    }
  }, {
    key: "garagem",
    value: function garagem() {
      var _this171 = this;

      new JetSelect({
        element: ".search__garage",
        name: ["filtro.vagagaragem", "filtro.vagaini"],
        optionsText: ["Sim", "Não", "1", "2", "3", "4+"],
        optionsValue: [["1", null], ["2", null], ["3", null], ["4", null], ["5", null], [null, "6"]],
        deselectAll: "Limpar seleção",
        label: "Selecione",
        tags: !0,
        tagsOnChange: !1,
        tagsTarget: ".list__tags",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this171).call(_this171);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this171).call(_this171);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this171).call(_this171);
        }
      });
    }
  }, {
    key: "areaMinima",
    value: function areaMinima() {
      var _this172 = this;

      new JetSelect({
        element: ".search__min-area",
        name: "filtro.areatotalminima",
        optionsText: ["De 60m²", "De 100m²", "De 200m²", "De 300m²", "De 400m²", "De 500m²", "De 600m²", "De 700m²", "De 800m²", "De 900m²", "De 1.000m²", "De 2.000m²", "De 3.000m²", "De 4.000m²", "De 5.000m²", "De 10.000m²", "De 20.000m²", "De 30.000m²", "De 40.000m²", "De 50.000m²", "De 100.000m²"],
        optionsValue: [60, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1e3, 2e3, 3e3, 4e3, 5e3, 1e4, 2e4, 3e4, 4e4, 5e4, 1e5],
        deselectAll: "Limpar seleção",
        label: "Selecione",
        tags: !0,
        tagsTarget: ".list__tags",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this172).call(_this172);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this172).call(_this172);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this172).call(_this172);
        }
      });
    }
  }, {
    key: "areaMaxima",
    value: function areaMaxima() {
      var _this173 = this;

      new JetSelect({
        element: ".search__max-area",
        name: "filtro.areatotalmaxima",
        optionsText: ["Até 100m²", "Até 200m²", "Até 300m²", "Até 400m²", "Até 500m²", "Até 600m²", "Até 700m²", "Até 800m²", "Até 900m²", "Até 1.000m²", "Até 2.000m²", "Até 3.000m²", "Até 4.000m²", "Até 5.000m²", "Até 10.000m²", "Até 20.000m²", "Até 30.000m²", "Até 40.000m²", "Até 50.000m²", "Até 100.000m²", "Acima de 100.000m²"],
        optionsValue: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1e3, 2e3, 3e3, 4e3, 5e3, 1e4, 2e4, 3e4, 4e4, 5e4, 1e5, 9999999999],
        deselectAll: "Limpar seleção",
        label: "Selecione",
        tags: !0,
        tagsTarget: ".list__tags",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this173).call(_this173);
        },
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this173).call(_this173);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this173).call(_this173);
        }
      });
    }
  }, {
    key: "mobiliado",
    value: function mobiliado() {
      var _this174 = this;

      new JetCheckbox({
        element: ".search__furnished",
        name: "filtro.mobiliado",
        optionsText: ["Mobiliado"],
        optionsValue: ["1"],
        tags: !0,
        tagsOnChange: !1,
        tagsTarget: ".list__tags",
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this174).call(_this174);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this174).call(_this174);
        }
      });
    }
  }, {
    key: "condominio",
    value: function condominio() {
      var _this175 = this;

      new JetCheckbox({
        element: ".search__condominium",
        name: "filtro.condominio",
        optionsText: ["Condomínio"],
        optionsValue: ["1"],
        tags: !0,
        tagsOnChange: !1,
        tagsTarget: ".list__tags",
        onClickTag: function onClickTag() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this175).call(_this175);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this175).call(_this175);
        }
      });
    }
  }, {
    key: "referencia",
    value: function referencia() {
      var _this176 = this;

      this.referenciaFilter = new JetInput({
        element: ".search__reference",
        name: "filtro.referencia",
        placeholder: "Digite a referência do imóvel",
        tags: !0,
        tagsTarget: ".list__tags",
        onClickTag: function onClickTag() {
          sessionStorage.setItem("filtro.tipodivulgacao", config.imovelpara), _get(_getPrototypeOf(Search.prototype), "search", _this176).call(_this176);
        },
        onKeyUp: function onKeyUp() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this176).call(_this176);
        },
        onPaste: function onPaste() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this176).call(_this176);
        },
        onEmpty: function onEmpty() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this176).call(_this176);
        }
      });
    }
  }, {
    key: "endereco",
    value: function endereco() {
      var _this177 = this;

      this.enderecoFilter = new JetInput({
        element: ".search__address",
        name: "filtro.endereco",
        placeholder: "Digite o nome da rua",
        tags: !0,
        tagsTarget: ".list__tags",
        onClickTag: function onClickTag() {
          sessionStorage.setItem("filtro.tipodivulgacao", config.imovelpara), _get(_getPrototypeOf(Search.prototype), "search", _this177).call(_this177);
        },
        onKeyUp: function onKeyUp() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this177).call(_this177);
        },
        onPaste: function onPaste() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this177).call(_this177);
        },
        onEmpty: function onEmpty() {
          return _get(_getPrototypeOf(Search.prototype), "createPath", _this177).call(_this177);
        }
      });
    }
  }, {
    key: "ordenar",
    value: function ordenar() {
      var _this178 = this;

      new JetSelect({
        element: ".list__order",
        name: ["ordenacao", "ascdesc"],
        optionsText: ["Maior preço", "Menor preço", "Maior área total", "Menor área total"],
        optionsValue: [["imovelvalor", "desc"], ["imovelvalor", "asc"], ["imovelareatotal", "desc"], ["imovelareatotal", "asc"]],
        deselectAll: "Limpar seleção",
        label: "Selecione",
        onDeselectAll: function onDeselectAll() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this178).call(_this178);
        },
        onChange: function onChange() {
          return _get(_getPrototypeOf(Search.prototype), "search", _this178).call(_this178);
        }
      });
    }
  }, {
    key: "filters",
    value: function filters(e) {
      this.imovelpara(), this.tipoimovel(e.searchtipoimoveis), this.valorMinimo(), this.valorMaximo(), this.cidade(e.searchcidades), this.bairro(e.searchbairros), this.regiao(e.searchregioescidades), this.quarto(), this.garagem(), this.areaMinima(), this.areaMaxima(), this.mobiliado(), this.condominio(), this.referencia(), this.endereco(), this.ordenar();
    }
  }, {
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(Search.prototype), "createFilters", this).call(this, this.filters.bind(this)), _get(_getPrototypeOf(Search.prototype), "createPath", this).call(this);
    }
  }]);

  return Search;
}(Filters);