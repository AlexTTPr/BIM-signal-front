import { Select, Spin } from "antd";
import React from "react";
import { CommonRequest } from "../../../services/httpservices/httpservice";
import "../Events/eventpage.style.scss";
import { format } from "date-fns";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import "./../../../services/bimstyles.scss";
import { EventPreview } from "../../../models/shared.models";


type EventsPageState = {
    isLoading: boolean,
    categories: Array<any>,
    isEventsExist: boolean,
    events: Array<EventPreview>
}

export class EventsPageComponent extends React.Component {
    state: EventsPageState;
    private _httpservice: CommonRequest;
    constructor() {
        super(undefined);
        this._httpservice = new CommonRequest();
        this.state = {
            isLoading: true,
            categories: [],
            isEventsExist: true,
            events: []
        }
        this.existing = this.existing.bind(this);
        this.renderEvents = this.renderEvents.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.filterByTypeChanged = this.filterByTypeChanged.bind(this);
    }

    componentDidMount() {
        this._httpservice.get("/api/v1/events/categories?filter=notempty")
            .then(data => {
                this.setState({
                    categories: [{ id: 0, name: "Все" }, ...data.data]
                })
            });
        this.getEvents();
    }


    getEvents(filter?: string) {
        this._httpservice.get(`/api/v1/events/preview/?count=20&offset=0${filter ? filter : ""}`)
            .then((data) => {
                if (data.code == 404) {
                    this.setState({
                        isEventsExist: false,
                        isLoading: false
                    });
                }
                else {
                    this.setState({
                        isEventsExist: true
                    });
                }
                this.setState({
                    events: [...data.data]
                });
            });
    }


    renderEvents() {
        const state = this.state;
        return (
            <>
                <div className="events-list">
                    {state && state.events.map((item) => {
                        return (
                            <div className="event-preview-wrapper" key={item.id}>
                                <a href={`/events/${item.id}`}>

                                    <div>
                                        <img src={"http://mtdtesting.ru/files/events/" + item.eventImage} alt="" />
                                    </div>
                                    <div style={{ padding: "10px" }}>
                                        <h4 className="text p-1">
                                            {item.title}
                                        </h4>
                                        <div className="event-loc">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.5 5.7C2.5 4.57989 2.5 4.01984 2.71799 3.59202C2.90973 3.21569 3.21569 2.90973 3.59202 2.71799C4.01984 2.5 4.5799 2.5 5.7 2.5H18.3C19.4201 2.5 19.9802 2.5 20.408 2.71799C20.7843 2.90973 21.0903 3.21569 21.282 3.59202C21.5 4.01984 21.5 4.5799 21.5 5.7V18.3C21.5 19.4201 21.5 19.9802 21.282 20.408C21.0903 20.7843 20.7843 21.0903 20.408 21.282C19.9802 21.5 19.4201 21.5 18.3 21.5H5.7C4.57989 21.5 4.01984 21.5 3.59202 21.282C3.21569 21.0903 2.90973 20.7843 2.71799 20.408C2.5 19.9802 2.5 19.4201 2.5 18.3V5.7Z" stroke="#222222" strokeLinecap="round" />
                                                <path d="M12.5 15.0294C12.5 17.1878 10.3603 18.704 9.42687 19.2628C9.16233 19.4211 8.83767 19.4211 8.57313 19.2628C7.63974 18.704 5.5 17.1878 5.5 15.0294C5.5 12.9118 7.19587 11.5 9 11.5C10.8667 11.5 12.5 12.9118 12.5 15.0294Z" stroke="#222222" />
                                                <path d="M18.5 21.5L12.5 6.5" stroke="#222222" />
                                                <path d="M21.5 4.5L2.5 8.5" stroke="#222222" />
                                                <circle cx="9" cy="15" r="1" fill="#222222" />
                                            </svg>
                                            {item.location}
                                        </div>
                                        <div className="event-date">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="8.5" stroke="#222222" />
                                                <path d="M16.5 12H12.25C12.1119 12 12 11.8881 12 11.75V8.5" stroke="#222222" strokeLinecap="round" />
                                            </svg>
                                            {format(item.startDate, "dd.MM.yyyy HH:mm").toString()}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}

                </div>
            </>

        );
    }


    filterByTypeChanged(value: string) {
        const state = this.state;
        this.setState({
            isLoading: true,
            isEventsExist: true,
            events: []
        });
        this.getEvents(`&category=${value}`);
    }

    filterByDateChanged(value: number) {

    }

    existing() {
        const state = this.state;
        if (state) {
            state.isLoading = false;
            if (!state.isEventsExist) {
                return (
                    <div className="doesnt-exist">
                        <h2 className="text">Ивентов нет</h2>
                    </div>
                );
            }
        }
    }

    render() {
        const state = this.state;
        return (
            <>
            <NavbarComponent />
                <div className="events-page">
                    <div className="content-wrapper">
                        <div className="page-title">
                            <h1 className="title">События в БИМ'е</h1>
                        </div>
                        <div className="filters-wrapper">
                            <div className="type-filter">
                                <div className="filter filter-by-type">
                                    <label className="text">Тип мероприятия</label>
                                    <Select
                                        defaultValue="Все"
                                        style={{ width: 120, margin: "0px 10px" }}
                                        onChange={this.filterByTypeChanged}
                                        options={state && state.categories.map((item) => ({ label: item.name, value: item.id }))}
                                    />
                                </div>
                                <div className="filter filter-by-date">
                                    <div>
                                        <label className="text">Сортировать по</label>
                                        <Select
                                            defaultValue={0}
                                            style={{ width: 170, margin: "0px 10px" }}
                                            onChange={this.filterByDateChanged}
                                            options={[
                                                { label: "По дате создания", value: 0 },
                                                { label: "По дате проведения", value: 1 }
                                            ]}
                                            dropdownStyle={{ fontSize: "10px", padding: "5px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="events-content">
                            <Spin spinning={state && state.isLoading} size="large" style={{ position: "absolute", top: "50%", right: "50%" }} />
                            <this.existing />
                            <this.renderEvents />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}