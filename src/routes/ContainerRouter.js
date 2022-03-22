import React from 'react';
import PrivateRoute from '../../src/components/PrivateRoute';
import routes from "../routes/routes";

function ContainerRouter() {
    return (
        <>
            {routes.map((route, idx) => {
                return route.component ? (
                    <PrivateRoute
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ) : null;
            })}
        </>
    );
}

export default ContainerRouter
