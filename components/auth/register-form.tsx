"use client";

import { register } from "@/actions/register";
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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const RegisterForm = () => {
    /**
     * declares a form properties that uses zodResolver to handle
     * form inputs based on the loginSchema rules
     */
    const form = useForm<z.infer<typeof Schemas.RegisterSchema>>({
        resolver: zodResolver(Schemas.RegisterSchema),
        defaultValues: {
            email: "",
            password:"",
            name:""
        }
    })

    /**
     * built in state transition function to monitor form submit states
     */
    const [isPending, startTransition] = useTransition()

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    /**
     * submit form values to the server
     */
    const onSubmit = (values: z.infer<typeof Schemas.RegisterSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        });
    }

    return (
        <CardWrapper
            headerLabel="Create an Account"
            backBtnLabel="Already Have an account?"
            backBtnHref="/login"
            showSocials
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                         {...field}
                                         placeholder="John Doe"
                                         type="text"
                                         disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                    </div>
                    <FormError message={error}/>
                    <FormSucces message={success}/>
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
export default RegisterForm;
