import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { UserContext } from "../context/UserContext";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";

export default function Register() {
	useTitle("Sign Up");
	const { post } = useFetch();
	const router = useRouter();
	const { login } = React.useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = Object.fromEntries(new FormData(e.target));

		const { user, access_token } = await post(`/auth/register`, data);

		login(user, access_token);

		router.push("/");
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 30,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography
					component="h2"
					variant="h4"
					style={{
						fontFamily: "Poppins",
						color: "#60435F",
						fontWeight: "bold",
					}}
				>
					NICE TO MEET YOU!
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="name"
								label="Name"
								name="name"
								autoComplete="name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="mail"
								label="Email Address"
								name="mail"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
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
						Sign Up
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href="/" variant="body2" component={NextLink}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
