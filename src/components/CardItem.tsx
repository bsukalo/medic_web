interface CardItemProps {
	header: string;
	body: string;
}

const CardItem = ({ header, body }: CardItemProps) => {
	return (
		<div>
			<p className="mb-2">{header}</p>
			<h4>{body}</h4>
		</div>
	);
};

export default CardItem;
