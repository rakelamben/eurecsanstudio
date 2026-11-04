import type { RouteHandle } from "~/types/RouteTypes";
import type { Route } from "./+types/about";
import { About } from "~/features/portofolio/sections/About/About";

import { LOGO_EURECSAN } from "~/assets/logos/LOGO_EURECSAN";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | Portfolio" },
    { name: "description", content: "About me and my experience." },
  ];
}


export const handle: RouteHandle = {
  navbar: {
    color: "text-(--brand-red)"
  }
}


export default function AboutRoute() {
    return (
        <section>
            <About></About>
        </section>
    )
}