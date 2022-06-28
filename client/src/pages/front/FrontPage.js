import React from 'react';
import "../../css/FrontFon.css"
import {useContext} from "react";
import {Context} from "../../context/Context";

const FrontPage = () => {
    const PF = "http://localhost:4000/WebsiteImg/";

    const {dispatch, isFetching} = useContext(Context)

    const logOut = async () => {
        dispatch({type: "LOGOUT"})
        window.location.replace("/main")
        console.log(isFetching)
    }

    return (
        <div className="DivFonFront" style={{textAlign:"center"}}>
            <div>
                <div className="Body">
                    <div className="DivBodyFon">
                        <div className="rotate-shadows"></div>
                    </div>
                </div>
                <button onClick={() => logOut()}  className='btn  btn-outline-dark DivBut'>Search job to begin</button>
            </div>
            <div className='light x1'></div>
            <div className='light x2'></div>
            <div className='light x3'></div>
            <div className='light x4'></div>
            <div className='light x5'></div>
            <div className='light x6'></div>
            <div className='light x7'></div>
            <div className='light x8'></div>
            <div className='light x9'></div>
        </div>

    );
};

export default FrontPage;