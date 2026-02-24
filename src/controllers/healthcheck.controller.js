import { ApiResponse } from '../utils/api-response.js'
import { asyncHandler } from '../utils/async-handler.js'

/*
This is the traditional way of writing with try catch block
we can avoid this by writing async-handler in utils
const healthCheck = (req, res) => {
  try {
    res.status(200).json(new ApiResponse(200, { message: 'Server is healthy and running' }))
  } catch (error) {
    console.error(error)
  }
}
 */

//Below is the example of async-handler

const healthCheck = asyncHandler((req, res) => {
  res.status(200).json(new ApiResponse(200, { message: 'server is running' }))
})

export { healthCheck }
