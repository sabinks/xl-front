import React, { useEffect, useState } from "react";
import { booleanCheck, checkSubset } from "@/utils";
import { getCookie, deleteCookie, setCookie, removeCookies } from "cookies-next";
import { apiClient, logout } from "@/api";

interface UserType {
    name: string;
    email: string;
    phone: string;
    profile_image: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    access_token: string;
    signin: (
        role: string,
        token: string,
        callback: VoidFunction
    ) => void;
    signout: (callback: VoidFunction) => void;
    role: string;
    permissions: [];
    user: UserType;
    // can: Function;
    // show: Function;
    getUserDetails: Function;
    setAccessToken: Function;
    setIsAuthenticated: Function;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const isTokenPresent: any = getCookie("token");
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [access_token, setAccessToken] = React.useState<string>(isTokenPresent);
    const [role, setRole] = React.useState<string>('');
    const [permissions, setPermissions] = React.useState<any>();
    const [user, setUser] = React.useState<UserType>({
        email: "",
        name: "",
        phone: '',
        profile_image: ''
    });
    useEffect(() => {
        // getUserDetails()
    }, [])

    // useEffect(() => {
    //     if (access_token && isAuthenticated) {
    //         getUserDetails();
    //     }
    // }, [access_token]);
    useEffect(() => {
        if (isTokenPresent) {
            setIsAuthenticated(true)
            getUserDetails();
            setAccessToken(isTokenPresent);
        }
    }, [isTokenPresent])

    const getUserDetails = async () => {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        try {
            let { status, data } = await apiClient.post("auth/get-user");

            let { email, name, role, phone, profile_image } = data
            setUser(prev => ({
                ...prev, name, email, phone, profile_image
            }))
            setRole(role);
            setIsAuthenticated(true)
        } catch (error) {
            setIsAuthenticated(false)
            setAccessToken('')
            deleteCookie('token')
        }
    };

    const signin = (
        role: string,
        token: string,
        callback: VoidFunction
    ) => {
        if (token) {
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAccessToken(token);
            // setPermissions(permissions);
            setRole(role);
            // setUser((prev) => ({
            //     ...prev, email,
            // }));
            setIsAuthenticated(true);
            callback();
        }
    };

    // const can = (permission: string) => {
    //     if (checkSubset(["superadmin"], [role])) {
    //         return true;
    //     }
    //     return permissions.find((p: string) => p == permission) ? true : false;
    // };

    // const show = (permission: string) => {
    //     if (checkSubset(["superadmin"], role)) {
    //         return true;
    //     }
    //     return permissions?.find((p: string) => p == permission) ? true : false;
    // };

    const signout = async (callback: VoidFunction) => {
        await logout()
        deleteCookie("token")
        deleteCookie("role")
        setIsAuthenticated(false);
        callback();
    };

    const value = {
        role,
        permissions,
        access_token,
        setAccessToken,
        isAuthenticated,
        signin,
        signout,
        user,
        // can,
        // show,
        getUserDetails,
        setIsAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
