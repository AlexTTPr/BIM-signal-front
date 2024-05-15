import React from "react";
import HttpServiceLogin from "../../../services/httpservices/httpserv.login";
import HttpService from "../../../services/httpservices/httpservice";
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { Response, LoginFields, LoginTokens } from "../../../models/shared.models";
import "./login.style.scss";
import "../../../services/style.scss";
import { Cookies } from "typescript-cookie";
import { Link, Navigate } from "react-router-dom";


type LoginComponentState = {
    isLoading: boolean
}


export default class LoginComponent extends React.Component {
    state: LoginComponentState;
    private HttpServiceLogin: HttpServiceLogin = new HttpServiceLogin();
    private HttpService: HttpService;
    constructor(props: null) {
        super(props);
        this.HttpService = new HttpService();
        this.onLogin = this.onLogin.bind(this);
        this.state = {
            isLoading: false
        }
    }


    checkSesssion(): boolean{
        if(Cookies.get("token") != undefined){
            console.log("куки на месте, выкидываем");
            return true;
        }
        return false;
    }

    componentDidMount(): void {
        if(this.checkSesssion()){
            this.HttpService.getServerStatus()
            .then((data) => {
                if (data[1] == "Healthy") {
                    window.location.href = "/";
                }
            });
        }        
    }

    async onLogin(values: LoginFields) {
        this.setState({ isLoading: true });
        let loginRequest: Response<LoginTokens> = await this.HttpServiceLogin.Login(values);
        if (loginRequest.code == 200) {
            if (loginRequest.data) {
                Cookies.set("token", loginRequest.data.token);
                Cookies.set("refreshtoken", loginRequest.data.refreshtoken);
                this.setState({
                    isLoading: false
                });
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


    render(): React.ReactNode {
        const state = this.state;
        return (
            <>
                <div className="h-100 login-wrapper">
                    <Spin spinning={state && state.isLoading} >
                        <div className="login-page">
                            <Form
                                className="login-form"
                                name="login"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600, minWidth: 500, minHeight: 400 }}
                                initialValues={{ remember: true }}
                                onFinish={this.onLogin}
                                autoComplete="on"
                            >
                                <h2 className="title">
                                    Авторизация
                                </h2>
                                <Form.Item<LoginFields>
                                    label="Логин"
                                    name="username"
                                    className="login-form-field"
                                    rules={[{ required: true, message: "Пожалуйста, введите имя пользователя!" }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item<LoginFields>
                                    label="Пароль"
                                    name="password"
                                    className="login-form-field"
                                    rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item<LoginFields>
                                    name="remember"
                                    valuePropName="checked"
                                    className="login-form-field"
                                    wrapperCol={{ offset: 8, span: 16 }}
                                >
                                    <Checkbox>Запомнить меня</Checkbox>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 10, span: 16 }} className="login-form-field">
                                    <Button type="primary" htmlType="submit">
                                        Войти
                                    </Button>
                                </Form.Item>
                                <div className="others-links">
                                    <div>
                                        <a href="/registration">Нет аккаунта?</a>
                                    </div>
                                    <div>
                                        <a href="/recovery">Забыли пароль?</a>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Spin>
                </div>
            </>
        )
    }
}