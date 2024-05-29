import Table from "./components/Table";
import Form from "./components/Form";
import data from "./components/mock_data/data";
import { useState } from "react";
import "./styles.css";

const App = () => {
	const [filterNoStock, filterStock] = useState(false);
	const [searchTerm, updateSearchTerm] = useState("");
	return (
		<>
			<Form filterStock={filterStock} updateSearchTerm={updateSearchTerm} />
			<Table
				data={data}
				filterNoStock={filterNoStock}
				searchTerm={searchTerm}
			/>
		</>
	);
};

export default App;
