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
            "Managed day-to-day outlet operations, including product preparation, delivery, cashier and waiter duties, and outlet maintenance and cleaning."
        ],
    },
    {
        id: "exp-2",
        role: "UI/UX Designer and QA",
        organization: "CV. Karya Hidup Sentosa",
        period: "2024-2024",
        status: "FULLTIME",
        jobdesc: [
            "Created and developed quality assurance standards for functional and non-functional testing of software released by the company's ICT team.",
            "Designed the user interface standards for the company's ERP system, applied across the release of work system modules.",
            "Conducted cross-team reviews with each division's UI/UX team to ensure the system's UI/UX quality and compliance with the defined standards.",
        ],
    },
    {
        id: "exp-1",
        role: "Website Programmer",
        organization: "CV. Karya Hidup Sentosa",
        period: "2023 - 2024",
        status: "INTERN",
        jobdesc: [
            "Consulted with users and conducted requirements analysis to define the features and workflows of ERP modules.",
            "Fixed bugs in specific modules and refactored modules that were causing excessive server resource consumption.",
            "Developed new ERP modules based on user needs and the principles of effectiveness and process efficiency.",
        ],
    },
];
