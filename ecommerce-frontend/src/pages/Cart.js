import {
    useDispatch,
    useSelector
}
    from "react-redux";

import {
    removeFromCart,
    clearCart
}
    from "../features/cartSlice";

import Navbar
    from "../components/Navbar";

function Cart() {

    const dispatch =
        useDispatch();

    const {
        cartItems
    } = useSelector(
        (state) => state.cart
    );

    const totalPrice =

        cartItems.reduce(

            (total, item) =>

                total + item.price,

            0
        );

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <h2>
                    Shopping Cart
                </h2>

                {
                    cartItems.length === 0 && (

                        <h4>
                            Cart is Empty
                        </h4>
                    )
                }

                {
                    cartItems.map(item => (

                        <div
                            key={item.id}
                            className=
                                "card p-3 mb-3"
                        >

                            <h4>
                                {item.name}
                            </h4>

                            <p>
                                Price:
                                ${item.price}
                            </p>

                            <button

                                className=
                                    "btn btn-danger"

                                onClick={() =>
                                    dispatch(
                                        removeFromCart(
                                            item.id
                                        )
                                    )
                                }
                            >

                                Remove

                            </button>

                        </div>
                    ))
                }

                {
                    cartItems.length > 0 && (

                        <div className="mt-4">

                            <h3>

                                Total:
                                ${totalPrice}

                            </h3>

                            <button

                                className=
                                    "btn btn-primary"

                                onClick={() => {

                                    alert(
                                        "Order Placed Successfully"
                                    );

                                    dispatch(
                                        clearCart()
                                    );
                                }}
                            >

                                Checkout

                            </button>

                        </div>
                    )
                }

            </div>

        </>
    );
}

export default Cart;