export type HowItWorks = {
    title: string;
    description: string;
}

export type urlView = {
    type: string;
    url: string;
}

export type Project = {
    status: string;
    year: string;
    title: string;
    description: string;
    highlight: boolean;
    thumbnail: string;
    howItWorks: HowItWorks[];
    builtWith: string[];
    urlView: urlView;
}

export type EurecsanProjectsProps = {
    type: string;
    title: string;
    content: Project[];
};


export const eurecsanProjects: EurecsanProjectsProps[] = [
    {
        "title": "software dev",
        
        "type": "software_dev",
        "content": [
            {
                "title": "GERD HERO",
                "status": "Production",
                "year": "2026",
                "description": "A companion app for tracking GERD symptoms and providing AI-powered medical recommendations.",
                "highlight": true,
                "thumbnail": "/bluewashing.webp",
                "howItWorks": [
                    { "title": "Collect Data", "description": "Alice"},
                ],
                builtWith: ["Next.JS"],
                urlView: {"type": "release", "url": "https://gerdhero-landing.vercel.app/"}
                
            },
            {
                "title": "Carefin",
                "status": "Design",
                "year": "2025",
                "description": "An interactive learning management system tailored for accounting students.",
                "highlight": false,
                "thumbnail": "/carefin.webp",
                "howItWorks": [
                    { "title": "Collect Data", "description": "Alice"},
                    { "title": "Collect Data", "description": "Alice"},
                    { "title": "Collect Data", "description": "Alice"},
                ],
                builtWith: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
                urlView: {"type": "prototype", "url": "https://gerdhero-landing.vercel.app/"}
            },
            {
                "title": "Blue Wash Qestionnaire",
                "status": "Design",
                "year": "2026",
                "description": "A companion app for tracking GERD symptoms and providing AI-powered medical recommendations.",
                "highlight": false,
                "thumbnail": "/bluewashing.webp",
                "howItWorks": [
                    { "title": "1", "description": "Alice"},
                ],
                builtWith: ["Next.JS"],
                urlView: {"type": "prototype", "url": "https://gerdhero-landing.vercel.app/"}
            },
            {
                "title": "FoodCircle",
                "status": "Design",
                "year": "2025",
                "description": "A companion app for tracking GERD symptoms and providing AI-powered medical recommendations.",
                "highlight": false,
                "thumbnail": "/foodcircle.webp",
                "howItWorks": [
                    { "title": "1", "description": "Alice"},
                ],
                builtWith: ["Next.JS"],
                urlView: {"type": "prototype", "url": "https://gerdhero-landing.vercel.app/"}
            },
            {
                "title": "Clata",
                "status": "Production",
                "year": "2026",
                "description": "A companion app for tracking GERD symptoms and providing AI-powered medical recommendations.",
                "highlight": false,
                "thumbnail": "/bluewashing.webp",
                "howItWorks": [
                    { "title": "1", "description": "Alice"},
                ],
                builtWith: ["Next.JS"],
                urlView: {"type": "release", "url": "https://gerdhero-landing.vercel.app/"}
            },

        ]
    },
    {
        "title": "AI/ML Integration",
        "type": "ai_ml_integration",
        "content": [
            // {
            //     "title": "GERD HERO",
            //     "description": "A companion app for tracking GERD symptoms and providing AI-powered medical recommendations.",
            //     "highlight": false,
            //     "thumbnail": "/bluewashing.webp"
            // },
        ]
    }
]