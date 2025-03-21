import React from "react";
import DiscountBanner from "./DiscountBanner/DiscountBanner";
import SaleForm from "./SaleForm/SaleForm";
import SaleCardHolder from "./SaleCardHolder/SaleCardHolder";
import Categories from './Categories/Categories'
function HomePage() {
	return (
		<div>
			<DiscountBanner />
			<Categories/>
			<SaleForm />
			<SaleCardHolder />
		</div>
	);
}

export default HomePage;
