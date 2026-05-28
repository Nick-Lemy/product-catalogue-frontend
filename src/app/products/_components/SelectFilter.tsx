import { Box, NativeSelect, Text } from "@chakra-ui/react";

interface SelectFilterProps {
  title: string;
  value: string;
  setOption: (value: string) => void;
  options: string[];
}

function SelectFilter({ title, value, setOption, options }: SelectFilterProps) {
  return (
    <Box flex="1" minW="130px">
      <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
        {title}
      </Text>
      <NativeSelect.Root size="sm">
        <NativeSelect.Field
          value={value}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="">All {title}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Box>
  );
}

export default SelectFilter;
