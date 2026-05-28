"use client";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { MdDashboard, MdInventory } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import NavItem from "./NavItem";
import AvatarImage from "./ui/AvatarImage";

function SideBar() {
  return (
    <Flex
      as="aside"
      direction="column"
      w="240px"
      h="100vh"
      bg="brand.900"
      color="white"
      p={4}
    >
      <Text fontSize="xl" fontWeight="bold" mb={8}>
        Product Catalogue
      </Text>

      <VStack align="stretch" gap={1}>
        <NavItem icon={MdDashboard} label="Dashboard" href="/" />
        <NavItem icon={MdInventory} label="Products" href="/products" />
        <NavItem icon={AiOutlineProduct} label="Assets" href="/assets" />
        <NavItem icon={FaUser} label="Profile" href="/profile" />
      </VStack>
      <Box display="flex" alignItems="center" gap={2} mt="auto" as="footer">
        <AvatarImage alt="Nick Lemy" src="nick.png" />
        <Text fontSize={"sm"}>Nick Lemy</Text>
        <TbLogout2 size={20} style={{ cursor: "pointer" }} />
      </Box>
    </Flex>
  );
}

export default SideBar;
