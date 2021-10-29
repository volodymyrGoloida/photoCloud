import axios from 'axios'
const serverBaseUrl = 'http://localhost:5000'

export const signUser = (sign, dataForm) => {
    axios.post(`${serverBaseUrl}/auth/${sign}`, dataForm).then((res) => {
        const token = res.data?.token
        localStorage.setItem('x-auth-token', JSON.stringify(token))
    })
}

export const validateUser = (token) => {
    axios
        .get(`${serverBaseUrl}/auth/`, {
            headers: {
                'x-auth-token': token,
            },
        })
        .then((res) => {
            return res.data
        })
}
