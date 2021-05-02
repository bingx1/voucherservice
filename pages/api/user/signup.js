import connectDB from '../../../db/connection'
import User from '../../../db/user'

/**
 * takes a post request with an email and password in the body
 * returns the user object on success
 * returns an object containing an error message on failure
 */
const signupHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, contact, email, password } = req.body
    if (firstName && lastName && contact && email && password) {
      try {
        var user = await User.create({ firstName, lastName, contact, email, password })
        res.status(201).send(user)
      } catch (error) {
        if (error.code == 11000) {
          res.status(401).send({ error: 'An account with this email already exists' })
        }
      }
    } else {
      res.status(422).send({ error: 'All required fields must be filled' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default connectDB(signupHandler)
