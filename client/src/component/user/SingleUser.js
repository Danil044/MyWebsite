import React from 'react';
import {observer} from "mobx-react-lite";
import {Card, Container} from "react-bootstrap";
import dateFormat from "dateformat";
import {useContext} from "react";
import {Context} from "../../context/Context";
import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import {axiosInstance} from "../../config";

const SingleUser = observer(() => {
    const {user, dispatch} = useContext(Context)
    const path = location.pathname.split("/")[2];

    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')


    useEffect(() => {
        const getUser = async () => {
            const res = await axiosInstance.get("/user/" + path);
            setEmail(res.data.email);
            setRole(res.data.role);
        };
        getUser();
    }, [path]);

    const [updateMode, setUpdateMode] = useState(false);

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/user/${user._id}`, {
                name: user.name,
                lastname: user.lastname,
                email,
                role
            });
            dispatch({type: "UPDATE_START"})
            dispatch({type: "LOGOUT"})
            window.location.replace("/")
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/user/${user._id}`, {
                data: { userId: user._id},

            });
            dispatch({type: "UPDATE_START"})
            dispatch({type: "LOGOUT"})
            window.location.replace("/")
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card className="bg-dark text-center DivRegAndLog" style={{width: '45rem', marginTop: 170, height: 360, borderRadius: 20}}>
                <div>
                    <h2 className="text-dark" style={{marginTop: 35}}>{user.name + " " + user.lastname}</h2>
                </div>

                <div style={{textAlign: "left", marginLeft: 25, marginTop: 30}}>
                    {updateMode?
                        <div style={{marginTop: 15, fontSize: 18}}>
                            <p><b className="text-dark">Mail: </b> <input
                                type="text"
                                value={email}
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-black-50"
                                style={{marginLeft: 10, width:620, borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)"}}
                            /></p>
                            <div className="d-md-flex justify-content-start align-items-center mt-3 py-2" >

                                <h6 className="mb-0 me-4 text-dark">Who are you: </h6>

                                <div className="form-check form-check-inline mb-0 me-4 text-black" >
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                           id="femaleGender"
                                           value={"USER"} onChange={(e) => setRole(e.target.value)} autoFocus/>
                                    <label className="form-check-label" htmlFor="femaleGender" title="only search ads" >USER</label>
                                </div>

                                <div className="form-check form-check-inline mb-0 me-4 text-black" >
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                           id="maleGender"
                                           value={"EMPLOYER"} onChange={(e) => setRole(e.target.value)} autoFocus/>
                                    <label className="form-check-label" htmlFor="maleGender" title="allows you to add ads">EMPLOYER</label>
                                </div>
                            </div>
                        </div>
                        :
                        <div style={{fontSize: 18}}>
                            <p className="text-black"><b className="text-dark">Mail: </b>  {email}</p>
                            <p className="text-black"><b className="text-dark">Password: </b>  [password secret]</p>
                            <p className="text-black"><b className="text-dark">Role: </b>  {role}</p>
                        </div>
                    }
                </div>


                <div>
                    {updateMode ?
                        <div >
                            <hr style={{marginTop: 45, height: 3}}/>

                            <div  style={{marginTop: 23}}>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={handleUpdate}
                                >UPDATE</button>
                                <button
                                    className="btn btn-outline-dark"
                                    style={{marginLeft: 30}}
                                    onClick={() => window.location.reload()}
                                >BACK</button>
                            </div>
                        </div>
                        :
                        <div>
                            <hr style={{height: 3, marginTop: 25}}/>

                            <div className="mt-4">
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => setUpdateMode(true)}
                                >UPDATE</button>
                                <button
                                    className="btn btn-outline-dark"
                                    style={{marginLeft: 30}}
                                    onClick={handleDelete}
                                >DELETE</button>
                            </div>
                        </div>
                    }
                </div>
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

export default SingleUser;