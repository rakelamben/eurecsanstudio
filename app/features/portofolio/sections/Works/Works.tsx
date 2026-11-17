import { useEffect, useRef, useState } from "react";
import { eurecsanProjects } from "~/features/data/EurecsanProjects";
import { type Project } from "~/features/data/EurecsanProjects";
import { CardHoverBorder } from "~/componets/ui/CardHoverBorder";
import { Footer } from "~/componets/layout/Footer";
import { Dialog } from "~/componets/ui/Dialog";
import { SiNorthEastEscape } from '@sargamicons/react/fill';



export function Works() {
    const [worksType, setWorksType] = useState<"all" | "software_dev" | "ai_ml_integration">("all");
    const hoverExitTimeout = useRef<number | null>(null);
    const [hoveredCard, setHoveredCard] = useState<{
        element: HTMLElement | null;
        borderColor: string;
    }>({
        element: null,
        borderColor: "border-(--brand-yellow)",
    });
    const [projectOpen, setProjectOpen] = useState<Project | null>(null);

    const colors = [
        { badge: "bg-(--brand-red)", border: "border-(--brand-red)" },
        { badge: "bg-(--brand-yellow)", border: "border-(--brand-yellow)" },
        { badge: "bg-(--brand-blue)", border: "border-(--brand-blue)" },
        { badge: "bg-(--brand-green)", border: "border-(--brand-green)" },
    ];

    let itemCount = 0;

    useEffect(() => () => {
        if (hoverExitTimeout.current !== null) {
            window.clearTimeout(hoverExitTimeout.current);
        }
    }, []);

    const handleCardMouseEnter = (element: HTMLElement, borderColor: string) => {
        if (hoverExitTimeout.current !== null) {
            window.clearTimeout(hoverExitTimeout.current);
            hoverExitTimeout.current = null;
        }

        setHoveredCard({ element, borderColor });
    };

    const handleCardMouseLeave = () => {
        hoverExitTimeout.current = window.setTimeout(() => {
            setHoveredCard((current) => ({ ...current, element: null }));
            hoverExitTimeout.current = null;
        }, 100);
    };

    const sumOfProject = eurecsanProjects.reduce(
        (total, project) => total + project.content.length,
        0,
    );
    const filteredProjects = eurecsanProjects.filter(
        (project) =>
            project.content.length > 0 &&
            (worksType === "all" || project.type === worksType),
    );

    return (
        <>
            <section className="w-full pt-[4rem] relative h-fit mb-8">
                <CardHoverBorder
                    targetElement={hoveredCard.element}
                    borderColor={hoveredCard.borderColor}
                />
                <div className="max-w-[962px] mx-auto w-fit flex flex-col items-center px-4 gap-4">
                    <div className="mt-8 text-center flex flex-col w-full">
                        <p className="font-display text-[clamp(4rem,7vw,8rem)] text-[#B4CDD8] leading-none">My Works</p>
                    </div>
                    <div className="inline-flex rounded-lg bg-[#77909B] p-1 border border-white/30 shadow-inner w-fit">
                        <button
                            type="button"
                            onClick={() => setWorksType("all")}
                            className={`cursor-pointer px-3 py-1 rounded-md font-display text-lg tracking-wider uppercase transition-all ${worksType === "all"
                                ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                                } disabled:opacity-50`}
                        >
                            ALL <span>({sumOfProject})</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setWorksType("software_dev")}
                            className={`cursor-pointer px-3 py-1 rounded-md font-display text-lg tracking-wider uppercase transition-all ${worksType === "software_dev"
                                ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                                } disabled:opacity-50`}
                        >
                            SOFTWARE DEV <span>({eurecsanProjects[0].content.length})</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setWorksType("ai_ml_integration")}
                            className={`cursor-pointer px-3 py-1 rounded-md font-display text-lg tracking-wider uppercase transition-all ${worksType === "ai_ml_integration"
                                ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                                } disabled:opacity-50`}
                        >
                            AI/ML INTEGRATION <span>({eurecsanProjects[1].content.length})</span>
                        </button>
                    </div>
                </div>
                <div className="w-full px-12 ">

                    <div
                        className="max-w-screen-2xl mx-auto w-full bg-[#EEEEEE] flex flex-col items-start mt-8"

                    >
                        {filteredProjects.length === 0 ? (
                            <div className="w-full min-h-48 flex items-center justify-center px-4 text-center text-(--brand-black)/50 font-display text-2xl">
                                No projects started or finished.
                                <button></button>
                            </div>
                        ) : (
                            filteredProjects.map((project) => (
                                    <div className="pb-8">
                                        <div className="flex flex-row w-fit">
                                            <div className="px-2 bg-(--brand-black) text-white font-display font-bold ring-2 ring-inset ring-white">P</div>
                                            <p className="font-display px-2 bg-(--brand-yellow)">{project.type}</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 grid-flow-row w-full px-4 pb-4">
                                            {project.content.map((item) => {
                                                const cardNumber = ++itemCount;
                                                const badgeColor = colors[(cardNumber - 1) % colors.length];

                                                return (
                                                    <div className={`cursor-pointer p-2 ${item.highlight ? 'lg:row-span-2 md:col-span-2' : ""}`}
                                                        onMouseEnter={(event) => handleCardMouseEnter(
                                                            event.currentTarget,
                                                            badgeColor.border,
                                                        )}
                                                        onMouseLeave={handleCardMouseLeave}
                                                        onClick={() => setProjectOpen(item)}
                                                    >
                                                        <div className="aspect-[16/10] w-full bg-white overflow-hidden rounded-sm relative">
                                                            <div className={`absolute flex justify-center font-display z-4 w-10 h-10 text-white ${badgeColor.badge}`} style={{ "clipPath": "polygon(176% -14%, 9% -20%, 215% -10%, -5px 102%, -16% 0%)" }}>
                                                                <p>{"# " + cardNumber}</p>
                                                            </div>
                                                            <img className="w-full z-1 h-full object-cover" src={"/thumbnail" + item.thumbnail} alt={"thumbnail-" + item.title.replace(" ", "")} />
                                                        </div>
                                                        <p className="font-display text-2xl mt-3">{item.title}</p>
                                                        <p className="text-sm text-(--brand-black)/60">{item.description}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="h-42"></div>
                <Footer />
            </section>
            <Dialog
                open={projectOpen !== null}
                onClose={() => setProjectOpen(null)}
                wrapperClassName="overflow-hidden rounded-md"
            >
                <div className="w-full">
                    <img src={'/thumbnail' + projectOpen?.thumbnail} alt="Project Thumbnail" />
                </div>
                <div className="flex flex-col bg-(--brand-white) px-6 py-8">
                    <div className="grid grid-cols-5 gap-12 w-full">
                        <div className="w-full col-span-3">
                            <h1 className="text-4xl font-display text-(--brand-black)">{projectOpen?.title}</h1>
                            <p className="text-(--brand-black)/70 mb-6">{projectOpen?.description}</p>

                            <p className="mb-2 font-semibold text-(--brand-black)">How It Works</p>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className=" bg-(--brand-black)/5 w-fit">
                                        <th className="font-medium px-2 py-2">
                                            Process
                                        </th>
                                        <th className="font-medium px-2 py-2 ">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dashed divide-white/25">
                                    {projectOpen?.howItWorks.map((item) => (
                                        <tr className="w-fit">
                                            <td className="text-(--brand-black)/70 px-4 py-2 text-left">{item.title}</td>
                                            <td className="text-(--brand-black)/70 px-4 py-2">{item.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full col-span-2">

                            <button className="w-full cursor-pointer  gap-2 items-center px-4 py-2 bg-black text-white font-display text-lg rounded-xl hover:bg-[#009DD6] transition-colors">
                                <a href={projectOpen?.urlView.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center whitespace-nowrap">
                                    <SiNorthEastEscape className="text-2xl"/>
                                    {projectOpen?.urlView.type == "release" ? (
                                        "Open Site"
                                    ): (
                                        "Open Prototype"
                                    )}
                                </a>
                            </button>

                            <p className="mt-6 mb-2 font-semibold text-(--brand-black)">Build With</p>
                            <div className="flex flex-row gap-2 flex-wrap">
                                {projectOpen?.builtWith.map((item) => (
                                    <div className="px-3 py-1 font-medium bg-(--brand-black)/5 rounded-md whitespace-nowrap">{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}