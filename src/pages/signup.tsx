import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/components/modalLoading";

const FormSchema = z.object({
  // adding zod validation for username
  username: z.string().min(5, {
    message: "Username must be at least 5 characters long.",
  }),
  // adding zod validation for email
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
})

export function SignUpForm() {
  const {setUser,setIsLoading} = useContext(UserContext);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    /* ---------------------------------------------------------------------------------------------- */
    /*                                Firebase signup logic modular API                               */
    /* ---------------------------------------------------------------------------------------------- */
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up 
        updateProfile(userCredential.user, {
          displayName: data.username, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          const currentUser = userCredential.user;
          setUser(currentUser);
          console.log(currentUser)
          toast("Sign up successful", { description: `Welcome ${data.email}` ,classNames: {toast:"group-[.toaster]:border-green-500 group-[.toaster]:border-2"},
        });
          navigate("/home");
          setIsLoading(false);
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          const errorMessage = error.message;
          toast.error(`Sign up failedherehere`, {
            description: errorMessage,classNames: {toast:"group-[.toaster]:border-red-500 group-[.toaster]:border-2"},
          })
          setIsLoading(false);
          // ...
      })
    })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Sign up failedherehere`, {
          description: errorMessage,classNames: {toast:"group-[.toaster]:border-red-500 group-[.toaster]:border-2"},
        })
        setIsLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full justify-center flex flex-col space-y-6">
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="coolperson" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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

export function SignUp() {
  const {isLoading} = useContext(UserContext);
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-sm py-6 px-24 mx-auto ">
      <h1 className="font-pextrabold text-4xl text-center w-full mt-4">
        Sign Up
      </h1>
      <h3 className="font-pregular text-md text-gray-400 text-center w-full mb-4 mt-2">
        Create an account to get started
      </h3>
      <SignUpForm />
      <h3 className="font-pregular text-md text-gray-400 text-center w-full my-4">
        Already have an account? <Link to="/signin" className="text-violet-500 font-psemibold">Sign in</Link>
      </h3>
      {isLoading && <Loading></Loading>}
    </div>
  )
}
