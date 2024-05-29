import { useEffect, useState } from "react";

const Form = ({ filterStock, updateSearchTerm }) => {
	const [filterNoStock, setFilterNoStock] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const toggleCheck = () => {
		console.log("changed");
		setFilterNoStock(!filterNoStock);
	};

	const updateSearch = (e) => {
		const { target } = e;
		setSearchTerm(target.value);
	};

	useEffect(() => {
		filterStock(filterNoStock);
	}, [filterNoStock]);

	useEffect(() => {
		updateSearchTerm(searchTerm);
	}, [searchTerm]);

	return (
		<>
			<h2>Filter options</h2>
			<form action="">
				<input
					className="input__text"
					type="text"
					placeholder="Search"
					value={searchTerm}
					onChange={updateSearch}
				/>
				<label htmlFor="">
					<input
						type="checkbox"
						name="available"
						id=""
						checked={filterNoStock}
						onChange={toggleCheck}
					/>
					Show only products with stock
				</label>
			</form>
		</>
	);
};

export default Form;
