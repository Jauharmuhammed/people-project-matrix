import React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme-toggle";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between mx-8 pt-4 pb-2 border-b">
      <h1 className="text-xl font-bold font-geist">PPM</h1>
      <div className="flex items-center gap-2">
        <Link href={siteConfig.links.github} target="_blank">
          <Button variant="ghost" size="icon" className="size-7">
            <Icons.gitHub className="h-4 w-4" />
          </Button>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
