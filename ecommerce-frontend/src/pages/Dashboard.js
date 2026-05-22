import {
    useEffect,
    useState
}
    from "react";

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

import ClipLoader
    from "react-spinners/ClipLoader";

import {
    addToCart
}
    from "../features/cartSlice";

function Dashboard() {

    const dispatch =
        useDispatch();

    const [search,
        setSearch] =
        useState("");

    const [currentPage,
        setCurrentPage] =
        useState(1);

    const productsPerPage = 2;

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

    const filteredProducts =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    const indexOfLastProduct =
        currentPage *
        productsPerPage;

    const indexOfFirstProduct =
        indexOfLastProduct -
        productsPerPage;

    const currentProducts =
        filteredProducts.slice(

            indexOfFirstProduct,

            indexOfLastProduct
        );

    if (loading) {

        return (

            <div
                className=
                    "d-flex justify-content-center mt-5"
            >

                <ClipLoader
                    size={60}
                />

            </div>
        );
    }

    if (error) {

        return (

            <div
                className=
                    "alert alert-danger mt-5"
            >

                Error:
                {error}

            </div>
        );
    }

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <h2>
                    Product Dashboard
                </h2>

                <input
                    type="text"
                    placeholder="Search Product"
                    className=
                        "form-control mb-4"

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                {
                    currentProducts.map(
                        product => (

                            <div
                                key={product.id}
                                className=
                                    "card p-3 mb-3"
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

                                <div className="mt-3">

                                    <button
                                        className=
                                            "btn btn-danger me-2"

                                        onClick={() =>
                                            dispatch(
                                                deleteProduct(
                                                    product.id
                                                )
                                            )
                                        }
                                    >

                                        Delete

                                    </button>

                                    <button
                                        className=
                                            "btn btn-warning me-2"

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

                                                name:
                                                updatedName,

                                                price:
                                                updatedPrice,

                                                stock:
                                                updatedStock
                                            };

                                            dispatch(
                                                updateProduct({

                                                    id:
                                                    product.id,

                                                    product:
                                                    updatedProduct
                                                })
                                            );
                                        }}
                                    >

                                        Edit

                                    </button>

                                    <button
                                        className=
                                            "btn btn-success"

                                        onClick={() =>
                                            dispatch(
                                                addToCart(product)
                                            )
                                        }
                                    >

                                        Add To Cart

                                    </button>

                                </div>

                            </div>
                        ))
                }

                <div className="mt-4">

                    {
                        Array.from({

                            length: Math.ceil(

                                filteredProducts.length
                                /
                                productsPerPage
                            )

                        }).map((_, index) => (

                            <button

                                key={index}

                                className=
                                    "btn btn-dark me-2"

                                onClick={() =>
                                    setCurrentPage(
                                        index + 1
                                    )
                                }
                            >

                                {index + 1}

                            </button>
                        ))
                    }

                </div>

            </div>

        </>
    );
}

export default Dashboard;