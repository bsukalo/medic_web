import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LoginForm />}></Route>
				<Route path="/home" element={<ProtectedRoute />}>
					<Route path="/home" element={<></>}></Route>
				</Route>
			</Routes>
			<ToastContainer />
		</div>
	);
};

export default App;
