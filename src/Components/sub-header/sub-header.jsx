import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { usePokedex } from "../../context/Context";




const SubHeader = (props) => {
    const {routeKey, setRouteKey,gameStyle, setGameStyle} = usePokedex()

    return (
        
    <div className="container-fluid p-1 d-flex align-items-center justify-content-center navbar bg-body-tertiary p-0">
        <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => {setGameStyle(!gameStyle)}}></input>
                    <h6 class="form-check-label" for="flexSwitchCheckDefault">Game Style!</h6>
                </div>
    </div>

    )
}

export default SubHeader