import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface formErrorProps {
    message?: string;
}

const FormError = ({
    message
}: formErrorProps) => {
    if (!message) return null;

    return (
        <div
            className="bg-destructive/5 rounded-md p-3
            flex items-center gap-x-2 text-sm text-destructive"
        >
            <ExclamationTriangleIcon/>
            <p>
            {message}
            </p>
        </div>
    )
}
export default FormError;
