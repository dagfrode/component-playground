export const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}) => {
  const _onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
      if ("vibrate" in navigator) {
        window.navigator.vibrate([200]);
      } else {
        console.log("Vibration API is not supported on this device.");
      }
    }
  };
  return (
    <button
      type={type}
      onClick={_onClick}
      disabled={disabled}
      className={`${className}`}
    >
      {children}
    </button>
  );
};
