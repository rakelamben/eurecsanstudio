import { RailingPanel } from "~/assets/illustrations/RailingPanel";
import { RoadwaySignGrid } from "~/assets/illustrations/RoadwaySignGrid";
import { useState, memo } from "react";
import { LogoInstagram } from "~/assets/logos/LOGO_INSTAGRAM"
import { LogoBehance } from "~/assets/logos/LOGO_BEHANCE"
import { LogoLinkedin } from "~/assets/logos/LOGO_LINKEDIN"
import { LogoGithub } from "~/assets/logos/LOGO_GITHUB"
import { Link } from "react-router"
import { sendContactEmail, type IdeaType } from "~/lib/emailjs";
import { FeedbackToast, type FeedbackData } from "./FeedbackToast";


function ContactFormComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ideaType, setIdeaType] = useState<IdeaType>("mobile_dev");
    const [message, setMessage] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);

    const handleClear = () => {
        setName("");
        setEmail("");
        setIdeaType("mobile_dev");
        setMessage("");
        setFeedback(null);
    };

    const validateForm = () => {
        if (!name.trim() || name.trim().length < 2) {
            setFeedback({ id: Date.now(), type: "error", text: "Please enter your name (minimum 2 characters)." });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email.trim())) {
            setFeedback({ id: Date.now(), type: "error", text: "Please enter a valid email address." });
            return false;
        }

        if (!message.trim() || message.trim().length < 5) {
            setFeedback({ id: Date.now(), type: "error", text: "Please describe your idea or project (minimum 5 characters)." });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await sendContactEmail({
                name,
                email,
                ideaType,
                message,
            });

            setFeedback({
                id: Date.now(),
                type: "success",
                text: "Sent! I'll get back to you soon.",
            });

            // Reset form on success
            setName("");
            setEmail("");
            setIdeaType("mobile_dev");
            setMessage("");
        } catch (error: unknown) {
            console.error("EmailJS Error:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : typeof error === "object" && error !== null && "text" in error
                    ? String((error as { text: unknown }).text)
                    : "Failed to send message. Please check your connection and try again.";

            setFeedback({
                id: Date.now(),
                type: "error",
                text: errorMessage,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='relative z-7 flex flex-col space-y-[5px] justify-start items-start w-fit'
        >
            {feedback && (
                <FeedbackToast
                    key={feedback.id}
                    feedback={feedback}
                    onClose={() => setFeedback(null)}
                    duration={5}
                />
            )}
            <div className="flex flex-row items-center gap-2 px-4 text-white rounded-md py-0 bg-(--brand-green) ring-[#368560] ring-2 ring-offset outline-white outline-2 outline-offset-2">
                <p className="font-bold text-xl tracking-widest leading-none text-center">CHAT ME</p>
                <p className="font-accent font-bold text-3xl tracking-tight">24</p>
            </div>
            
            <div className="flex flex-col w-full sm:w-fit bg-(--brand-green) justify-center py-4 px-4 gap-4 text-white rounded-2xl ring-[#368560] ring-2 ring-offset outline-white outline-2 outline-offset-2">
                

                <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="contact-name" className="inline-block bg-(--brand-yellow) text-black font-display font-bold text-sm px-2.5 py-1 rounded shadow-xs tracking-widest w-fit">
                                YOUR NAME
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSubmitting}
                                className="px-4 py-3 bg-black/20 max-w-64 outline-2 outline-white/80 ring-3 ring-black/50 focus:outline-(--brand-yellow) rounded-md disabled:opacity-50"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="contact-email" className="inline-block bg-(--brand-yellow) text-black font-display font-bold text-sm px-2.5 py-1 rounded shadow-xs tracking-widest w-fit">
                                YOUR EMAIL
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                className="px-4 py-3 bg-black/20 max-w-64 outline-2 outline-white/80 ring-3 ring-black/50 focus:outline-(--brand-yellow) rounded-md disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-2">
                            <span className="h-fit inline-block bg-(--brand-yellow) text-black font-display font-bold text-sm px-2.5 py-1 rounded shadow-xs tracking-widest w-fit">
                                YOUR IDEA
                            </span>
                            <div className="inline-flex rounded-lg bg-black/40 p-1 border border-white/30 shadow-inner w-fit">
                                <button
                                    type="button"
                                    onClick={() => setIdeaType("mobile_dev")}
                                    disabled={isSubmitting}
                                    className={`cursor-pointer px-3 py-1 rounded-md font-display text-xs md:text-sm tracking-wider uppercase transition-all ${
                                        ideaType === "mobile_dev"
                                            ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    } disabled:opacity-50`}
                                >
                                    MOBILE DEV
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIdeaType("website_dev")}
                                    disabled={isSubmitting}
                                    className={`cursor-pointer px-3 py-1 rounded-md font-display text-xs md:text-sm tracking-wider uppercase transition-all ${
                                        ideaType === "website_dev"
                                            ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    } disabled:opacity-50`}
                                >
                                    WEBSITE DEV
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIdeaType("ai_integration")}
                                    disabled={isSubmitting}
                                    className={`cursor-pointer px-3 py-1 rounded-md font-display text-xs md:text-sm tracking-wider uppercase transition-all ${
                                        ideaType === "ai_integration"
                                            ? "bg-(--brand-yellow) text-black font-bold shadow ring-1 ring-white"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    } disabled:opacity-50`}
                                >
                                    AI INTEGRATION
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isSubmitting}
                            className="h-[10rem] md:w-[32rem] md:h-full bg-black/20 outline-2 outline-white/80 ring-3 ring-black/50 focus:outline-(--brand-yellow) rounded-md p-4 resize-none disabled:opacity-50"
                            placeholder="Describe your idea or project here..."
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end w-full gap-4">
                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={isSubmitting}
                        className="text-white font-display tracking-wider cursor-pointer text-md w-fit hover:opacity-80 disabled:opacity-50"
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-(--brand-yellow) font-display tracking-wider cursor-pointer text-md w-fit hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                    >
                        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                </div>
            </div>
        </form>
    );
}

