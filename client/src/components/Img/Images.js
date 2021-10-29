import React from 'react'
import './img.css'
//props.imgArray
export default function Images({ imgArray, clickFunction }) {
    return (
        <div className="parent">
            {imgArray.map((src) => (
                <img onClick={() => clickFunction(src)} src={src} />
            ))}
        </div>
    )
}
