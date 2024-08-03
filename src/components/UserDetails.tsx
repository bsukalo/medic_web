import useDetails from "../hooks/useDetails";
import CardItem from "./CardItem";
import placeholderImg from "../assets/placeholder-image.webp";

const UserDetails = () => {
	const { details, error } = useDetails();
	console.log(details, error);

	return (
		<div className="px-4 pb-5 d-flex flex-row flex-wrap gap-5">
			<CardItem header="ID" body={details?.id}></CardItem>
			<CardItem header="Name" body={details?.name}></CardItem>
			<CardItem header="Username" body={details?.username}></CardItem>
			<CardItem header="Orders" body={details?.orders || 0} />
			<CardItem
				header="Last login date"
				body={details?.lastLogin || "N/A"}
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
	);
};

export default UserDetails;
