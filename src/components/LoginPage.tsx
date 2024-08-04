import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import MiniModal from "./MiniModal";

interface FormData {
	username: string;
	password: string;
}

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleModalClose = () => {
		setErrorMessage("");
		setShowModal(false);
	};

	const onSubmit: SubmitHandler<FormData> = (data) => {
		setIsLoading(true);

		apiClient
			.post("/login", { ...data })
			.then((res) => {
				const token = res.data.accessToken;
				localStorage.setItem("login_token", token);
				localStorage.setItem("current_user", res.data._id);
				navigate("/home");
				setIsLoading(false);
			})
			.catch((error) => {
				setErrorMessage(error.response.data.message);
				console.log(error.response.data.message);
				setIsLoading(false);
				setShowModal(true);
			});
	};

	return (
		<form>
			<MiniModal
				show={showModal}
				onClose={() => {
					handleModalClose();
				}}
			>
				{<>{errorMessage}</>}
			</MiniModal>
			<div
				className="d-flex flex-column justify-content-center align-items-center"
				style={{ minHeight: "90vh" }}
			>
				<span
					className="d-flex flex-column align-items-center rounded"
					style={{
						padding: "100px 50px 100px 50px",
						backgroundColor: "rgb(14,17,21)",
					}}
				>
					<div className="mb-3 text-center">
						<h2>
							MedicLab
							<br />
							Login
						</h2>
					</div>
					<div className="mb-3">
						<label htmlFor="username" className="visually-hidden">
							Username
						</label>
						<input
							{...register("username", {
								required: true,
								minLength: 3,
							})}
							id="username"
							type="text"
							autoComplete="username"
							className="form-control"
							placeholder="Username"
							style={{ backgroundColor: "rgb(14,17,21)" }}
						/>
						{errors.username?.type === "required" && (
							<p className="text-danger">Username is required</p>
						)}
						{errors.username?.type === "minLength" && (
							<p
								className="text-danger"
								style={{ maxWidth: "200px", height: "24px" }}
							>
								Username must be at least 3 characters
							</p>
						)}
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="visually-hidden">
							Password
						</label>
						<input
							{...register("password", {
								required: true,
								minLength: 3,
							})}
							id="password"
							type="password"
							className="form-control"
							placeholder="Password"
							style={{ backgroundColor: "rgb(14,17,21)" }}
						/>
						{errors.password?.type === "required" && (
							<p className="text-danger">Password is required</p>
						)}
						{errors.password?.type === "minLength" && (
							<p
								className="text-danger"
								style={{ maxWidth: "200px", maxHeight: "24px" }}
							>
								Password must be at least 3 characters
							</p>
						)}
					</div>
					<button
						className="btn btn-primary mb-4"
						onClick={handleSubmit(onSubmit)}
						disabled={isLoading}
					>
						Login
					</button>
					{isLoading && <div className="spinner-border"></div>}
				</span>
			</div>
		</form>
	);
};

export default LoginForm;
