import React from "react";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import "./notfound.style.scss";

export class NotFoundPage extends React.Component{
    constructor(props: any) {
        super("");
    }


    render(){
        return(
            <>
            <NavbarComponent />
                <div className="not-found-page">
                   <span>404</span>
                   <span>Не найдено</span>
                </div>
            </>
        )
    }
}