import React, { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/pages/Login/login.component";
import { Cookies } from "typescript-cookie";
import HttpService from "./services/httpservices/httpservice";
import RegistrationComponent from "./components/pages/Registration/registration.component";
import HomeComponent from "./components/pages/Home/home.component";
import { HeaderComponent } from "./components/shared/header/header.component";

import colors from "./services/colors";
import { EventsPageComponent } from "./components/pages/Events/eventspage.component";
import { BindingComponentn } from "./components/pages/binding/binding.component";
import { BusinessComponent } from "./components/pages/business/business.component";
import { EventFullComponent } from "./components/pages/Events/eventfull.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { NotFoundPage } from "./components/pages/notfound/notfound.component";

const container = document.getElementById("app");
const root = createRoot(container!);

export default function App() {
	return (
		<>
			<link
				href="https://fonts.googleapis.com/css?family=Montserrat"
				rel="stylesheet"
			></link>
			<link
				href="https://fonts.googleapis.com/css?family=Montserrat%20Alternates"
				rel="stylesheets"
			></link>

			<ConfigProvider
				theme={{
					token: {
						colorPrimary: colors.main,
						borderRadius: 16,
					},
				}}
			>
				<HeaderComponent />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomeComponent />} />
						<Route
							path="/home"
							element={
								<CheckSession>
									<HomeComponent />
								</CheckSession>
							}
						/>
						<Route path="login" element={<LoginComponent />} />
						<Route path="registration" element={<RegistrationComponent />} />
						<Route path="events" element={<EventsPageComponent />} />
						<Route path="coworking" element={<BindingComponentn />} />
						<Route path="business" element={<BusinessComponent />} />
						<Route path="events/:eventId" element={<EventFullComponent />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</BrowserRouter>
			</ConfigProvider>
		</>
	);
}

function CheckSession(props: { children: JSX.Element }) {
	if (
		Cookies.get("token") != null &&
		Cookies.get("token").toString().length > 0
	) {
		return props.children;
	}
	return <Navigate to="/login" />;
}

root.render(<App />);
