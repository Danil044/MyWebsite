import axios from "axios";
import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Link, useLocation} from "react-router-dom";
import {Context} from "../../context/Context";
import {Button, Card, Container} from "react-bootstrap";
import dateFormat from "dateformat";
import {axiosInstance} from "../../config";

const SinglePost = observer(() => {
    const PF = "http://localhost:4000/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const { user } = useContext(Context);

    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [positional, setPositional] = useState("");
    const [salary, setSalary] = useState(0);
    const [text, setText] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [categories, setCategories] = useState('')

    const [updateMode, setUpdateMode] = useState(false);

    const [cats, setCats] = useState([]);
    useEffect(() => {
        const getCats = async () => {
            const res = await axiosInstance.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, []);


    useEffect(() => {
        const getPost = async () => {
            const res = await axiosInstance.get("/posts/" + path);
            setPost(res.data);
            setSalary(res.data.salary);
            setText(res.data.text);
            setPhone(res.data.phone);
            setEmail(res.data.email);
            setDate(res.data.date);
            setCountry(res.data.country);
            setCity(res.data.city);
            setTitle(res.data.title);
            setPositional(res.data.positional);
            setCategories(res.data.categories)
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/posts/${post._id}`, {
                data: { userId: user._id},
            });
            window.location.replace("/main");
        } catch (err) {
            console.log(err)
        }
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/posts/${post._id}`, {
                username: user.username,
                salary,
                text,
                phone,
                email,
                date,
                country,
                city,
                categories
            });
            setUpdateMode(false)
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card className="text-center" style={{width: '45rem', height: 540, marginTop: 88, borderRadius: 20, background: "linear-gradient(to top left, #999966 0%, #669999 100%)", border: "2px solid black", overflow: "scroll", overflowX: "hidden"}}>
                <div>
                    <div className="mt-3 text-center" style={{display: "inline-block"}}>
                        <div>
                            <h3 className="text-dark">Photo</h3>
                        </div>
                        <div>
                            {post.photo && (
                                <img width={150} height={150} src={PF + post.photo} alt=""/>
                            )}
                        </div>
                    </div>
                    <div className="text-black" style={{display: "inline-block", marginLeft: 80, width: 350}}>
                        {updateMode ? (
                                <div style={{textAlign: "left"}}>
                                    <div style={{textAlign: "center"}}><b className="text-dark">Name post:</b> {title}</div>
                                    <div style={{textAlign: "center",marginLeft: 10}}><b className="text-dark">Positional:</b> {positional}</div>
                                    <div style={{textAlign: "center"}}><b className="text-dark">Salary:</b>  <input
                                        type="number"
                                        value={salary}
                                        autoFocus
                                        onChange={(e) => setSalary(Number(e.target.value))}
                                        className="text-black"
                                        style={{width: 100, borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)"}}
                                    />$</div>
                                    <p style={{textAlign: "center", marginTop: 15}}><b className="text-dark">Author:</b> {post.username}</p>
                                </div>
                        ) : (
                            <div style={{textAlign: "left"}}>
                                <div style={{textAlign: "center"}}><b className="text-dark">Name post:</b> {title}</div>
                                <div style={{textAlign: "center", marginLeft: 10}}><b className="text-dark">Positional:</b> {positional}</div>
                                <div style={{textAlign: "center"}}><b className="text-dark">Salary:</b> {salary}$</div>
                                <p style={{textAlign: "center", marginTop: 15}}><b className="text-dark">Author:</b> {post.username}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{textAlign: "left", marginLeft: 60}} className="mt-3 text-white-50">
                    {updateMode ? (
                            <div>
                                <p><b className="text-dark">Text: </b> <input
                                    type="text"
                                    value={text}
                                    autoFocus
                                    onChange={(e) => setText(e.target.value)}
                                    className="text-black"
                                    style={{width: 553 , borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)"}}
                                /></p>
                                <p><b className="text-dark">Relevance date: </b> <input
                                    type="date"
                                    value={date}
                                    autoFocus
                                    onChange={(e) => setDate(e.target.value)}
                                    className="text-black"
                                    style={{width: 470 , borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)"}}
                                /></p>
                                <p><b className="text-dark" style={{display: "inline-block"}}>Type profession: </b>
                                    <select className="form-select text-black" aria-label="Default select example" value={categories} style={{display: "inline-block", marginLeft: 10, width: 460, borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)"}} onChange={e => setCategories(e.target.value)}>
                                        <option selected className="text-light">Select type</option>
                                        {cats.map(c =>
                                            <option value={c.name} key={c.id}>
                                                {c.name}
                                            </option>
                                        )}
                                    </select>
                                </p>
                                <div style={{display: "inline-block"}}><b className="text-dark">Mail:</b> <input
                                    type="text"
                                    value={email}
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-black"
                                    style={{width: 100, borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)" }}
                                /></div>
                                <div style={{display: "inline-block", marginLeft: 10}}><b className="text-dark">Phone:</b> <input
                                    type="text"
                                    value={phone}
                                    autoFocus
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="text-black"
                                    style={{width: 100, borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)" }}
                                /></div>
                            </div>
                    )
                        :(
                            <div>
                                <div >
                                    <p style={{display: "inline-block"}}><b className="text-dark">Text:</b> <div className="text-black" style={{display: "inline-block", overflow: "scroll", overflowX: "hidden", width: 600, height: 32, paddingTop: 12}}>{text}</div></p>
                                </div>
                                <div className="text-black">
                                    <p><b className="text-dark">Relevance date: </b> { dateFormat(date, 'dd.mm.yyyy')}</p>
                                    <p><b className="text-dark">Type profession: </b>
                                        {categories}
                                    </p>
                                    <div style={{display: "inline-block"}}><b className="text-dark">Mail:</b> {email}</div>
                                    <div style={{display: "inline-block", marginLeft: 10}}><b className="text-dark">Phone:</b> {phone}</div>
                                </div>
                            </div>
                        )}
                </div>
                <div style={{textAlign: "left", marginLeft: 60}} className="mt-3 text-black">
                    {updateMode ?(
                        <div>
                            <div style={{display: "inline-block"}}><b className="text-dark">Country:</b>  <input
                                type="text"
                                value={country}
                                autoFocus
                                onChange={(e) => setCountry(e.target.value)}
                                className="text-black"
                                style={{width: 100 , borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)"}}
                            /></div>
                            <div style={{display: "inline-block", marginLeft: 10}}><b className="text-dark">City:</b>  <input
                                type="text"
                                value={city}
                                autoFocus
                                onChange={(e) => setCity(e.target.value)}
                                className="text-black"
                                style={{width: 100 , borderRadius: 5, backgroundColor: "rgb(0, 0, 0, 0)"}}
                            /></div>
                        </div>
                    )
                        :(
                            <div>
                                <div style={{display: "inline-block"}}><b className="text-dark">Country:</b> {country}</div>
                                <div style={{display: "inline-block", marginLeft: 10}}><b className="text-dark">City:</b> {city}</div>
                            </div>
                        )
                    }
                </div>
                <hr style={{height: 3, marginTop: 30}}/>
                {updateMode ?

                    <div>
                        <div>
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
                    <div className="mt-1">
                        <div>
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
            </Card>
        </Container>
    );
});

export default SinglePost;