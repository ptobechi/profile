"use client"
import { useSearchParams } from "next/navigation"
import CardWrapper from "./card-wrapper"
import {BeatLoader} from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { tokenVerification } from "@/actions/token-verification"
import FormSucces from "../form-success"
import FormError from "../form-error"

const VerifyTokenCard = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const onSubmit = useCallback(() => {
        console.log(token)
        if (!token) {
            setError("Token does not exist!")
            return;
        }

        tokenVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])
    
    return (
        <CardWrapper
            headerLabel="Verifying Email"
            backBtnHref="/login"
            backBtnLabel="Go back to login"            
        >
            <div className="flex items-center justify-center w-full">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSucces message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    )
}
export default VerifyTokenCard;