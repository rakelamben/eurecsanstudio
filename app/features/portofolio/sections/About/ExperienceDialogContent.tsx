import { useState } from "react";
import { eurecsanWorks } from "~/features/data/EurecsanWorks";
import { eurecsanEducation } from "~/features/data/EurecsanEducation";
import { SiBriefcaseDetailed } from '@sargamicons/react/fill';
import { SiBuildingAlt2 } from '@sargamicons/react/fill';


export function ExperienceDialogContent() {
    const [filter, setFilter] = useState<"all" | "works" | "education">("all");

    return (
        <div className="space-y-6 text-white pb-2">
            {/* Top Road Sign Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-white/30 pb-3">
                <div className="flex items-center gap-2">
                    <span className="font-display tracking-widest text-white text-lg md:text-xl uppercase">
                        CAREER & EDUCATION
                    </span>
                </div>

                {/* Highway Segmented Tab Switcher */}
                <div className="inline-flex rounded-lg bg-black/40 p-1 border border-white/30 shadow-inner w-fit">
                    <button
                        type="button"
                        onClick={() => setFilter("all")}
                        className={`cursor-pointer px-3 py-1 rounded-md font-display text-xs md:text-sm tracking-wider uppercase transition-all ${
                            filter === "all"
                                ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter("works")}
                        className={`cursor-pointer px-3 py-1 rounded-md font-display text-xs md:text-sm tracking-wider uppercase transition-all ${
                            filter === "works"
                                ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                    >
                        Works ({eurecsanWorks.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter("education")}
                        className={`cursor-pointer px-3 py-1 rounded-md font-display text-xs md:text-sm tracking-wider uppercase transition-all ${
                            filter === "education"
                                ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                    >
                        Education ({eurecsanEducation.length})
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* ================= WORKS TABLE ================= */}
                {(filter === "all" || filter === "works") && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-lg md:text-xl text-(--brand-yellow) tracking-wider uppercase flex items-center gap-2">
                                
                                Works & Employment
                                <SiBriefcaseDetailed className=""/>
                            </h3>
                        </div>

                        <div className="rounded-xl border-2 border-white/60 bg-[#024424] shadow-2xl overflow-hidden ring-2 ring-black/30">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[680px]">
                                    <thead>
                                        <tr className="bg-[#01351c] border-b-2 border-white/40 text-white font-display text-sm md:text-base tracking-wider uppercase sticky top-0 z-10 shadow">
                                            <th className="py-2.5 px-4 border-r border-dashed border-white/25 w-[140px]">
                                                Period
                                            </th>
                                            <th className="py-2.5 px-4 border-r border-dashed border-white/25 w-[180px]">
                                                Role
                                            </th>
                                            <th className="py-2.5 px-4 border-r border-dashed border-white/25 w-[190px]">
                                                Organization
                                            </th>
                                            <th className="py-2.5 px-4 border-r border-dashed border-white/25 w-[110px]">
                                                Status
                                            </th>
                                            <th className="py-2.5 px-4 min-w-[240px]">
                                                Jobdesk
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-dashed divide-white/25 text-xs md:text-sm">
                                        {eurecsanWorks.map((work, idx) => (
                                            <tr
                                                key={work.id}
                                                className={`transition-colors ${
                                                    idx % 2 === 0 ? "bg-[#046738]/50" : "bg-[#024424]/90"
                                                } hover:bg-[#067a43]/80`}
                                            >
                                                <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top">
                                                    <span className="inline-block bg-(--brand-yellow) text-black font-display font-bold text-xs px-2.5 py-1 rounded shadow-xs tracking-wider whitespace-nowrap">
                                                        {work.period}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top">
                                                    <p className="font-display text-base md:text-lg text-white tracking-wide">
                                                        {work.role}
                                                    </p>
                                                </td>
                                                <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top font-semibold text-white/95">
                                                    {work.organization}
                                                </td>
                                                <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top">
                                                    <span className="inline-block bg-white/20 text-white font-mono text-xs px-2.5 py-0.5 rounded-full border border-white/30 whitespace-nowrap font-bold tracking-wider">
                                                        {work.status}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-white/85 leading-relaxed align-top">
                                                    <ul className="space-y-1 list-disc list-inside">
                                                        {work.jobdesc.map((desc, i) => (
                                                            <li key={i} className="text-white/85">
                                                                {desc}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ================= EDUCATION TABLE ================= */}
                {(filter === "all" || filter === "education") && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-lg md:text-xl text-(--brand-yellow) tracking-wider uppercase flex items-center gap-2">
                                Education Background
                                <SiBuildingAlt2 />
                            </h3>
                        </div>

                        <div className="rounded-xl border-2 border-white/60 bg-[#024424] shadow-2xl overflow-hidden ring-2 ring-black/30">
                            <div className="overflow-x-auto max-h-[38vh] scrollbar-thin">
                                <table className="w-full text-left border-collapse min-w-[620px]">
                                    <thead>
                                        <tr className="bg-[#01351c] border-b-2 border-white/40 text-white font-display text-sm md:text-base tracking-wider uppercase sticky top-0 z-10 shadow">
                                            <th className="py-2.5 px-4 border-r border-dashed border-white/25 w-[140px]">
                                                Period
                                            </th>
                                            <th className="py-2.5 px-4 border-r border-dashed border-white/25 min-w-[240px]">
                                                Concentration / Major
                                            </th>
                                            <th className="py-2.5 px-4 min-w-[220px]">
                                                Institution
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-dashed divide-white/25 text-xs md:text-sm">
                                        {eurecsanEducation.map((edu, idx) => (
                                            <tr
                                                key={edu.id}
                                                className={`transition-colors ${
                                                    idx % 2 === 0 ? "bg-[#046738]/50" : "bg-[#024424]/90"
                                                } hover:bg-[#067a43]/80`}
                                            >
                                                <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top">
                                                    <span className="inline-block bg-(--brand-yellow) text-black font-display font-bold text-xs px-2.5 py-1 rounded shadow-xs tracking-wider whitespace-nowrap">
                                                        {edu.period}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top">
                                                    <p className="font-display text-base md:text-lg text-white tracking-wide">
                                                        {edu.consent}
                                                    </p>
                                                </td>
                                                <td className="py-3.5 px-4 align-top font-semibold text-white/95 text-sm md:text-base">
                                                    {edu.organization}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
