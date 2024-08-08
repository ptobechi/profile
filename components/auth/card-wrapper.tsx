"use client";

import { 
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "../ui/card";
import BackBtn from "./back-btn";
import { Header } from "./header";
import Socials from "./socials";

interface cardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backBtnLabel: string;
    backBtnHref: string;
    showSocials?:boolean;
}

const CardWrapper = ({
    children,
    headerLabel,
    showSocials,
    backBtnLabel,
    backBtnHref,
}: cardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}  />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {
                showSocials && (
                    <CardFooter>
                        <Socials />
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackBtn
                    label={backBtnLabel}
                    href={backBtnHref}
                />
            </CardFooter>
        </Card>
    )
}

export default CardWrapper;