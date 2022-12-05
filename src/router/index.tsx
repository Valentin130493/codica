import {
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import {Route} from "react-router";
import {routes} from "../static/routes";
import {Layout} from "../components/";
import {Details, ErrorPage, Home} from "../pages";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={routes.layout} element={<Layout/>} errorElement={<ErrorPage/>}>
            <Route index element={<Home/>}/>
            <Route path={routes.details} element={<Details/>}/>
        </Route>
    )
);
