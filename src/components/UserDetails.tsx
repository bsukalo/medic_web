import useDetails from "../hooks/useDetails";
import CardItem from "./CardItem";
import placeholderImg from "../assets/placeholder-image.webp";
import { FiEdit } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import { toast } from "react-toastify";

const UserDetails = () => {
	const { details, error } = useDetails();
	console.log(details, error);

	const handleBlock = () => {};

	return (
		<div>
			<div className="d-flex align-items-top justify-content-start px-4 pb-5 gap-3">
				<button
					className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
					style={{
						borderRadius: "5px",
						height: "auto",
						width: "130px",
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
					onClick={() => {
						if (details?.isBlocked) {
							toast.error("User already blocked!");
						} else handleBlock();
					}}
				>
					<MdBlock size={20} /> Block user
				</button>
			</div>

			<div className="px-4 pb-5 d-flex flex-row flex-wrap  justify-content-between gap-5">
				<CardItem header="ID" body={details?.id}></CardItem>
				<CardItem header="Name" body={details?.name}></CardItem>
				<CardItem header="Username" body={details?.username}></CardItem>
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
				<CardItem header="Status" body={details?.status || "Not set"} />
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
					body={details?.isAdmin ? "Administrator" : "Employee"}
				/>
				<CardItem
					header="Blocked"
					body={details?.isBlocked ? "Yes" : "No"}
				/>
			</div>
		</div>
	);
};

export default UserDetails;
