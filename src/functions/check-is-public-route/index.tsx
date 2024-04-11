import { APP_ROUTES } from "../../constants/app-routes";

export const checkIsPublicRoute = (asPath: string) => {
    const isPublicRoute = Object.values(APP_ROUTES.public).includes(asPath);
    
    return isPublicRoute
}