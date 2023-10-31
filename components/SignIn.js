import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";

export default function SignIn() {
	useTitle("Sign In");
	const { login } = useContext(UserContext);
	const { post } = useFetch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { mail, password } = Object.fromEntries(new FormData(e.target));

		const { user, access_token } = await post(`/auth/authenticate`, {
			mail,
			password,
		});

		login(user, access_token);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 20,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography
					component="h1"
					variant="h3"
					style={{ fontFamily: "Poppins", color: "#60435F" }}
				>
					WELCOME BACK!
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="mail"
						label="Email Address"
						name="mail"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						fontFamily="Poppins!important"
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						style={{
							fontFamily: "Poppins",
							color: "#FDF7FA",
							fontSize: "20px",
							border: "3px solid #60435F",
							borderRadius: "8px",
							background: "#60435F",
						}}
					>
						Sign In
					</Button>

					<Grid container justifyContent="center">
						<Grid item>
							<Link href="/register" component={NextLink}>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
