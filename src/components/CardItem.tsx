interface CardItemProps {
	header: string;
	body: string | React.ReactNode;
}

const CardItem = ({ header, body }: CardItemProps) => {
	return (
		<div style={{ width: "220px" }}>
			<p className="mb-2">{header}</p>
			<h5>{body}</h5>
		</div>
	);
};

export default CardItem;
