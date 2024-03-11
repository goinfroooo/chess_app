"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCookie = exports.setCookie = exports.IfExistCookie = exports.getCsrfToken = exports.AskCsrfToken = void 0;

var _config = _interopRequireDefault(require("@/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AskCsrfToken = function AskCsrfToken() {
  return regeneratorRuntime.async(function AskCsrfToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(_config["default"].backendConfig.apiUrl + '/csrf-token', {
            method: 'GET'
          }).then(function (response) {
            return response.json();
          }) // Si le script PHP renvoie du JSON
          .then(function (data) {
            console.log(data.csrf_token);
            setCookie("X-CSRF-TOKEN", data.csrf_token, 30);
          })["catch"](function (error) {
            console.error("Le backend ne renvoit pas de token csrf");
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Fonction pour récupérer le jeton CSRF depuis les cookies de session


exports.AskCsrfToken = AskCsrfToken;

var getCsrfToken = function getCsrfToken() {
  var csrfCookie = document.cookie.match(/X-CSRF-TOKEN=([^;]+)/);

  if (csrfCookie) {
    return decodeURIComponent(csrfCookie[1]); // Décode le contenu du cookie si nécessaire
  }

  return null;
}; // Créer une instance Axios avec le jeton CSRF inclus dans les en-têtes


exports.getCsrfToken = getCsrfToken;

var IfExistCookie = function IfExistCookie(name) {
  var regex = new RegExp('(?:^|;\\s*)' + name + '=([^;]*)');
  var match = regex.exec(document.cookie);
  return match !== null;
};

exports.IfExistCookie = IfExistCookie;

var setCookie = function setCookie(name, value, daysToExpire) {
  var date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  var expires = "expires=" + date.toUTCString();
  var secure = "Secure";
  var sameSite = "SameSite=None"; // Pour autoriser le cookie dans toutes les requêtes transversales de site

  document.cookie = name + "=" + value + ";" + expires + ";path=/" + ";" + secure + ";" + sameSite;
};

exports.setCookie = setCookie;

var deleteCookie = function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
};

exports.deleteCookie = deleteCookie;