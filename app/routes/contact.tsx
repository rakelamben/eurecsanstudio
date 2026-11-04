import type { Route } from "./+types/contact";
import type { RouteHandle } from "~/types/RouteTypes";
import { Contact } from "~/features/portofolio/sections/Contact/Contact";
import { LOGO_EURECSAN } from "~/assets/logos/LOGO_EURECSAN";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | Portfolio" },
    { name: "description", content: "Get Connected With Me" },
  ];
}

export const handle: RouteHandle = {
  navbar: {
    color: "text-(--brand-green)"
  }
}

export default function ContactRoute() {
    return (
        <main>
            <Contact />
        </main>
    )
}