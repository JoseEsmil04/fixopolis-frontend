import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const fixopolisApi = axios.create({
	baseURL: `${BASE_URL}/api/v1`
})

export { fixopolisApi }
