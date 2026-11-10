import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import styles from "./Button.module.css";

/** Figma: Size = Large-64px | Medium-48px | Small-36px */
export type ButtonSize = "large" | "medium" | "small";
/** Figma: Style = Fill | Outline | None */
export type ButtonVariant = "fill" | "outline" | "none";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Button height and spacing. Defaults to `large`. */
  size?: ButtonSize;
  /** Visual style. Defaults to `fill`. */
  variant?: ButtonVariant;
  /** Figma "Submission" state: shows a spinner only and ignores clicks. */
  loading?: boolean;
  /** Figma "Icon Left". Pass an SVG that uses `currentColor`. */
  iconLeft?: ReactNode;
  /** Figma "Icon Right". Pass an SVG that uses `currentColor`. */
  iconRight?: ReactNode;
  children: ReactNode;
}

const cx = (...names: Array<string | false | undefined>) => names.filter(Boolean).join(" ");

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    size = "large",
    variant = "fill",
    loading = false,
    disabled = false,
    iconLeft,
    iconRight,
    children,
    className,
    type = "button",
    onClick,
    ...rest
  },
  ref
) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={cx(styles.button, styles[size], styles[variant], loading && styles.loading, className)}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={handleClick}
    >
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          {/* Keeps the accessible name while only the spinner is visible. */}
          <span className={styles.visuallyHidden}>{children}</span>
        </>
      ) : (
        <>
          {iconLeft ? (
            <span className={styles.icon} aria-hidden="true">
              {iconLeft}
            </span>
          ) : null}
          <span className={styles.label}>{children}</span>
          {iconRight ? (
            <span className={styles.icon} aria-hidden="true">
              {iconRight}
            </span>
          ) : null}
        </>
      )}
    </button>
  );
});
