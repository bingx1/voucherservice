import bcrypt from 'bcrypt'
import connectDB from '../../../db/connection'
import Admin from '../../../db/admin'

/**
 * takes a POST request with an email and password in the body
 * returns the admin object on success
 * returns an object containing an error message on failure
 */
const loginHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (email && password) {
      var admin = await Admin.findOne({ email })
      if (admin && bcrypt.compareSync(password, admin.password)) {
        res.status(201).send(admin)
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
