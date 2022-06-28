import './css/App.css';
import NavBar from "./component/NavBar";
import {observer} from "mobx-react-lite";
import FooterBar from "./component/FooterBar";
import {BrowserRouter, useLocation} from "react-router-dom";
import AppRouter from "./component/router/AppRouter";
import {useEffect, useState} from "react";
import axios from "axios";
import {axiosInstance} from "./config";

const App = observer(() =>{
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        const fetchCategories = async ()=>{
            const res = await axiosInstance.get("/categories")
            setCategories(res.data)
        }
        fetchCategories()
    }, [])

    return (
        <BrowserRouter>
            <NavBar categories={categories}/>
            <AppRouter/>
            <FooterBar/>
        </BrowserRouter>
    );
})

export default App;
