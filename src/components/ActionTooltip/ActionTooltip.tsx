import { ActionIcon, Tooltip } from '@mantine/core';

interface ActionTooltipProps {
  label: string;
  color: string;
  onClick: () => void;
  icon: React.ReactNode;
  ariaLabel: string;
}

export function ActionTooltip({
  label,
  color,
  onClick,
  icon,
  ariaLabel,
}: ActionTooltipProps) {
  return (
    <Tooltip color={color} position='bottom' openDelay={700} label={label}>
      <ActionIcon
        onClick={onClick}
        variant='filled'
        color={color}
        style={{ zIndex: 2 }}
        aria-label={ariaLabel}>
        {icon}
      </ActionIcon>
    </Tooltip>
  );
}
