"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerClose,
} from "@/Components/ui/drawer";
import ThemeToggle from "./ThemeToggle";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { name: "Home", ref: "/" },
    { name: "About", ref: "/about" },
    { name: "Services", ref: "/services" },
    { name: "Projects", ref: "/projects" },
    { name: "Skills", ref: "/skills" },
    // { name: "Blogs", ref: "/blogs" },
  ];

  if (pathname.startsWith("/auth") || pathname.startsWith("/dashboard")) return;

  return (
    <header className="fixed w-full z-50 top-0 left-0 transition-all duration-300">
      <div
        className={`w-full  bg-transparent transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md border-b border-[var(--accent)]/20"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo / Name */}
          <Link href="/">
            <h1 className="text-xl font-bold text-[var(--foreground)]">
              Ahmad Sultan
            </h1>
          </Link>

          {/* Desktop nav & toggle */}
          <ul className="hidden md:flex items-center gap-6">
            {items.map((i) => (
              <Link
                href={i.ref}
                key={i.name}
                className="text-[var(--foreground)] hover:text-[var(--hero-image)] cursor-pointer transition-colors"
              >
                {i.name}
              </Link>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => router.push("/contact")}
              className="bg-[var(--reverse-image)] text-[var(--background)] text font-bold hidden md:flex hover:opacity-90 transition-opacity"
            >
              Hire Me
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Drawer Trigger */}
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden text-[var(--foreground)] text-2xl p-2 hover:bg-[var(--neutral-gray)]/20"
              >
                ☰
              </Button>
            </DrawerTrigger>

            <DrawerContent className="w-64 z-50 border border-[var(--accent)] shadow-[0_10px_20px_-1px_var(--accent)] flex flex-col items-center bg-[var(--background)]">
              <DrawerHeader className="font-bold text-lg">
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>

              <ul className="flex flex-col gap-4 p-4 w-full text-center">
                {items.map((i) => (
                  <p
                    key={i.name}
                    className="text-[var(--foreground)] hover:text-[var(--hero-image)] cursor-pointer text-lg"
                  >
                    {i.name}
                  </p>
                ))}
              </ul>
              <Link href={"/contact"} className="py-4">
                <Button
                  variant="default"
                  className="flex md:hidden bg-[var(--reverse-image)] text-[var(--background)]"
                >
                  Hire Me
                </Button>
              </Link>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button className="bg-[var(--hero-image)] text-black font-bold w-full">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
