import * as zod from "zod"

export const passwordSchema = zod.object({
    password: zod.string().nonempty("password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters"),
    newPassword: zod.string().nonempty("password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters")
   
})
