class SecurityManager {

    // Members
    private user: String
    private key: String
    errorKey = "ERROR"

    constructor() {
        console.log("username ~~~~~~~")
        console.log(process.env.SERVER_NAME)
        this.user = process.env.SERVER_NAME ?? this.errorKey
        this.key = process.env.PASSWORD ?? this.errorKey
    }

    validateRequest(request: Request): Boolean {
        console.log("Validating request")
        console.log(request.body)
        // if (this.pass === this.errorKey || this.pass === this.errorKey) return false
    
        const body = request.body

        //@ts-ignore
        console.log("Trying to validate")
        //@ts-ignore
        console.log(body["pass"])
        console.log(this.key)
        //@ts-ignore
        console.log((body.key === this.pass))
        //@ts-ignore
        return (body.key === this.pass)
        // &&
          ///  request.header.get("key") === this.key)
    }
}

export default SecurityManager