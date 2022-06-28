import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import PostList from "../../component/PostList";
import {useLocation} from "react-router-dom";
import {axiosInstance} from "../../config";

const Main = observer(() => {
    const [posts, setPosts] = useState([])
    const {search} = useLocation()

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res = await axiosInstance.get("/posts" + search)
            setPosts(res.data)
        }
        fetchPosts()
    }, [])

    return (
        <Container>
            <Row className="mt-2">
                <Col >
                    <PostList posts={posts}/>
                </Col>
            </Row>
        </Container>
    );
});

export default Main;