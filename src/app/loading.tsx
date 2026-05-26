import { ProgressCircle } from "@chakra-ui/react";

export default function Loading() {
  return (
    <ProgressCircle.Root value={27} size="sm">
      <ProgressCircle.Circle speed="0.65s">
        <ProgressCircle.Track />
        <ProgressCircle.Range stroke="blue.700" />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  );
}
