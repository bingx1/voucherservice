import '../../../db/connection'
import Service from '../../../db/service'

const getServiceByIdHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { id } = req.body

    if (id) {
      try {
        var service = await Service.findById(id)
        // console.log(services)
        res.status(201).send(service)
      } catch (error) {
        res.status(401).send({ error: 'Error retrieving all services' })
      }
    } else {
      res.status(422).send({ error: 'Service ID must be non-empty' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default getServiceByIdHandler
