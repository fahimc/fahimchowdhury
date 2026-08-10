import type {
  AnchorHTMLAttributes,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

type Gap = "sm" | "md" | "lg";

type BoxProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  gap?: Gap;
};

const gapSize: Record<Gap, string> = {
  sm: "0.75rem",
  md: "1.25rem",
  lg: "clamp(3rem, 8vw, 7rem)",
};

export function Page({ children, ...props }: BoxProps) {
  return <main {...props}>{children}</main>;
}

export function Section({ children, ...props }: BoxProps) {
  return <section {...props}>{children}</section>;
}

export function Stack({ children, gap = "md", style, ...props }: LayoutProps) {
  return (
    <div
      {...props}
      style={{ display: "flex", flexDirection: "column", gap: gapSize[gap], ...style }}
    >
      {children}
    </div>
  );
}

export function Row({ children, gap = "md", style, ...props }: LayoutProps) {
  return (
    <div
      {...props}
      style={{ display: "flex", flexWrap: "wrap", gap: gapSize[gap], ...style }}
    >
      {children}
    </div>
  );
}

type GridProps = LayoutProps & { columns?: number };

export function Grid({ children, columns = 2, gap = "md", style, ...props }: GridProps) {
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: gapSize[gap],
    ...style,
  };
  return <div {...props} style={gridStyle}>{children}</div>;
}

export function Card({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return <article {...props}>{children}</article>;
}

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Heading({ level = 2, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return <Tag {...props}>{children}</Tag>;
}

export function Text({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props}>{children}</p>;
}

export function Badge({ children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props}>{children}</span>;
}

export function Link({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props}>{children}</a>;
}

export function Image(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} />;
}
