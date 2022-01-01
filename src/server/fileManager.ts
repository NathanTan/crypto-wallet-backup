import fs from 'fs'

class FileManager {
    constructor() {
        this.createDir(`${__dirname}/store/`)
    }
    
    uploadFile(req: any, res: any) {
        if (req.files) {
            const file = req.files.file
            const fileName = file.name
            const filePath = `${__dirname}/store/${fileName}`
            console.log(`Saving file to ${filePath}`)
            file.mv(filePath, (err: any) => {
                if (err) {
                    console.log(err)
                    // status.error = true
                    // status.message = err + " " + filePath + " " + getFormattedTime()
                    res.send('There is error')
                } else {
                    res.send(`Successful upload at ${this.getFormattedTime()}`)
                }
            })
        } else {
            res.send('There are no files')
        }

    }

    private createDir(dir: string) {
        try {
            // first check if directory already exists
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                console.log("Directory is created.");
            } else {
                console.log("Directory already exists.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    private getFormattedTime() {
        const date_ob = new Date(Date.now())
        const date = date_ob.getDate()
        const month = date_ob.getMonth() + 1
        const year = date_ob.getFullYear()
    
        // prints date & time in YYYY-MM-DD format
        return (year + "-" + month + "-" + date);
    }
}

export default FileManager