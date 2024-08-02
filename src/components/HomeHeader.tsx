const HomeHeader = () => {
	return (
		<div
			className="px-4 d-flex flex-row justify-content-between align-items-center"
			style={{ backgroundColor: "rgb(14,17,21)", height: "100px" }}
		>
			<h2 className="my-1">Home</h2>
			<div className="btn btn-outline-light">Log out</div>
		</div>
	);
};

export default HomeHeader;
