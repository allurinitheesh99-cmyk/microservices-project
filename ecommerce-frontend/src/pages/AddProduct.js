import { useState } from "react";

import {
    useDispatch
}
    from "react-redux";

import {
    addProduct
}
    from "../features/productSlice";

import Navbar
    from "../components/Navbar";

function AddProduct() {

    const dispatch =
        useDispatch();

    const [name, setName] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [stock, setStock] =
        useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        const product = {

            name,
            price,
            stock
        };

        dispatch(addProduct(product));

        alert("Product Added");

        setName("");
        setPrice("");
        setStock("");
    };

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="card p-4">

                    <h2>Add Product</h2>

                    <input
                        type="text"
                        placeholder="Product Name"
                        className="form-control mb-3"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="form-control mb-3"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        className="form-control mb-3"
                        value={stock}
                        onChange={(e) =>
                            setStock(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >

                        Add Product

                    </button>

                </div>

            </div>

        </>
    );
}

export default AddProduct;