"use client";

import * as React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const ConfirmEmailForm: React.FC = () => {
	return (
		<>
			<Box
				className="auth-main-wrapper forgot-password-area"
				sx={{
					py: { xs: "60px", md: "80px", lg: "100px", xl: "135px" },
				}}
			>
				<Box
					sx={{
						maxWidth: { sm: "500px", md: "1255px" },
						mx: "auto !important",
						px: "12px",
					}}
				>
					<Grid
						container
						alignItems="center"
						columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 3 }}
						textAlign="center"
					>
						<Grid item xs={12} md={12} lg={12} xl={5}>
							<Box
								className="form-content"
								sx={{
									paddingLeft: { xs: "0", lg: "10px" },
								}}
							>
								<Box
									className="logo"
									sx={{
										mb: "23px",
									}}
								>
									<Box className="navbar-logo"></Box>
								</Box>

								<Box
									className="title"
									sx={{
										mb: "23px",
									}}
								>
									<Typography
										variant="h1"
										className="text-black"
										sx={{
											fontSize: { xs: "22px", sm: "25px", lg: "28px" },
											mb: "10px",
											fontWeight: "600",
										}}
									>
										Welcome back to Sine!
									</Typography>

									<Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
										Your mail is verified! Your account is now safe from
										unwanted activities.
									</Typography>
								</Box>

								<Box>
									<Box mb="30px">
										<Box
											className="logo bg-white text-success rounded-circle"
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												width: "120px",
												height: "120px",
											}}
										>
											<i
												className="material-symbols-outlined"
												style={{ fontSize: "55px" }}
											>
												done
											</i>
										</Box>

										<Typography
											component="span"
											sx={{
												display: "block",
												fontWeight: "500",
												fontSize: "16px",
												mt: "20px",
											}}
											className="text-black"
										>
											Your Email Verified{" "}
											<span className="text-success">Successfully!</span>
										</Typography>
									</Box>

									<Link href="/dashboard/ecommerce/">
										<Button
											type="submit"
											variant="contained"
											sx={{
												textTransform: "capitalize",
												borderRadius: "6px",
												fontWeight: "500",
												fontSize: { xs: "13px", sm: "16px" },
												padding: { xs: "10px 20px", sm: "10px 24px" },
												color: "#fff !important",
												boxShadow: "none",
												width: "100%",
											}}
										>
											<i className="material-symbols-outlined mr-5">login</i>
											Back To Home
										</Button>
									</Link>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	);
};

export default ConfirmEmailForm;
