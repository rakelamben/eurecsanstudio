import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const FISHEYE_STRENGTH = 0.32;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uVideo;
  uniform float uStrength;
  uniform float uVideoAspect;
  uniform float uCanvasAspect;
  varying vec2 vUv;

  void main() {
    vec2 centered = vUv * 2.0 - 1.0;
    float radius = length(centered);

    // Expand the sampling radius toward the edge to simulate a convex lens,
    // then normalize it so the outer edge remains inside the video texture.
    float distortion = 1.0 + uStrength * radius * radius;
    centered *= distortion / (1.0 + uStrength);

    vec2 aspectScale = vec2(1.0);
    if (uVideoAspect > uCanvasAspect) {
      aspectScale.x = uCanvasAspect / uVideoAspect;
    } else {
      aspectScale.y = uVideoAspect / uCanvasAspect;
    }

    vec2 videoUv = centered * aspectScale * 0.5 + 0.5;
    videoUv.x = 1.0 - videoUv.x;

    if (videoUv.x < 0.0 || videoUv.x > 1.0 || videoUv.y < 0.0 || videoUv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
      gl_FragColor = texture2D(uVideo, videoUv);
    }
  }
`;

export function FisheyeCameraView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    let animationFrame = 0;
    let stream: MediaStream | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let videoTexture: THREE.VideoTexture | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let disposed = false;

    const cleanup = () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      stream?.getTracks().forEach((track) => track.stop());
      videoTexture?.dispose();
      material?.dispose();
      geometry?.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss();
    };

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Kamera tidak didukung browser ini.");
        return;
      }

      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 1280 },
            height: { ideal: 1280 },
          },
        });

        if (disposed) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        video.srcObject = stream;
        await video.play();

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        geometry = new THREE.PlaneGeometry(2, 2);
        videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        material = new THREE.ShaderMaterial({
          uniforms: {
            uCanvasAspect: { value: 1 },
            uStrength: { value: FISHEYE_STRENGTH },
            uVideo: { value: videoTexture },
            uVideoAspect: { value: 1 },
          },
          vertexShader,
          fragmentShader,
        });

        scene.add(new THREE.Mesh(geometry, material));

        const resize = () => {
          if (!renderer || !material) return;

          const { width, height } = container.getBoundingClientRect();
          if (!width || !height) return;

          renderer.setSize(width, height, false);
          material.uniforms.uCanvasAspect.value = width / height;

          if (video.videoWidth && video.videoHeight) {
            material.uniforms.uVideoAspect.value = video.videoWidth / video.videoHeight;
          }
        };

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        resize();

        const render = () => {
          if (disposed || !renderer) return;
          renderer.render(scene, camera);
          animationFrame = requestAnimationFrame(render);
        };

        setError(null);
        render();
      } catch (cameraError) {
        if (!disposed) {
          setError(
            cameraError instanceof DOMException && cameraError.name === "NotAllowedError"
              ? "Izin kamera ditolak."
              : "Kamera tidak dapat digunakan.",
          );
        }
        cleanup();
      }
    };

    void startCamera();

    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden rounded-full bg-black">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-xs text-white">
          {error}
        </div>
      ) : null}
    </div>
  );
}
