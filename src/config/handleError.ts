import { Response } from "express"
import { CustomError } from "./custom.error"

export const handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
        if (error.data == undefined) {
            return res.status(error.statuscode).json({ codError:error.statuscode,message:error.message })
        } else {
            return res.status(error.statuscode).json({ codError:error.statuscode, message:error.message, resp:error.data })
        }
    }

    return res.status(500).json({error:"Internal Server Error"})
}