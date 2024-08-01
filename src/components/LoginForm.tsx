import axios from "axios";
import { FormEvent, useState } from "react";

const LoginForm = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		axios
			.post("http://127.0.0.1:3000/api/login", {
				username,
				password,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
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
						onChange={(event) => setUsername(event.target.value)}
						id="username"
						type="text"
						autoComplete="username"
						className="form-control"
						placeholder="Username"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="visually-hidden">
						Password
					</label>
					<input
						onChange={(event) => setPassword(event.target.value)}
						id="password"
						type="password"
						className="form-control"
						placeholder="Password"
					/>
				</div>
				<button className="btn btn-primary">Login</button>
			</div>
		</form>
	);
};

export default LoginForm;
