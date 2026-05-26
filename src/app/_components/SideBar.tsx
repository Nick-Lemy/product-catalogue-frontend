"use client";
// biome-ignore assist/source/organizeImports: <explanation>
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { MdDashboard, MdInventory } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import NavItem from "./NavItem";
import AvatarImage from "./ui/AvatarImage";
import { TbLogout2 } from "react-icons/tb";

function SideBar() {
  return (
    <Flex
      as="aside"
      direction="column"
      w="240px"
      h="100vh"
      bg="gray.900"
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
