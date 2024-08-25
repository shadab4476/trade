
import { useState } from "react";
import axios from 'axios';
import { redirect, useNavigate } from "react-router-dom";

function FormAdd() {
    const redirect = useNavigate();
    const [errors, setErrors] = useState({});
    const [formInput, setFormInput] = useState({
        stock_name: "",
        owner_name: "",
        price: "",
        quantity: "",
        date: "",
    });
    const addTrade = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/trading/add", formInput).then(({ data }) => {
            if (data.status == false) {
                setErrors(data.errors);
                console.log(data.errors);
                console.log(data.data);
            } else {
                setErrors({});
                setFormInput({});
                console.log("success");
                redirect('/index');
            }
        });
    }
    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <div className="my-5 ">
                <h1 className="text-3xl font-bold text-center">Add Trade</h1>
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="owner_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner Name</label>
                        <input onChange={handleChange} type="text" id="owner_name" name="owner_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {errors.owner_name && <div className="text-red-500">{errors.owner_name}</div>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="stock_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stoke Name</label>
                        <input onChange={handleChange} type="text" name="stock_name" id="stock_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {errors.stock_name && <div className="text-red-500">{errors.stock_name}</div>}

                    </div>
                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input onChange={handleChange} type="number" id="price" name="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {errors.price && <div className="text-red-500">{errors.price}</div>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input onChange={handleChange} type="number" id="quantity" name="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {errors.quantity && <div className="text-red-500">{errors.quantity}</div>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input onChange={handleChange} type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {errors.date && <div className="text-red-500">{errors.date}</div>}
                    </div>
                    <button type="submit" onClick={addTrade} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>
    )
};

export default FormAdd;