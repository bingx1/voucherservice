import { getSession } from 'next-auth/client'
import '../../../db/connection'
import User from '../../../db/user'

const infoHandler = async (req, res) => {
  const session = await getSession({req})
  if (!session) {
    res.status(401).send({message: 'incorrect or outdated session'})
    return
  }
  if (req.method === 'POST') {
    console.log(req.body)
    const {firstName, lastName, contact, invoiceName, billEmail} = req.body
    var user = await User.findOne({email: session.user.email})
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
    res.status(201).send(user)
  } else if (req.method === 'GET') {
    user = await User.findOne({email: session.user.email})
    res.status(201).send(user)
  }
}

export default infoHandler
