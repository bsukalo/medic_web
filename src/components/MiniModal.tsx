import { FC, ReactElement } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

interface ModalProps {
	show: boolean;
	onClose: () => void;
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
			<div className="d-flex justify-content-center">
				<span
					className="card"
					style={{
						top: 200,
						width: "50%",
						minWidth: "250px",
						maxWidth: "512px",
						height: "200px",
					}}
				>
					<div
						className="d-flex align-items-top justify-content-between"
						style={{ height: "100px" }}
					>
						<h3
							className="text-danger"
							style={{
								padding: "20px 0px 00px 20px",
								maxWidth: "300px",
							}}
						>
							{"Login Error"}
						</h3>
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
					<div className="d-flex w-100 px-4 pb-5 justify-content-start">
						<p>{props.children}</p>
					</div>
				</span>
			</div>
		</div>
	);
}
