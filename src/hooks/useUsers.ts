import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface User {
	lastLogin: string;
	_id: string;
	username: string;
	name: string;
	orders: string;
	status: string;
	imageURL: string;
	dateOfBirth: string;
	isAdmin: boolean;
	isBlocked: boolean;
}

interface FetchUsersResponse {
	count: number;
	results: User[];
}

const useUsers = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		apiClient
			.get<FetchUsersResponse>("/users", { signal: controller.signal })
			.then((res) => setUsers(res.data.results))
			.catch((err) => setError(err.message));

		return () => controller.abort();
	}, []);
	return { users, error };
};

export default useUsers;
