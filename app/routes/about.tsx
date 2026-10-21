import type { Route } from "./+types/about";
import { ComingSoon } from "~/features/portofolio/sections/Handling/ComingSoon";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | Portfolio" },
    { name: "description", content: "About me and my experience." },
  ];
}

export default function AboutRoute() {
    return (
        <main>
            <ComingSoon />
        </main>
    )
}