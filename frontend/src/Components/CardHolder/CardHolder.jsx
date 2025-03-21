import React from "react";
import s from "./CardHolder.module.css";
import { useNavigate } from "react-router-dom";

function CardHolder({
	items = [],
	Card,
	title = "",
	buttonTitle = "",
	nav = "/",
}) {
	// console.log(items);
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(nav);
	};
	return (
		<div>
			{title !== "" && (
				<div className={s.title}>
					<h2>{title}</h2>
					<div
						style={{
							borderTop: "1px solid #DDDDDD",
							width: "100%",
						}}
					></div>
					<button className={s.navButton} onClick={handleClick}>
						{buttonTitle}
					</button>
				</div>
			)}
			<div className={s.cardHolder}>
				{items.map((it) => (
					<Card item={it} key={it.id} />
				))}
			</div>
		</div>
	);
}

export default CardHolder;
