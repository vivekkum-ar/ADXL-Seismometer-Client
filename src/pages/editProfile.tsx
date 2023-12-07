import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { auth, storage } from "@/firebase";
import { UserContext } from "@/userContext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/modalLoading";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Icon } from "@iconify/react/dist/iconify.js";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
const ACCEPTED_FILE_TYPES = ['image/png'];

const FormSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters long.",
  }),
  photoURL: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 2MB')
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), 'File must be a PNG'),
});

export function EditForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>();
  const { user, setUser, setIsLoading,setIsLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      photoURL: undefined, // Adjust the default value to be `undefined`
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const storageRef = ref(storage, "profile/" + user.uid + "-profile.jpg");
        const uploadTask = uploadBytesResumable(storageRef, data.photoURL);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Error uploading file:', error);
            toast.error(`Upload failed`, {
              description: error.message,
              classNames: { toast: "group-[.toaster]:border-red-500 group-[.toaster]:border-2" },
            });
            setIsLoading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateProfile(user, {
                displayName: data.username,
                photoURL: downloadURL,
              }).then(() => {
                const currentUser = user;
                setUser(currentUser);
                console.log(currentUser);
                toast("Update successful", {
                  description: `Your profile has been updated`,
                  classNames: { toast: "group-[.toaster]:border-green-500 group-[.toaster]:border-2" },
                });
                navigate("/home");
                setIsLoading(false);
              }).catch((error) => {
                const errorMessage = error.message;
                toast.error(`Update failed`, {
                  description: errorMessage,
                  classNames: { toast: "group-[.toaster]:border-red-500 group-[.toaster]:border-2" },
                });
                setIsLoading(false);
              });
            });
          }
        );
      } else {
        // User is signed out
        setIsLogged(false);
        navigate("/signin");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full justify-center flex flex-col space-y-6">
        <div className="relative flex justify-center" onClick={() => fileInputRef.current?.click()}>
        <img src={photoPreview == undefined ? user.photoURL : photoPreview} className="cursor-pointer rounded-full w-32 h-32 mx-auto outline hover:opacity-[0.3] peer text-black" alt="" />
        <Icon icon="ic:baseline-edit" fontSize={30} className="invisible peer-hover:visible mx-auto absolute top-[50px]" />
        </div>
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
          name="photoURL"
          render={({ field }) => (
            <FormItem
              className="hidden"
            >
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  ref={fileInputRef}
                  accept="image/png"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      field.onChange(e.target.files[0]);
                      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mx-24">Save changes</Button>
      </form>
    </Form>
  );
}

export function EditProfile() {
  const { isLoading } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-sm py-6 px-24 mx-auto">
      <h1 className="font-pextrabold text-4xl text-center w-full mt-4">
        Edit Profile
      </h1>
      <h3 className="font-pregular text-md text-gray-400 text-center w-full mb-4 mt-2">
        Make changes to your account here. Click save when you're done.
      </h3>
      <EditForm />
      {isLoading && <Loading />}
    </div>
  );
}
