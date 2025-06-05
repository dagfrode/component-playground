import clsx from "clsx";
import React from "react";
type IconName = "1k_plus" | "1k" | "1x_mobiledata_badge" | "mobiledata";

const ICON_CDN_BASE = "https://dagfrode.com/component-playground/icons";

// Icon component that renders an SVG icon from a CDN
// legg til circle bak icon
//

export interface IconProps extends React.ComponentPropsWithoutRef<"span"> {
  name: IconName;

  /** Size of the icon, default is the closest defined font-size */
  size?: "sm" | "md" | "lg" | "xl";
  /** Aria label text. If null/undefined, aria-hidden is automatically set to true */
  ariaLabel?: React.ComponentProps<"span">["aria-label"];
}

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  ariaLabel,
  size = "md",
  style,
  ...rest
}) => {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={clsx("ffe-icons", `ffe-icons--${size}`, className)}
      style={{
        maskImage: `url(${ICON_CDN_BASE}/${name}.svg)`,
        WebkitMaskImage: `url(${ICON_CDN_BASE}/${name}.svg)`,
        ...style,
      }}
      {...rest}
    />
  );
};
