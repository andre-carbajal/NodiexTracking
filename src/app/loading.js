import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div style={{ padding: "4rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <LoadingSkeleton variant="form" fields={3} />
      <LoadingSkeleton variant="card" />
    </div>
  );
}
