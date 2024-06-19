import React, { CSSProperties } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  useDisclosure,
} from "@nextui-org/react";
import { AppLogo } from "@/assets";
import { Typography } from "@/components";
import AppbarMenu from "./AppbarMenu";
import { FeedbackModel } from ".";

export default function Appbar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Navbar as={"div"} style={navbarStyle}>
      <NavbarBrand className="mr-4">
        <AppLogo />
        <Typography variant="h3">ACME</Typography>
      </NavbarBrand>
      <FeedbackModel onClose={onClose} isOpen={isOpen} />

      <NavbarContent justify="end">
        <AppbarMenu onFeedback={onOpen} />
      </NavbarContent>
    </Navbar>
  );
}

const navbarStyle: CSSProperties = {
  background: "#000000a6",
  position: "fixed",
  top: 0,
  left: 0,
  filter: "blur(10)",
};
