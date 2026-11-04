import emailjs from "@emailjs/browser";

export type IdeaType = "mobile_dev" | "website_dev" | "ai_integration";

export const IDEA_TYPE_LABELS: Record<IdeaType, string> = {
  mobile_dev: "Mobile App Development",
  website_dev: "Website Development",
  ai_integration: "AI Integration & Machine Learning",
};

export interface SendContactParams {
  name: string;
  email: string;
  ideaType: IdeaType;
  message: string;
  time?: string;
}

export async function sendContactEmail(params: SendContactParams) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Kredensial EmailJS belum lengkap di file .env (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY)."
    );
  }

  if (
    publicKey.startsWith("your_") ||
    publicKey.includes("xxxx") ||
    serviceId.startsWith("your_") ||
    serviceId.includes("xxxx")
  ) {
    throw new Error(
      "Kredensial EmailJS masih berupa nilai placeholder. Jika baru saja mengubah .env, restart Vite dev server (hentikan lalu jalankan ulang 'npm run dev')."
    );
  }

  const now = new Date();
  const defaultTime = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Asia/Jakarta",
  }).format(now);

  const templateParams = {
    from_name: params.name.trim(),
    from_email: params.email.trim(),
    idea_type: params.ideaType,
    idea_type_label: IDEA_TYPE_LABELS[params.ideaType] || params.ideaType,
    message: params.message.trim(),
    reply_to: params.email.trim(),
    from_time: params.time || defaultTime,
  };

  const response = await emailjs.send(serviceId, templateId, templateParams, {
    publicKey,
  });

  return response;
}
