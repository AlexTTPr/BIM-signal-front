import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  FireOutlined,
  TeamOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import { version } from "html-webpack-plugin";
import "./navbar.style.scss";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'home',
    label: <Link to='/'>Главная</Link>,
    icon: <HomeOutlined />
  },
  {
    key: 'events',
    label: <Link to='/events'>Мероприятия</Link>,
    icon: <FireOutlined />
  },
  {
    key: 'coworking',
    label: <Link to='/coworking'>Коворкинг</Link>,
    icon: <TeamOutlined />
  },
  {
    key: 'business',
    label: <Link to='/business'>Бизнес</Link>,
    icon: <AreaChartOutlined />
  },
];

type state = {
  selectedItem: string;
};

export class NavbarComponent extends React.Component {
  state: state;

  constructor() {
    super(undefined);

    this.state = {
      selectedItem: "home"
    };

    const pathname = location.pathname;
    switch (pathname) {
      case "/":
        this.state.selectedItem = "home";
        break;
      case "/events":
        this.state.selectedItem = "events";
        break;
      case "/coworking":
        this.state.selectedItem = "coworking";
        break;
      case "/business":
        this.state.selectedItem = "business";
        break;
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="navbar-menu">
          <Menu
            mode="vertical"
            selectedKeys={[this.state.selectedItem]}
            style={{fontSize:"1.1em"}}
            items={items}
          />
        </div>
      </>
    );
  }
}
