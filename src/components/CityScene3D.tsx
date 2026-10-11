import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, useGLTF, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import columnAsset from "@/assets/egypt-column.asset.json";
const PALM_URL = "https://raw.githubusercontent.com/ToxSam/cc0-models-Polygonal-Mind/main/projects/tomb-chaser-1/PalmTree_Art.glb";
const JAR_URL = "https://raw.githubusercontent.com/ToxSam/cc0-models-Polygonal-Mind/main/projects/tomb-chaser-1/Jar01_Art.glb";
import templeRelief from "@/assets/temple-relief.jpg";

export type SceneKnowledge = "Agriculture" | "Religion" | "Architecture" | "Writing" | "Trade" | "Medicine" | "Government" | "Military";

type Props = { discoveries: SceneKnowledge[]; focus?: SceneKnowledge | null | undefined; onTemple?: (() => void) | undefined; still?: boolean | undefined };

const FOCUS_POINTS: Record<SceneKnowledge, [number, number, number]> = {
  Agriculture: [-3, 0, 2],
  Religion: [2.5, 0, -1.5],
  Architecture: [2.5, 0, -1.5],
  Writing: [2.5, 0, -1.5],
  Trade: [-5.5, 0, -2],
  Medicine: [-1, 0, -2.5],
  Government: [0, 0, -4.5],
  Military: [0, 0, 4],
};

function makeSandTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  if (!g) return new THREE.Texture();
  g.fillStyle = "#c9a571";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 4000; i++) {
    const v = 150 + Math.random() * 70;
    g.fillStyle = `rgba(${v + 40},${v + 10},${v - 40},${Math.random() * 0.35})`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }
  for (let i = 0; i < 18; i++) {
    g.strokeStyle = "rgba(140,100,60,0.18)";
    g.lineWidth = 3;
    g.beginPath();
    const y = Math.random() * 256;
    g.moveTo(0, y);
    g.bezierCurveTo(80, y - 20, 170, y + 20, 256, y);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(6, 6);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeFieldTexture(alive: boolean) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  if (!g) return new THREE.Texture();
  g.fillStyle = alive ? "#5f8a3a" : "#8a6a44";
  g.fillRect(0, 0, 128, 128);
  for (let x = 0; x < 128; x += 8) {
    g.fillStyle = alive ? (x % 16 ? "#7aa84a" : "#4e7a2c") : "#6e5234";
    g.fillRect(x, 0, alive ? 4 : 1, 128);
  }
  if (!alive) {
    g.strokeStyle = "#5a4028";
    for (let i = 0; i < 30; i++) {
      g.beginPath();
      g.moveTo(Math.random() * 128, Math.random() * 128);
      g.lineTo(Math.random() * 128, Math.random() * 128);
      g.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Damped scale grow — elements rise out of the sand when their knowledge returns. */
function Grow({ on, children, position, min = 0.001, speed = 2.2 }: { on: boolean; children: ReactNode; position?: [number, number, number]; min?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (!ref.current) return;
    const target = on ? 1 : min;
    const s = ref.current.scale.y;
    const n = THREE.MathUtils.lerp(s, target, 1 - Math.exp(-speed * Math.min(d, 0.05)));
    ref.current.scale.set(on ? Math.max(n, 0.6 + n * 0.4) : n, n, on ? Math.max(n, 0.6 + n * 0.4) : n);
    ref.current.visible = n > 0.01;
  });
  return <group ref={ref} position={position ?? [0, 0, 0]} scale={min}>{children}</group>;
}

const SAND = "#d2b07a";
const BRICK = "#b48a5a";
const STONE = "#e3cfa4";
const GOLD = "#d6a843";

function makeMasonryTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const g = c.getContext("2d"); if (!g) return new THREE.Texture();
  g.fillStyle = "#e3cfa4"; g.fillRect(0, 0, 256, 256);
  for (let row = 0; row < 8; row++) {
    for (let col = -1; col < 5; col++) {
      const x = col * 64 + (row % 2) * 32;
      g.fillStyle = row % 3 ? "#dfc99e" : "#ead9b7";
      g.fillRect(x + 1, row * 32 + 1, 62, 30);
      g.strokeStyle = "#baa583"; g.strokeRect(x, row * 32, 64, 32);
    }
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function EgyptianColumn() {
  const { scene } = useGLTF(columnAsset.url);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const height = bounds.getSize(new THREE.Vector3()).y;
    clone.scale.setScalar(1.8 / (height || 1));
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.set(-center.x, -box.min.y, -center.z);
    clone.traverse((node) => { if (node instanceof THREE.Mesh) { node.castShadow = true; node.receiveShadow = true; } });
    return clone;
  }, [scene]);
  return <primitive object={object} />;
}

function House({ p, r = 0, s = 1 }: { p: [number, number, number]; r?: number; s?: number }) {
  const masonry = useMemo(makeMasonryTexture, []);
  useEffect(() => () => masonry.dispose(), [masonry]);
  return (
    <group position={p} rotation-y={r} scale={s}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow><boxGeometry args={[1, 0.8, 0.9]} /><meshStandardMaterial color={BRICK} map={masonry} roughness={1} /></mesh>
      <mesh position={[0, 0.84, 0]} castShadow><boxGeometry args={[1.06, 0.08, 0.96]} /><meshStandardMaterial color="#9c7449" roughness={1} /></mesh>
      <mesh position={[0, 0.25, 0.46]}><boxGeometry args={[0.22, 0.4, 0.02]} /><meshStandardMaterial color="#3a2a1c" /></mesh>
    </group>
  );
}

function Palm({ p, s = 1 }: { p: [number, number, number]; s?: number }) {
  const ref = useRef<THREE.Group>(null);
  const off = p[0] * 3;
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime * 1.2 + off) * 0.05; });
  return (
    <group position={p} scale={s} ref={ref}>
      <mesh position={[0, 0.9, 0]} castShadow><cylinderGeometry args={[0.06, 0.1, 1.8, 6]} /><meshStandardMaterial color="#7a5a3a" roughness={1} /></mesh>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 1.8, 0]} rotation={[0.9, (i / 6) * Math.PI * 2, 0]} castShadow>
          <coneGeometry args={[0.18, 1.1, 3]} />
          <meshStandardMaterial color="#4f7a33" flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Person({ p, color, path = 0.6, speed = 1 }: { p: [number, number, number]; color: string; path?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + p[0];
    ref.current.position.x = p[0] + Math.sin(t) * path;
    ref.current.position.y = p[1] + Math.abs(Math.sin(t * 4)) * 0.04;
    ref.current.rotation.y = Math.cos(t) > 0 ? Math.PI / 2 : -Math.PI / 2;
  });
  return (
    <group ref={ref} position={p}>
      <mesh position={[0, 0.22, 0]} castShadow><capsuleGeometry args={[0.08, 0.22, 4, 8]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0, 0.48, 0]} castShadow><sphereGeometry args={[0.07, 10, 10]} /><meshStandardMaterial color="#7a4e2e" /></mesh>
    </group>
  );
}

