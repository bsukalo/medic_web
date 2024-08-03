import CardItem from "./CardItem";
import useUsers from "../hooks/useUsers";

const UserCard = () => {
	const { users, error } = useUsers();
	console.log(users, error);

	return (
		<>
			{error && <p className="text-danger">{error}</p>}
			{users?.map((user) => (
				<div
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
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default UserCard;
