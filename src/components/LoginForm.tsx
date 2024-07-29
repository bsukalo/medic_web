import { FormEvent, useRef } from "react";

const LoginForm = () => {
	const userRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (userRef.current !== null) {
			console.log(userRef.current.value);
		}
		if (passRef.current !== null) {
			console.log(passRef.current.value);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div
				className="d-flex flex-column justify-content-center align-items-center"
				style={{ minHeight: "90vh" }}
			>
				<div className="mb-4 text-center">
					<h1>
						MedicLab
						<br />
						Login
					</h1>
				</div>
				<div className="mb-4">
					<label htmlFor="username" className="visually-hidden">
						Username
					</label>
					<input
						ref={userRef}
						id="username"
						type="text"
						autoComplete="username"
						className="form-control"
						placeholder="Username"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="visually-hidden">
						Password
					</label>
					<input
						ref={passRef}
						id="password"
						type="password"
						className="form-control"
						placeholder="Password"
					/>
				</div>
				<button className="btn btn-primary mt-3">Login</button>
			</div>
		</form>
	);
};

export default LoginForm;