function Nile({ alive }: { alive: number }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
  if (!g) return new THREE.Texture();
    g.fillStyle = "#2f6c8f"; g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 60; i++) { g.fillStyle = "rgba(200,230,255,0.25)"; g.fillRect(Math.random() * 128, Math.random() * 128, 10, 1); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 6); t.colorSpace = THREE.SRGBColorSpace; return t;
  }, []);
  useFrame((_, d) => {
    tex.offset.y -= d * (0.02 + alive * 0.08);
    if (mat.current) mat.current.color.lerp(new THREE.Color(alive > 0 ? "#ffffff" : "#8a8f86"), 1 - Math.exp(-2 * d));
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[-6, 0.02, 0]} receiveShadow>
      <planeGeometry args={[3.2, 40]} />
      <meshStandardMaterial ref={mat} map={tex} roughness={0.15} metalness={0.3} />
    </mesh>
  );
}

function Boat({ on }: { on: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = ((clock.elapsedTime * 0.8) % 16) - 8;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 2) * 0.04;
  });
  return (
    <Grow on={on}>
      <group ref={ref} position={[-6, 0.1, 0]}>
        <mesh castShadow><boxGeometry args={[0.6, 0.2, 1.6]} /><meshStandardMaterial color="#7a5434" /></mesh>
        <mesh position={[0, 0.7, 0]}><cylinderGeometry args={[0.03, 0.03, 1.2]} /><meshStandardMaterial color="#5a3a22" /></mesh>
        <mesh position={[0, 0.8, 0.05]} rotation-y={Math.PI / 2}><planeGeometry args={[0.9, 0.9]} /><meshStandardMaterial color="#efe3c4" side={THREE.DoubleSide} /></mesh>
      </group>
    </Grow>
  );
}

