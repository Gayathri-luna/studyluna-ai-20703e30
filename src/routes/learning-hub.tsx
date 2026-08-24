import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — now a tab inside the unified /hub page. */
export const Route = createFileRoute("/learning-hub")({
  beforeLoad: () => {
    throw redirect({ to: "/hub", search: { tab: "learning" }, replace: true });
  },
});
