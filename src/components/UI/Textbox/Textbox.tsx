import { CSSProperties, FC, InputHTMLAttributes, ReactNode } from "react";
import styles from "./Textbox.module.css";

export enum TextboxIconVariants {
  default = "default_icon",
  primary = "primary_icon",
  link = "link_icon",
}

interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconVariant?: TextboxIconVariants;
  onIconClick?: () => void;
  containerStyle?: CSSProperties;
  disabled?: boolean;
}

const Textbox: FC<TextboxProps> = ({
  icon,
  iconVariant = TextboxIconVariants.default,
  onIconClick,
  containerStyle,
  disabled,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.textbox}
        style={{
          paddingRight: icon ? "56px" : "16px",
          pointerEvents: disabled ? "none" : "auto",
        }}
        {...props}
      />
      {icon && (
        <div
          className={styles[iconVariant]}
          style={{
            ...containerStyle,
            pointerEvents: disabled ? "none" : "auto",
          }}
          onClick={onIconClick}
        >
          {icon}
        </div>
      )}
    </div>
  );
};
export default Textbox;
