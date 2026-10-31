export type EurecsanServiceId = "websites" | "mobile-apps" | "ai-integration";

export type EurecsanService = {
  id: EurecsanServiceId;
  label: string;
  title: string;
  description: string;
  details?: string[];
};

export const eurecsanServices: Record<EurecsanServiceId, EurecsanService> = {
  websites: {
    id: "websites",
    label: "Websites",
    title: "I do websites development",
    description:
      "Custom websites, built from scratch or from an existing design. Considered UI/UX, fast responsive front-ends and a solid backend, usually in Next.js, React or Laravel, come together in a site that does exactly what it was made for.",
    details: [
      // "Custom UI/UX implementation",
      // "Fast and responsive front-ends",
      // "Solid backend integration",
    ],
  },
  "mobile-apps": {
    id: "mobile-apps",
    label: "Mobile Apps",
    title: "I do mobile apps development",
    description:
      "Mobile apps for iOS and Android, shaped around how people actually use their phones. Flutter or React Native lets me ship one polished, intuitive app on both platforms, backed by a reliable backend.",
    details: [
      // "Mobile-first user experience",
      // "Cross-device responsive interfaces",
      // "Reliable application performance",
    ],
  },
  "ai-integration": {
    id: "ai-integration",
    label: "AI Integration",
    title: "I bring intelegence to your business",
    description:
      "Adding intelligence to websites and apps that already exist. I work with language models like BERT, Gemini and Groq, Regression and K-Means for prediction and segmentation and many more. A solution to support customers, monitor data and guide better business decisions.",
    details: [
      // "Workflow automation",
      // "AI-powered product features",
      // "Practical API integrations",
    ],
  },
};

export const eurecsanServiceCards = Object.values(eurecsanServices);
