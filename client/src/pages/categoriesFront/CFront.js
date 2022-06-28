import React from 'react';
import {useEffect} from "react";
import axios from "axios"
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {axiosInstance} from "../../config";
;

const CFront = observer(() => {
    const [categories, setCategories] = useState([])
    const {search} = useLocation()

    useEffect(()=>{
        const fetchCategories = async ()=>{
            const res = await axiosInstance.get("/categories" + search)
            setCategories(res.data)
        }
        fetchCategories()
    }, [])

    return (
        <div>
        </div>
    );
});

export default CFront;