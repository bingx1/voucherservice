import '../../../db/connection'
import Service from '../../../db/service'

const removeServiceHandler = async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.body

    if (id) {
      try {
        var service = await Service.findByIdAndDelete({ _id: id })
        res.status(201).send({ success: 'Service successfully removed' })
      } catch (error) {
        res.status(401).send({ error: 'Error while removing service' })
      }
    } else {
      res.status(401).send({ error: 'Must specify service to be removed' })
    }
  } else {
    res.status(422).send({ error: 'Request method not supported' })
  }
}

export default removeServiceHandler
