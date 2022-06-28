import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import dateFormat from "dateformat";


const PostsId = ({show, onHide, posts}) => {

    return (
        <Modal show={show} onHide={onHide} animation={false} centered>
            <Modal.Header closeButton>
                <h3>{posts.title}</h3>
            </Modal.Header>
            <Modal.Header>
                <div className="text-black-80"><b className="text-dark">Profession:</b> {posts.positional}</div>
                <div className="text-black-80"><b className="text-dark">Salary</b> {posts.salary}$</div>
            </Modal.Header>

            <Modal.Body>
                <h4 className="mt-2">All about...</h4>
                <div>
                    <div className="text-black-80" style={{display: "inline-block", width: 460, paddingTop: 12, wordWrap: "break-word", marginBottom: 35}}>
                        <b className="text-dark">Requirement:</b>  {posts.text}
                    </div>
                    <div  className="text-black-80" style={{position: "absolute", bottom: 0, right: 15}}>
                        <p><b className="text-dark">Relents to :</b> { dateFormat(posts.date, 'dd.mm.yyyy')}</p>
                    </div>
                </div>
            </Modal.Body>

            <hr/>

            <Modal.Body >
                <div style={{textAlign:"center"}} className="mb-3">
                    <div className="text-black-80"><b className="text-dark">Name employers:</b> {posts.username}</div>
                    <div className="text-black-80"><b className="text-dark">Phone:</b> {posts.phone}</div>
                    <div className="text-black-80"><b className="text-dark">Email:</b> {posts.email}</div>
                </div>
            </Modal.Body>


        </Modal>
    );
}

export default PostsId;