import { Add } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";
import Layout from "./Layout";
import AddBoardModal from "./modals/AddBoardModal";

export default function Boards() {
	useTitle("Boards");
	const { get } = useFetch();

	const [boards, setBoards] = useState([{ name: "Board 1", id: 1 }]);
	const [createBoard, setCreatedBoard] = useState(false);

	const addBoard = (board) => {
		setBoards([...boards, board]);
		setCreatedBoard(false);
	};

	useEffect(() => {
		get(`/board/list`).then(setBoards);
	}, []);

	return (
		<Layout>
			{createBoard && (
				<AddBoardModal
					onAddBoard={addBoard}
					onRequestClose={() => setCreatedBoard(false)}
				/>
			)}

			<Container component="main" sx={{ pt: 8, pb: 6 }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Stack direction="row">
						<Typography
							component="h4"
							variant="h4"
							color="#60435F"
							fontWeight="bold"
							className="poppins-font"
						>
							My Boards
						</Typography>
					</Stack>
				</Stack>

				<div className="boards-container">
					{boards.length === 0 && (
						<p>No boards yet. Get productive by creating one.</p>
					)}

					{boards.map((board) => (
						<Link href={`/boards/${board.id}`} key={board.id}>
							<div className="board-card">{board.name}</div>
						</Link>
					))}
				</div>
				<div style={{ display: "flex", justifyContent: "end" }}>
					<Button
						variant="contained"
						startIcon={<Add />}
						onClick={() => setCreatedBoard(true)}
						style={{
							fontFamily: "Poppins",
							fontSize: "20px",
							background: "#60435F",
							marginTop: "20px",
							marginLeft: "0",
						}}
					>
						Create board
					</Button>
				</div>
			</Container>
		</Layout>
	);
}
