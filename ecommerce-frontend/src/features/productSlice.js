import {
    createSlice,
    createAsyncThunk
}
    from "@reduxjs/toolkit";

import ProductService
    from "../services/ProductService";

export const fetchProducts =
    createAsyncThunk(

        "products/fetchProducts",

        async () => {

            const response =
                await ProductService
                    .getProducts();

            return response.data;
        }
    );

export const addProduct =
    createAsyncThunk(

        "products/addProduct",

        async (product) => {

            const response =
                await ProductService
                    .createProduct(product);

            return response.data;
        }
    );

export const deleteProduct =
    createAsyncThunk(

        "products/deleteProduct",

        async (id) => {

            await ProductService
                .deleteProduct(id);

            return id;
        }
    );

export const updateProduct =
    createAsyncThunk(

        "products/updateProduct",

        async ({ id, product }) => {

            const response =
                await ProductService
                    .updateProduct(
                        id,
                        product
                    );

            return response.data;
        }
    );
const productSlice = createSlice({

    name: "product",

    initialState: {

        products: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                fetchProducts.pending,
                (state) => {

                    state.loading = true;
                }
            )

            .addCase(
                fetchProducts.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.products =
                        action.payload;
                }
            )

            .addCase(
                addProduct.fulfilled,
                (state, action) => {

                    state.products.push(
                        action.payload
                    );
                }
            )

            .addCase(
                deleteProduct.fulfilled,
                (state, action) => {

                    state.products =
                        state.products.filter(

                            product =>
                                product.id !==
                                action.payload
                        );
                }
            )

            .addCase(
                updateProduct.fulfilled,
                (state, action) => {

                    state.products =
                        state.products.map(product =>

                            product.id ===
                            action.payload.id

                                ? action.payload
                                : product
                        );
                }
            )
            .addCase(
                fetchProducts.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.error.message;
                }
            );
    }
});

export default productSlice.reducer;