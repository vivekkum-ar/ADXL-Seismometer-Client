import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { auth } from "@/firebase";
import { UserContext } from "@/userContext";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormSchema = z.object({
  // adding zod validation for email
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
})

export function SignInForm() {
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    /* ---------------------------------------------------------------------------------------------- */
    /*                  Check if user is logged in and set the user state accordingly                 */
    /* ---------------------------------------------------------------------------------------------- */
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user)
        navigate("/home");
        // ...
      } else {
        // User is signed out
      }
    });
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                Firebase signIn logic modular API                               */
    /* ---------------------------------------------------------------------------------------------- */
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const currentUser = userCredential.user;
        setUser(currentUser);
        toast("Sign up successful", { description: `Welcome ${data.email}` ,classNames: {toast:"group-[.toaster]:border-green-500 group-[.toaster]:border-2"},
      })
      navigate("/home");
    })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Sign up failed`, {
          description: errorMessage,classNames: {toast:"group-[.toaster]:border-red-500 group-[.toaster]:border-2"},
        })
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full justify-center flex flex-col space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="coolperson@example.com" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="●●●●●●●●" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mx-24 ">Submit</Button>
      </form>
    </Form>
  )
}

export function SignIn() {
  
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-sm py-6 px-24 mx-auto ">
      <h1 className="font-pextrabold text-4xl text-center w-full mt-4">
        Sign In
      </h1>
      <h3 className="font-pregular text-md text-gray-400 text-center w-full mb-4 mt-2">
        Welcome back! Sign in to your account
      </h3>
      <SignInForm />
      <h3 className="font-pregular text-md text-gray-400 text-center w-full my-4">
        Don't have and account? <Link to="/signup" className="text-violet-500 font-psemibold">Sign Up</Link>
      </h3>
    </div>
  )
}
