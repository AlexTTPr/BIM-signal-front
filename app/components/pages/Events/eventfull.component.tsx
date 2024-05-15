import React from "react";
import { CommonRequest } from "../../../services/httpservices/httpservice";
import { format } from "date-fns";
import {
ClockCircleOutlined,
UserOutlined,
TeamOutlined,
AreaChartOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import LocationOutlined from "../../shared/Icons/locationOutlined.component";
import UserGroupOutlined from "../../shared/Icons/UserGroupOutlined.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import "./eventpage.style.scss";
import { Spin } from "antd";
import { EventComment } from "../../../models/shared.models";
import { EventCommentComponent } from "./eventcomment/eventcomment.component";

type EventFullState = {
	event: EventFull;
	isLoading: boolean;
	imageURL: string;
	isCommentsExist: boolean;
	comments: EventComment[]
};

type EventFull = {
	id: number;
	category: {
		id: number;
		name: string;
	};
	title: string;
	description: string;
	creator: string;
	speaker: string;
	location: string;
	created: Date;
	startDate: Date;
	seats: number | string;
	eventImage: string;
};

export class EventFullComponent extends React.Component {
	state: EventFullState;
	private _httpservice: CommonRequest;
	private eventId: string;
	private imageURL: string;

	constructor(props: any) {
		super(undefined);
		this._httpservice = new CommonRequest();
		this.eventId = window.location.pathname.split("/events/")[1];

		this.getComments = this.getComments.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.renderComments = this.renderComments.bind(this);
		this.existing = this.existing.bind(this);
		
	}

	componentDidMount(): void {
		this._httpservice.get(`/api/v1/events/${this.eventId}`).then((data) => {
			this.setState({
				event: data.data,
				comments: []
			});
			this.imageURL = `http://mtdtesting.ru/files/events/${data.data.eventImage}`;
		}).then(() => {
			this.getComments();
		});
	}


	getComments(filter?: string) {
		this._httpservice.get(`/api/v1/events/${this.eventId}/comments?offset=0&count=25`)
		.then((data) => {
			if (data.code == 404) {
				this.setState((ps) => {
					return Object.assign(ps, {
						isCommentsExist: false,
						isLoading: false 
					})
				});
			}
			else {
				this.setState((ps) => {
					return Object.assign(ps, {
						isCommentsExist: data.data.length > 0,
						isLoading: false,
						comments: data.data
					})
				});
			}
		})
	}

	renderComments() {
		const state = this.state;
		return (
			<>
				{state && state.comments.map((c : EventComment) => {
					return (<EventCommentComponent id={c.id} content={c.content} creator={c.creator} created={c.created}/>)
				})}
			</>
		)
	}

	existing() {
		const state = this.state;
        if (state) {
            state.isLoading = false;
            if (!state.isCommentsExist) {
                return (
					<div className="doesnt-exist">Комментариев нет</div>
				);
            }
        }
	}

	render() {
		const state = this.state;
		return (
			<div>
				<NavbarComponent/>
				
				{state != null ? (<>
					<div className="event-full-page">
						<div className="content-wrapper">
							<div className="event-image">
								<img src={this.imageURL} />
							</div>

							<h1>{state && state.event.title}</h1>
							<div>{state && state.event.description}</div>
							<div className="comments">
								<h4>Комментарии</h4>
								<Spin spinning={state && state.isLoading} size="large" style={{width:"100%", height: "64px"}}/>
								<this.existing />
								<this.renderComments />
							</div>
						</div>
					</div>
				</>) : (<Spin spinning={true}/>)}

				<div className="event-sidebar">
        <div className="event-about">
              <div className="about-string event-date">
                <LocationOutlined />
                {state && state.event.location}
              </div>
              <div className="event-date">
                <ClockCircleOutlined />
                {state &&
                  format(state.event.startDate, "dd.MM.yyyy HH:mm").toString()}
              </div>
              <div className="about-string event-date">
                {<UserOutlined /> && state && state.event.speaker}
              </div>
              <div className="about-string event-date ">
                <UserGroupOutlined />
                {state && state.event.seats}
              </div>
				</div>
			</div>
      </div>
		);
	}
}
