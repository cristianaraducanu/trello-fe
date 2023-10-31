import {
	AppBar,
	Avatar,
	Button,
	CssBaseline,
	Toolbar,
	Typography,
} from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { TITLE } from "../constants";
import { UserContext } from "../context/UserContext";
import { getAvatarInitials } from "../utils";

export default function Layout({ children }) {
	const { user } = useContext(UserContext);
	const name = user ? user.name : "";

	return (
		<>
			<CssBaseline />
			<AppBar
				position="static"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid #ddd` }}
				style={{ background: "#60435F" }}
			>
				<Toolbar sx={{ flexWrap: "wrap" }} color="info">
					<Typography
						variant="h6"
						color="#E2A3C7"
						noWrap
						sx={{ flexGrow: 1 }}
						className="app-title"
					>
						<Link href="/">{TITLE} ❤</Link>
					</Typography>

					<Link href="/" className="my-boards-btn">
						<Button
							sx={{ mr: 3 }}
							variant="full"
							color="secondary"
							style={{
								color: "#FDF7FA",
								fontSize: "16px",
								fontFamily: "Poppins",
							}}
						>
							My boards
						</Button>
					</Link>

					<Avatar sx={{ bgcolor: "#ffc0a0" }}>{getAvatarInitials(name)}</Avatar>
					<Typography sx={{ ml: 1, fontFamily: "Poppins" }}>{name}</Typography>
				</Toolbar>
			</AppBar>
			<main style={{ height: "100%" }}>{children}</main>
		</>
	);
}
