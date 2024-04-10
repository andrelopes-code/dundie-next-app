"use client";

import { useRouter } from "next/navigation";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { useEffect, useState } from "react";
import { APP_ROUTES } from "@/constants/app-routes";
import setAuthCookies from "@/hooks/setAuthCookies";

const PrivateRoute = ({ children }) => {

    const { push } = useRouter();
    let [uAuth, setUAuth] = useState();
    

    useEffect(() => {
        const doTheVerify = async () => {
            const hasAccess = await checkIsAuthenticated();

            if (hasAccess === "") {
                console.log("No access")
                setUAuth(false);
            } else if (typeof hasAccess === "object") {
                console.log("Has access")
                setAuthCookies(hasAccess);
                setUAuth(true);
            } else {
                setUAuth(true);
            }
        }
        doTheVerify()
    },[uAuth])

    useEffect(() => {
        if (uAuth === false) {
            push(APP_ROUTES.public.login);
        }
    }, [uAuth]);


    return (
    <main>
        {!uAuth && null}
        {uAuth && children}
    </main>
    );
}


export default PrivateRoute;
