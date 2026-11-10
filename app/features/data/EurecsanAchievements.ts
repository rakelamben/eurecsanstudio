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
        period: "2025",
        title: "1st Place Winner - Scientific Papers Research and Development Competition (RnDC) 2025",
        organization: "UKMF Penelitian KRISTAL UNY",
        category: "CHAMPION",
        description: "Designed water filtration system using natural materials and integrated IoT sensors for real-time monitoring for improved water quality and sustainability in batik production.",
    },
    {
        id: "achieve-2",
        period: "2025",
        title: "3rd Place Winner - Scientific Papers UNY Scientific Fair (UNYSEF) #14 2025",
        organization: "UKM Penelitian UNY",
        category: "BIG THREE",
        description: "Built a composter bin with IoT sensors and a mobile app to colaborate in managing waste and composting process, promoting sustainable practices and reducing environmental impact.",
    },
];
