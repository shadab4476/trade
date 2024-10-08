import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function IndexTrade() {
    const redirect = useNavigate();
    const [isDeleteId, setIsDeleteId] = useState(null);
    const [isLoader, setIsLoader] = useState(true);
    const [isDeleteCheck, setIsDeleteCheck] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [error, setError] = useState("");
    const [trade, setTrade] = useState([]);
    useEffect(() => {
        getTrade()
    }, []);

    const deleteTrade = async (id) => {
        setIsLoader(true);
        setIsDeleteCheck(false);
        setIsDeleteId(null);

        await axios.post("http://localhost:8000/api/trading/delete/" + id).then(({ data }) => {
            if (data.status == false) {
                setDeleteError("Somthing went wrong Please try again!!");
            } else {
                console.log("deleted..");
                getTrade();
            }
            setIsLoader(false);
        });
    }
    const handleDeleteCheck = (id) => {
        setIsDeleteCheck(true);
        setIsDeleteId(id);
    }

    const handleDeleteCancel = (id) => {
        setIsDeleteCheck(false);
        setIsDeleteId(null);
    }
    const getTrade = async () => {
        await axios.post("http://localhost:8000/api/trading/index").then(({ data }) => {
            try {
                if (data.status == false) {
                    setError(data.message);
                    console.log(error);
                } else {
                    console.log(data.data);
                    if (Array.isArray(data.data)) {
                        setTrade(data.data);
                    } else {
                        setTrade([]); // Set to an empty array or handle as needed
                    }
                }
            } catch (e) {
                setError("Something went wrong! Please try again...");
            }
            setIsLoader(false);
        });
    }

    return (
        <>
            <div id="exampleWrapper" className="bg-gray-900 p-5 overflow-hidden">
                {deleteError ? <span className="font-medium p-1 text-red-600 block w-full text-center hover:underline">{deleteError}</span> : ""}
                <div className="relative w-[70%] mx-auto  overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left  text-gray-400">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700 ">
                            <tr className="text-center">
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Owner Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {trade && isLoader == false ? trade.map(data => {
                                return (<tr className="text-center" key={data.id}>
                                    <td scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                        {data.stock_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.owner_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.date}
                                    </td>
                                    <td className="px-6 py-4 flex justify-between">
                                        <Link to={`/edit/${data.id}`} className="font-medium p-1 text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        {isDeleteCheck ? <div>
                                            <div className="fixed inset-0 bg-gray-900 bg-opacity-75  flex justify-center items-center">
                                                <div className="bg-white rounded-lg shadow-md p-4 w-[25%]">
                                                    <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
                                                    <p className="text-gray-600 mb-4">Are you sure you want to delete this trade? <i><b>"{isDeleteId}"</b></i></p>
                                                    <div className="flex justify-between">
                                                        <button onClick={() => deleteTrade(isDeleteId)} className="font-medium py-2 px-4 rounded  transition-all  text-red-600 dark:text-blue-500 hover:underline hover:text-gray-200 hover:bg-red-400 ">Delete</button>
                                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => { handleDeleteCancel(data.id) }}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ""}
                                        <button onClick={() => { handleDeleteCheck(data.id) }} className="font-medium p-1 text-red-600 dark:text-blue-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                                )
                            }) :

                                <tr >
                                    <th colSpan={7} className="py-2 text-white text-center w-full ">Loading...</th>
                                </tr>
                            }
                            {
                                error ?
                                    <tr>
                                        <th colSpan={7} className="py-2 text-white text-center w-full ">{error} </th>
                                    </tr>
                                    : ""

                            }
                        </tbody>
                    </table>
                </div>
            </div >

        </>
    )
};

export default IndexTrade;