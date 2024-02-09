import React from "react";

interface TitleProps {
  text: string;
  style?: React.CSSProperties;
}

export default function Title({style, text}: TitleProps) {
  return <span style={{...style}}>{text}</span>;
}
