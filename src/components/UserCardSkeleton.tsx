const UserCardSkeleton = () => {
	return (
		<p
			className="placeholder-glow mb-4"
			style={{
				width: "calc(100% - 50px)",
				height: "200px",
				opacity: "25%",
			}}
		>
			<span
				className="placeholder mb-4"
				style={{ width: "100%", height: "200px" }}
			></span>
		</p>
	);
};

export default UserCardSkeleton;
