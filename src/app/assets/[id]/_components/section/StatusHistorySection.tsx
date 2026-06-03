import { Card, Separator, Text, Timeline } from "@chakra-ui/react";
import { MdCheck, MdClose, MdHourglassEmpty } from "react-icons/md";
import { AssetStatus, type Asset } from "@/types/asset";
import { formatDate } from "@/utils/helpers";
import { assetStatusConfig } from "../assetStatus";

const statusIcon = {
  [AssetStatus.PENDING_REVIEW]: <MdHourglassEmpty size={12} />,
  [AssetStatus.APPROVED]: <MdCheck size={12} />,
  [AssetStatus.REJECTED]: <MdClose size={12} />,
};

interface StatusHistorySectionProps {
  asset: Asset;
}

function StatusHistorySection({ asset }: StatusHistorySectionProps) {
  const history = [...asset.statusHistory].reverse();

  return (
    <Card.Root variant="outline" size="sm">
      <Card.Header>
        <Text fontWeight="semibold" fontSize="sm">
          Status History
        </Text>
      </Card.Header>
      <Separator />
      <Card.Body>
        <Timeline.Root size="sm">
          {history.map((entry, i) => {
            const st = assetStatusConfig[entry.status];
            return (
              <Timeline.Item key={`${entry.status}-${entry.changedAt}-${i}`}>
                <Timeline.Connector>
                  <Timeline.Separator />
                  <Timeline.Indicator
                    bg={`${st.colorPalette}.500`}
                    color="white"
                  >
                    {statusIcon[entry.status]}
                  </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title fontSize="sm">{st.label}</Timeline.Title>
                  <Timeline.Description>
                    {formatDate(new Date(entry.changedAt))}
                  </Timeline.Description>
                  {entry.reason && (
                    <Text fontSize="xs" color="fg.muted" mt={1}>
                      {entry.reason}
                    </Text>
                  )}
                </Timeline.Content>
              </Timeline.Item>
            );
          })}
        </Timeline.Root>
      </Card.Body>
    </Card.Root>
  );
}

export default StatusHistorySection;
