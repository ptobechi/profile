import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import FormError from "@/components/form-error";

interface RoleGate {
    children: React.ReactNode
    allowedRole: UserRole
}

export const RoleGate = ({
    children,
    allowedRole
}: RoleGate) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message="You do not have permission to view this page"/>
        )
    }

    return (
        <>
            {children}
        </>
    )
}
