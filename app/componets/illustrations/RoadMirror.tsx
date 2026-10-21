import { RoadMirrorSource } from "../../assets/illustrations/RoadMirrorSource";
import { useState } from "react";
import { FisheyeCameraModal } from "../ui/FisheyeCameraModal";
/**
 * Keep the mirror inline so the artwork can retain its internal SVG details
 * and remain available for future interactions.
 */
export function RoadMirror() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button 
        aria-label="Road mirror illustration"
        onClick={() => setIsModalOpen(true)}
        className="hidden sm:block pointer-events-auto absolute bottom-0 left-1/2 z-10 aspect-[447/622] h-[calc(60dvh-2rem)] lg:h-[calc(65dvh-2rem)] translate-x-1/8 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
        role="img"
      >
        <RoadMirrorSource/>
      </button>
      <FisheyeCameraModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
