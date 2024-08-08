"use client";

import { login } from "@/actions/login";
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/form-error";
import FormSucces from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Schemas from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


const ResetPasswordForm = () => {
    /**
     * declares a form properties that uses zodResolver to handle
     * form inputs based on the loginSchema rules
     */
    const form = useForm<z.infer<typeof Schemas.LoginSchema>>({
        resolver: zodResolver(Schemas.LoginSchema),
        defaultValues: {
            email: "",
            password:""
        }
    })

    /**
     * built in state transition function to monitor form submit states
     */
    const [isPending, startTransition] = useTransition()

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    /**
     * submit form values to the server
     */
    const onSubmit = (values: z.infer<typeof Schemas.LoginSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        });
    }

    return (
        <CardWrapper
            headerLabel="Reset Password"
            backBtnLabel="Back to login"
            backBtnHref="/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                         {...field}
                                         placeholder="*******"
                                         type="password"
                                         disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSucces message={success}/>
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        Change Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
export default ResetPasswordForm;
