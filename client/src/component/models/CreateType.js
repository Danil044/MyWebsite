import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {axiosInstance} from "../../config";

const CreateType = ({show, onHide}) => {
    const [name, setName] = useState('')

    const handleSubmit = async (e) => {
        console.log("Est")
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/categories",{
                name
            })
            res.data && window.location.replace("/create")
            console.log(res);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Modal show={show} onHide={onHide} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Enter new type"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-dark" onClick={handleSubmit} type="submit" style={{width: "100%"}}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;