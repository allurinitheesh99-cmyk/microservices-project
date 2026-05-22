import {
    BrowserRouter,
    Routes,
    Route
}
    from "react-router-dom";

import Login
    from "./pages/Login";

import Dashboard
    from "./pages/Dashboard";

import AddProduct
    from "./pages/AddProduct";

import ProtectedRoute
    from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-product"

                    element={

                        <ProtectedRoute>

                            <AddProduct />

                        </ProtectedRoute>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;