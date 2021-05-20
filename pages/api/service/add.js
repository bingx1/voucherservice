import Service from '../../../db/service'
import { getToken } from 'next-auth/jwt'

const addServiceHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token || !token.isAdmin) {
    res.status(401).send({ error: 'Admin access only.' })
    return
  }
  if (req.method === 'POST') {
    const { name } = req.body
    console.log('adding a service:', name)
    if (name) {
      try {
        var service = new Service({
          name
        })
        await service.save()
        res.status(201).send(service)
      } catch (error) {
        res.status(401).send({ error: 'This service already exists.' })
      }
    } else {
      res.status(422).send({ error: 'Field must be filled.' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported.' })
  }
}

export default addServiceHandler
