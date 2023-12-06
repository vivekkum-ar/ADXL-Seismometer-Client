import * as React from "react"
// import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react/dist/iconify.js"
import { ModeToggle } from "./mode-toggle"
import { UserContext } from "@/userContext"
import { useContext } from "react"
import { Button } from "./ui/button"
import { auth } from "@/firebase"
import { signOut } from "firebase/auth"
import { toast } from "sonner"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/docs">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function NavigationBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null);
      toast("LogOut successful", {
        description: `You have been logged out`, classNames: { toast: "group-[.toaster]:border-green-500 group-[.toaster]:border-2" },
      })
      navigate("/signin");
    }).catch((error) => {
      // An error happened.
      toast.error(`LogOut failed`, {
        description: error.message, classNames: { toast: "group-[.toaster]:border-red-500 group-[.toaster]:border-2" },
      })
      navigate("/signin");
    });
  }
  return (
    <div className="flex flex-row max-w-screen-xl relative mb-20 z-40">
      <div className="fixed flex flex-row justify-between w-full px-10 py-2 border-b-2 border-gray-400 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg shadow-gray-300 dark:shadow-gray-900">
        <div className='flex flex-row items-center cursor-pointer' onClick={() => navigate("/")}>
          <Icon icon="ri:earthquake-fill" fontSize={35} />
          <span className='font-bold text-xl font-psemibold ps-2 text-violet-500'>Earthquake</span>
          <span className='font-bold text-xl font-psemibold ps-2'>Tracker</span>
        </div>
        <NavBar></NavBar>
        <div className="flex flex-row items-center space-x-4">
          <ModeToggle></ModeToggle>
          {user &&
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://githu.com/shadcn.png" className="rounded-full " height={35} width={35} />
                  <AvatarFallback className="border-2 bg-violet-500 text-white focus:outline-none font-psemibold border-slate-600 dark:border-slate-100 text-center px-1.5 py-2 rounded-full">
                    {user.displayName[0].toUpperCase() + user.displayName[1].toUpperCase()}

                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Hi, {user.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Icon icon="uil:edit" className="me-2" fontSize={15} style={{}} /> Edit Profile</DropdownMenuItem>
                <DropdownMenuItem><Icon icon="codicon:law" className="me-2" fontSize={15} style={{}} />Terms</DropdownMenuItem>
                <DropdownMenuItem><Icon icon="icon-park-solid:personal-privacy" className="me-2" fontSize={15} style={{}} />Privacy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSignOut()}><Icon icon="ic:baseline-logout" className="me-2" fontSize={15} style={{}} />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </div>
      </div>

    </div>
  )
}