function Fields({ alive }: { alive: boolean }) {
  const dry = useMemo(() => makeFieldTexture(false), []);
  const green = useMemo(() => makeFieldTexture(true), []);
  const spots: [number, number][] = [[-3.6, 1.2], [-2.2, 1.2], [-3.6, 2.6], [-2.2, 2.6]];
  return (
    <group>
      {spots.map(([x, z], i) => (
        <group key={i}>
          <mesh rotation-x={-Math.PI / 2} position={[x, 0.03, z]} receiveShadow>
            <planeGeometry args={[1.2, 1.2]} />
            <meshStandardMaterial map={alive ? green : dry} roughness={1} />
          </mesh>
          <Grow on={alive} position={[x, 0.03, z]} speed={1.4 + i * 0.3}>
            {Array.from({ length: 9 }).map((_, k) => (
              <mesh key={k} position={[((k % 3) - 1) * 0.35, 0.12, (Math.floor(k / 3) - 1) * 0.35]} castShadow>
                <coneGeometry args={[0.1, 0.28, 5]} />
                <meshStandardMaterial color={k % 2 ? "#d3b44a" : "#7aa84a"} flatShading />
              </mesh>
            ))}
          </Grow>
        </group>
      ))}
      {/* irrigation canal from the Nile */}
      <Grow on={alive} position={[-3.6, 0.03, 1.9]}>
        <mesh rotation-x={-Math.PI / 2}><planeGeometry args={[3.8, 0.22]} /><meshStandardMaterial color="#3d82a8" emissive="#1d4a66" emissiveIntensity={0.4} /></mesh>
      </Grow>
      <Grow on={alive}>
        <Person p={[-2.9, 0.03, 1.9]} color="#e8dcc0" path={0.5} speed={0.8} />
        <Person p={[-3.0, 0.03, 2.6]} color="#c9b48c" path={0.4} speed={1.1} />
      </Grow>
    </group>
  );
}

/** Gilded relief wall — real carved artwork covers the temple once it is complete. */
function ReliefWall() {
  const relief = useTexture(templeRelief);
  const map = useMemo(() => {
    const t = relief.clone();
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(2, 1);
    t.needsUpdate = true;
    return t;
  }, [relief]);
  useEffect(() => () => { map.dispose(); }, [map]);
  return (
    <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
      <boxGeometry args={[3.2, 1.7, 0.16]} />
      <meshStandardMaterial map={map} roughness={0.85} metalness={0.1} />
    </mesh>
  );
}

