import bcrypt from 'bcryptjs'
import connectDB from '../../../db/connection'
import User from '../../../db/user'

/**
 * takes a post request with an email and password in the body
 * returns the user object on success
 * returns an object containing an error message on failure
 */
const loginHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (email && password) {
      var user = await User.findOne({ email })
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(201).send(user)
      } else {
        res.status(401).send({ error: 'The email or password was incorrect' })
      }
    } else {
      res.status(422).send({ error: 'An email and password are required' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default connectDB(loginHandler)
