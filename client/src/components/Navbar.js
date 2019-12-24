import React from "react";
import { Box, Text,Heading,Image } from "gestalt";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape={"roundedBottom"}
  >
    <NavLink to="/signin">
      <Text size="xl" color="white">
        Sign In
      </Text>
    </NavLink>
    <NavLink to="/">
      <Image src"./icons/logo.svg" alt="BrewHaha Logo" naturalHeight={1} naturalWidth={1}/>
      <Heading size="xs" color="orange">
        BrewHaha
      </Heading>
    </NavLink>
    <NavLink to="/signup">
      <Text size="xl" color="white">
        Sign Up
      </Text>
    </NavLink>
  </Box>
);

export default Navbar;