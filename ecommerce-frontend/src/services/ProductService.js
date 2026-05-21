import axios from "axios";

const API_URL =
    "http://localhost:8081/products";

const getProducts = () => {

    return axios.get(API_URL);
};

const createProduct = (product) => {

    return axios.post(
        API_URL,
        product
    );
};

const deleteProduct = (id) => {

    return axios.delete(
        `${API_URL}/${id}`
    );
};

const updateProduct = (
    id,
    product
) => {

    return axios.put(
        `${API_URL}/${id}`,
        product
    );
};

const ProductService = {

    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
};

export default ProductService;