import { CheckCircledIcon } from "@radix-ui/react-icons";

interface formSuccessProps {
    message?: string;
}

const FormSucces = ({
    message
}: formSuccessProps) => {
    if (!message) return null;

    return (
        <div
            className="bg-emerald-500/15 rounded-md p-3
            flex items-center gap-x-2 text-sm text-emerald-500"
        >
            <CheckCircledIcon/>
            <p>
            {message}
            </p>
        </div>
    )
}
export default FormSucces;
