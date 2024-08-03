import axios from "axios";

const token = localStorage.getItem("login_token");

export default axios.create({
	baseURL: "http://127.0.0.1:3000/api",
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	},
});
