import { checkSchema } from 'express-validator'

const signupValidator = checkSchema({
    firstname: {
        exists: {
            errorMessage: 'First name is required!',
            bail: true,
        },
        notEmpty: {
            errorMessage: 'First name cannot be empty',
            bail: true,
        },
    },
    lastname: {
        exists: {
            errorMessage: 'Last name is required!',
            bail: true,
        },
        notEmpty: {
            errorMessage: 'Last name cannot be empty',
            bail: true,
        },
    },
    email: {
        exists: {
            errorMessage: 'Email is required!',
            bail: true,
        },
        isEmail: {
            errorMessage: 'Invalid email!',
            bail: true,
        },
        trim: true,
    },
    password: {
        isStrongPassword: {
            errorMessage: 'Weak password',
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            },
        },
    },
})

export default {
    signupValidator,
}