function Temple({ phase, onTemple }: { phase: 0 | 1 | 2 | 3; onTemple?: (() => void) | undefined }) {
  const masonry = useMemo(makeMasonryTexture, []);
  useEffect(() => () => masonry.dispose(), [masonry]);
  const glow = useRef<THREE.MeshStandardMaterial>(null);
  const ghost = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (glow.current) glow.current.emissiveIntensity = phase === 3 ? 0.6 + Math.sin(clock.elapsedTime * 2) * 0.3 : 0;
    if (ghost.current) ghost.current.opacity = phase >= 1 && phase < 3 ? 0.25 + Math.sin(clock.elapsedTime * 2.5) * 0.12 : 0;
  });
  const cols = [-1.2, -0.4, 0.4, 1.2];
  return (
    <group position={[2.5, 0, -1.5]} onClick={(e) => { e.stopPropagation(); onTemple?.(); }}>
      {/* sacred outline promised by Religion */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3.4, 2.4, 2.2]} />
        <meshBasicMaterial ref={ghost} color={GOLD} wireframe transparent opacity={0} />
      </mesh>
      <Grow on={phase >= 1}>
        <mesh position={[0, 0.1, 0]} receiveShadow castShadow><boxGeometry args={[3.6, 0.2, 2.4]} /><meshStandardMaterial map={masonry} roughness={0.9} /></mesh>
      </Grow>
      {cols.map((x, i) => (
        <group key={x}>
          <Grow on={phase >= 2} position={[x, 0.2, 0.8]} speed={1.2 + i * 0.25} min={0.001}>
            {phase === 3 ? <Suspense fallback={null}><EgyptianColumn /></Suspense> : <mesh position={[0, 0.55 - (i % 2) * 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.18, phase >= 3 ? 1.8 : 1.1 - (i % 2) * 0.5, 10]} />
              <meshStandardMaterial map={masonry} roughness={0.8} />
            </mesh>}
          </Grow>
          <Grow on={phase >= 2} position={[x, 0.2, -0.8]} speed={1 + i * 0.2}>
            <mesh position={[0, phase >= 3 ? 0.9 : 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.18, phase >= 3 ? 1.8 : 0.8, 10]} />
              <meshStandardMaterial color={STONE} roughness={0.8} />
            </mesh>
          </Grow>
        </group>
      ))}
      <Grow on={phase >= 3} position={[0, 0, -0.95]}>
        <Suspense fallback={<mesh position={[0, 0.85, 0]} castShadow receiveShadow><boxGeometry args={[3.2, 1.7, 0.16]} /><meshStandardMaterial map={masonry} roughness={0.85} /></mesh>}>
          <ReliefWall />
        </Suspense>
        <mesh position={[0, 0.95, 0.09]}><torusGeometry args={[0.27, 0.035, 8, 24]} /><meshStandardMaterial color={GOLD} metalness={0.5} roughness={0.4} /></mesh>
      </Grow>
      {/* rubble while unfinished */}
      {phase === 2 && ([[-1.6, 1.2], [1.7, 1.3], [0.2, 1.5]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.12, z]} rotation={[0.3, i, 0.2]} castShadow><boxGeometry args={[0.3, 0.2, 0.25]} /><meshStandardMaterial map={masonry} roughness={0.9} /></mesh>
      ))}
      <Grow on={phase >= 3} position={[0, 2.0, 0]} speed={1.5}>
        <mesh castShadow><boxGeometry args={[3.5, 0.3, 2.3]} /><meshStandardMaterial color={STONE} /></mesh>
        <mesh position={[0, 0.16, 1.16]}><boxGeometry args={[3.2, 0.2, 0.02]} /><meshStandardMaterial ref={glow} color={GOLD} emissive={GOLD} emissiveIntensity={0} metalness={0.6} roughness={0.3} /></mesh>
      </Grow>
      <Grow on={phase >= 3}>
        <Person p={[-0.6, 0.2, 1.5]} color="#f2ead2" path={0.3} speed={0.6} />
        <Person p={[0.8, 0.2, 1.6]} color="#f2ead2" path={0.25} speed={0.7} />
        <Sparkles count={60} scale={[3.5, 2.5, 2.5]} position={[0, 1.4, 0]} size={4} speed={0.4} color={GOLD} />
      </Grow>
    </group>
  );
}

function Pyramid({ p, s }: { p: [number, number, number]; s: number }) {
  return (
    <mesh position={[p[0], (s * 1.2) / 2, p[2]]} rotation-y={Math.PI / 4} castShadow receiveShadow>
      <coneGeometry args={[s, s * 1.2, 4]} />
      <meshStandardMaterial color="#d8b680" flatShading roughness={1} />
    </mesh>
  );
}

function Market({ on }: { on: boolean }) {
  const colors = ["#b5462e", "#2f6c8f", "#d6a843"];
  return (
    <Grow on={on} position={[-4, 0, -2.5]}>
      {colors.map((c, i) => (
        <group key={c} position={[i * 0.8, 0, 0]}>
          {([[-0.25, -0.2], [0.25, -0.2], [-0.25, 0.2], [0.25, 0.2]] as [number, number][]).map(([x, z], k) => (
            <mesh key={k} position={[x, 0.3, z]}><cylinderGeometry args={[0.02, 0.02, 0.6]} /><meshStandardMaterial color="#5a3a22" /></mesh>
          ))}
          <mesh position={[0, 0.62, 0]} castShadow><boxGeometry args={[0.65, 0.04, 0.55]} /><meshStandardMaterial color={c} /></mesh>
          <mesh position={[0, 0.2, 0]}><boxGeometry args={[0.4, 0.2, 0.3]} /><meshStandardMaterial color="#c9a45a" /></mesh>
        </group>
      ))}
      <Person p={[0.8, 0, 0.6]} color="#d9c8a0" path={0.8} speed={0.9} />
    </Grow>
  );
}

