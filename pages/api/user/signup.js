import connectDB from '../../../db/connection'
import User from '../../../db/user'

/**
 * takes a post request with an email and password in the body
 * returns the user object on success
 * returns an object containing an error message on failure
 */
const signupHandler = async (req, res) => {
    if (req.method === 'POST') {
        const {email, password} = req.body
        if (email && password) {
            try {
                var user = new User({email, password})
                await user.save()
                res.status(201).send(user)
            } catch (error) {
                if (error.code === 11000) {
                    res.status(401).send({error: 'this email already exists'})
                }
            }
        } else {
            res.status(422).send({error: 'an email and password are required'})
        }
    } else {
        res.status(422).send({error: 'request method not supported'})
    }
}

export default connectDB(signupHandler)