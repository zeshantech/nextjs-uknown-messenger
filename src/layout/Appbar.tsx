import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { AppLogo } from "@/assets";
import { Stack, Typography } from "@/components";
import AppbarMenu from "./AppbarMenu";

export default function Appbar() {
  return (
    <Navbar as={'div'}>
      <NavbarBrand className="mr-4">
        <AppLogo />
        <Typography variant="h3">ACME</Typography>
      </NavbarBrand>

      <NavbarContent justify="end">
        <AppbarMenu />
      </NavbarContent>
    </Navbar>
  );
}
