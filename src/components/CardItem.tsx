interface CardItemProps {
	header: string;
	body: string | React.ReactNode;
}

const CardItem = ({ header, body }: CardItemProps) => {
	return (
		<div
			style={{
				width: "200px",
				textAlign: "left",
			}}
		>
			<p className="mb-2 border-bottom">{header}</p>
			<h5>{body}</h5>
		</div>
	);
};

export default CardItem;
