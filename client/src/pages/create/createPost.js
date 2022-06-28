import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../../component/models/CreateType"
import CreatePost from "../../component/models/CreatePost"
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../../context/Context";
import "../../css/ButtonAdd.css"


const createPost = observer(() => {
    const {user} = useContext(Context)


    const [typeVisible, setTypeVisible] = useState(false)
    const [postsVisible, setPostsVisible] = useState(false)

    return (
        <>{user.role === "ADMIN"?
            <Container className="d-flex flex-column" style={{marginTop: 120}}>
                <div>
                    <div style={{display: "inline-block" , marginLeft: "9%"}}>
                        <div className="rotate-shadowsButton1">
                            <button onClick={() => setTypeVisible(true)} className='btn btn-outline-light' style={{width: 380, height: 380, borderRadius: "50%", marginLeft: -185, marginTop: 11, position: "absolute", zIndex:1}}><b className="text-dark">Add new type professional</b></button>
                            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
                        </div>
                    </div>
                    <div style={{display: "inline-block" , marginLeft: "9%"}}>
                            <div className="rotate-shadowsButton2">
                                <button onClick={() => setPostsVisible(true)} className='btn btn-outline-light' style={{width: 380, height: 380, borderRadius: "50%", marginLeft: -185, marginTop: 11, position: "absolute", zIndex:1}}><b className="text-dark">Add new post</b></button>
                                <CreatePost show={postsVisible} onHide={() => setPostsVisible(false)}/>
                            </div>
                    </div>
                </div>

            </Container>
            :
            <Container className="d-flex flex-column" style={{marginTop: 120, textAlign:"center"}}>
                <div className="DivBodyFonButton">
                    <div className="rotate-shadowsButton">
                        <button onClick={() => setPostsVisible(true)} className='btn btn-outline-light' style={{width: 400, height: 400, borderRadius: "50%", marginLeft: -200, marginTop: 7, position: "absolute", zIndex:1}}><b className="text-dark">Add new post</b></button>
                        <CreatePost show={postsVisible} onHide={() => setPostsVisible(false)}/>
                    </div>
                </div>

            </Container>
        }</>

    );
});

export default createPost;