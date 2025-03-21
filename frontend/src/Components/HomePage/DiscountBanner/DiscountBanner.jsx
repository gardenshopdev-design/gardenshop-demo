import React from "react";
import s from "./DiscountBanner.module.css";
import { useNavigate } from "react-router-dom";
function DiscountBanner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/sales');
  }
	return (
		<div className={s.banner}>
			<div className={s.dark}>
				<h1 className={s.h1}>
					Amazing Discounts <br /> on Garden Products!
				</h1>
				<button className={s.button} onClick={handleClick}>Check out</button>
			</div>
		</div>
	);
}

export default DiscountBanner;
