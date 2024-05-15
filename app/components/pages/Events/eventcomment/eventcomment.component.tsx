import React, { ReactNode } from "react";
import { EventComment } from "../../../../models/shared.models";
import "./eventcomment.styles.scss"

export class EventCommentComponent extends React.Component<EventComment> {
    private _id : number;
    private _content: string;
    private _creator: string;
    private _created: Date;

    constructor(props: EventComment) {
        super(props);
        
        this._id = props.id;
        this._content = props.content;
        this._creator = props.creator;
        this._created = new Date(props.created);
    }

    render() {
        return (
            <>
                <div className="comment">
                    <div className="author">{this._creator}</div> 
                    <div className="date">{this._created.toLocaleDateString()}</div>
                    <div className="text">{this._content}</div>
                </div>
            </>
        )
    }
}