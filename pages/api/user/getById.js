import User from '../../../db/user'
import { getToken } from 'next-auth/jwt'

const getUserByIdHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token || !token.isAdmin) {
    res.status(401).send({ error: 'Admin access only.' })
    return
  }
  if (req.method === 'POST') {
    const { id } = req.body

    if (id) {
      try {
        var user = await User.findById(id)
        res.status(201).send(user)
      } catch (error) {
        res.status(401).send({ error: 'Error retrieving user by ID.' })
      }
    } else {
      res.status(422).send({ error: 'User ID must be non-empty.' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported.' })
  }
}

export default getUserByIdHandler
