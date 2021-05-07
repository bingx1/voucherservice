import connectDB from '../../../db/connection'
import User from '../../../db/user'

/**
 * takes a PATCH request with user information (both personal and biller) in the body
 * returns the user object on success
 * returns an object containing an error message on failure
 */
const editHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    const {
      firstName,
      lastName,
      contact,
      currentEmail,
      newEmail,
      billerName,
      billerEmail
    } = req.body
    if (firstName && lastName && contact && currentEmail && newEmail && billerName && billerEmail) {
      var newEmailAlreadyTaken = await User.findOne({ email: newEmail })

      if (currentEmail !== newEmail && newEmailAlreadyTaken) {
        res.status(401).send({ error: 'An account with this email already exists' })
      } else {
        var user = await User.findOneAndUpdate(
          { email: currentEmail },
          { firstName, lastName, contact, email: newEmail, billerName, billerEmail }
        )
        res.status(201).send(user)
      }
    } else {
      res.status(422).send('All fields must be filled')
    }
  } else {
    res.status(422).send('Request method not supported')
  }
}

export default connectDB(editHandler)
