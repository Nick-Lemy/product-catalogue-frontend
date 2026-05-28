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
    series: [{ name: "name", color: "brand.700" }],
  });

  const getPercent = (value: number) =>
    chart.getValuePercent("value", value).toFixed(2);

  return (
    <BarList.Root chart={chart}>
      <BarList.Content rounded="md" py={4}>
        <BarList.Label title={title} flex="1">
          <BarList.Bar color={"white"} />
        </BarList.Label>
        <BarList.Label title={titleLabel1} flex="0 0 10%" titleAlignment="end">
          <BarList.Value />
        </BarList.Label>
        <BarList.Label title="%" flex="0 0 10%" titleAlignment="end">
          <BarList.Value valueFormatter={(value) => `${getPercent(value)}%`} />
        </BarList.Label>
      </BarList.Content>
    </BarList.Root>
  );
}

export default BarListUI;
