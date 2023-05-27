'use client';
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from "axios";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleVariant = useCallback(() => {
        if (variant == 'LOGIN')
            setVariant('REGISTER');
        else
            setVariant('LOGIN');
    }, [variant]);

    const { register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: "",
            password: ""
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
            //axios register
            axios.post('/api/register', data);
        }

        if (variant === 'LOGIN') {
            //next auth signin
        }
    }

    const socialActions = (actions: string) => {
        setIsLoading(true);
    }

    return (
        <div className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
        "
        >
            <div className="
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
            "
            >
                <form className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === "REGISTER" && (
                        <Input
                            label="Name"
                            id="name"
                            key={'name'}
                            register={register}
                            errors={errors}
                        />
                    )}

                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        key={'email'}
                        register={register}
                        errors={errors}
                    />

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        key={'password'}
                        register={register}
                        errors={errors}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'SIGN IN' : 'REGISTER'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className=" mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialActions('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialActions('google')}
                        />
                    </div>
                </div>

                <div className="
                flex
                gap-2
                justify-center
                text-sm 
                mt-6
                px-2
                text-gray-500
                ">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an Account?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Log In'}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AuthForm;