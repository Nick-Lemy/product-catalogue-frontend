"use client";
import { BarList, type BarListData, useChart } from "@chakra-ui/charts";

interface BarListUIProps {
  data: { name: string; value: number }[];
  title: string;
  titleLabel1: string;
}

function BarListUI({ data, title, titleLabel1 }: BarListUIProps) {
  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: data,
    series: [{ name: "name", color: "white" }],
  });

  const getPercent = (value: number) =>
    chart.getValuePercent("value", value).toFixed(2);

  return (
    <BarList.Root chart={chart}>
      <BarList.Content color={"blue.500"} bg={"gray.800"} rounded="md" p={4}>
        <BarList.Label title={title} flex="1">
          <BarList.Bar />
        </BarList.Label>
        <BarList.Label title={titleLabel1} w="353px" titleAlignment="end">
          <BarList.Value />
        </BarList.Label>
        <BarList.Label title="%" w="34" titleAlignment="end">
          <BarList.Value valueFormatter={(value) => `${getPercent(value)}%`} />
        </BarList.Label>
      </BarList.Content>
    </BarList.Root>
  );
}

export default BarListUI;
