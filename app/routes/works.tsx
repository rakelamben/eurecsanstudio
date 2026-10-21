import type { Route } from "./+types/works";
import { ComingSoon } from "~/features/portofolio/sections/Handling/ComingSoon";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Works | Portfolio" },
    { name: "description", content: "My Lifetime Works" },
  ];
}

export default function WorksRoute() {
    return (
        <main>
            <ComingSoon />
        </main>
    )
}