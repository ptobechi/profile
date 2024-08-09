"use client"
import { useCurrentUser } from "@/hooks/active-user-session";
import {signOut } from "next-auth/react";

const Dashbaord = () => {
    const user = useCurrentUser();

    const onSubmit = () => {
        signOut()
    }
    return (
        <>
            <button onClick={onSubmit} className="cursor-pointer">
                Signout
            </button>
        </>
    )
}
export default Dashbaord;