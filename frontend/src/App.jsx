// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import AllProductsPage from "./Components/AllProductsPage/AllProductsPage";
import CartPage from "./Components/CartPage/CartPage";
import CategoriesPage from "./Components/Categories/CategoriesPage";
import CategoryProductsPage from "./Components/Categories/CategoryProductsPage";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import ProductPage from "./Components/ProductPage/ProductPage";
import Footer from "./Components/Footer/Footer";
function App() {

	return (
		<BrowserRouter>
			<div className="main">
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/products"  element={<AllProductsPage key='products' title='All products' discounted={false}/>} />
						<Route path="/sales"  element={<AllProductsPage key='sales' title='Discounted items' discounted={true}/>} />
						<Route path="/categories" element={<CategoriesPage />} />
           				<Route path="/categories/:id" element={<CategoryProductsPage />} />
           				<Route path="/cart" element={<CartPage />} />
						<Route path="/products/:id" element={<ProductPage />} />
            			<Route path="*" element={<NotFoundPage />} />
					</Routes>
					<Footer/>
					{/* Footer */}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
