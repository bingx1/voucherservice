import '../../../db/connection'
import Service from '../../../db/service'

const getAllServicesHandler = async (req, res) => {
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
