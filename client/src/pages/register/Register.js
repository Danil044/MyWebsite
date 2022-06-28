import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import {useHistory, useLocation} from "react-router-dom"
import {observer} from "mobx-react-lite";
import axios from "axios";
import "../../css/RegisterAndLogin.css"
import {axiosInstance} from "../../config";

const Register = observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailErr, setEmailErr] = useState('Wrong mail')
    const [passwordErr, setPasswordErr] = useState('The field must not be empty')

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [lastnameDirty, setLastnameDirty] = useState(false)
    const [nameErr, setNameErr] = useState('The field must not be empty')
    const [lastnameErr, setLastnameErr] = useState('The field must not be empty')

    const [role, setRole] = useState('')
    const [check, setCheck] = useState('')
    const [checkErr, setCheckErr] = useState('Error')
    const [checkDirty, setCheckDirty] = useState(false)

    const [formValid, setFormValid] = useState(false)

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        if(!emailCheck.test(String(e.target.value).toLowerCase())){
            setEmailErr("Wrong mail")
        }else {
            setEmailErr('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(!e.target.value){
            setPasswordErr("The field must not be empty")
        }
        else {
            setPasswordErr('')
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        if(!e.target.value){
            setNameErr("The field must not be empty")
        }
        else {
            setNameErr('')
        }
    }

    const lastnameHandler = (e) => {
        setLastname(e.target.value)
        if(!e.target.value){
            setLastnameErr("The field must not be empty")
        }
        else {
            setLastnameErr('')
        }
    }

    const checkHandler = (e) => {
        setCheck(e.target.checked)
        if(!e.target.checked){
            setCheckErr("Error")
        }
        else {
            setCheckErr('')
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
            case 'name':
                setNameDirty(true)
                break
            case 'lastname':
                setLastnameDirty(true)
                break
            case 'check':
                setCheckDirty(true)
                break
        }
    }

    useEffect(() =>{
        if(emailErr || passwordErr || lastnameErr || nameErr || checkErr){
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    }, [emailErr, passwordErr, lastnameErr, nameErr, checkErr])

    const handelSubmit = async (e) =>{
        e.preventDefault()
        try {
            const res = await axiosInstance.post("/auth/register",{
                email,
                password,
                name,
                lastname,
                role
            })
            res.data && window.location.replace("/login")
            console.log(res);
        }catch (err){
            console.log(err)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{marginTop: 90, overflow: "hidden"}}
        >
            <Card className="p-5 bg-dark DivRegAndLog" style={{borderRadius: 10, height: 530, width: 600}}>
                <Form className="d-flex flex-column" onSubmit={handelSubmit}>
                    <h2 style={{textAlign: "center"}} className="text-dark">Registration</h2>
                    <div className="mt-4">
                        {(emailDirty && emailErr) &&
                            <div className="bg-danger text-white bg-primary border-2 DivErr">
                                {emailErr}
                            </div>}
                        <Form.Control
                            onChange={e => emailHandler(e)}
                            value={email}
                            name="email"
                            title="This email, will be using to contact you"
                            onBlur={e => blurHandler(e)}

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

                            className="text-black-50"
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>
                    <div>
                            <div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-outline mt-3">
                                            {(nameDirty && nameErr) &&
                                                <div className=" align-items-center bg-danger text-white bg-primary border-2 DivErr">
                                                    {nameErr}
                                                </div>}
                                            <Form.Control
                                                className="text-black-50"
                                                value={name}
                                                onChange={e => nameHandler(e)}
                                                onBlur={e => blurHandler(e)}

                                                name="name"
                                                placeholder="Enter name"
                                                maxlength="25"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        {(lastnameDirty && lastnameErr) &&
                                            <div className=" align-items-center bg-danger text-white bg-primary border-2 DivErr">
                                                {lastnameErr}
                                            </div>}
                                        <Form.Control
                                            className="text-black-50"
                                            value={lastname}
                                            onChange={e => lastnameHandler(e)}
                                            onBlur={e => blurHandler(e)}

                                            name="lastname"
                                            placeholder="Enter surname"
                                            maxlength="25"
                                        />
                                    </div>
                                </div>
                                <div className="d-md-flex justify-content-start align-items-center mt-3 py-2" style={{marginLeft: 80}}>

                                    <h5 className="mb-0 me-4 text-dark">Who are you: </h5>

                                    <div className="form-check form-check-inline mb-0 me-4 text-black" >
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                               id="femaleGender"
                                               value={"USER"} onChange={e => setRole(e.target.value)}/>
                                        <label className="form-check-label" htmlFor="femaleGender" title="only search ads">USER</label>
                                    </div>

                                    <div className="form-check form-check-inline mb-0 me-4 text-black" >
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                               id="maleGender"
                                               value={"EMPLOYER"} onChange={e => setRole(e.target.value)}/>
                                        <label className="form-check-label" htmlFor="maleGender" title="allows you to add ads">EMPLOYER</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="custom-control custom-checkbox text-dark mt-2">
                                        {(checkDirty && checkErr) && <div style={{color: "red", marginTop: 2}}>{checkErr}</div>}
                                        <div style={{display: "inline-block"}}>
                                            <Form.Check value={check} name="check" onChange={e => checkHandler(e)} aria-label="option 1" />
                                        </div>
                                        <div style={{display: "inline-block", marginLeft: 10}}>
                                            <label className="custom-control-label" htmlFor="defaultIndeterminate"><b>Confirm that you agree to provide your data</b></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="text-dark" style={{textAlign: "center", marginTop: 12, fontSize: 18}}>
                        <NavLink href="/login" className="text-dark" title="if have account"><h5>Login</h5></NavLink>
                    </div>
                    <Row>
                        <button disabled={!formValid} className="btn btn-outline-dark mt-2" type="submit" variant={"outline-dark"}>
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

export default Register;