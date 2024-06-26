import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { auth } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "@/userContext";
import Loading from "@/components/modalLoading";

const FormSchema = z.object({
  // adding zod validation for email
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export function ForgotPasswordForm() {
  const {setIsLoading,setUser} = useContext(UserContext);
  const navigate = useNavigate();

  /* ---------------------------------------------------------------------------------------------- */
  /*                  Check if user is logged in and set the user state accordingly                 */
  /* ---------------------------------------------------------------------------------------------- */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
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
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    /* ---------------------------------------------------------------------------------------------- */
    /*                            Firebase ForgotPassword logic modular API                           */
    /* ---------------------------------------------------------------------------------------------- */
    sendPasswordResetEmail(auth, data.email, { url: 'https://earthquake-detection-adxl.web.app/?email=' + auth.currentUser?.email, })
      .then(() => {
        // Password reset email sent!
        toast("Password reset email sent", { description: `Please check ${data.email}`, classNames: { toast: "group-[.toaster]:border-green-500 group-[.toaster]:border-2" }, })
        navigate("/signin");
        setIsLoading(false);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Sign up failed`, {
          description: errorMessage, classNames: { toast: "group-[.toaster]:border-red-500 group-[.toaster]:border-2" },
        })
        setIsLoading(false);
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
        <Button type="submit" className="mx-24 ">Reset Password</Button>
      </form>
    </Form>
  )
}

export function ForgotPassword() {
  const {isLoading} = useContext(UserContext);  
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-sm py-6 md:px-24 px-6 mx-auto ">
      <h1 className="font-pextrabold text-4xl text-center w-full mt-4">
        Reset your password
      </h1>
      <h3 className="font-pregular text-md text-gray-400 text-center w-full mb-4 mt-2">
        Enter your email address to reset your password
      </h3>
      <ForgotPasswordForm />
      <h3 className="font-pregular text-md text-gray-400 text-center w-full my-4">
        Go back to <Link to="/signup" className="text-violet-500 font-psemibold">Sign Up</Link>
      </h3>
      {isLoading && <Loading></Loading>}
    </div>
  )
}
