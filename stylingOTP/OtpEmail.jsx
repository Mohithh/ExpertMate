// emails/OtpEmail.jsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Section,
} from '@react-email/components';
import * as React from 'react';

export const OtpEmail = ({ otp }) => (
  <Html>
    <Head />
    <Preview>Your OTP Code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Text style={heading}>Your One-Time Password</Text>
          <Text style={otpBox}>{otp}</Text>
          <Text style={text}>
            Use this OTP to verify your email. It is valid for 5 minutes.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OtpEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  maxWidth: '400px',
  margin: 'auto',
};

const heading = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333',
};

const otpBox = {
  fontSize: '32px',
  fontWeight: 'bold',
  padding: '10px 20px',
  backgroundColor: '#e0f7fa',
  color: '#00796b',
  textAlign: 'center',
  borderRadius: '6px',
  letterSpacing: '8px',
  marginBottom: '20px',
};

const text = {
  fontSize: '14px',
  color: '#555',
};
