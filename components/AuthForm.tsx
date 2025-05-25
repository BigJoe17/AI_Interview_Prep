"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation"; // Changed from Router to useRouter
import { Toaster } from "sonner";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client"; // Adjust the import path as necessary
import { SignUp, SignIn } from "@/lib/actions/auth.action"; // Adjust the import path as necessary

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50)
      .optional(),

    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters")
      .max(50, "Password must be at most 50 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter(); // Initialize the router
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await SignUp({
          uid: userCredentials.user.uid,
          name: name ?? "",
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message || "Unknown error", {
            position: "top-center",
            duration: 3000,
          });
        }

        toast.success("Sign Up successful", {
          position: "top-center",
          duration: 3000,
        });
        router.push("/sign-in"); // Properly redirect after sign-up
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Error signing in", {
            position: "top-center",
            duration: 3000,
          });

          return;
        }
        await SignIn({
          email,
          idToken,
        });

        toast.success("Sign In successful", {
          position: "top-center",
          duration: 3000,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Error submitting form: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-3xl font-bold text-center">PrepAI</h2>
        </div>

        <h3 className="text-center">Practice Job Interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 space-y-6 text-primary-100"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
                type="text" // Added missing type
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="w-full" type="submit">
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>                                
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isSignIn ? "No account yet?" : "Have an account already?"}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="font-bold text-user-primary ml-1 hover:underline" // Added hover effect
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
