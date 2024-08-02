import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../services/api-client";

const HomeHeader = () => {
	const navigate = useNavigate();

	const handleLogOut = () => {
		const token = localStorage.getItem("login_token");
		console.log(token);
		apiClient
			.options("/logout", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				console.log(res);
				navigate("/");
				toast.info("Logged out");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div
			className="px-4 position-fixed d-flex flex-row justify-content-between align-items-center gap-3"
			style={{
				backgroundColor: "rgb(14,17,21)",
				height: "100px",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1,
			}}
		>
			<h2 className="my-1">MedicLab Home</h2>
			<div className="d-flex justify-content-between gap-3">
				<div className="btn btn-primary">New user</div>
				<div className="btn btn-outline-light" onClick={handleLogOut}>
					Log out
				</div>
			</div>
		</div>
	);
};

export default HomeHeader;
