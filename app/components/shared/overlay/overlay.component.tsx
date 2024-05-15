import React, { Children } from "react";
import { Overlay } from "../../../models/shared.models";
import "./overlay.style.scss";

import { CloseOutlined } from "@ant-design/icons";

type OverlayState = {
    isOpen: boolean;
}

export class OverlayComponent extends React.Component{
    state : OverlayState;
    children: React.ReactNode

    constructor(props : Overlay) {
        super(props);
        this.state = { isOpen: true };
        this.children = props.children;
        this.onClickClose = this.onClickClose.bind(this);
        this.render = this.render.bind(this);
    }

    onClickClose() {
        this.setState({ isOpen: false })
    }

    render(){
        const state = this.state;
        return (
            <>
                { state.isOpen ? (
                    <div className="overlay">
                        <div>
                            <CloseOutlined onClick={this.onClickClose}/>
                            {this.children}
                        </div>
                    </div>
                ) : null}
            </>
        )
    }
}