import axios from 'axios'

const basePath = '/api/users'

const getAll = async () => {
  const response = await axios.get(basePath)
  return response.data
}

const getUser = async ({ id }) => {
  const response = await axios.get(`${basePath}/${id}`)
  return response.data
}

export default { getAll, getUser }