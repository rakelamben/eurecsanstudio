export type WorkExperience = {
    id: string;
    period: string;
    role: string;
    company: string;
    type: string;
    location: string;
    description: string;
};

export type EducationExperience = {
    id: string;
    period: string;
    institution: string;
    degree: string;
    major: string;
    status: string;
    description: string;
};

export const eurecsanWorks: WorkExperience[] = [
    {
        id: "work-1",
        period: "2023 - PRESENT",
        role: "Fullstack Developer & UI/UX",
        company: "Freelance & University Lab",
        type: "Project-Based",
        location: "Yogyakarta, ID",
        description: "Designing & developing end-to-end web & mobile apps with React, Tailwind CSS, Motion, and RESTful APIs.",
    },
    {
        id: "work-2",
        period: "2023 - 2024",
        role: "Mobile App Developer",
        company: "Academic R&D Projects",
        type: "Contract",
        location: "Yogyakarta, ID",
        description: "Built cross-platform Flutter & React Native applications, device sensor integrations, and offline-first storage.",
    },
    {
        id: "work-3",
        period: "2022 - 2023",
        role: "Frontend Engineer Contributor",
        company: "Campus Tech Community",
        type: "Organization",
        location: "Yogyakarta, ID",
        description: "Maintained student event platforms, reusable UI component systems, and collaborated in Git agile sprints.",
    },
];

export const eurecsanEducation: EducationExperience[] = [
    {
        id: "edu-1",
        period: "2021 - PRESENT",
        institution: "Universitas Amikom Yogyakarta",
        degree: "Bachelor of Computer Science (S.Kom)",
        major: "Information Technology",
        status: "Final Year Student",
        description: "Focused on Software Engineering, Human-Computer Interaction (HCI), Frontend Systems, and Mobile Architecture.",
    },
    {
        id: "edu-2",
        period: "2018 - 2021",
        institution: "Senior High School (SMA)",
        degree: "High School Diploma",
        major: "Natural Sciences (MIPA)",
        status: "Graduated",
        description: "Active in computer club, basic web development, algorithmic logic, and graphic design fundamentals.",
    },
];
