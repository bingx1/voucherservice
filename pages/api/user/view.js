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
        res.status(401).send('An account with that email does not exist')
      }
    } else {
      res.status(422).send({ error: 'All required fields must be filled' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default connectDB(viewHandler)
