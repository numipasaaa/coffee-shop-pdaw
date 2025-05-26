# PinCafe Coffee Shop Web Application
# Exploding Kittens Multiplayer Game
A simple and intuitive web application for PinCafe, allowing customers to easily browse our menu, customize their orders, and enjoy a seamless pickup experience.

## Components
- `frontend`: Facilitates the interaction of the user with the backend
- `admin`: Handles the interaction of the owner with the backend
- `backend`: Implements the backbone of the application, such as the connection to the database

# Authentication and User Management
- Users can sign up, log in, log out, and reset their password
- Users can view their profile and update their information
- All users are stored in a MongoDB database

# Menu and Orders
- Users can view the menu
- Each item has a name, description, price and image
- Each item is categorized
- Users can add items to their cart
- Users can view their cart
- Users can place an order
- Orders have an OrderID, date, time, total price and status
- Orders are stored in a MongoDB database
- Payment page using Stripe

# Admin Panel
- Admins can view all items
- Admins can add items
- Admins can edit an item's data
- Admins can view all ongoing orders
- Admins can update the order status
- Admins can view all users registered
- Admins can edit an user's data

# Specifications
- Frontend
    - HTML, CSS, JavaScript
    - React
- Backend
    - Node.js
    - Express
    - MongoDB
- CRUD Features
    - User Management
    - Menu
    - Orders


## License
Open-source project
