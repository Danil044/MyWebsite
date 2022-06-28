import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {useState} from "react";
import dateFormat from "dateformat";
import PostId from "./models/PostId";
import "../css/PostItem.css"
import {observer} from "mobx-react-lite";

const PostsItems = observer(({post, countries, cites, categories}) => {

    const PF = "http://localhost:4000/images/";
    const [postsIdVisible, setPostsIdVisible] = useState(false)

    const click = async () => {
        setPostsIdVisible(true)
    }

    return (
        <>
            {countries==="" || cites==="" || categories===""?
                <div className="BodyCard" >
                    <Card className="mt-4 Card" >
                        <div >
                            <div className="DivPhoto">
                                {post.photo && (
                                    <img width={150} height={173} src={ PF + post.photo } alt="" className="Photo"/>
                                )}
                            </div>
                            <div className="DivBody" style={{display: "inline-block", marginLeft: 15}} >
                                <div className="bg-dark text-light DivFooter">
                                    <div>
                                        <div className="align-items-center" style={{display: "inline-block"}}>
                                            <h3 className="BodyH3" onClick={click}>{post.title}</h3>
                                        </div>
                                        <div className="BodyDivSalary" style={{display: "inline-block", marginLeft: 10}}>
                                            <p>salary <b className="text-white-50">{post.salary}$</b></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="DivBodyInfo">
                                    <div className="DivBodyInfo1 text-white" >
                                        <b>Profession</b> {post.positional}
                                    </div>
                                    <div className="DivBodyInfo2 text-white">
                                        <div><b>Country:</b> {post.country} <b>City:</b> {post.city}</div>
                                        <div><b>Relevance:</b> { dateFormat(post.date, 'dd.mm.yyyy')}</div>
                                    </div>
                                </div>
                                <div>
                                    <PostId posts={post} show={postsIdVisible} onHide={() => setPostsIdVisible(false)}/>
                                </div>
                            </div>
                        </div>

                    </Card>
                </div>
                :
                (
                    (post.country === countries && post.city === cites && post.categories === categories) ?
                        (<div className="BodyCard" >
                            <Card className="mt-4 Card" >
                                <div >
                                    <div className="DivPhoto">
                                        {post.photo && (
                                            <img width={150} height={173} src={ PF + post.photo } alt="" className="Photo"/>
                                        )}
                                    </div>
                                    <div className="DivBody" style={{display: "inline-block", marginLeft: 15}} >
                                        <div className="bg-dark text-light DivFooter">
                                            <div>
                                                <div className="align-items-center" style={{display: "inline-block"}}>
                                                    <h3 className="BodyH3" onClick={click}>{post.title}</h3>
                                                </div>
                                                <div className="BodyDivSalary" style={{display: "inline-block", marginLeft: 10}}>
                                                    <p>salary <b className="text-white-50">{post.salary}$</b></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="DivBodyInfo">
                                            <div className="DivBodyInfo1 text-white" >
                                                <b>Profession</b> {post.positional}
                                            </div>
                                            <div className="DivBodyInfo2 text-white">
                                                <div><b>Country:</b> {post.country} <b>City:</b> {post.city}</div>
                                                <div><b>Relevance:</b> { dateFormat(post.date, 'dd.mm.yyyy')}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <PostId posts={post} show={postsIdVisible} onHide={() => setPostsIdVisible(false)}/>
                                        </div>
                                    </div>
                                </div>

                            </Card>
                        </div>)
                        :
                        <div></div>
                )
            }
        </>

    );
});

export default PostsItems;