const ContactForm = memo(ContactFormComponent);

export function Contact() {
    return (
        <>
            <div className="pt-[4rem]">
                <section id="about-hero" className="w-full relative h-fit mb-8">
                    <div className="mt-8 text-center flex flex-col w-full">
                        <p className="font-display text-[clamp(4rem,7vw,8rem)] text-[#B4CDD8] leading-none">GET IN TOUCH</p>
                    </div>
                    <div className="w-full relative mb-8 -mt-10">
                        <div className="flex flex-col items-center max-w-[min(92vw,620px)] mx-auto gap-4 z-10 relative">
                            <ContactForm />
                            <RoadwaySignGrid className="relative z-5 -mt-10" />
                        </div>

                        <div className="absolute w-full flex flex-col items-center justify-center bottom-0 gap-28 z-0 [transform:translateZ(0)] contain-paint pointer-events-none -mb-2">
                            <RailingPanel className="max-h-[170px]" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 pb-8">
                        <p className="text-[#B4CDD8] font-display tracking-wider">OR FIND ME ON</p>
                        <div className="flex flex-row w-full items-center justify-center gap-4">
                            <Link to={"https://github.com/rakelamben"} target="_blank" rel="noopener noreferrer">
                                <LogoInstagram className="aspect-square max-w-[36px] text-[#B4CDD8] hover:text-[#5EC3F0] transition-colors" />
                            </Link>
                            <Link to={"https://www.behance.net/audewaputro15"} target="_blank" rel="noopener noreferrer">
                                <LogoBehance className="aspect-square max-w-[36px] text-[#B4CDD8] hover:text-[#5EC3F0] transition-colors" />
                            </Link>
                            <Link to={"https://www.linkedin.com/in/eurecsan-dewantoro"} target="_blank" rel="noopener noreferrer">
                                <LogoLinkedin className="aspect-square max-w-[36px] text-[#B4CDD8] hover:text-[#5EC3F0] transition-colors" />
                            </Link>
                            <Link to={"https://github.com/rakelamben"} target="_blank" rel="noopener noreferrer">
                                <LogoGithub className="aspect-square max-w-[36px] text-[#B4CDD8] hover:text-[#5EC3F0] transition-colors" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
