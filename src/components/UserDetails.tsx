import useDetails from "../hooks/useDetails";
import CardItem from "./CardItem";
import placeholderImg from "../assets/placeholder-image.webp";
import { FiEdit } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import { toast } from "react-toastify";
import apiClient from "../services/api-client";
import EditUserDetails from "./EditUserDetails";
import { useState } from "react";

const UserDetails = () => {
	const { details, error } = useDetails();
	const [editMode, setEditMode] = useState(false);
	const currentUser = localStorage.getItem("current_user");
	console.log(details, error);

	const handleBlock = async (id: string) => {
		if (currentUser === id) {
			toast.error("Active user cannot be blocked!");
		} else if (details?.isBlocked) {
			toast.error("User already blocked");
		} else {
			try {
				await apiClient.post(`/users/block/${id}`);
				toast.warn("User blocked");
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div>
			{editMode ? (
				<EditUserDetails
					onCancelEdit={() => {
						setEditMode(false);
					}}
				/>
			) : (
				<>
					<div className="d-flex align-items-top justify-content-start px-4 pb-5 gap-3">
						<button
							className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
							style={{
								borderRadius: "5px",
								height: "auto",
								width: "130px",
							}}
							onClick={() => {
								setEditMode(true);
							}}
						>
							<FiEdit size={19} /> Edit user
						</button>

						<button
							className="btn btn-danger d-flex align-items-center justify-content-center gap-2"
							style={{
								borderRadius: "5px",
								height: "auto",
								width: "130px",
							}}
							onClick={() => handleBlock(details!.id)}
						>
							<MdBlock size={20} /> Block user
						</button>
					</div>

					<div className="px-4 pb-5 d-flex flex-row flex-wrap  justify-content-left gap-5">
						<CardItem header="ID" body={details?.id}></CardItem>
						<CardItem header="Name" body={details?.name}></CardItem>
						<CardItem
							header="Username"
							body={details?.username}
						></CardItem>
						<CardItem header="Orders" body={details?.orders || 0} />
						<CardItem
							header="Last login date"
							body={
								details?.lastLogin !== undefined
									? details.lastLogin.slice(0, 10)
									: "N/A"
							}
						></CardItem>
						<CardItem
							header="Image"
							body={
								<img
									src={details?.imageURL || placeholderImg}
									style={{
										maxWidth: "50px",
										height: "auto",
									}}
								></img>
							}
						/>
						<CardItem
							header="Status"
							body={details?.status || "Not set"}
						/>
						<CardItem
							header="Date of birth"
							body={
								details?.dateOfBirth === undefined
									? "Not set"
									: details?.dateOfBirth.slice(0, 10)
							}
						/>
						<CardItem
							header="Role"
							body={
								details?.isAdmin ? "Administrator" : "Employee"
							}
						/>
						<CardItem
							header="Blocked"
							body={details?.isBlocked ? "Yes" : "No"}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default UserDetails;
