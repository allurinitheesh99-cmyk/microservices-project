import {
    useEffect,
    useMemo,
    useState
}
    from "react";

import {
    useDispatch,
    useSelector
}
    from "react-redux";

import {
    fetchProducts
}
    from "../features/productSlice";

function useProducts() {

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

        dispatch(
            fetchProducts()
        );

    }, [dispatch]);

    const filteredProducts =
        useMemo(() => {

            return products.filter(
                product =>

                    product.name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );

        }, [products, search]);

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

    return {

        search,
        setSearch,

        currentPage,
        setCurrentPage,

        productsPerPage,

        filteredProducts,
        currentProducts,

        loading,
        error
    };
}

export default useProducts;