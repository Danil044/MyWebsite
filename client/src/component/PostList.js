import React from 'react';
import PostItem from "./PostItem"
import {Form, Row, Carousel} from "react-bootstrap";
import "../css/PostList.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {axiosInstance} from "../config";


const PostList = ({posts}) => {

    const [cats, setCats] = useState([]);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [category, setCategories] = useState('')

    useEffect(() => {
        const getCats = async () => {
            const res = await axiosInstance.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, []);

    return (
        <div>
            <div className="DivCardBlock">
                <div style={{marginTop: 90}}>
                    <h1 className="text-dark">Find by country and city</h1>
                    <div style={{marginLeft: 25, marginRight: 25, marginTop: 30}}>
                        <div className="row">
                            <div className="col-md-4" style={{marginTop: 16}}>
                                <select className="form-select text-black-50" aria-label="Default select example" style={{width: "100%"}} value={category} onChange={e => setCategories(e.target.value)}>
                                    <option selected>Select type</option>
                                    {cats.map(c =>
                                        <option name="categories" value={c.name} key={c.id}>
                                            {c.name}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <div className="form-outline">

                                    <Form.Control
                                        value={country}
                                        className="mt-3"
                                        onChange={e => setCountry(e.target.value)}
                                        placeholder="Enter country(English)"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">

                                <Form.Control
                                    value={city}
                                    className="mt-3"
                                    onChange={e => setCity(e.target.value)}
                                    placeholder="Enter city(English)"
                                />
                            </div>
                        </div>
                    </div>
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
            </div>

            <Row className="mt-3" style={{zIndex: 1}}>
                <div className="mb-4">
                    {posts.map((p)=>(
                        <PostItem post={p} countries={country} cites={city} categories={category}/>
                    ))}
                </div>
            </Row>
        </div>
    );
};

export default PostList;