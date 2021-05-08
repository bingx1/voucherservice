import { getSession } from 'next-auth/client'
import '../../../db/connection'
import User from '../../../db/user'

const infoHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).send({ message: 'Incorrect or outdated session' })
    return
  }

  var user = await User.findOne({ email: session.user.email })

  if (user) {
    if (req.method === 'POST') {
      const { firstName, lastName, contact, invoiceName, billEmail } = req.body
      if (firstName) {
        user.firstName = firstName
      }
      if (lastName) {
        user.lastName = lastName
      }
      if (contact) {
        user.contact = contact
      }
      if (invoiceName) {
        user.invoiceName = invoiceName
      }
      if (billEmail) {
        user.billEmail = billEmail
      }
      await user.save()
    }
    res.status(201).send(user)
  } else {
    res.status(401).send({ error: 'Error retrieving/updating user information.' })
  }
}

export default infoHandler
