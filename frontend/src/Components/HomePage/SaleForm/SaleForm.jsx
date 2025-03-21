import React, {useState} from "react";

import s from './SaleForm.module.css'

import HandsUp from "./handsUp.png";
function SaleForm() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
   

    const handleSubmit = (e) => {
        e.preventDefault();

        // обработка формы

        e.target.reset();
        setName('');
        setPhone('');
        setEmail('');
    }

	return (
		<div className={`pageContent ${s.formContainer}`}>
			<h2 className={s.h2}>5% off on the first order</h2>
			<div className={s.innerContainer}>
				<img src={HandsUp} alt="handsUp" className={s.hands}/>
                <form className={s.form} onSubmit={handleSubmit}>
                     <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} className={s.discountInput}/>
                     <input type='number' placeholder="Phone number" onChange={(e)=>{setPhone(e.target.value)}} className={s.discountInput}/>
                     <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} className={s.discountInput}/>
                     <button className={s.discountButton}>Get a discount</button>
                </form>
			</div>
		</div>
	);
}

export default SaleForm;
