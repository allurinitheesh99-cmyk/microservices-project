import {
    useDispatch,
    useSelector
}
    from "react-redux";

import {
    removeFromCart
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

            </div>

        </>
    );
}

export default Cart;