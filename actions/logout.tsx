"use server"

import { signOut } from "@/auth"

export const logOut = async () => {
    // perform any server function before signout
    await signOut();
}