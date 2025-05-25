import foodModel from "../models/foodModel.js";
import fs from "fs";
import userModel from "../models/userModel.js";

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

const fetchFood = async (req, res)=> {
    const foodId = req.body.itemId;

    try {
        const food = await foodModel.findById(foodId);
        res.json({success: true, data: food});
    }catch(err) {
        console.log(err)
        res.json({success: false, message: "Failed to fetch food items."});
    }
}

const editFood = async (req, res) => {
    const itemId = req.body.data._id;
    const name = req.body.data.name;
    const description = req.body.data.description;
    const price = req.body.data.price;
    const image = req.body.data.image;
    const category = req.body.data.category;

    try {
        const item = await foodModel.findById(itemId);

        if (!item) {
            return res.json({success: false, message: "Failed to edit food item."});
        }

        await foodModel.findByIdAndUpdate(itemId, {name: name, description: description, price: price, image: image, category: category});

        res.json({success: true, message: "Food item updated successfully."});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Failed to edit food item."});
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

export { addFood, listFood, removeFood, editFood, fetchFood };