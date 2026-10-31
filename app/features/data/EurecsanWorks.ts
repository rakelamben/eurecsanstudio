export type EurecsanWorksProps = {
    id: string;
    role: string;
    organization: string;
    period: string;
    status: string;
    jobdesc: string[];
};

export const eurecsanWorks: EurecsanWorksProps[] = [
    {
        id: "exp-3",
        role: "Store Crew",
        organization: "Pizza Hut Delivery",
        period: "2025 - 2026",
        status: "PARTTIME",
        jobdesc: [
            "Refactored legacy code into modern reusable component architecture.",
            "Mentored junior members in modern JavaScript, TypeScript, and CSS styling.",
        ],
    },
    {
        id: "exp-2",
        role: "UI/UX Designer and QA",
        organization: "CV. Karya Hidup Sentosa",
        period: "2024-2024",
        status: "FULLTIME",
        jobdesc: [
            "Built apps using Flutter and React Native with modular state management.",
            "Implemented smooth animations and device-specific integrations (camera, geolocation, offline caching).",
            "Tested and optimized responsiveness across multiple screen densities.",
        ],
    },
    {
        id: "exp-1",
        role: "Website Programmer",
        organization: "CV. Karya Hidup Sentosa",
        period: "2023 - 2024",
        status: "INTERN",
        jobdesc: [
            "Crafted modern frontend experiences using React, React Router, Tailwind CSS, and Motion.",
            "Designed design systems, wireframes, and interactive prototypes in Figma.",
            "Built robust APIs and backend services integrating databases and third-party services.",
        ],
    },
];
