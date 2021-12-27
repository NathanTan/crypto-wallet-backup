import fileUploadBody from "./fileUploadBody"

class SecurityManager {

    // Members
    private user: String
    private key: String
    errorKey = "ERROR"

    constructor() {
        this.user = process.env.SERVER_NAME ?? this.errorKey
        this.key = process.env.PASSWORD ?? this.errorKey
        console.log("this.user: " + this.user)
        console.log("this.key: " + this.key)
    }

    validateRequest(request: Request): Boolean {
        console.log("Validating request")

        const body = request.body as unknown as fileUploadBody
        if (!body) return false
        return (body.pass == this.key && body.user == this.user)
    }
}

export default SecurityManager