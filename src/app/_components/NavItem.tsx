"use client";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function NavItem({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  const [isActive, setIsActive] = useState(false);

  const route = usePathname();

  useEffect(() => {
    console.log("Current route:", route);
    setIsActive(route === href);
  }, [route, href]);

  return (
    <Link href={href}>
      <Box
        as="a"
        display="flex"
        alignItems="center"
        gap={3}
        p={2}
        borderRadius="md"
        bg={isActive ? "blue.800" : "transparent"}
        _hover={{ bg: isActive ? "blue.800" : "gray.700" }}
        _active={{ bg: "blue.500" }}
      >
        <Icon size={20} />
        <Text>{label}</Text>
      </Box>
    </Link>
  );
}

export default NavItem;
