import { RoadSignSource } from "../../assets/illustrations/RoadSignSource";

interface RoadSignProps {
  className?: string;
}

/**
 * The sign is rendered from the editable React SVG source so its individual
 * elements can become interactive without replacing the illustration asset.
 */
export function RoadSign({ className = "" }: RoadSignProps) {
  return (
    <div 
      aria-label="Road signs illustration"
      className={`pointer-events-auto absolute bottom-0 left-1/2 z-10 aspect-[336/950] h-[calc(100dvh-5.5rem)] lg:h-[calc(100dvh-3rem)] -translate-x-1/2 [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
      role="img"
    >
      <RoadSignSource />
    </div>
  );
}
