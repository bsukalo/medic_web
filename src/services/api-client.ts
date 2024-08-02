import axios from "axios";

export default axios.create({
	baseURL: "https://medic-api-peach.vercel.app/api",
});
