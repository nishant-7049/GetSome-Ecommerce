import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import { MdLocalShipping } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import React from "react";
import "./css/CheckOutSteps.css";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <BsFillBagCheckFill />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <RiSecurePaymentLine />,
    },
  ];
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => {
          return (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                icon={item.icon}
                style={{
                  color: activeStep >= index ? "#f45050" : "rgba(0,0, 0, 0.6",
                }}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
};

export default CheckOutSteps;
