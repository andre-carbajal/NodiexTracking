"use client";

export function CardSkeleton() {
  return (
    <div className="skeleton skeleton-card">
      <div className="skeleton-line wide" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 4 }) {
  return (
    <div className="skeleton skeleton-row">
      {Array.from({ length: cols }).map((_, i) => (
        <div className="skeleton-line" key={i} />
      ))}
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="skeleton skeleton-timeline">
      <div className="skeleton-line wide" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
    </div>
  );
}

export function FormSkeleton({ fields = 3 }) {
  return (
    <div className="skeleton skeleton-form">
      {Array.from({ length: fields }).map((_, i) => (
        <div className="skeleton-line wide" key={i} />
      ))}
    </div>
  );
}

export default function LoadingSkeleton({ variant = "card", ...props }) {
  if (variant === "table-row") return <TableRowSkeleton {...props} />;
  if (variant === "timeline") return <TimelineSkeleton />;
  if (variant === "form") return <FormSkeleton {...props} />;
  return <CardSkeleton />;
}
