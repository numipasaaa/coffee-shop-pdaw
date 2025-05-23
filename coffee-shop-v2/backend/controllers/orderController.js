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
                unit_amount: item.price * 100,
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
        res.json({success: false, message: "Error"});
    }
}

export {placeOrder}