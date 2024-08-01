import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LoginForm />}></Route>
				<Route path="/home"></Route>
			</Routes>
		</div>
	);
};

export default App;
