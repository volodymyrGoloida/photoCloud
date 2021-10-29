import React, { useState } from 'react'
import Form from '../form/Form'
import { useHistory } from 'react-router-dom'

import axios from 'axios'
export default function Login() {
    const history = useHistory()
    const requestUrl = 'http://localhost:5000/auth/login'
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
    })

    function handleInput(event) {
        const { name, value } = event.target

        setDataForm((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        axios
            .post(requestUrl, dataForm)
            .then((response) => {
                localStorage.setItem(
                    'x-auth-token',
                    JSON.stringify(response.data.token)
                )
            })
            .then(() => history.push('/'))
    }
    return (
        <Form
            text="login"
            formFunc={handleFormSubmit}
            inputFunc={handleInput}
            btnText="Login"
        />
    )
}
