import CardItem from "./CardItem";
import useUsers from "../hooks/useUsers";
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import placeholderImg from "../assets/placeholder-image.webp";
import UserCardSkeleton from "./UserCardSkeleton";

const UserCard = () => {
	const { users, error } = useUsers();
	const [detailedView, setDetailedView] = useState<{
		[key: string]: boolean;
	}>({});
	console.log(error);

	const handleClick = (id: string) => {
		setDetailedView((openCards) => ({
			...openCards,
			[id]: !openCards[id],
		}));
	};

	return (
		<>
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
					<h5 className="card-header ">{user.username}</h5>
					<div className="card-body mx-2">
						<div className="d-flex flex-wrap justify-content-between gap-3">
							<CardItem header="ID" body={user._id} />
							<CardItem header="Username" body={user.username} />
							<CardItem header="Name" body={user.name} />
							<CardItem
								header="Last login date"
								body={user.lastLogin}
							/>
							{detailedView[user._id] && (
								<>
									<CardItem
										header="Orders"
										body={user.orders || "0"}
									/>
									<CardItem
										header="Status"
										body={user.status || "Not set"}
									/>
									<CardItem
										header="Image"
										body={
											<img
												src={
													user.imageURL ||
													placeholderImg
												}
												style={{
													maxWidth: "50px",
													height: "auto",
												}}
											></img>
										}
									/>
									<CardItem
										header="Date of birth"
										body={user.dateOfBirth || "Not set"}
									/>
									<CardItem
										header="Role"
										body={
											user.isAdmin
												? "Administrator"
												: "Employee"
										}
									/>
									<CardItem
										header="Blocked"
										body={user.isBlocked ? "Yes" : "No"}
									/>
								</>
							)}
						</div>
					</div>
					<div
						className="d-flex card-footer justify-content-center align-items-center"
						style={{ backgroundColor: "rgb(14,17,21)" }}
					>
						<button
							style={{ background: "none", border: "none" }}
							onClick={() => handleClick(user._id)}
						>
							{detailedView[user._id] ? (
								<>
									Show less
									<IoIosArrowUp size={25} />
								</>
							) : (
								<>
									More details
									<IoIosArrowDown size={25} />
								</>
							)}
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default UserCard;
