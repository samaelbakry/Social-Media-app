import * as zod from "zod"

export const registerSchema = zod.object({
    name: zod.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(10, "Name must be at most 10 characters"),
    email: zod.email("Please enter a valid email address"),
    password: zod.string().nonempty("password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters"),
    rePassword: zod.string().nonempty("rePassword is required"),
    gender:zod.string().nonempty("gender is required").transform((gender) => gender === "m" ? "male" : "female"),
    dateOfBirth: zod.string().refine( (date)=> {
        const currentYear = new Date().getFullYear()
        const userDate = new Date(date).getFullYear()
        const userAge = currentYear - userDate 
        return userAge >= 18
    } , {error : "Age must fall within the allowed range (18–60)"})
}).refine( (data) => data.rePassword === data.password , { path: ["rePassword"] , error : "Password confirmation does not match"}) //object level validation//


export const loginSchema = zod.object({
    email: zod.email("Please enter a valid email address"),
    password: zod.string().nonempty("password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters"),
})