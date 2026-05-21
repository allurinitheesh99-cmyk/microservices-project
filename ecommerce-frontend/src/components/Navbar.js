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
                "navbar navbar-dark bg-dark px-3"
        >

            <h3 className="text-white">

                Ecommerce App

            </h3>

            <div>

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

                <button
                    className=
                        "btn btn-danger"
                    onClick={handleLogout}
                >

                    Logout

                </button>

            </div>

        </nav>
    );
}

export default Navbar;