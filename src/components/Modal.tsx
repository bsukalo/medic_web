import { FC, ReactElement } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

interface ModalProps {
	show: boolean;
	onClose: () => void;
	title: string;
	children: ReactElement;
}

export default function Modal(props: ModalProps): ReturnType<FC> {
	return (
		<div
			className={`${"modal"} ${props.show ? "d-block" : "d-none"}`}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0,0,0,0.5)",
			}}
		>
			<div className="d-flex justify-content-center align-items-center">
				<span
					className="card"
					style={{
						top: 50,
						bottom: 100,
						width: "80%",
						height: "auto",
						marginBlockEnd: "100px",
					}}
				>
					<div
						className="d-flex align-items-top justify-content-between"
						style={{ height: "100px" }}
					>
						<h2
							style={{
								padding: "20px 0px 00px 20px",
								maxWidth: "300px",
							}}
						>
							{props.title}
						</h2>
						<button
							className="btn btn-outline-danger d-flex align-items-center justify-content-center"
							style={{
								height: "40px",
								width: "40px",
								borderRadius: "0px 5px 0px 0px",
							}}
							onClick={props.onClose}
						>
							<RiCloseLargeFill size={20} />
						</button>
					</div>
					<div>{props.children}</div>
				</span>
			</div>
		</div>
	);
}
