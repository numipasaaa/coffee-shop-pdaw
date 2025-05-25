import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51RRtZXGKqWUxPYkVqSUYl5RrCc0aDEcHgH3Y7P7tEV00K9Doy4HtblRwNjUeDUcs2DZNnFyQ3RAk77POejkWagt400NPGBfkhN");

// placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.orderData.items,
            amount: req.body.orderData.amount,
            address: req.body.orderData.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.orderData.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({success: true, session_url: session.url});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error at placing order"});
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success: true, message: "Payment successful."});
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false, message: "Payment failed."});
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error at verifying order"});
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error at user order"});
    }
}

// listing all orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error at listOrders"});
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status updated."});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error at updateStatus"});
    }
}

const removeOrder = async (req, res) => {
    const orderId = req.body.id;

    try {
        const order = await orderModel.findById(orderId);
        if (order) {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: true, message: "Order removed successfully."});
        } else {
            res.json({success: false, message: "Order not found."});
        }
    } catch (err) {
        console.log(err);
        res.json({success: false, message: "Failed to remove order."});
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus, removeOrder};