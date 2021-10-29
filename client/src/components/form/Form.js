import React,{useState} from "react";
import { Link } from "react-router-dom";
import css from '../form/Form.css'
export default function Form(props) {
 

    return (
        
        <div className="container">
        <h1>{props.text} </h1>
            <form method="POST" onSubmit={props.formFunc} autoComplete="off" > 
                <input onChange={props.inputFunc} placeholder="email" type="text" name="email" />
                <input onChange={props.inputFunc} placeholder="password" type="password" name="password"/>
              {props.hasPasswordConfirm && <input onChange={props.inputFunc} placeholder="repeatPassword" type="password" name="checkedPassword"/>  }
                 <button className="link" type="submit">{props.btnText}</button>
             </form>
             {props.loginPage ? <a > <Link to={'/login'}  >Do you have account?Sign in</Link></a>: <a > <Link to={'/register'}  >Don't you have account? Sign up</Link></a> }
        </div>
    )
}
