"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Card, Box, Typography, CircularProgress } from "@mui/material";
import { getBasicMetrics } from "@/services/analyticsServices";
import { useFlow } from "@/context/FlowContext";

// Dynamically import react-apexcharts with Next.js dynamic import
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RevenueGrowth: React.FC = () => {
	const [isChartLoaded, setChartLoaded] = useState(false);
	const [totalLeads, setTotalLeads] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);
	const { selectedFlowId } = useFlow();

	useEffect(() => {
		setChartLoaded(true);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (!selectedFlowId) {
				setTotalLeads(null);
				return;
			}

			try {
				setLoading(true);
				const data = await getBasicMetrics(selectedFlowId);
				if (data) {
					setTotalLeads(data.totalLead);
				}
			} catch (error) {
				console.error("Error fetching total leads:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [selectedFlowId]);

	const series = [
		{
			name: "Total Leads",
			data: [3, 7, 7, 10, 9, 11, 15],
		},
	];

	const options: ApexOptions = {
		chart: {
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},

		colors: ["#3584FC"],
		dataLabels: {
			enabled: false,
		},
		grid: {
			show: false,
			borderColor: "#ECEEF2",
		},
		stroke: {
			curve: "straight",
			width: 1,
		},
		xaxis: {
			categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			axisTicks: {
				show: false,
				color: "#ECEEF2",
			},
			axisBorder: {
				show: false,
				color: "#ECEEF2",
			},
			labels: {
				show: false,
				style: {
					colors: "#8695AA",
					fontSize: "12px",
				},
			},
		},
		yaxis: {
			show: false,
			labels: {
				formatter: (val) => {
					return val + " " + "lead";
				},
				style: {
					colors: "#64748B",
					fontSize: "12px",
				},
			},
			axisBorder: {
				show: false,
				color: "#ECEEF2",
			},
			axisTicks: {
				show: false,
				color: "#ECEEF2",
			},
		},
		legend: {
			show: false,
			position: "top",
			fontSize: "12px",
			horizontalAlign: "left",
			itemMargin: {
				horizontal: 8,
				vertical: 0,
			},
			labels: {
				colors: "#64748B",
			},
			markers: {
				shape: "diamond",
				offsetX: -2,
				offsetY: -0.5,
			},
		},
	};

	return (
		<>
			<Card
				sx={{
					boxShadow: "none",
					borderRadius: "7px",
					mb: "25px",
					padding: { xs: "18px", sm: "20px", lg: "25px" },
					overflow: "visible",
				}}
				className="rmui-card lighter-bg"
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						position: "relative",
					}}
				>
					<Box>
						<Typography component="span" sx={{ mb: "3px", display: "block" }}>
							Total Leads
						</Typography>

						<Typography
							variant="h5"
							sx={{
								fontSize: { xs: "18px", lg: "20px" },
								fontWeight: 700,
								display: "flex",
								alignItems: "center",
								gap: 1,
							}}
							className="text-black"
						>
							{loading ? (
								<CircularProgress size={16} />
							) : !selectedFlowId ? (
								"Null"
							) : totalLeads === null ? (
								"No data"
							) : (
								totalLeads
							)}
						</Typography>
					</Box>

					<Box
						sx={{
							position: "absolute",
							top: "-28px",
							right: "-9px",
							maxWidth: "120px",
						}}
						className="crm-rg"
					>
						{isChartLoaded && (
							<Chart
								options={options}
								series={series}
								type="area"
								height={95}
								width={"100%"}
							/>
						)}
					</Box>
				</Box>
			</Card>
		</>
	);
};

export default RevenueGrowth;
