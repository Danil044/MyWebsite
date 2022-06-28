import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../context/Context";
import axios from "axios";
import "../../css/RegisterAndLogin.css"
import {axiosInstance} from "../../config";

const Login = observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailErr, setEmailErr] = useState('Неправельнная почта')
    const [passwordErr, setPasswordErr] = useState('Поле не должно быть пустым')

    const [formValid, setFormValid] = useState(false)

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        if(!emailCheck.test(String(e.target.value).toLowerCase())){
            setEmailErr("Неправельнная почта")
        }else {
            setEmailErr('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(!e.target.value){
            setPasswordErr("Поле не должно быть пустым")
        }
        else {
            setPasswordErr('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    useEffect(() =>{
        if(emailErr || passwordErr){
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    }, [emailErr, passwordErr])

    const {user, dispatch, isFetching} = useContext(Context)

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try{
            const res = await axiosInstance.post("/auth/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})

        }catch (err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center "
                   style={{height: window.innerHeight - 45, overflow: "hidden"}}
        >
            <Card className="p-5 bg-dark DivRegAndLog" style={{borderRadius: 10, width: 600, height: 400}}>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <h1 style={{textAlign: "center"}} className="text-dark">Login</h1>
                    <div style={{marginTop: 40}}>
                        {(emailDirty && emailErr) &&
                            <div className=" align-items-center bg-danger text-white bg-primary border-2 DivErr">
                                {emailErr}
                            </div>}
                        <Form.Control
                            onChange={e => emailHandler(e)}
                            value={email}
                            name="email"
                            onBlur={e => blurHandler(e)}
                            ref={emailRef}

                            className="text-black-50"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="mt-3">
                        {(passwordErr && passwordDirty) &&
                            <div className="align-items-center bg-danger text-white bg-primary border-0 DivErr">
                                {passwordErr}
                            </div>}
                        <Form.Control
                            onChange={e => passwordHandler(e)}
                            value={password}
                            name="password"
                            onBlur={e => blurHandler(e)}
                            ref={passwordRef}

                            className="text-black-50"
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>

                    <Row>
                            <button className="btn btn-outline-dark" variant={"outline-dark"} type="submit" disabled={isFetching} style={{width: "94%", marginLeft: 14, marginTop: 50}}>
                                Come in
                            </button>
                    </Row>
                </Form>
                <div className='light x1'></div>
                <div className='light x2'></div>
                <div className='light x3'></div>
                <div className='light x4'></div>
                <div className='light x5'></div>
                <div className='light x6'></div>
                <div className='light x7'></div>
                <div className='light x8'></div>
                <div className='light x9'></div>
            </Card>
        </Container>
    );
});

export default Login;