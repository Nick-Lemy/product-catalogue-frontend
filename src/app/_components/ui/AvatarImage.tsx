import { Avatar } from "@chakra-ui/react";

interface AvatarImageProps {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

function AvatarImage({ src, alt, size = "sm" }: AvatarImageProps) {
  return (
    <Avatar.Root size={size}>
      <Avatar.Fallback name={alt} />
      <Avatar.Image src={src} alt={alt} />
    </Avatar.Root>
  );
}

export default AvatarImage;
