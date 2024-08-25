
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function FormAdd() {
    const redirect = useNavigate();
    const [errors, setErrors] = useState({});
    const [isAddLoader, setIsAddLoader] = useState(false);
    const [formInput, setFormInput] = useState({
        stock_name: "",
        owner_name: "",
        price: "",
        quantity: "",
        date: "",
    });
    const addTrade = (e) => {
        setIsAddLoader(true);
        e.preventDefault();
        axios.post("http://localhost:8000/api/trading/add/", formInput).then(({ data }) => {
            if (data.status == false) {
                setErrors(data.errors);
                console.log(data.errors);
                console.log(data.data);
                setIsAddLoader(false);
            } else {
                setErrors({});
                setFormInput({});
                console.log("success");
                redirect('/index');
                setIsAddLoader(false);
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
                    <button disabled={isAddLoader ? true : ""} onClick={addTrade} type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        {isAddLoader ?
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            : ""}
                        {isAddLoader ? "Loading.." : "Submit"}
                    </button>
                </form>
            </div>
        </>
    )
};

export default FormAdd;