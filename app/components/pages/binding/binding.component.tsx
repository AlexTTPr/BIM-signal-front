import React from "react";
import { CommonRequest } from "../../../services/httpservices/httpservice";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import "./binding.style.scss";
import Select from "antd/es/select";
import DatePicker from "antd/es/date-picker";
import TimePicker from "antd/es/time-picker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Flex, Slider, SliderSingleProps } from "antd";
import { Cookies } from "typescript-cookie";
import TextArea from "antd/es/input/TextArea";
type Room = {
  id: number;
  name: string;
  building: string;
  floor: number;
  roomNumber: string;
  seats: number;
  roomImage: string;
  description: string;
};

type BindingState = {
  corpus: string;
  floor: number;
  room: number;
  date: any;
  rooms: Array<any>;
  timeStart: any;
  timeEnd: any;
  purpose: string;
};

const marks: SliderSingleProps["marks"] = {
  0: '00:00',
  24: '00:00',
};

const formatHour = (value: number) => {
    const hour = value.toString().padStart(2, '0');
    return `${hour}:00`;
  };

export class BindingComponentn extends React.Component {
  state: BindingState;
  private _httpservice: CommonRequest;
  private isValid: true;
  private format: string = "HH";
  constructor(props: any) {
    super("");
    this._httpservice = new CommonRequest();
    this.getRooms = this.getRooms.bind(this);
    this.renderFloor = this.renderFloor.bind(this);
    this.reserv = this.reserv.bind(this);
    this.setReservationTime = this.setReservationTime.bind(this);
  }

  componentDidMount(): void {
    this.setState({
      rooms: [],
    });
  }

  renderFloor() {
    let number: number;
    number = 1;
    this.getRooms();
    switch (number) {
      case 1:
        return (
          <>
            <div className="floor">
              <div className="map-layer">
                <img src="app/media/image 2.png" />
              </div>
            </div>
          </>
        );
        break;

      default:
        return <></>;
    }
  }

  getRooms() {
    const state = this.state;
    if (state && state.corpus && state.floor && state.rooms.length <= 0) {
      this._httpservice
        .get(
          `/api/v1/coworking/rooms?building=${state.corpus}&floor=${state.floor}`
        )
        .then((data) => {
          this.setState({
            rooms: data.data,
          });
        });
    }
  }

  checkForm(): boolean {
    if (
      this.state &&
      (this.state.timeStart == undefined || this.state.timeEnd == undefined)
    ) {
      return true;
    }
    return false;
  }

  setReservationTime(numbers: number[]){
    if(this.state && this.state.date)
        {
            let glDate = this.state.date;
            console.log(numbers);
            this.setState({
                timeStart: new Date(glDate).setHours(numbers[0]),
                timeEnd: new Date(glDate).setHours(numbers[1]),
            })
        }
  }

  reserv() {
    let dataStart = new Date();
    dataStart.setDate(new Date(this.state.date).getDate());
    dataStart.setHours(new Date(this.state.timeStart).getHours() + 3);
    dataStart.setMinutes(0);
    dataStart.setMilliseconds(0);

    let dataEnd = new Date();
    dataEnd.setDate(new Date(this.state.date).getDate());
    dataEnd.setHours(new Date(this.state.timeEnd).getHours() + 3);
    dataEnd.setMinutes(0);
    dataEnd.setMilliseconds(0);
    dayjs.extend(utc);

    let payload = {
      reservationStart: dayjs(dataStart).utc().format(),
      reservationEnd: dayjs(dataEnd).utc().format(),
      purpose: this.state.purpose,
    };
    console.log(payload);

    let header = new Headers();
    this._httpservice
      .post(
        `/api/v1/coworking/rooms/${this.state.room}/reserve`,
        payload,
        header
      )
      .then((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <>
        <NavbarComponent />
        <div className="binding-page">
          <div className="content-wrapper">
            <div className="content">
              <div className="map">
                {this.state && this.state.floor && this.state.corpus && (
                  <this.renderFloor />
                )}
              </div>
              <div className="options">
                <div className="selectors">
                  <div>
                    <label className="text">Корпус</label>
                    <Select
                      defaultValue="Выберите корпус"
                      onChange={(value) => {
                        this.setState({
                          corpus: value,
                        });
                      }}
                      style={{ width: 120, margin: "0px 10px" }}
                      options={[
                        { label: "А", value: "А" },
                        { label: "Б", value: "Б" },
                        { label: "В", value: "В" },
                      ]}
                      dropdownStyle={{ fontSize: "10px", padding: "5px" }}
                    />
                  </div>
                  <div>
                    <label className="text">Этаж</label>
                    <Select
                      onChange={(value) => {
                        this.setState({
                          floor: value,
                        });
                      }}
                      defaultValue={"Выберите этаж"}
                      style={{ width: 170, margin: "0px 10px" }}
                      options={[
                        { label: "Первый", value: 1 },
                        { label: "Второй", value: 2 },
                        { label: "Третий", value: 3 },
                      ]}
                      dropdownStyle={{ fontSize: "10px", padding: "5px" }}
                    />
                  </div>
                  <div>
                    <label className="text">Комната</label>
                    <Select
                      defaultValue={"Комната"}
                      onChange={(value) => {
                        console.log(value);
                        this.setState({
                          room: value,
                        });
                      }}
                      options={
                        this.state &&
                        this.state.rooms.map((item: any) => ({
                          label: `${item.name} №${item.roomNumber}`,
                          value: item.id,
                        }))
                      }
                      style={{ width: 170, margin: "0px 10px" }}
                      dropdownStyle={{ fontSize: "10px", padding: "5px" }}
                    />
                  </div>
                  <div>
                    <label className="text">Дата</label>
                    <DatePicker
                      onChange={(value: any) => {
                        this.state.date = new Date(value).toDateString();
                      }}
                      style={{ width: 170, margin: "0px 10px" }}
                    />
                  </div>
                  {/*<div>
                    <label className="text">Время начала</label>
                    <TimePicker
                      onChange={(value) => {
                        this.setState({
                          timeStart: value,
                        });
                      }}
                      style={{ width: 170, margin: "0px 10px" }}
                      defaultValue={dayjs("10:00", this.format)}
                      format={this.format}
                    />
                    <br />
                    <label className="text">Время конца</label>
                    <TimePicker
                      onChange={(value) => {
                        console.log(value);
                        this.setState({
                          timeEnd: value,
                        });
                      }}
                      style={{ width: 170, margin: "0px 10px" }}
                      defaultValue={dayjs("12:00", this.format)}
                      format={this.format}
                    />
                  </div>*/}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "20px 0px",
                    }}
                  >
                    <Slider
                        range
                        max={24}
                        marks={marks}
                        defaultValue={[10, 12]}
                        style={{ width: "85%" }}
                        onChange={this.setReservationTime}
                        tipFormatter={formatHour}
                  />
                  <TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    onChange={(value) => {
                      this.setState({
                        purpose: value.target.value,
                      });
                    }}
                    style={{ margin: "5px", padding: "5px" }}
                  />
                    <Button type="primary" onClick={this.reserv}>
                      Primary Button
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
