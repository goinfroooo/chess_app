export class BoardError extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'Board error';
    }
}

export class EventError extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'Event error';
    }
}

export class CriticalError extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'Critical error';
    }
}

export class DisplayError extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'Display error';
    }
}

export class TokenError extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'Token error';
    }
}

export class NetworkError extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'Network error';
    }
}
