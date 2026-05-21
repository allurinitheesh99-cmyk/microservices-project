import { useEffect } from "react";

import {
    useDispatch,
    useSelector
}
    from "react-redux";

import {
    fetchProducts,
    deleteProduct,
    updateProduct
}
    from "../features/productSlice";
import Navbar
    from "../components/Navbar";



function Dashboard() {

    const dispatch =
        useDispatch();

    const {
        products,
        loading,
        error
    } = useSelector(
        (state) => state.product
    );

    useEffect(() => {

        dispatch(fetchProducts());

    }, [dispatch]);

    if (loading) {

        return <h2>Loading...</h2>;
    }

    if (error) {

        return <h2>Error: {error}</h2>;
    }

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <h2>Product Dashboard</h2>

                {
                    products.map(product => (

                        <div
                            key={product.id}
                            className="card p-3 mb-3"
                        >

                            <h4>
                                {product.name}
                            </h4>

                            <p>
                                Price:
                                ${product.price}
                            </p>

                            <p>
                                Stock:
                                {product.stock}
                            </p>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    dispatch(
                                        deleteProduct(product.id)
                                    )
                                }
                            >

                                Delete

                            </button>

                            <button
                                className=
                                    "btn btn-warning ms-2"
                                onClick={() => {

                                    const updatedName =
                                        prompt(
                                            "Enter Product Name",
                                            product.name
                                        );

                                    const updatedPrice =
                                        prompt(
                                            "Enter Price",
                                            product.price
                                        );

                                    const updatedStock =
                                        prompt(
                                            "Enter Stock",
                                            product.stock
                                        );

                                    const updatedProduct = {

                                        name: updatedName,
                                        price: updatedPrice,
                                        stock: updatedStock
                                    };

                                    dispatch(
                                        updateProduct({

                                            id: product.id,

                                            product:
                                            updatedProduct
                                        })
                                    );
                                }}
                            >

                                Edit

                            </button>

                        </div>

                    ))
                }

            </div>

        </>
    );
}

export default Dashboard;