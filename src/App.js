import { useEffect, useState } from "react";

const Tile = ({ tile, index, mark }) => {
	return (
		<button
			key={index}
			data-button-index={index}
			className="square"
			onClick={mark}
		>
			{tile}
		</button>
	);
};

const Divider = ({ content }) => {
	return <div className="board-row">{content}</div>;
};

const Board = () => {
	const [player, setPlayer] = useState("X");
	const [game, updateGame] = useState(Array(9).fill(null));
	const [theWinner, updateWinner] = useState(false);
	const players = ["X", "O"];

	const checkForWinner = (player) => {
		const rows = [game.slice(0, 3), game.slice(3, 6), game.slice(6, 9)];
		const columns = [
			[game[0], game[3], game[6]],
			[game[1], game[4], game[7]],
			[game[2], game[5], game[8]],
		];
		const diagonal = [
			[game[0], game[4], game[8]],
			[game[2], game[4], game[6]],
		];

		return (
			checkGroups(player, rows) ||
			checkGroups(player, columns) ||
			checkGroups(player, diagonal) ||
			false
		);
	};

	const checkGroups = (player, group) => {
		let isWinner = false;
		for (const line of group) {
			isWinner = line.every((mark) => player === mark);
			if (isWinner) break;
		}
		return isWinner;
	};

	const mark = (e) => {
		if (theWinner) return;
		const { target } = e;
		const { buttonIndex: index } = target.dataset;
		if (game[index] !== null) return;

		setPlayer(player === players[1] ? players[0] : players[1]);

		let newGame = [...game];
		newGame[index] = player;

		updateGame(newGame);
	};

	useEffect(() => {
		let winner = game.includes(null) ? false : "No winner";
		for (const player of players) {
			if (checkForWinner(player)) {
				winner = `${player} is winner`;
				break;
			}
		}
		updateWinner(winner);
	}, [game]);

	const currentGame = game.map((tile, index) => {
		return <Tile key={index} tile={tile} index={index} mark={mark} />;
	});

	const finalContent = (tiles) => {
		let finalContent = [];
		let temporalTiles = [];
		let index = 0;
		let numTile = 0;

		for (const tile of tiles) {
			if (numTile < 3) {
				numTile += 1;
				temporalTiles.push(tile);
			}

			if (numTile === 3) {
				finalContent.push(<Divider key={index} content={temporalTiles} />);
				temporalTiles = [];
				numTile = 0;
				index += 1;
			}
		}
		return finalContent;
	};

	const replay = () => {
		setPlayer("X");
		updateGame(Array(9).fill(null));
		updateWinner(false);
	};

	if (theWinner) {
		return (
			<>
				{theWinner}
				<br />
				<br />
				{finalContent(currentGame)}
				<br />
				<br />
				<button className="replay" onClick={replay}>
					Replay
				</button>
			</>
		);
	}
	return <>{finalContent(currentGame)}</>;
};

export default Board;
