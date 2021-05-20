import Service from '../../../db/service'
import { getToken } from 'next-auth/jwt'

const removeServiceHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token || !token.isAdmin) {
    res.status(401).send({ error: 'Admin access only.' })
    return
  }
  if (req.method === 'DELETE') {
    const { name } = req.body
    // console.log('removing a service:', name)
    if (name) {
      try {
        var service = await Service.deleteOne({ name })
        res.status(201).send(service)
      } catch (error) {
        res.status(401).send({ error: 'This service does not exist.' })
      }
    } else {
      res.status(422).send({ error: 'Field must be filled.' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported.' })
  }
}

export default removeServiceHandler
