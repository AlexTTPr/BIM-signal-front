import React from "react";
import { Button, Checkbox, Form, FormProps, Input, InputNumber, Spin } from 'antd';
import { ConfirmationFileds, RegistrationFields, Response } from "../../../models/shared.models";
import HttpServiceLogin from "../../../services/httpservices/httpserv.login";
import "../Registration/registration.style.scss";
import "./../../../services/bimstyles.scss";

import { EyeOutlined, EyeInvisibleOutlined, MailOutlined, UserOutlined, LockOutlined, FieldBinaryOutlined } from "@ant-design/icons";
import { OverlayComponent } from "../../shared/overlay/overlay.component";
import { Cookies } from "typescript-cookie";

type RegistrationComponentState = {
    isLoading: boolean,
    isConfirmingCode: boolean,
    registrationFields?: RegistrationFields
}

export default class RegistrationComponent extends React.Component {
    state: RegistrationComponentState;
    private HttpServiceLogin: HttpServiceLogin;

    constructor(props: undefined) {
        super(props);
        this.state = {
            isLoading: false,
            isConfirmingCode: false
        }
        this.HttpServiceLogin = new HttpServiceLogin();
        this.renderTemplate = this.renderTemplate.bind(this);
        this.renderRegForm = this.renderRegForm.bind(this);
        this.onRegistration = this.onRegistration.bind(this);
        this.confirmationOverlay = this.confirmationOverlay.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    async onRegistration(values: RegistrationFields) {
        const state = this.state;
        this.HttpServiceLogin.Registrate(values)
            .then(data => {
                console.log(data);
            });
        this.setState({
            isConfirmingCode: true,
            registrationFields: values
        });
        console.log(this.state)
        return;
    }

    onConfirm(values: any): void {
        this.setState({
            isConfirmingCode: false
        });
        this.setState({ registrationFields: { code: values.code } })
        this.HttpServiceLogin.Registrate(this.state.registrationFields)
            .then(data => {
                Cookies.set("token", data.data.token);
                Cookies.set("refreshtoken", data.data.refreshtoken)
            });
    }

    confirmationOverlay(): React.ReactNode {
        if (this.state === undefined || this.state.isConfirmingCode === false)
            return;

        return (
            <OverlayComponent>
                <h1>Подтверждение <br /> регистрации</h1>
                <Form
                    className="bim-form"
                    onFinish={this.onConfirm}
                >
                    <Form.Item
                        name="code"
                        rules={[{ required: true, message: "Введите код подтверждения" }]}
                    >
                        <Input
                            prefix={<FieldBinaryOutlined />}
                            placeholder="Код подтверждения"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Подтвердить
                        </Button>
                    </Form.Item>
                </Form>
            </OverlayComponent>
        )
    }

    renderTemplate() {
        const state = this.state;
        if (state) {
            return this.renderRegForm();
        }
    }

    renderRegForm() {
        const state = this.state;
        return (
            <>
                <div className="registration-page">
                    <Spin spinning={state && state.isLoading} >
                        <Form className="bim-form"
                            onFinish={this.onRegistration}
                        >
                            <Form.Item name="login" style={{width: '300px'}}
                                rules={[{ required: true, message: "Введите логин" }]}>
                                <Input prefix={<UserOutlined />} placeholder="Логин" />
                            </Form.Item>

                            <Form.Item name="email" style={{width: '300px'}}
                                rules={[{ required: true, message: "Введите почту" }]}>
                                <Input prefix={<MailOutlined />} placeholder="Почта" />
                            </Form.Item>
                            <Form.Item name="password" style={{width: '300px'}}
                                rules={[{ required: true, message: "Введите пароль" }]}>
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Пароль"
                                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Button htmlType="submit" type="primary">Зарегистрироваться</Button>
                        </Form>
                    </Spin>
                </div>
                <this.confirmationOverlay />
            </>
        )
    }

    render(): React.ReactNode {
        const state = this.state;
        return (
            <>
                <img className="bg" src="app\media\regbg.jpg"></img>
                <div className="splitter">
                    <div className="reg-wrapper">
                        <h1>Регистрация</h1>
                        {this.renderTemplate()}
                    </div>
                </div>
            </>
        );
    }
}