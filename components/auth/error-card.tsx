import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import BackBtn from "@/components/auth/back-btn"
import { Header } from "@/components/auth/header"
import CardWrapper from "./card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
            backBtnHref="/login"
            backBtnLabel="Back"
        >
            <div className="w-full flex items-center justify-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
}
export default ErrorCard;