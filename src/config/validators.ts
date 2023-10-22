
export class Validators {

    static get email() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    }

    static get validate_string() {
        return /^[a-zA-Z]$/;
    }
}