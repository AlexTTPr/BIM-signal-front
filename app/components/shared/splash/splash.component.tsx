import React from "react";
import { Splash } from "../../../models/shared.models";
import "./splash.style.scss";
import { Empty } from "antd";

export class SplashComponent extends React.Component<Splash>{
    private _text = "Splash";
    private _image = "";
    private w = "100%";
    private h = "100%";

    constructor(props: Splash) {
        super(props);
        this._text = props.text;
        this._image = props.image;
        this.w = props.width;
        this.h = props.height;
    }

    render(){
        return (
            <>
                <div className="splash">
                    <img src={`app\\media\\${this._image}.png`}></img>
                    <label>{this._text}</label>
                </div>
            </>
        );
    }
}