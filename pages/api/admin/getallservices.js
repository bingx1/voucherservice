import Service from '../../../db/service'
import { getToken } from 'next-auth/jwt'

const getAllServicesHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.SECRET })
  if (!token || !token.isAdmin) {
    res.status(401).send({error: 'Admin access only'})
    return
  }
  if (req.method === 'GET') {
    try {
      var services = await Service.find({})
      // console.log(services)
      res.status(201).send(services)
    } catch (error) {
      res.status(401).send({ error: 'Error retrieving all services' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default getAllServicesHandler
