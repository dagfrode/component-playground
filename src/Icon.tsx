import React from "react";

type IconName = "1k_plus" | "1k" | "1x_mobiledata_badge" | "mobiledata";

const ICON_CDN_BASE = "https://dagfrode.com/component-playground/public/icons";

export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: IconName;
  size?: number;
  alt?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  alt = "",
  ...props
}) => {
  return (
    <img
      src={`${ICON_CDN_BASE}/${name}.svg`}
      width={size}
      height={size}
      alt={alt || name}
      {...props}
      loading="lazy"
      draggable={false}
    />
  );
};
