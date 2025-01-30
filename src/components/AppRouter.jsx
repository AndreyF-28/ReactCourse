import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../Router/routes";
import { AuthContext } from "../context/context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);

    return isAuth ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    exact={route.exact}
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
            ))}
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    exact={route.exact}
                    path={route.path}
                    element={route.element}
                    key={route.path} 
                />
            ))}
        </Routes>
    );
};

export default AppRouter;
