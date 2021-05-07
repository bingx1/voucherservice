import connectDB from '../../../db/connection'
import User from '../../../db/user'

/**
 * takes a POST request with an email in the body
 * returns the user object on success
 * returns an object containing an error message on failure
 */
const viewHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body
    if (email) {
      var user = await User.findOne({ email })
      if (user) {
        res.status(201).send(user)
      } else {
        res.status(401).send('User does not exist')
      }
    }
  }
}

export default connectDB(viewHandler)