function Palace({ on }: { on: boolean }) {
  return (
    <Grow on={on} position={[0, 0, -4.8]} speed={1.3}>
      <mesh position={[0, 0.6, 0]} castShadow><boxGeometry args={[3, 1.2, 1.4]} /><meshStandardMaterial color={STONE} /></mesh>
      <mesh position={[-1.7, 1, 0]} castShadow><boxGeometry args={[0.6, 2, 1.6]} /><meshStandardMaterial color="#cdb68a" /></mesh>
      <mesh position={[1.7, 1, 0]} castShadow><boxGeometry args={[0.6, 2, 1.6]} /><meshStandardMaterial color="#cdb68a" /></mesh>
      <mesh position={[0, 1.3, 0.71]}><boxGeometry args={[0.5, 0.5, 0.02]} /><meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} /></mesh>
    </Grow>
  );
}

function Walls({ on }: { on: boolean }) {
  const segs: [number, number, number, number][] = [[0, 5.2, 9, 0], [4.6, 0.5, 9.4, Math.PI / 2], [-0, -6.2, 9, 0]];
  return (
    <group>
      {segs.map(([x, z, w, r], i) => (
        <Grow key={i} on={on} position={[x, 0, z]} speed={1 + i * 0.3}>
          <mesh position={[0, 0.35, 0]} rotation-y={r} castShadow><boxGeometry args={[w, 0.7, 0.3]} /><meshStandardMaterial color={BRICK} /></mesh>
        </Grow>
      ))}
    </group>
  );
}

function HealingHouse({ on }: { on: boolean }) {
  return (
    <Grow on={on} position={[-1, 0, -2.6]}>
      <House p={[0, 0, 0]} s={1.2} />
      <mesh position={[0, 1.3, 0]}><torusGeometry args={[0.15, 0.04, 8, 16]} /><meshStandardMaterial color="#5fb0c9" emissive="#5fb0c9" emissiveIntensity={0.8} /></mesh>
    </Grow>
  );
}

