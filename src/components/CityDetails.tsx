import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import jarAsset from "@/assets/egypt-jar.asset.json";

type Point = [number, number, number];
type Block = { p: Point; s: Point; r?: number };

/** Static architectural detail is merged by material, not rendered as hundreds of meshes. */
function Stonework({ blocks, color }: { blocks: Block[]; color: string }) {
  const geometry = useMemo(() => {
    const parts = blocks.map(({ p, s, r = 0 }) => {
      const g = new THREE.BoxGeometry(...s);
      g.rotateY(r); g.translate(...p); return g;
    });
    const merged = mergeGeometries(parts);
    parts.forEach((g) => g.dispose());
    return merged;
  }, [blocks]);
  useEffect(() => () => geometry?.dispose(), [geometry]);
  if (!geometry) return null;
  return <mesh geometry={geometry} castShadow receiveShadow><meshStandardMaterial color={color} roughness={0.9} /></mesh>;
}

export function Pottery({ p, s = 0.35 }: { p: Point; s?: number }) {
  const { scene } = useGLTF(jarAsset.url);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    clone.scale.setScalar(s / (box.getSize(new THREE.Vector3()).y || 1));
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    clone.position.set(-center.x, -bounds.min.y, -center.z);
    clone.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; } });
    return clone;
  }, [scene, s]);
  return <group position={p}><primitive object={object} /></group>;
}

export function RoofDetails({ stone, wood }: { stone: string; wood: string }) {
  const parapets = useMemo<Block[]>(() => [
    { p: [-0.48, 0.94, 0], s: [0.07, 0.18, 0.96] },
    { p: [0.48, 0.94, 0], s: [0.07, 0.18, 0.96] },
    { p: [0, 0.94, -0.44], s: [1, 0.18, 0.07] },
    { p: [0, 0.94, 0.44], s: [1, 0.18, 0.07] },
    { p: [-0.32, 0.42, 0.46], s: [0.13, 0.16, 0.025] },
    { p: [0.32, 0.42, 0.46], s: [0.13, 0.16, 0.025] },
  ], []);
  const timber = useMemo<Block[]>(() => [
    { p: [-0.17, 0.25, 0.49], s: [0.035, 0.5, 0.06] },
    { p: [0.17, 0.25, 0.49], s: [0.035, 0.5, 0.06] },
    { p: [0, 0.5, 0.49], s: [0.38, 0.045, 0.06] },
    ...Array.from({ length: 6 }, (_, i) => ({ p: [-0.35 + i * 0.14, 0.84, 0] as Point, s: [0.04, 0.04, 0.86] as Point })),
  ], []);
  return <><Stonework blocks={parapets} color={stone} /><Stonework blocks={timber} color={wood} /></>;
}

export function TempleSteps({ stone, ink }: { stone: string; ink: string }) {
  const blocks = useMemo<Block[]>(() => [
    ...Array.from({ length: 4 }, (_, i) => ({ p: [2.5, 0.025 + i * 0.025, 0.3 - i * 0.15] as Point, s: [2.2, 0.05 + i * 0.05, 0.2] as Point })),
    ...Array.from({ length: 14 }, (_, i) => ({ p: [1 + (i % 7) * 0.5, 0.027, -0.2 - Math.floor(i / 7) * 0.45] as Point, s: [0.46, 0.04, 0.4] as Point })),
  ], []);
  const bands = useMemo<Block[]>(() => Array.from({ length: 12 }, (_, i) => ({ p: [1.03 + i * 0.27, 2.17, -0.33] as Point, s: [0.08, 0.06, 0.012] as Point })), []);
  return <><Stonework blocks={blocks} color={stone} /><Stonework blocks={bands} color={ink} /></>;
}

export function Riverbank({ leaf, stone }: { leaf: string; stone: string }) {
  const reeds = useRef<THREE.InstancedMesh>(null);
  const stones = useMemo<Block[]>(() => Array.from({ length: 38 }, (_, i) => ({ p: [-4.43 + Math.sin(i * 2.4) * 0.08, 0.06, -8 + i * 0.44] as Point, s: [0.25, 0.12, 0.34] as Point, r: i * 0.8 })), []);
  useEffect(() => {
    const mesh = reeds.current; if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 110; i++) {
      dummy.position.set(-4.5 - (i % 3) * 0.11, 0.15, -7.5 + i * 0.14);
      dummy.rotation.set(0.12 * Math.sin(i), i, 0.13 * Math.cos(i));
      dummy.scale.set(1, 0.8 + (i % 5) * 0.1, 1); dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);
  return <><Stonework blocks={stones} color={stone} /><instancedMesh ref={reeds} args={[undefined, undefined, 110]}><coneGeometry args={[0.028, 0.38, 3]} /><meshStandardMaterial color={leaf} roughness={1} /></instancedMesh></>;
}

export function GrainRows({ alive, color, still }: { alive: boolean; color: string; still: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const time = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame((_, delta) => {
    const mesh = ref.current; if (!mesh) return;
    if (!still) time.current += Math.min(delta, 0.05);
    for (let i = 0; i < 400; i++) {
      const field = Math.floor(i / 100);
      const col = (i % 100) % 10; const row = Math.floor((i % 100) / 10);
      dummy.position.set((field % 2 ? -2.2 : -3.6) - 0.5 + col * 0.11, 0.14, (field < 2 ? 1.2 : 2.6) - 0.5 + row * 0.11);
      dummy.rotation.set(0, i * 0.71, Math.sin(time.current * 1.6 + row * 0.4) * 0.09);
      dummy.scale.setScalar(alive ? 0.75 + (i % 7) * 0.07 : 0.001);
      dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true; mesh.visible = alive;
  });
  return <instancedMesh ref={ref} args={[undefined, undefined, 400]}><cylinderGeometry args={[0.025, 0.009, 0.26, 4]} /><meshStandardMaterial color={color} roughness={1} /></instancedMesh>;
}

export function Dock({ wood }: { wood: string }) {
  const blocks = useMemo<Block[]>(() => [
    ...Array.from({ length: 14 }, (_, i) => ({ p: [-5.1, 0.12, -2.9 + i * 0.1] as Point, s: [1.3, 0.07, 0.085] as Point })),
    ...([-5.6, -4.6].flatMap((x) => [-2.8, -1.65].map((z) => ({ p: [x, 0.16, z] as Point, s: [0.07, 0.6, 0.07] as Point })))),
  ], []);
  return <Stonework blocks={blocks} color={wood} />;
}