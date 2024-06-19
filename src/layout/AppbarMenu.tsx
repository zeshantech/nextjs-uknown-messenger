import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { signOut } from "next-auth/react";
import React, { CSSProperties } from "react";

interface AppbarMenuProps {
  onFeedback: () => void;
}

export default function AppbarMenu({ onFeedback }: AppbarMenuProps) {
  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          src="https://neural.love/cdn/thumbnails/1ee0af44-3d04-69a4-9029-37933f6877aa/c9d086c6-b705-5c90-b9c3-77337650e5e3.webp?Expires=1722470399&Signature=CnY-2nivriK9qAlEbWw4uyd0Sar9aqses2rQyK47cnOvV0LhCFHE4gAUubRz2LUmgvRLblReUH5GJxh~LckVT9LT30JQQgzlLybjjkzyLzLSHuwlQNygol8FxIoDesEuKyQ5eFTaKNP9TrpCO11dvfjGBpZiOqJlj-ryBT4EGzot4iqPJ~az9hmiJdfZveiGbyjp-fkehiLzX92HmvORXjAxz-O2X8YYP0hWpX8PCoo8PMg6kUR~mSJVYnWR6zrUPCXfZiCNbxUY~G3zV6~FzBKT4PTywwfAd2u-Qahm0hkbNdA4FaWQINHlmyC59cOP6yxEEK~pxzdBItfV9R9yLg__&Key-Pair-Id=K2RFTOXRBNSROX"
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" style={styledMenu}>
        <DropdownItem key="help_and_feedback" onClick={onFeedback}>
          Help & Feedback
        </DropdownItem>
        <DropdownItem onClick={handleLogout} key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

const styledMenu: CSSProperties = {
  background: "#000",
  borderRadius: "10px",
  border: "none",
};
