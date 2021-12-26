class SecurityManager {

    // Members
    private pass: String
    private key: String
    errorKey = "ERROR"

    constructor() {
        this.pass = process.env.USERNAME ?? this.errorKey
        this.key = process.env.PASSWORD ?? this.errorKey
    }

    validateRequest(request: Request): Boolean {
        if (!request.headers) return false
        if (this.pass === this.errorKey || this.pass === this.errorKey) return false
        return (request.headers.get("pass") === this.pass &&
            request.headers.get("key") === this.key)
    }
}

export default SecurityManager