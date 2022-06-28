import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal, NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../context/Context";
import axios from "axios";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {axiosInstance} from "../../config";


const CreatePost = observer(({show, onHide}) => {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axiosInstance.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, []);

    const [title, setTitle] = useState('')
    const [titleDirty, setTitleDirty] = useState(false)
    const [titleErr, setTitleErr] = useState('Empty')

    const [positional, setPositional] = useState('')
    const [positionalDirty, setPositionalDirty] = useState(false)
    const [positionalErr, setPositionalErr] = useState('Empty')

    const [salary, setSalary] = useState(0)
    const [salaryDirty, setSalaryDirty] = useState(false)
    const [salaryErr, setSalaryErr] = useState("Empty")

    const [text, setText] = useState('')
    const [textDirty, setTextDirty] = useState(false)
    const [textErr, setTextErr] = useState('Empty')

    const [phone, setPhone] = useState('')
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [phoneErr, setPhoneErr] = useState('Empty')

    const [date, setDate] = useState('')
    const [dateDirty, setDateDirty] = useState(false)
    const [dateErr, setDateErr] = useState('Empty')

    const [country, setCountry] = useState('')
    const [countryDirty, setCountryDirty] = useState(false)
    const [countryErr, setCountryErr] = useState('Empty')

    const [city, setCity] = useState('')
    const [cityDirty, setCityDirty] = useState(false)
    const [cityErr, setCityErr] = useState('Empty')

    const [categories, setCategories] = useState('')
    const [categoriesDirty, setCategoriesDirty] = useState(false)
    const [categoriesErr, setCategoriesErr] = useState('Empty')

    const [file, setFile] = useState(null)
    const [fileDirty, setFileDirty] = useState(false)
    const [fileErr, setFileErr] = useState('Empty')

    const { user } = useContext(Context);

    const [formValid, setFormValid] = useState(false)


    const titleHandler = (e) => {
        setTitle(e.target.value)
        if(!e.target.value){
            setTitleErr("Empty")
        }
        else {
            setTitleErr('')
        }
    }

    const positionalHandler = (e) => {
        setPositional(e.target.value)
        if(!e.target.value){
            setPositionalErr("Empty")
        }
        else {
            setPositionalErr('')
        }
    }

    const salaryHandler = (e) => {
        setSalary(e.target.value)
        if(!e.target.value){
            setSalaryErr("Empty")
        }
        else {
            setSalaryErr('')
        }
    }

    const textHandler = (e) => {
        setText(e.target.value)
        if(!e.target.value){
            setTextErr("Empty")
        }
        else {
            setTextErr('')
        }
    }

    const dateHandler = (e) => {
        setDate(e.target.value)
        if(!e.target.value){
            setDateErr("Empty")
        }
        else {
            setDateErr('')
        }
    }

    const countryHandler = (e) => {
        setCountry(e.target.value)
        if(!e.target.value){
            setCountryErr("Empty")
        }
        else {
            setCountryErr('')
        }
    }

    const cityHandler = (e) => {
        setCity(e.target.value)
        if(!e.target.value){
            setCityErr("Empty")
        }
        else {
            setCityErr('')
        }
    }

    const fileHandler = (e) => {
        setFile(e.target.files[0])
        if(!e.target.value){
            setFileErr("Empty")
        }
        else {
            setFileErr('')
        }
    }

    const blurHandler = (e) =>{
        switch (e.target.name){
            case 'title':
                setTitleDirty(true)
                break
            case 'positional':
                setPositionalDirty(true)
                break
            case 'salary':
                setSalaryDirty(true)
                break
            case 'text':
                setTextDirty(true)
                break
            case 'date':
                setSalaryDirty(true)
                break
            case 'country':
                setCountryDirty(true)
                break
            case 'city':
                setCityDirty(true)
                break
            case 'categories':
                setCategoriesDirty(true)
                break
            case 'file':
                setFileDirty(true)
                break;
        }
    }

    useEffect(() =>{
        if(salaryErr || titleErr || textErr || dateErr || countryErr || cityErr || positionalErr || fileErr ){
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    }, [salaryErr, titleErr, textErr, dateErr, countryErr, cityErr, positionalErr, fileErr])

    const handleSubmit = async (e) => {
        console.log("Est")
        e.preventDefault();
        const newPost = {
            username: user.lastname + " " + user.name,
            userId: user._id,
            title,
            positional,
            salary,
            text,
            phone,
            email: user.email,
            date,
            country,
            city,
            categories
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axiosInstance.post("/upload", data);
            } catch (err) {
                console.log(err)
            }
        }
        try {
            const res = await axiosInstance.post("/posts", newPost);
            window.location.replace("/main");
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Modal  show={show} onHide={onHide} animation={false}>
            <Modal.Header closeButton >
                <Modal.Title>Add posts <b className="text-black-50 fs-6">(Fill in all the fields)</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <select className="form-select" aria-label="Default select example" style={{width: "100%"}} value={categories} onChange={e => setCategories(e.target.value)}>
                        <option selected>Select type</option>
                        {cats.map(c =>
                            <option name="categories" onBlur={e=>blurHandler(e)} value={c.name} key={c.id}>
                                {c.name}
                            </option>
                        )}
                    </select>
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-outline">
                                    {(titleDirty && titleErr) &&
                                        <div>
                                        </div>}
                                    <Form.Control
                                        name="title"
                                        className="mt-3"
                                        value={title}
                                        onChange={e => titleHandler(e)}
                                        onBlur={e => blurHandler(e)}
                                        placeholder="Enter title"
                                        maxlength="30"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                {(positionalDirty && positionalErr) &&
                                    <div>
                                    </div>}
                                <Form.Control
                                    name="positional"
                                    className="mt-3"
                                    value={positional}
                                    onChange={e => positionalHandler(e)}
                                    onBlur={e=>blurHandler(e)}
                                    placeholder="Enter positional"
                                    maxlength="30"
                                />
                            </div>
                        </div>
                    </div>
                    {(salaryDirty && salaryErr) &&
                        <div>
                        </div>}
                    <Form.Control
                        name="salary"
                        value={salary}
                        onChange={e => salaryHandler(e)}
                        onBlur={e=> blurHandler(e)}
                        className="mt-3"
                        title="salary to dollars"
                        type="number"
                        maxlength="15"
                    />
                    {(textDirty && textErr) &&
                        <div>
                        </div>}
                    <Form.Control
                        name="text"
                        value={text}
                        onChange={e => textHandler(e)}
                        onBlur={e=>blurHandler(e)}
                        className="mt-3 "
                        placeholder="Enter description"
                        maxlength="350"
                    />
                    <div>
                        <div className="row">
                            <div className="form-outline mt-3">
                                <PhoneInput
                                    type="text"
                                    className="form-control"
                                    defaultCountry="UA"
                                    international
                                    value={phone}
                                    name="Enter phone"
                                    onChange={setPhone}
                                />
                            </div>
                        </div>
                    </div>
                    {(fileDirty && fileErr) &&
                        <div>
                        </div>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter photo"
                        name="file"
                        type="file"
                        id="fileInput"
                        multiple accept="image/*"
                        onBlur={e=>blurHandler(e)}
                        onChange={(e) => fileHandler(e)}
                    />
                    {(dateDirty && dateErr) &&
                        <div>
                        </div>}
                    <Form.Control
                        name="date"
                        value={date}
                        onChange={e => dateHandler(e)}
                        onBlur={e=>blurHandler(e)}
                        className="mt-3"
                        placeholder="Дата"
                        type="date"
                    />
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-outline">
                                    {(countryDirty && countryErr) &&
                                        <div>
                                        </div>}
                                    <Form.Control
                                        name="country"
                                        className="mt-3"
                                        value={country}
                                        onChange={e => countryHandler(e)}
                                        onBlur={e=>blurHandler(e)}
                                        title="Enter right country(write English)"
                                        placeholder="Enter country(write English)"
                                        maxlength="35"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                {(cityDirty && cityErr) &&
                                    <div>
                                    </div>}
                                <Form.Control
                                    name="city"
                                    className="mt-3"
                                    value={city}
                                    onChange={e => cityHandler(e)}
                                    onBlur={e=>blurHandler(e)}
                                    title="Enter right city(write English)"
                                    placeholder="Enter city(write English)"
                                    maxlength="35"
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-dark" disabled={!formValid}  onClick={handleSubmit} type="submit" style={{width: "100%"}}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePost;