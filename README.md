# VendX: Vending Machine API

Welcome to the VendX Vending Machine API project! This API allows users to interact with a vending machine system where users with different roles can perform various actions like adding products, making purchases, and managing deposits.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Edge Cases](#edge-cases)
- [Contributing](#contributing)
- [License](#license)

## Introduction
In this exercise, the goal is to design a RESTful API for a vending machine system. Users with a "seller" role can manage products by adding, updating, or removing them. On the other hand, users with a "buyer" role can deposit coins into their account and make purchases using their deposited coins.

## Features
- CRUD operations for users (only POST doesn't require authentication)
- CRUD operations for products (with restricted access for POST, PUT, and DELETE)
- Deposit coins functionality for buyers
- Purchase products functionality for buyers
- Reset deposit functionality for buyers

## Installation
To install and run the VendX Vending Machine API locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vending-machine-api.git
2. Navigate to the project directory:
   ```bash
   cd vending-machine-api
3. Install dependencies:
   ```bash
   npm install
4. Start the server:
   ```bash
   npm start

## Usage
Once the server is running, you can interact with the API using HTTP requests to the provided endpoints.

## Endpoints
- POST /users: Create a new user.
- GET /users/:userId: Get user details.
- PUT /users/:userId: Update user details.
- DELETE /users/:userId: Delete a user.
- POST /products: Create a new product (accessible only to sellers).
- GET /products/:productId: Get product details.
- PUT /products/:productId: Update product details (accessible only to the seller who created the product).
- DELETE /products/:productId: Delete a product (accessible only to the seller who created the product).
- POST /deposit: Deposit coins into the buyer's account.
- POST /buy: Purchase products using deposited coins.
- POST /reset: Reset the buyer's deposit.

## Authentication
- Authentication is required for all endpoints except for POST /users.
- Users with a "seller" role can access seller-specific endpoints (product CRUD operations).
- Users with a "buyer" role can access buyer-specific endpoints (deposit, buy, reset).

## Edge Cases
When implementing the VendX Vending Machine API, consider the following edge cases and access issues:

- Handling invalid requests and inputs.
- Proper authentication and authorization mechanisms.
- Dealing with concurrency issues in deposit and purchase operations.
- Ensuring consistent error handling and response formats.

## Contributing
Contributions to the project are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## License
This project is licensed under the MIT License. Feel free to use and modify the code as per the terms of the license.
