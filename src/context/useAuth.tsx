import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useAuth = () => {
	let isExpired = false;
	const token = localStorage.getItem("login_token");
	const parsedToken = token !== null ? token : "a";

	const decodedToken = jwtDecode<JwtPayload>(parsedToken);
	console.log("Decoded Token", decodedToken);
	const currentDate = new Date();
	console.log(currentDate.getTime(), decodedToken);

	if (decodedToken.exp! * 1000 < currentDate.getTime()) {
		isExpired = true;
		toast.warning("Session expired or authorization failed!");
	}
	return isExpired;
};

export default useAuth;
