"use client";

import React, { useState, CSSProperties } from "react";
import OTPInput from "react18-input-otp";

interface OtpInputProps {
  onComplete: (otp: string) => void;
}

export default function OtpInput({ onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState("");

  const handleChange = (value: string) => {
    setOtp(value);

    if (value.length === 6 && otp !== value) {
      onComplete(value);
    }
  };

  return (
    <OTPInput
      value={otp}
      onChange={handleChange}
      numInputs={6}
      containerStyle={{ gap: 8 }}
      inputStyle={inputStyle}
    />
  );
}

const inputStyle: CSSProperties = {
  padding: 10,
  width: "100%",
  fontSize: 18,
  border: 2,
  borderColor: "#e0e0e0",
  borderStyle: "solid",
  borderRadius: 16,
};
