import { Works } from "~/features/portofolio/sections/Works/Works";
import type { Route } from "./+types/works";
import type { RouteHandle } from "~/types/RouteTypes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Works | Eurecsan" },
    { name: "description", content: "My Lifetime Works" },
  ];
}

export const handle: RouteHandle = {
  navbar: {
    color: "text-(--brand-red)"
  }
}

export default function WorksRoute() {
    return (
        <main>
            <Works />
        </main>
    )
}