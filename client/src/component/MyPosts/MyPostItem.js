import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {useState} from "react";
import {useContext} from "react";
import {Context} from "../../context/Context";
import '../../css/MyPostList.css';


const MyPostsItems = ({post}) => {
    const {user} = useContext(Context)

    const PF = "http://localhost:4000/images/";
    const [postsIdVisible, setPostsIdVisible] = useState(false)

    const click = async () => {
        setPostsIdVisible(true)
    }

    return (
        < >
            {
                user.role === "ADMIN" ?
                        <div style={{marginTop: "2.2rem", height: "32rem"}}>
                            <Card style={{ width: '16rem', height: "32rem", background: "linear-gradient(to top left, #999966 0%, #669999 100%)", border: "2px solid black"}}>
                                {post.photo && (
                                    <img width={252} height={240} src={PF + post.photo} alt=""/>
                                )}
                                <Card.Body>
                                    <Card.Title><h2 className="text-dark" style={{display: "inline-block", overflow: "scroll", overflowX: "hidden", width: 230, height: 70, paddingTop: 12}}>{post.title}</h2></Card.Title>
                                    <Card.Text className="text-black" style={{display: "inline-block", overflow: "scroll", overflowX: "hidden", width: 230, height: 100, paddingTop: 12}}>
                                        {post.text}
                                    </Card.Text>
                                </Card.Body>
                                <hr style={{marginBottom: 35, height: 3}}/>
                                <a href={`/post/${post._id}`} className="text-dark" style={{textDecoration: "none",marginBottom: 8, marginLeft: 10, color: "black", position: "absolute", bottom: 0}}>
                                    <span >CREATE</span>
                                </a>
                            </Card>
                        </div>
                :
                (
                    user._id === post.userId ?
                        <div style={{marginTop: "2.2rem", height: "32rem"}}>
                            <Card style={{ width: '16rem', height: "32rem", background: "linear-gradient(to top left, #999966 0%, #669999 100%)", border: "2px solid black"}}>
                                {post.photo && (
                                    <img width={252} height={240} src={PF + post.photo} alt=""/>
                                )}
                                <Card.Body>
                                    <Card.Title><h2 className="text-dark" style={{display: "inline-block", overflow: "scroll", overflowX: "hidden", width: 230, height: 70, paddingTop: 12}}>{post.title}</h2></Card.Title>
                                    <Card.Text className="text-black" style={{display: "inline-block", overflow: "scroll", overflowX: "hidden", width: 230, height: 100, paddingTop: 12}}>
                                        {post.text}
                                    </Card.Text>
                                </Card.Body>
                                <hr style={{marginBottom: 35, height: 3}}/>
                                <a href={`/post/${post._id}`} className="text-dark" style={{textDecoration: "none",marginBottom: 8, marginLeft: 10, color: "black", position: "absolute", bottom: 0}}>
                                    <span >CREATE</span>
                                </a>
                            </Card>
                        </div>
                        :
                        <></>
                )
            }

        </>
    );
};

export default MyPostsItems;