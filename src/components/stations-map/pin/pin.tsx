import * as React from "react";

const pinStyle = {
  cursor: "pointer",
  fill: "#F37B44",
  stroke: "none",
};

type PinProps = {
  size?: number;
};

function Pin({ size = 12 }: PinProps) {
  return (
    <svg height={size} viewBox="0 0 12 12" style={pinStyle}>
      <circle cx="6" cy="6" r="6" />
    </svg>
  );
}

export default React.memo(Pin);
