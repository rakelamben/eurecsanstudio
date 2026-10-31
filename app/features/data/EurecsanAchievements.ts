export type EurecsanAchievementProps = {
    id: string;
    period: string;
    title: string;
    organization: string;
    category: string;
    description: string;
};

export const eurecsanAchievements: EurecsanAchievementProps[] = [
    {
        id: "achieve-1",
        period: "2024",
        title: "1st Place Winner - National UI/UX Design Challenge",
        organization: "National IT Festival Indonesia",
        category: "CHAMPION",
        description: "Designed a high-fidelity accessible public transit mobile application with complete interactive prototype and user journey testing.",
    },
    {
        id: "achieve-2",
        period: "2023",
        title: "Top 5 Finalist - Web Development Hackathon",
        organization: "Google Developer Student Club (GDSC)",
        category: "HACKATHON",
        description: "Built a collaborative disaster response information dashboard within 48 hours using React, Tailwind CSS, and REST API.",
    },
    {
        id: "achieve-3",
        period: "2022",
        title: "Certified Associate Frontend Engineer",
        organization: "Dicoding Academy Indonesia & Kemendikbud",
        category: "CERTIFIED",
        description: "Completed professional track covering modern JavaScript, Web Performance, Progressive Web Apps (PWA), and automated testing.",
    },
];
