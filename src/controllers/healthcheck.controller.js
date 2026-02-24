import { ApiResponse } from '../utils/api-response.js'

const healthCheck = (req, res) => {
  try {
    res.status(200).json(new ApiResponse(200, { message: 'Server is healthy and running' }))
  } catch (error) {
    console.error(error)
  }
}

export { healthCheck }
