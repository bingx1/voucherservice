import '../../../db/connection'
import User from '../../../db/user'

const getUserByIdHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { id } = req.body

    if (id) {
      try {
        var user = await User.findById(id)
        res.status(201).send(user)
      } catch (error) {
        res.status(401).send({ error: 'Error retrieving all users' })
      }
    } else {
      res.status(422).send({ error: 'User ID must be non-empty' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default getUserByIdHandler
