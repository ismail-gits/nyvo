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
import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSignUp } from "../hooks/use-sign-up";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { TriangleAlert } from "lucide-react";

const SignUpCard = () => {
  const mutation = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCredentialsSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
          });
        },
      }
    );
  };

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
      {mutation.error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>Something went wrong</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialsSignUp} className="space-y-4">
          <Input
            disabled={mutation.isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            type="text"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            minLength={3}
            required
          />
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full"
            size={"lg"}
          >
            Continue
          </Button>
        </form>
        <Separator />
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
