import React, {useContext} from 'react';
import {Redirect, Route, Router, Switch, useHistory} from "react-router-dom";
import Main from "../../pages/home/Main";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import {Context} from "../../context/Context";
import CreatePost from "../../pages/create/createPost"
import Single from "../../pages/single/Single";
import SPost from "../../pages/singlePost/SPost";
import FrontPage from "../../pages/front/FrontPage";
import SUser from "../../pages/user/SUser";
import NavBarFront from "../NavBarFront";

const AppRouter = () => {
    const history = useHistory()
    const { user } = useContext(Context);

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <NavBarFront/>
                    <FrontPage/>
                </Route>
                <Route exact path="/main">
                    <Main />
                </Route>
                <Route exact path="/post">
                    <Single/>
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    {user?<Main/>:<Login />}
                </Route>
                <Route path="/create">
                    <CreatePost />
                </Route>
                <Route path="/post/:postId">
                    <SPost/>
                </Route>
                <Route path="/user/:userId">
                    <SUser/>
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;