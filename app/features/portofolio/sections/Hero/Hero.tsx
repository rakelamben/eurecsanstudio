import { SkyBackground } from "~/componets/backgrounds/SkyBackground";
import { SkyBottomGradient } from "~/componets/backgrounds/SkyBottomGradient";
import { BigCloud } from "~/componets/backgrounds/BigCloud";
import { RoadMirror } from "~/componets/illustrations/RoadMirror";
import { RoadSign } from "~/componets/illustrations/RoadSign";
import { RoadMirrorGlass } from "~/componets/illustrations/RoadMirrorGlass";

export function Hero() {
  return (
    <section className="relative h-dvh overflow-hidden">
      <SkyBackground classname=""/>
      <BigCloud></BigCloud>
      <RoadSign />
      <RoadMirror />
      <RoadMirrorGlass></RoadMirrorGlass>

      <div className="absolute bottom-1/2 translate-y-1/2 left-1/8 md:left-1/4 -translate-x-1/2 hidden sm:flex sm:flex-col sm:ml-4">
        <span className="text-white text-md md:text-lg">Hi, There,</span>
        <span className="font-display text-2xl md:text-4xl text-[#009DD6] leading-none">Eurecsan <br/>Dewantoro</span>
        <span className="text-white text-md md:text-lg">Here</span>
      </div>

      <SkyBottomGradient></SkyBottomGradient>
    </section>
  );
}
