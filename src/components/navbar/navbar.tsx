import React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between px-8 py-2">
      <h1 className="text-2xl font-bold font-geist">{siteConfig.title}</h1>
      <div>
        <Link href={siteConfig.links.github}>
          <Button variant="ghost" size="icon" className="size-7">
            <Icons.gitHub className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
