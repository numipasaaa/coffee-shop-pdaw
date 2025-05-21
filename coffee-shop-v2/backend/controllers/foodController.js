import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })

    try {
        await food.save();
        res.json({success: true, message: "Food item added successfully."});
    } catch (err) {
        console.log(err);
        res.json({success: false, message: "Failed to add food item."});
    }
}

// all food list
const listFood = async (req, res)=> {
    try{
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    } catch (err) {
        console.log(err);
        res.json({success: false, message: "Failed to fetch food items."});
    }
}

// remove food item
const removeFood = async (req, res) => {
    const foodId = req.body.id;

    try {
        const food = await foodModel.findById(foodId);
        if (food) {
            fs.unlink(`uploads/${food.image}`, ()=>{});
            await foodModel.findByIdAndDelete(foodId);
            res.json({success: true, message: "Food item removed successfully."});
        } else {
            res.json({success: false, message: "Food item not found."});
        }
    } catch (err) {
        console.log(err);
        res.json({success: false, message: "Failed to remove food item."});
    }
}

export { addFood, listFood, removeFood };