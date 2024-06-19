import React, { CSSProperties } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  useDisclosure,
} from "@nextui-org/react";
import { AppLogo } from "@/assets";
import { Typography } from "@/components";
import AppbarMenu from "./components/AppbarMenu";
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet
import MessagePreferenceModal from "./components/MessagePreferenceModal";
import { Checkbox, Divider, Switch } from "@nextui-org/react";

export default function Appbar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Navbar as={"div"} style={navbarStyle}>
      <NavbarBrand className="mr-4">
        <AppLogo />
        <Typography variant="h3">Veil Voice</Typography>
      </NavbarBrand>

      <MessagePreferenceModal onClose={onClose} isOpen={isOpen} />

      <NavbarContent justify="end">
        <AppbarMenu onMessagePreference={onOpen} />
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
