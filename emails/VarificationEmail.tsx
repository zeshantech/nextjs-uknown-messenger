import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from "@react-email/components";

interface varificationEmailProps {
  username: string;
  OTP: string;
}

export default function varificationEmail({
  OTP,
  username,
}: varificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Email Verification</Heading>
          <Text style={paragraph}>Hello, {username}!</Text>
          <Text style={paragraph}>
            Thank you for signing up. To complete your registration, please use
            the following OTP (One Time Password):
          </Text>
          <Text style={otpStyle}>{OTP}</Text>
          <Text style={paragraph}>
            This OTP is valid for the next 10 minutes. If you did not request
            this email, please ignore it.
          </Text>
          <Button href="https://yourwebsite.com" style={button}>
            Go to Website
          </Button>
          <Text style={footer}>
            If you have any questions, feel free to contact our support team.
          </Text>
          <Text style={footer}>© 2024 Your Company. All rights reserved.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f4f4f4",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const heading = {
  color: "#4CAF50",
  fontSize: "24px",
  marginBottom: "20px",
};

const paragraph = {
  color: "#333333",
  fontSize: "16px",
  marginBottom: "20px",
};

const otpStyle = {
  fontSize: "20px",
  fontWeight: "bold" as const,
  color: "#4CAF50",
  marginBottom: "20px",
};

const button = {
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "5px",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
};

const footer = {
  color: "#999999",
  fontSize: "12px",
  marginTop: "20px",
};
