"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteCookie = exports.setCookie = exports.IfExistCookie = exports.getUserToken = exports.getCsrfToken = exports.AskCsrfToken = void 0;
var config_1 = require("@/config");
var error_class_1 = require("./error_class");
exports.AskCsrfToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(config_1["default"].backendConfig.apiUrl + '/csrf-token', {
                    method: 'GET'
                })
                    .then(function (response) { return response.json(); }) // Si le script PHP renvoie du JSON
                    .then(function (data) {
                    console.log(data.csrf_token);
                    exports.setCookie("X-CSRF-TOKEN", data.csrf_token, 30);
                })["catch"](function (error) {
                    console.error("Le backend ne renvoit pas de token csrf");
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Fonction pour récupérer le jeton CSRF depuis les cookies de session
exports.getCsrfToken = function () {
    var csrfCookie = document.cookie.match(/X-CSRF-TOKEN=([^;]+)/);
    if (csrfCookie) {
        return decodeURIComponent(csrfCookie[1]); // Décode le contenu du cookie si nécessaire
    }
    throw new error_class_1.TokenError("le cookie CSRF n'est pas présent");
};
exports.getUserToken = function () {
    var Cookie = document.cookie.match(/USER-TOKEN=([^;]+)/);
    if (Cookie) {
        return decodeURIComponent(Cookie[1]); // Décode le contenu du cookie si nécessaire
    }
    else {
        throw new error_class_1.TokenError("le cookie utilisateur n'est pas présent");
    }
    ;
};
// Créer une instance Axios avec le jeton CSRF inclus dans les en-têtes
exports.IfExistCookie = function (name) {
    var regex = new RegExp('(?:^|;\\s*)' + name + '=([^;]*)');
    var match = regex.exec(document.cookie);
    return match !== null;
};
exports.setCookie = function (name, value, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    var secure = "Secure";
    var sameSite = "SameSite=None"; // Pour autoriser le cookie dans toutes les requêtes transversales de site
    document.cookie = name + "=" + value + ";" + expires + ";path=/" + ";" + secure + ";" + sameSite;
};
exports.deleteCookie = function (name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
};
