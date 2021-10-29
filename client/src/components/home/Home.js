import axios from 'axios'
import React, { useEffect, useState } from 'react'
import css from './Home.css'
import { useHistory } from 'react-router-dom'
import Images from '../Img/Images'
export default function Home() {
    const requestUrl = 'http://localhost:5000/photos/'
    const history = useHistory()
    const [imgUrl, setImgUrl] = useState('')
    const [imgArray, setImgArray] = useState([])
    let dataLocal = localStorage.getItem('x-auth-token')
    useEffect(async () => {
        if (dataLocal !== null) {
            const response = await axios.get(requestUrl, {
                headers: {
                    request: dataLocal,
                },
            })
            if (Array.isArray(response.data)) {
                console.log(response.data)
                setImgArray(response.data)
            }
        } else {
            history.push('/register')
        }
    }, [localStorage.getItem('x-auth-token')])
    function handleInput(event) {
        setImgUrl(event.target.value)
    }
    async function submitImg(event) {
        event.preventDefault()
        const res = await axios.post(requestUrl, { imgUrl, dataLocal })
        setImgArray(res.data)
        console.log(imgArray)
        setImgUrl('')
    }

    async function handleImgClick(src) {
        console.log(imgUrl)
        const response = await axios.delete(requestUrl, {
            headers: {
                'x-auth-token': dataLocal,
            },
            data: {
                imgUrl: src,
            },
        })
        console.log(response)
        setImgArray(response.data)
    }

    return (
        <div className="containerCenter">
            <h1>Вставте посилання на свою фотографію</h1>
            <form method="POST" onSubmit={submitImg}>
                <input
                    type="text"
                    onChange={handleInput}
                    name="imgURL"
                    autoComplete="off"
                    value={imgUrl}
                />
                <button type="submit">Відправити фото</button>
            </form>
            <Images imgArray={imgArray} clickFunction={handleImgClick} />
        </div>
    )
}
