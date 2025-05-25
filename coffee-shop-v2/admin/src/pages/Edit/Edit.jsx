import React, {useEffect, useState} from 'react'
import './Edit.css'
import {assets} from "../../assets/assets.js";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

const Edit = ({url}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const itemId = searchParams.get("itemId");
    const [image, setImage] = useState(false);
    const [data, setData] = React.useState({})

    const fetchData = async (itemId) => {
        const response = await axios.post(url + '/api/food/fetch', {itemId})
        console.log(response)
        setData(response.data.data);
    }

    useEffect(() => {
        if (itemId) {
            fetchData(itemId);
        }
    }, [itemId])


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (image) {
            data.image = image;
        }

        const response = await axios.post(`${url}/api/food/edit`, {data});

        if (response.data.success) {
            toast.success(response.data.message);
            navigate("/list");
        }
        else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className="add">
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=""/>
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter name' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Enter description' required ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} value={data.category} name="category" required>
                            <option value="Coffee">Coffee</option>
                            <option value="Bottled Drinks">Bottled Drinks</option>
                            <option value="Cold Drinks">Cold Drinks</option>
                            <option value="Hot Drinks">Hot Drinks</option>
                            <option value="Home Barista">Home Barista</option>
                            <option value="Tea">Tea</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Brunch">Brunch</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Enter price' required />
                    </div>
                </div>
                <>
                    <button type="submit" className='add-btn'>EDIT</button>
                    <button className='delete-btn' onClick={() => navigate("/list")}>Cancel</button>
                </>
            </form>
        </div>
    )
}
export default Edit
