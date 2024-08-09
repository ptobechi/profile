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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


const LoginForm = () => {
    /**
     * declares a form properties that uses zodResolver to handle
     * form inputs based on the loginSchema rules
     */
    const form = useForm<z.infer<typeof Schemas.LoginSchema>>({
        resolver: zodResolver(Schemas.LoginSchema),
        defaultValues: {
            email: "",
            password:"",
            code: ""
        }
    })

    /**
     * built in state transition function to monitor form submit states
     */
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "User Already Exists!"
        : ""

    /**
     * submit form values to the server
     */
    const onSubmit = (values: z.infer<typeof Schemas.LoginSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }

                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
                    }

                    if (data?.twoFactorEnabled) setTwoFactorEnabled(true)
                })
        });
    }

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backBtnLabel="Don't Have an account?"
            backBtnHref="/register"
            showSocials
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {!twoFactorEnabled && <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                         {...field}
                                         placeholder="johndoe@email.com"
                                         type="email"
                                         disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                        <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="px-0 font-normal"
                        >
                            <Link href="/forgot-password">Forgot Password</Link>
                        </Button>
                    </div>}
                    {twoFactorEnabled &&
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder="123456"
                                            type="text"
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    }
                    <FormError message={error || urlError}/>
                    <FormSucces message={success}/>
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        {
                            twoFactorEnabled ? "Confirm Code" : "Login"
                        }
                        
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
export default LoginForm;
