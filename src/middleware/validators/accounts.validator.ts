import { checkSchema } from 'express-validator'

const createAccountValidator = checkSchema({
    bvn: {
        exists: {
            errorMessage: 'BVN is required!',
            bail: true,
        },
        notEmpty: {
            errorMessage: 'BVN cannot be empty',
            bail: true,
        },
        isLength: {
            errorMessage: 'BVN must be exactly 11 digits number',
            options: {
                max: 11,
                min: 11,
            },
        },
        isNumeric: {
            errorMessage: 'Numeric error',
        },
    },
    accountType: {
        exists: {
            errorMessage: 'Account type is required!',
            bail: true,
        },
        in: 'body',
        matches: {
            options: [/\b(?:CURRENT|SAVINGS)\b/],
            errorMessage: 'Account type must be a valid enum(CURRENT, SAVINGS)',
        },
    },
})

export default {
    createAccountValidator,
}
