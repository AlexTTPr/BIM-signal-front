import React from "react";
import { CommonRequest } from "../../../services/httpservices/httpservice";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { Typography } from "antd";

import "./business.style.scss";

type ArticleState = {
	articles: Article[];
};
type Article = {
	id: number;
	title: string;
	content: string;
	author: string;
	created: Date;
	expanded: boolean;
};
export class BusinessComponent extends React.Component {
	state: ArticleState;
	private _httpservice: CommonRequest;

	constructor(props: any) {
		super(null);
		this._httpservice = new CommonRequest();
		this.getArticles = this.getArticles.bind(this);
		this.renderArticles = this.renderArticles.bind(this);
	}

	componentDidMount(): void {
		this.setState({
			articles: [],
		});
	}
	getArticles() {
		const state = this.state;
		if (state) {
			this._httpservice.get(`/api/v1/news`).then((data) => {
				this.setState({
					articles: data.data,
				});
			});
		}
	}
	renderArticles() {
		this.getArticles();
		if (this.state == undefined) return <></>;
		const state = this.state;
		return (
			<div className="business-wrapper">
				<div className="business-title">
					<h2>Новости из мира бизнеса</h2>
				</div>
				{this.state.articles.map((item) => (
					<div className="business-item" key={item.id}>
						<div className="item-header">
							<span>{item.title}</span>
							<span style={{ marginLeft: "auto" }}>{item.author}</span>
						</div>
						<div className="item-content">
							<Typography.Paragraph
								style={{ maxWidth: "900px" }}
								ellipsis={{
									rows: 3,
									expandable: "collapsible",
									expanded: item.expanded,
									symbol(expanded) {
										return expanded ? "Свернуть" : "Развернуть";
									},
									onExpand: (_, info) => {
										item.expanded = info.expanded;
									},
								}}
							>
								{item.content}
							</Typography.Paragraph>
						</div>
					</div>
				))}
			</div>
		);
	}
	render() {
		return (
			<>
				<NavbarComponent />
				<div className="business-page">
					<div className="content-wrapper">
						<this.renderArticles />
					</div>
				</div>
			</>
		);
	}
}
