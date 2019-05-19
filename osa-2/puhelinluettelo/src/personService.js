import axios from 'axios'

const getAllPersons = () => axios.get('http://localhost:3001/persons').then(response => response.data)

const addPerson = (data) => axios.post('http://localhost:3001/persons', data).then(response => response.data)

export { getAllPersons, addPerson }