import {
    Link,
    useNavigate
}
    from "react-router-dom";

function Navbar() {

    const navigate =
        useNavigate();

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        navigate("/");
    };

    return (

        <nav
            className=
                "navbar navbar-dark bg-dark px-4"
        >

            <h2 className="text-white">

                Ecommerce App

            </h2>

            <div className="d-flex">

                <Link
                    to="/dashboard"
                    className=
                        "btn btn-light me-2"
                >

                    Dashboard

                </Link>

                <Link
                    to="/add-product"
                    className=
                        "btn btn-warning me-2"
                >

                    Add Product

                </Link>

                <Link
                    to="/cart"
                    className=
                        "btn btn-success me-2"
                >

                    Cart

                </Link>

                <button
                    className=
                        "btn btn-danger"

                    onClick={
                        handleLogout
                    }
                >

                    Logout

                </button>

            </div>

        </nav>
    );
}

export default Navbar;