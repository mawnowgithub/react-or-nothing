const Table = ({ data, filterNoStock, searchTerm }) => {
	const categories = {};

	for (const product of data) {
		if (product.category in categories) {
			categories[product.category].push(product);
			continue;
		}
		categories[product.category] = [];
	}
	console.log(categories);

	const tableContent = [];

	for (const [category, products] of Object.entries(categories)) {
		let id = 0;
		const rows = [];
		const subHead = (
			<tr className="subhead" key={`${id}-subhead`}>
				<th colSpan="2">{category}</th>
			</tr>
		);
		rows.push(subHead);
		for (const product of products) {
			if (filterNoStock && !product.stocked) continue;
			if (searchTerm !== "") {
				if (!product.name.toLowerCase().includes(searchTerm.toLowerCase()))
					continue;
			}
			const row = (
				<tr key={id}>
					<td className={product.stocked ? "in-stock" : "out-stock"}>
						{product.name}
					</td>
					<td>{product.price}</td>
				</tr>
			);

			rows.push(row);
			id += 1;
		}

		tableContent.push(rows);
	}

	return (
		<table className="stock-table">
			<tbody>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
				{tableContent}
			</tbody>
		</table>
	);
};

export default Table;
