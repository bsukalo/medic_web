import CardItem from "./CardItem";

const UserCard = () => {
	return (
		<div
			className="card m-4 mt-0"
			style={{
				backgroundColor: "rgb(14,17,21)",
				width: "calc(100% - 50px)",
				maxWidth: "1440px",
			}}
		>
			<h5 className="card-header ">Name</h5>
			<div className="card-body mx-2">
				<div className="d-flex flex-row flex-wrap justify-content-between gap-3">
					<CardItem header="ID" body="123123123" />
					<CardItem header="Username" body="admin" />
					<CardItem header="Name" body="bob" />
					<CardItem header="Last login date" body="2-8-2024" />
				</div>
			</div>
		</div>
	);
};

export default UserCard;
