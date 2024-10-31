# Food Delivery Application

## Table of Contents:
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)


## Project Overview
The Food Delivery Application provides users with the ability to:

- Register, log in, and update their profile.
- Create and manage their own restaurant and menu.
- Browse restaurants by cuisine type and place food orders.
- Use Stripe for secure payment.
- This project is divided into two main parts: a Frontend and a Backend. Each part is structured to work seamlessly together, providing a smooth user experience from browsing 
  restaurants to placing orders and managing profiles.

## Features
User Features
- Authentication with Auth0 for secure login and signup.
- Profile Management: Create and update user details.
- Restaurant & Menu Creation: Allows users to create their own restaurant and add menus.
- Order Management: Users can view and place orders.
- Search Restaurants: Browse restaurants by cuisine.
- Payments: Secure payments through Stripe.
- Admin Features (Restaurant Owners)
- Restaurant & Menu Management: Full control over restaurant details and menus.
- Order Tracking: View and manage orders from customers.
  
Admin Features (Restaurant Owners)
- Restaurant & Menu Management: Full control over restaurant details and menus.
- Order Tracking: View and manage orders from customers.


## Technologies Used
 ## Frontend
- React with TypeScript
- Vite for fast development
- React Router DOM for client-side routing
- Tailwind CSS for styling
- Lucide Icons
- Shadcn for pre-built components
- React Hook Form for form handling

## Backend
- Node.js and Express with TypeScript
- Auth0 for authentication (login and signup)
- Express Validator for request validation
- Mongoose for MongoDB data modeling
- MongoDB for the database
- Cloudinary for image uploads
- Stripe for payment processing

## Getting Started
Prerequisites
- Node.js and npm
- MongoDB database
- Cloudinary and Stripe accounts
- Auth0 account for authentication
  
Installation
1. Clone the repository: <br>
git clone https://github.com/nadiia0811/mern-food-ordering-app-frontend.git<br>
cd ordering-food-app<br>

2. Install frontend dependencies:<br>
cd frontend<br>
npm install<br>

3. Install backend dependencies:<br>
cd ../backend<br>
npm install<br>

## Environment Variables
Create .env files in both the frontend and backend folders with the following variables.

Frontend: <br>
- VITE_API_BASE_URL - Base URL for the backend API <br>
- VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID - variables defined in auth0/applications <br>
- VITE_AUTH0_CALLBACK_URL - Base URL for the frontend API <br>
- VITE_AUTH0_AUDIENCE - defined in auth0/APIs <br>

Backend: <br>
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET - from cloudinary
- FRONTEND_URL - Base frontend URL
- STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET - from Stripe

## Usage
1. Run the frontend: <br>
cd frontend <br>
npm run dev <br>

2. Run the backend: <br>
cd backend <br>
npm run dev <br>

3. Open the application: <br>
- Frontend should be available on http://localhost:5173
- Backend API should be available on http://localhost:YOUR_PORT




