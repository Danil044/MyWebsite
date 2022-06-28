import React from 'react';
import {observer} from "mobx-react-lite";
import SingleUser from "../../component/user/SingleUser";

const SUser = observer(() => {
    return (
        <div>
            <SingleUser/>
        </div>
    );
});

export default SUser;