import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Form from '../form/Form'

export default function Register() {
    const history = useHistory()
    const requestUrl = 'http://localhost:5000/auth/register'
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
        checkedPassword: '',
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
        console.log(dataForm)
        axios
            .post(requestUrl, dataForm)
            .then((response) => {
                localStorage.setItem(
                    'x-auth-token',
                    JSON.stringify(response.data.token)
                )
            })
            .then(() => history.push('/login'))
    }
    return (
        <div>
            <Form
                text="Register"
                formFunc={handleFormSubmit}
                inputFunc={handleInput}
                loginPage={true}
                hasPasswordConfirm={true}
                btnText="Register"
            />
        </div>
    )
}
