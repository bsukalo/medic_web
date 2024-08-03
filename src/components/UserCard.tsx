import CardItem from "./CardItem";
import useUsers from "../hooks/useUsers";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import UserCardSkeleton from "./UserCardSkeleton";
import apiClient from "../services/api-client";
import { toast } from "react-toastify";
import Modal from "./Modal";
import UserDetails from "./UserDetails";

const UserCard = () => {
	const { users, error } = useUsers();
	const [showModal, setShowModal] = useState(false);
	console.log(error);

	const handleBlock = async (id: string) => {
		try {
			await apiClient.post(`/users/block/${id}`);
			toast.warn("User blocked");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{
				<Modal
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
					title={"User details"}
				>
					<UserDetails />
				</Modal>
			}
			{error && (
				<>
					<UserCardSkeleton />
					<UserCardSkeleton />
					<UserCardSkeleton />
				</>
			)}
			{users?.map((user) => (
				<div
					key={user._id}
					className="card m-4 mt-0"
					style={{
						backgroundColor: "rgb(14,17,21)",
						width: "calc(100% - 50px)",
						maxWidth: "1440px",
						justifyContent: "center",
					}}
				>
					<h5 className="card-header justify-content-between">
						<div
							className="d-flex align-items-center justify-content-between gap-3"
							style={{ wordBreak: "break-word" }}
						>
							{[
								user.username,
								<div className="d-flex gap-2 align-items-center justify-content-center">
									<button
										className="btn btn-primary d-flex align-items-center justify-content-center"
										style={{
											borderRadius: "5px",
											height: "30px",
											width: "45px",
										}}
									>
										<FiEdit size={19} />
									</button>

									<button
										className="btn btn-danger d-flex align-items-center justify-content-center"
										style={{
											borderRadius: "5px",
											height: "30px",
											width: "45px",
										}}
										onClick={() => {
											if (user.isBlocked) {
												toast.error(
													"User already blocked!"
												);
											} else handleBlock(user._id);
										}}
									>
										<MdBlock size={20} />
									</button>
								</div>,
							]}
						</div>
					</h5>
					<div className="card-body mx-2">
						<div className="d-flex flex-wrap justify-content-between gap-3">
							<CardItem header="ID" body={user._id} />
							<CardItem header="Username" body={user.username} />
							<CardItem header="Name" body={user.name} />
							<CardItem
								header="Last login date"
								body={user.lastLogin.slice(0, 10)}
							/>
						</div>
					</div>
					<div
						className="d-flex card-footer justify-content-end align-items-center"
						style={{ backgroundColor: "rgb(14,17,21)" }}
					>
						<button
							className="d-flex flex-row align-items-center justify-content-center gap-1"
							style={{
								background: "none",
								border: "none",
							}}
							onClick={() => {
								localStorage.setItem("selected_user_id", user._id)
								setShowModal(true);
							}}
						>
							<FaBars size={20} />
							Show details
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default UserCard;
