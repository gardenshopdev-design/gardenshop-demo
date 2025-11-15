# GardenShop API – `project_backend`

This folder contains a small Node.js/Express API used by the **GardenShop** demo frontend.  
It serves product and category data and accepts simple sale/order requests.

You can run it locally and connect it to the React frontend in `frontend/`.

---

## Requirements

- Node.js **16+** (recommended: 18+)
- npm

---

## Running the API locally

From the root of the repository:

## `cd project_backend`
## `npm install`
## `npm run dev`

By default the API starts on:

- ## `http://localhost:3333`

You can change the port in the server configuration if needed.

---

## API endpoints

### GET

- ## `GET /categories/all`  
  Returns the list of all categories.

- ## `GET /categories/1`  
  Returns products for category with ID `1`.  
  Replace `1` with any other category ID.

- ## `GET /products/all`  
  Returns the list of all products.

- ## `GET /products/1`  
  Returns a single product with ID `1`.  
  Replace `1` with any other product ID.

---

### POST

- ## `POST /sale/send`  
  Sends a request to receive a sale / discount coupon.  
  The endpoint expects basic contact data in the request body.

- ## `POST /order/send`  
  Sends an order to the server.  
  The endpoint expects order details (products, contact data) in the request body.

---

## Usage in the demo

The React frontend (in the `frontend/` folder):

- loads categories and products from this API,
- uses `/sale/send` for the sale coupon form,
- uses `/order/send` for the checkout / order form.

In production you can either:

- deploy this API to a small server and update the API base URL in the frontend, or  
- replace it with your own backend while keeping the same endpoint structure.
