import type { Route } from "./+types/home";
import { Hero } from "~/features/portofolio/sections/Hero/Hero";
import type { RouteHandle } from "~/types/RouteTypes";
import LogoHome from "~/assets/logos/LOGO_HOME.svg"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Eurecsan" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const handle: RouteHandle = {
  navbar: {
    logo: LogoHome,
    color: "text-(--brand-white)"
  }
}

export default function Home() {
  return <Hero />;
}
