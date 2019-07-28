import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async ({ blog, user }) => {
  try {
    const headersConfig = { headers : { Authorization : 'bearer ' + user.token }}
    const response = await axios.post(baseUrl, blog, headersConfig)
    return response
  } catch (exception) {
    return { error : exception.message }
  }
}

export default { getAll, createNew }