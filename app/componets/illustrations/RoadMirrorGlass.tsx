import { useState } from "react";
import { RoadMirrorGlassSource } from "../../assets/illustrations/RoadMirrorGlassSource";
import { FisheyeCameraModal } from "../ui/FisheyeCameraModal";

/**
 * The sign is rendered from the editable React SVG source so its individual
 * elements can become interactive without replacing the illustration asset.
 */
export function RoadMirrorGlass() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Open fisheye camera"
        className="sm:hidden cursor-pointer pointer-events-auto aspect-[140/140] h-[calc(25dvh-4rem)] lg:[calc(50dvh-4rem)] w-fit absolute bottom-4 right-2 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
      >
        <RoadMirrorGlassSource />
      </button>
      <FisheyeCameraModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
