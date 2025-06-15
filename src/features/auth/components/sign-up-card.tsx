"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const SignUpCard = () => {
  const onProviderSignUp = async (provider: "github" | "google") => {
    await signIn(provider);
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignUp("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FcGoogle className="size-5 mr-2 top-2.5 left-2.5 absolute" />{" "}
            Continue with Google
          </Button>
          <Button
            onClick={() => onProviderSignUp("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FaGithub className="size-5 mr-2 top-2.5 left-2.5 absolute" />{" "}
            Continue with Github
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground px-0 pb-0">
        Already have an account?
        <Link href="/sign-in">
          <span className="text-sky-700 underline pl-2">Sign in</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpCard;
