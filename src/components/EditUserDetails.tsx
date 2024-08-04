import useDetails from "../hooks/useDetails";
import CardItem from "./CardItem";
import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5";
import apiClient from "../services/api-client";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
	username: string;
	name: string;
	orders: number;
	status: string;
	imageURL: string;
	dateOfBirth: Date;
	isAdmin: string;
}

interface Props {
	onCancelEdit: () => void;
}

const EditUserDetails = ({ onCancelEdit }: Props) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		defaultValues: {
			username: "",
			name: "",
			orders: 0,
			status: "",
			imageURL: "",
			dateOfBirth: undefined,
			isAdmin: "false",
		},
	});
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { details } = useDetails();

	useEffect(() => {
		if (details) {
			reset({
				username: details.username || "",
				name: details.name || "",
				orders: typeof details.orders === "number" ? details.orders : 0,
				status: details.status || "",
				imageURL: details.imageURL || "",
				dateOfBirth: details.dateOfBirth
					? new Date(details.dateOfBirth)
					: undefined,
				isAdmin: details.isAdmin ? "true" : "false",
			});
		}
	}, [details, reset]);

	const onSubmit = (data: FormData) => {
		if (!details?.id) {
			return;
		}
		apiClient
			.put(`/users/update/${details.id}`, { ...data })
			.then((res) => {
				console.log("User successfully updated", res);
				onCancelEdit();
				toast.success("User successfully updated");
			})
			.catch((error) => {
				console.log(error.response?.data?.message);
				setErrorMessage(error.response?.data?.message);
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="d-flex align-items-top justify-content-start px-4 pb-5 gap-3">
				<button
					type="button"
					className="btn btn-warning d-flex align-items-center justify-content-center gap-1"
					style={{
						borderRadius: "5px",
						height: "auto",
						width: "150px",
					}}
					onClick={onCancelEdit}
				>
					<IoCloseSharp size={19} /> Stop editing
				</button>
				<button
					type="submit"
					className="btn btn-success d-flex align-items-center justify-content-center gap-1"
					style={{
						borderRadius: "5px",
						height: "auto",
						width: "150px",
					}}
				>
					<IoCheckmarkSharp size={19} /> Save changes
				</button>
			</div>

			<div className="px-4 pb-5 d-flex flex-row flex-wrap justify-content-left gap-5">
				<CardItem
					header="Username"
					body={
						<>
							<input
								{...register("username")}
								className="form-control"
								placeholder="Username"
							/>
							{errors.username && (
								<p className="text-danger fs-6">
									Username is required
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
								{...register("name")}
								className="form-control"
								placeholder="Name"
							/>
							{errors.name && (
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
				<CardItem
					header="Role"
					body={
						<>
							<select
								{...register("isAdmin")}
								className="form-control"
							>
								<option value="true">Administrator</option>
								<option value="false">Employee</option>
							</select>
						</>
					}
				/>
			</div>
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
		</form>
	);
};

export default EditUserDetails;
