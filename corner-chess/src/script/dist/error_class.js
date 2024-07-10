"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.NetworkError = exports.TokenError = exports.DisplayError = exports.CriticalError = exports.EventError = exports.BoardError = void 0;
var BoardError = /** @class */ (function (_super) {
    __extends(BoardError, _super);
    function BoardError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'Board error';
        return _this;
    }
    return BoardError;
}(Error));
exports.BoardError = BoardError;
var EventError = /** @class */ (function (_super) {
    __extends(EventError, _super);
    function EventError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'Event error';
        return _this;
    }
    return EventError;
}(Error));
exports.EventError = EventError;
var CriticalError = /** @class */ (function (_super) {
    __extends(CriticalError, _super);
    function CriticalError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'Critical error';
        return _this;
    }
    return CriticalError;
}(Error));
exports.CriticalError = CriticalError;
var DisplayError = /** @class */ (function (_super) {
    __extends(DisplayError, _super);
    function DisplayError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'Display error';
        return _this;
    }
    return DisplayError;
}(Error));
exports.DisplayError = DisplayError;
var TokenError = /** @class */ (function (_super) {
    __extends(TokenError, _super);
    function TokenError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'Token error';
        return _this;
    }
    return TokenError;
}(Error));
exports.TokenError = TokenError;
var NetworkError = /** @class */ (function (_super) {
    __extends(NetworkError, _super);
    function NetworkError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'Network error';
        return _this;
    }
    return NetworkError;
}(Error));
exports.NetworkError = NetworkError;
