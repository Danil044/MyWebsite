import React from 'react';
import MyPostItem from "./MyPostItem"
import {Row} from "react-bootstrap";
import '../../css/MyPostList.css';
import {observer} from "mobx-react-lite";


const MyPostList = observer(({posts}) => {
    return (
        <Row style={{marginTop: 55}}>
            <div>
                <div className="UlLiDiv">
                    {posts.map((p)=>(
                        <div className="UlLiDivB"><MyPostItem post={p}/></div>
                    ))}
                </div>
            </div>
        </Row>
    );
});

export default MyPostList;