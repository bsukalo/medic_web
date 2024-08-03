import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Details {
	id: string;
	username: string;
	name: string;
	orders: string;
	status: string;
	imageURL: string;
	dateOfBirth: string;
	lastLogin: string;
	isAdmin: boolean;
	isBlocked: boolean;
}

const useDetails = () => {
	const [details, setDetails] = useState<Details | null>(null);
	const [error, setError] = useState("");
	const id = localStorage.getItem("selected_user_id");

	useEffect(() => {
		const controller = new AbortController();

		apiClient
			.get<Details>(`/users/details/${id}`, {
				signal: controller.signal,
			})
			.then((res) => {
				setDetails(res.data);
			})
			.catch((err) => setError(err.message));

		return () => controller.abort();
	}, [id]);

	return { details, error };
};

export default useDetails;
