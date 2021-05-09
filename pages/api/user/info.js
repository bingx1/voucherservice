import { getSession } from 'next-auth/client'
import '../../../db/connection'
import User from '../../../db/user'

const infoHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).send({ message: 'Incorrect or outdated session' })
    return
  }

  const sessionEmail = session.user.email

  var user = await User.findOne({ email: sessionEmail })

  if (user) {
    if (req.method === 'POST') {
      const { firstName, lastName, contact, email, invoiceName, billEmail } = req.body

      if (firstName && lastName && contact && email && invoiceName && billEmail) {
        const emailAlreadyExists = await User.findOne({ email })

        if (emailAlreadyExists && email.trim() !== sessionEmail.trim()) {
          res.status(401).send({
            error: 'An account with this email already exists. Please use another email address.'
          })
          return
        }

        user.firstName = firstName
        user.lastName = lastName
        user.contact = contact
        user.invoiceName = invoiceName
        user.billEmail = billEmail
        await user.save()
      } else {
        res.status(401).send({
          error: 'All information fields must be filled.'
        })
        return
      }
    }
    res.status(201).send(user)
  } else {
    res.status(401).send({ error: 'Error retrieving/updating user information.' })
  }
}

export default infoHandler
