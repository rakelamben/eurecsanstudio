import { NavLink, useMatches } from "react-router";
import LogoHome from "~/assets/logos/LOGO_HOME.svg"
import { SiClearAll } from '@sargamicons/react/fill';
import { useState } from "react";
import type { RouteHandle } from "~/types/RouteTypes";

const navigationItems = [
    { label: "About Me", to: "/about" },
    { label: "Works", to: "/works" },
    { label: "Contact", to: "/contact" },
]

export function Navbar() {
    const matches = useMatches()
    const navbarConfig = matches.reduce(
        (config, match) => {
            const routeHandle = match.handle as RouteHandle | undefined;

            return {
                ...config,
                ...(routeHandle?.navbar ?? {}),
            };
        },
        {
            logo: LogoHome,
            color: "text-(--brand-white)",
        }
    );
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed inset-x-0 top-0 z-50 w-full">
            <nav className={`${navbarConfig.color} px-8 md:px-12 py-6  mx-auto w-full flex items-center justify-between`}>
                <NavLink to="/" end aria-label="Ke halaman utama">
                    <img src={navbarConfig.logo} className="h-12" alt="Logo Home" />
                </NavLink>
                <div className="hidden gap-4 lg:flex">
                    {navigationItems.map(menu =>
                        <NavLink key={menu.to} to={menu.to} end className={({ isActive }) => (isActive ? "active" : undefined)}>
                            <span className="text-xl font-display">{menu.label}</span>
                        </NavLink>
                    )}
                </div>
                <div className="relative lg:hidden">
                    <button
                        type="button"
                        aria-label="Buka menu navigasi"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                        className="block"
                        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                    >
                        <SiClearAll className="h-12 w-12 {`${navbarConfig.color}" />
                    </button>

                    {isMenuOpen && (
                        <div
                            id="mobile-navigation"
                            className="absolute right-0 top-full w-[90px] bg-white border-black border-3 drop-shadow-[0_5px_0_#000]"
                        >
                            <div className="flex flex-col items-center">
                                {navigationItems.map((menu) => (
                                    <NavLink
                                        key={menu.to}
                                        to={menu.to}
                                        end
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `font-display text-base p-2 w-full h-full text-center leading-none text-black hover:bg-[#009DD6] hover:text-white transition-color duration-200 ${isActive ? "bg-[#009DD6] text-white" : ""}`
                                        }
                                    >
                                        <span className="text-lg">/{menu.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
