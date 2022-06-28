import React from 'react';
import SinglePost from "../../component/single/SinglePost";
import {observer} from "mobx-react-lite";

const SPost = observer(() => {
    return (
        <div>
            <SinglePost/>
        </div>
    );
});

export default SPost;