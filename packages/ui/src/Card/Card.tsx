import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Card.module.css";

/** Figma: Card type. `unboxed` is not built yet. */
export type CardType = "boxed" | "inside";
/** Figma: Body = Bottom | Top */
export type CardBody = "bottom" | "top";

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Figma "Card type". Defaults to `boxed`. */
  cardType?: CardType;
  /** Figma "Body": where the text sits. Defaults to `bottom`. */
  body?: CardBody;
  /** The image. Pass an `<img>` (or any element); it is stretched to fill the media area. */
  media: ReactNode;
  /** Card header text. */
  title: ReactNode;
  /** Card description text. */
  description?: ReactNode;
  /** Extra content under the text, for example a rating. */
  footer?: ReactNode;
  /** Small round control over the top right of the image, for example a "more" button. */
  action?: ReactNode;
  /** Control at the end of the text area, for example an arrow button. Only used by `boxed`. */
  trailing?: ReactNode;
}

const cx = (...names: Array<string | false | undefined>) => names.filter(Boolean).join(" ");

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { cardType = "boxed", body = "bottom", media, title, description, footer, action, trailing, className, ...rest },
  ref
) {
  const text = (
    <div className={styles.content}>
      <div className={styles.copy}>
        <p className={styles.title}>{title}</p>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {footer}
    </div>
  );

  return (
    <article {...rest} ref={ref} className={cx(styles.card, styles[cardType], styles[body], className)}>
      <div className={styles.media}>
        {media}
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
      <div className={styles.body}>
        {text}
        {cardType === "boxed" && trailing ? <div className={styles.trailing}>{trailing}</div> : null}
      </div>
    </article>
  );
});
