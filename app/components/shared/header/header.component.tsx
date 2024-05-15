import React, { ReactNode } from "react";
import "./header.style.scss";

import { Button, Form, Input } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { OverlayComponent } from "../overlay/overlay.component";
import { Cookies } from "typescript-cookie";
import { LoginFields, LoginTokens, Response } from "../../../models/shared.models";
import HttpServiceLogin from "../../../services/httpservices/httpserv.login";

type state = {
    isOpen: boolean,
    isLoggined: boolean
}

export class HeaderComponent extends React.Component {
    state: state;
    private HttpServiceLogin: HttpServiceLogin = new HttpServiceLogin();
    private isLoginOpen: boolean;

    constructor(props: any) {
        document.title = 'БИМ Сигнал';

        super(props);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.loginOverlay = this.loginOverlay.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.state = {
            isOpen: false,
            isLoggined: false
        }
    }

    componentDidMount(): void {
        if (Cookies.get("token") != undefined) {
            console.log(Cookies.get("token"));
            this.setState({
                isLoggined: true
            });
        }
    }

    onClickLogin() {
        this.setState({
            isOpen: true
        });
    }

    async onLogin(values: LoginFields) {
        console.log(values);
        let loginRequest: Response<LoginTokens> = await this.HttpServiceLogin.Login(values);
        if (loginRequest.code == 200) {
            if (loginRequest.data) {
                Cookies.set("token", loginRequest.data.token);
                Cookies.set("refreshtoken", loginRequest.data.refreshtoken);
                window.location.href = "/";
            }
        }
        else if (loginRequest.code == 400) {
            console.log("Неверный пароль!");
        }
        else if (loginRequest.code == 401) {
            console.log("Неверно указаны данные!");
        }
    }

    loginOverlay(): React.ReactNode {
        if (this.state && this.state.isOpen) {
            return (
                <OverlayComponent >
                    <h1>Вход</h1>
                    <Form className="bim-form"
                        onFinish={this.onLogin}
                    >
                        <Form.Item name="username"
                            rules={[{ required: true, message: "Введите логин" }]}>
                            <Input prefix={<UserOutlined />} placeholder="Логин" />
                        </Form.Item>

                        <Form.Item name="password"
                            rules={[{ required: true, message: "Введите пароль" }]}>
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Пароль"
                                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Button type="text" onClick={() => window.open("/registration", "_self")}>
                            Регистрация
                        </Button>

                        <Button type="text">
                            Забыли пароль?
                        </Button>

                        <br />

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </OverlayComponent>
            )
        }
    }

    render() {
        return (
            <>
                <div className="header">
                    <svg width="280" height="48" viewBox="0 0 280 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H280L230 48H0V0Z" fill="#AA3A3A" />
                    </svg>

                    <h1><a href="/">БИМ</a></h1>

                    <div className="buttons">
                        {
                            this.state && this.state.isLoggined == false &&
                            <Button onClick={this.onClickLogin} icon={<LoginOutlined />}>Войти</Button>
                        }
                        {
                            this.state && this.state.isLoggined == true &&
                            <UserOutlined width="20px" height="20px" style={{ marginRight: "20px", width: "20px", height: "20px", cursor: "pointer" }} />
                        }
                    </div>
                </div>

                <this.loginOverlay />
            </>
        );
    }
}