import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

	const onSubmit: SubmitHandler<FormData> = (data) => {
		axios
			.post("http://127.0.0.1:3000/api/login", { ...data })
			.then((res) => {
				console.log(res.data);
				const token = res.data.accessToken;
				console.log(token);
				navigate("/home");
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div
				className="d-flex flex-column justify-content-center align-items-center"
				style={{ minHeight: "90vh" }}
			>
				<div className="mb-3 text-center">
					<h1>
						MedicLab
						<br />
						Login
					</h1>
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
					/>
					{errors.password?.type === "required" && (
						<p className="text-danger">Password is required</p>
					)}
					{errors.password?.type === "minLength" && (
						<p
							className="text-danger"
							style={{ maxWidth: "200px" }}
						>
							Password must be at least 3 characters
						</p>
					)}
				</div>
				<button className="btn btn-primary">Login</button>
			</div>
		</form>
	);
};

export default LoginForm;
