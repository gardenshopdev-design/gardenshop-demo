# GardenShop – React E-commerce Demo

**GardenShop** is a small demo storefront built with **React**.  
It demonstrates how I structure an online shop front end: categories, product listing with filters, product page, and a simple lead/order flow, all with a responsive layout.

---

## Live demo

Once deployed, you can place your URL here:

## `https://your-gardenshop-demo-url.vercel.app`

---

## What this demo includes

- **Home page**
  - Hero section with main headline and CTA
  - Category cards (quick access to product groups)
  - Promo / sale block

- **Product catalog**
  - Product grid with price and discount
  - Basic filtering and/or sorting (depending on loaded data)
  - Reusable `ProductCard` component

- **Category views**
  - Product listing for a selected category
  - Shared layout and styles with the main catalog

- **Product page**
  - Product details view
  - Price, discount, description and CTA

- **Lead / order flow**
  - Simple form for sale coupon and order submission
  - Requests are sent to the local API (`/sale/send`, `/order/send`)

- **Responsive layout**
  - Works on desktop, tablet and mobile
  - Grids, typography and navigation adapt to smaller screens

---

## Tech stack

- **React** (Create React App)
- **React Router** – routing between pages
- **React Redux / Redux Toolkit** – state management
- **Axios** – API/data fetching
- **CSS modules / component-scoped styles**

---

## Backend API

The project uses a small Node.js API as the backend.  
You run it locally; it acts as the data source for categories, products, sales and orders. You do **not** need to modify it.

### Installation & run (API)

From the API project directory:

## `npm install`  
## `npm run dev`

By default, the API is available on your machine, for example at:

## `http://localhost:3333`

### API endpoints

**GET**

- ## `GET /categories/all`  
  Returns all categories.

- ## `GET /categories/1`  
  Returns products for category with ID `1` (replace `1` with another ID as needed).

- ## `GET /products/all`  
  Returns all products.

- ## `GET /products/1`  
  Returns a single product with ID `1`.

**POST**

- ## `POST /sale/send`  
  Sends a request for a sale coupon.

- ## `POST /order/send`  
  Sends an order to the server.

The front-end uses these endpoints to load categories/products and to submit sale/order requests.

---

## Front-end (React app)

The front end is built with **Create React App** and consumes the local API described above.

### Requirements

- Node.js **18+** (recommended)  
- npm or yarn

### Installation & local development (front end)

From the front-end project directory:

## `npm install`  

Then start the development server:

## `npm start`

By default the app runs at:

## `http://localhost:3000`

Make sure your **API backend is running** before using the app; otherwise category/product requests and forms will fail.

---

## Available scripts

In the front-end project directory you can run:

### Development

Starts the app in development mode:

## `npm start`

The page will reload when you make changes.  
You may also see any lint errors in the console.

### Tests

Launches the test runner in interactive watch mode:

## `npm test`

### Production build

Builds the app for production into the `build` folder:

## `npm run build`

The build is optimized and minified.  
The generated files in `build/` can be deployed to any static hosting (and configured to talk to your API).

### Eject (advanced)

Copies the build configuration into your project:

## `npm run eject`

> **Note:** this is a one-way operation. Once you `eject`, you cannot go back.  
> For most small and medium projects there is no need to use this command.

---

## How I use this project

This repository is a **personal demo project**:

- It shows how I structure a small e-commerce front end in React.
- It includes a simple local API backend so everything can run on a developer machine.
- In real client work, I typically:
  - adapt the layout and styling to the client’s brand,
  - connect to an existing backend/API or use a similar lightweight API,
  - provide short video walkthroughs and a simple handover file describing what was changed and where it lives.

---

## Learn more

Official documentation:

- **Create React App docs**  
  ## `https://facebook.github.io/create-react-app/docs/getting-started`

- **React documentation**  
  ## `https://reactjs.org/`
