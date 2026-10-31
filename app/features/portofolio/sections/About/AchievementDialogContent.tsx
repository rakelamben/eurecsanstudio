import { eurecsanAchievements } from "~/features/data/EurecsanAchievements";

export function AchievementDialogContent() {
    return (
        <div className="space-y-6 text-white pb-2">
            {/* Top Road Sign Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-white/30 pb-3">
                <div className="flex items-center gap-2">
                    <span className="font-display tracking-widest text-white text-lg md:text-xl uppercase">
                        ACHIEVEMENTS & AWARDS
                    </span>
                </div>
            </div>

            {/* Achievements Table */}
            <div className="rounded-xl border-2 border-white/60 bg-[#024424] shadow-2xl overflow-hidden ring-2 ring-black/30">
                <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left border-collapse min-w-[680px]">
                        <thead>
                            <tr className="bg-[#01351c] border-b-2 border-white/40 text-white font-display text-sm md:text-base tracking-wider uppercase sticky top-0 z-10 shadow">
                                <th className="py-2.5 px-4 border-r border-dashed border-white/25 w-[110px]">
                                    Year
                                </th>
                                <th className="py-2.5 px-4 border-r border-dashed border-white/25 min-w-[210px]">
                                    Award / Recognition
                                </th>
                                <th className="py-2.5 px-4 border-r border-dashed border-white/25 min-w-[180px]">
                                    Organizer / Event
                                </th>
                                <th className="py-2.5 px-4 border-r border-dashed border-white/25 w-[120px]">
                                    Category
                                </th>
                                <th className="py-2.5 px-4 min-w-[240px]">
                                    Scope & Description
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dashed divide-white/25 text-xs md:text-sm">
                            {eurecsanAchievements.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className={`transition-colors ${
                                        idx % 2 === 0 ? "bg-[#046738]/50" : "bg-[#024424]/90"
                                    } hover:bg-[#067a43]/80`}
                                >
                                    <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top">
                                        <span className="inline-block bg-(--brand-yellow) text-black font-display font-bold text-xs px-2.5 py-1 rounded shadow-xs tracking-wider whitespace-nowrap">
                                            {item.period}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top">
                                        <p className="font-display text-base md:text-lg text-white tracking-wide">
                                            {item.title}
                                        </p>
                                    </td>
                                    <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top font-semibold text-white/95">
                                        {item.organization}
                                    </td>
                                    <td className="py-3.5 px-4 border-r border-dashed border-white/25 align-top">
                                        <span className="inline-block bg-white/20 text-white font-mono text-xs px-2.5 py-0.5 rounded-full border border-white/30 whitespace-nowrap font-bold tracking-wider">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-white/85 leading-relaxed align-top">
                                        {item.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