/** Environment grading: dusty, cold and dim before knowledge; warm and clear as it returns. */
function Atmosphere({ life }: { life: number }) {
  const sun = useRef<THREE.DirectionalLight>(null);
  const amb = useRef<THREE.HemisphereLight>(null);
  useFrame(({ scene }, d) => {
    const k = 1 - Math.exp(-1.5 * Math.min(d, 0.05));
    const fog = scene.fog as THREE.Fog | null;
    const deadFog = new THREE.Color("#8d7a62");
    const liveFog = new THREE.Color("#f2d9a8");
    const target = deadFog.clone().lerp(liveFog, life);
    if (fog) { fog.color.lerp(target, k); fog.far = THREE.MathUtils.lerp(fog.far, 38 + life * 30, k); }
    (scene.background as THREE.Color | null)?.lerp(target, k);
    if (sun.current) { sun.current.intensity = THREE.MathUtils.lerp(sun.current.intensity, 1.4 + life * 1.5, k); sun.current.color.lerp(new THREE.Color("#c9b9a0").lerp(new THREE.Color("#ffdca0"), life), k); }
    if (amb.current) amb.current.intensity = THREE.MathUtils.lerp(amb.current.intensity, 0.6 + life * 0.3, k);
  });
  return (
    <>
      <color attach="background" args={["#8d7a62"]} />
      <fog attach="fog" args={["#8d7a62", 18, 38]} />
      <hemisphereLight ref={amb} args={["#fff1d6", "#8a6a44", 0.4]} />
      <directionalLight ref={sun} position={[8, 12, 6]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-left={-12} shadow-camera-right={12} shadow-camera-top={12} shadow-camera-bottom={-12} />
    </>
  );
}

function Rig({ focus, still }: { focus?: SceneKnowledge | null | undefined; still?: boolean | undefined }) {
  const look = useRef(new THREE.Vector3(0, 0, 0));
  useFrame(({ camera, clock }, d) => {
    const t = clock.elapsedTime;
    const f: [number, number, number] = focus ? FOCUS_POINTS[focus] : [-1, 0, 0];
    const zoom = focus ? 0.74 : 1.15;
    const sway = still ? 0 : Math.sin(t * 0.15) * 0.3;
    const target = new THREE.Vector3(f[0] + 9 * zoom + sway, 8.5 * zoom + 1, f[2] + 11 * zoom);
    const k = 1 - Math.exp(-1.6 * Math.min(d, 0.05));
    camera.position.lerp(target, k);
    look.current.lerp(new THREE.Vector3(f[0], 0.5, f[2]), k);
    camera.lookAt(look.current);
  });
  return null;
}

function FocusBurst({ focus }: { focus?: SceneKnowledge | null | undefined }) {
  if (!focus) return null;
  const p = FOCUS_POINTS[focus];
  return <Sparkles key={focus} count={60} scale={[4, 3, 4]} position={[p[0], 1.5, p[2]]} size={6} speed={1.2} color={GOLD} />;
}

function Dunes() {
  return (
    <>
      {([[-14, -14, 6], [10, -16, 8], [16, 4, 5], [-16, 10, 6]] as [number, number, number][]).map(([x, z, s], i) => (
        <mesh key={i} position={[x, -s * 0.6, z]} scale={[1, 0.35, 1]} receiveShadow><sphereGeometry args={[s, 16, 12]} /><meshStandardMaterial color={SAND} roughness={1} /></mesh>
      ))}
    </>
  );
}

export default function CityScene3D({ discoveries, focus, onTemple, still }: Props) {
  const has = (k: SceneKnowledge) => discoveries.includes(k);
  const sand = useMemo(() => makeSandTexture(), []);
  const templePhase: 0 | 1 | 2 | 3 = has("Writing") && has("Architecture") && has("Religion") ? 3 : has("Architecture") && has("Religion") ? 2 : has("Religion") ? 1 : 0;
  const life = Math.min(1, discoveries.length / 5);

  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [10, 10, 12], fov: 42 }} gl={{ antialias: true }}>
      <Atmosphere life={life} />
      <Environment resolution={64}>
        <Lightformer intensity={1.5} position={[0, 6, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={0.8} color="#ffd9a0" position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} />
      </Environment>
      <Rig focus={focus} still={still} />

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial map={sand} roughness={1} />
      </mesh>
      <Dunes />
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.018, 0.2]}><planeGeometry args={[0.55, 8]} /><meshStandardMaterial color={STONE} map={sand} roughness={1} /></mesh>
      <mesh rotation-x={-Math.PI / 2} rotation-z={Math.PI / 2} position={[-1.2, 0.019, 1.9]}><planeGeometry args={[0.45, 6.4]} /><meshStandardMaterial color={STONE} map={sand} roughness={1} /></mesh>
      <Pyramid p={[8, 0, -12]} s={3.5} />
      <Pyramid p={[13, 0, -9]} s={2.4} />
      <Pyramid p={[3, 0, -15]} s={2} />

      <Nile alive={has("Agriculture") ? 1 : 0} />
      <Palm p={[-4.2, 0, -0.2]} /><Palm p={[-4.4, 0, 3.8]} s={0.85} /><Palm p={[-4.1, 0, -4]} s={1.1} />
      <Palm p={[4.8, 0, 2.6]} s={0.9} />

      <House p={[0.2, 0, 1.6]} r={0.2} /><House p={[1.5, 0, 2.6]} r={-0.3} s={0.85} /><House p={[-0.8, 0, 3.2]} s={0.9} />
      <Grow on={discoveries.length >= 3}><House p={[3, 0, 3]} r={0.5} s={0.8} /><House p={[-1.4, 0, 0.2]} r={0.1} /></Grow>
      <Person p={[0.8, 0, 0.6]} color="#e3d2ad" path={0.7} speed={0.5} />

      <Fields alive={has("Agriculture")} />
      <Temple phase={templePhase} onTemple={onTemple} />
      <Boat on={has("Trade")} />
      <Market on={has("Trade")} />
      <HealingHouse on={has("Medicine")} />
      <Palace on={has("Government")} />
      <Walls on={has("Military")} />
      <FocusBurst focus={focus} />
      {/* blowing sand that settles as knowledge returns */}
      <Sparkles count={Math.round(80 * (1 - life)) + 10} scale={[24, 4, 24]} position={[0, 1.5, 0]} size={2} speed={0.8} color="#e9d2a2" opacity={0.6} />
    </Canvas>
  );
}
