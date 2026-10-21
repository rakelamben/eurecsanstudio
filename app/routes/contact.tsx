import type { Route } from "./+types/contact";
import { ComingSoon } from "~/features/portofolio/sections/Handling/ComingSoon";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | Portfolio" },
    { name: "description", content: "Get Connected With Me" },
  ];
}

export default function ContactRoute() {
    return (
        <main>
            <ComingSoon />
        </main>
    )
}