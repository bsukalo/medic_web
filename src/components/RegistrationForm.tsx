import { Controller, useForm } from "react-hook-form";
import CardItem from "./CardItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiClient from "../services/api-client";
import { toast } from "react-toastify";
import { useState } from "react";

interface FormData {
	username: string;
	password: string;
	name: string;
	orders: number;
	status: string;
	imageURL: string;
	dateOfBirth: Date;
}

const RegistrationForm = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>();
	const [errorMessage, setErrorMessage] = useState();

	const onSubmit = (data: FormData) => {
		apiClient
			.post("/register", { ...data })
			.then((res) => {
				console.log("registered", res);
				toast.success("User successfuly registered"); 
				reset();
			})
			.catch((error) => {
				console.log(error.response.data.message);
				setErrorMessage(error.response.data.message);
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			<div className="px-4 pb-5 d-flex flex-row flex-wrap justify-content-left gap-5">
				<CardItem
					header="Username"
					body={
						<>
							<input
								{...register("username", { required: true })}
								className="form-control"
								placeholder="Username"
							/>
							{errors.username?.type === "required" && (
								<p className="text-danger fs-6">
									Username is required
								</p>
							)}
						</>
					}
				/>
				<CardItem
					header="Password"
					body={
						<>
							<input
								{...register("password", { required: true })}
								type="password"
								className="form-control"
								placeholder="Password"
							/>
							{errors.password?.type === "required" && (
								<p className="text-danger fs-6">
									Password is required
								</p>
							)}
						</>
					}
				/>

				<CardItem
					header="Name"
					body={
						<>
							<input
								{...register("name", { required: true })}
								className="form-control"
								placeholder="Name"
							/>
							{errors.name?.type === "required" && (
								<p className="text-danger fs-6">
									Name is required
								</p>
							)}
						</>
					}
				/>
				<CardItem
					header="Orders"
					body={
						<>
							<input
								{...register("orders", {
									min: 0,
									max: 10,
								})}
								type="number"
								className="form-control"
								placeholder="Orders"
							/>
							{errors.orders?.type === "min" && (
								<p className="text-danger fs-6">
									Orders must be between 0-10!
								</p>
							)}
							{errors.orders?.type === "max" && (
								<p className="text-danger fs-6">
									Orders must be between 0-10
								</p>
							)}
						</>
					}
				/>
				<CardItem
					header="Status"
					body={
						<>
							<input
								{...register("status")}
								className="form-control"
								placeholder="Status"
							/>
						</>
					}
				/>
				<CardItem
					header="Image URL"
					body={
						<input
							{...register("imageURL")}
							className="form-control"
							placeholder="Image URL"
						/>
					}
				/>
				<CardItem
					header="Date of birth"
					body={
						<Controller
							control={control}
							name="dateOfBirth"
							render={({ field }) => (
								<DatePicker
									placeholderText="Select date"
									onChange={(date) => field.onChange(date)}
									selected={field.value}
									className="form-control"
								/>
							)}
						/>
					}
				/>
			</div>
			<button
				style={{ margin: "0px 0px 30px 30px" }}
				type="submit"
				className="btn btn-primary"
			>
				Create
			</button>
		</form>
	);
};

export default RegistrationForm;
