



class EmptyFieldError extends Error {
    constructor (message) {
        super(message);
        this.name="EmptyFieldError";
    }
}

module.exports = EmptyFieldError;