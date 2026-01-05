import { lazy } from "react";

export const Home = lazy(() => import("../pages/public/Home"));
export const ViewLocation = lazy(() => import("../pages/location/View"));
export const AddLocation = lazy(() => import("../pages/location/Add"));
export const EditLocation = lazy(() => import("../pages/location/Edit"));
export const AllCards = lazy(() => import("../pages/public/shopByCategoriesAllSubCategories/AllCards"));