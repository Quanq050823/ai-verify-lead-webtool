import * as React from "react";
import Navbar from "@/components/FrontPages/Common/Navbar";
import HeroBanner from "@/components/FrontPages/Home/HeroBanner";
import KeyFeatures from "@/components/FrontPages/Common/KeyFeatures";
import Widgets from "@/components/FrontPages/Common/Widgets";
import Testimonials from "@/components/FrontPages/Common/Testimonials";
import OurTeam from "@/components/FrontPages/Common/OurTeam";
import FaqContent from "@/components/FrontPages/Common/FaqContent";
import ContactUs from "@/components/FrontPages/Common/ContactUs";
import Cta from "@/components/FrontPages/Common/Cta";
import Footer from "@/components/FrontPages/Common/Footer";
import DashBoard from "./pages/dashboard/page";

export default function Home() {
	return (
		<>
			{/* <DashBoard /> */}
			<div className="fp-wrapper">
				<Navbar />
				<HeroBanner />
				<Footer />
			</div>
		</>
	);
}
