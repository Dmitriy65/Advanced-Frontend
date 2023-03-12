import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { RequireAuth } from 'app/providers/router/ui/RequireAuth';

const AppRouter = () => {
    const renderRoute = useCallback(({ path, element, authOnly }: AppRouteProps) => {
        const RouteElement = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">{element}</div>
            </Suspense>
        );

        return (
            <Route
                key={path}
                path={path}
                element={authOnly ? <RequireAuth>{RouteElement}</RequireAuth> : RouteElement}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>;
};

export default memo(AppRouter);
