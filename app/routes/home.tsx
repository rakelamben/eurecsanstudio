import type { Route } from "./+types/home";
import { Hero } from "~/features/portofolio/sections/Hero/Hero";
import type { RouteHandle } from "~/types/RouteTypes";
import { LOGO_EURECSAN } from "~/assets/logos/LOGO_EURECSAN";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Eurecsan" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const handle: RouteHandle = {
  navbar: {
    color: "text-(--brand-white)"
  }
}

export default function Home() {
  return <Hero />;
}
