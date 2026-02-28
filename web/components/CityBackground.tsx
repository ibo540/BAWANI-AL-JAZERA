'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type ColorPreset = {
  name: string;
  sceneBackground: number;
  fogColor: number;
  accent: number;
  accentDim: number;
  building: number;
  building2: number;
  grid: number;
  particles: number;
  lightMain: number;
  lightFill: number;
};

const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'Teal (current)',
    sceneBackground: 0x000508,
    fogColor: 0x00a0a0,
    accent: 0x00b4b4,
    accentDim: 0x006666,
    building: 0x001a1a,
    building2: 0x002222,
    grid: 0x00b4b4,
    particles: 0xffffff,
    lightMain: 0x00ffff,
    lightFill: 0x003333,
  },
  {
    name: 'Amber / Gold',
    sceneBackground: 0x0a0800,
    fogColor: 0x332200,
    accent: 0xffaa00,
    accentDim: 0x996600,
    building: 0x1a1500,
    building2: 0x221a00,
    grid: 0xffbb33,
    particles: 0xffeedd,
    lightMain: 0xffcc44,
    lightFill: 0x332200,
  },
  {
    name: 'Blue / Indigo',
    sceneBackground: 0x020508,
    fogColor: 0x0a1628,
    accent: 0x4d7cff,
    accentDim: 0x2d4a99,
    building: 0x0a1220,
    building2: 0x121a30,
    grid: 0x5c8aff,
    particles: 0xccddff,
    lightMain: 0x6b9aff,
    lightFill: 0x152238,
  },
  {
    name: 'Monochrome',
    sceneBackground: 0x000000,
    fogColor: 0x111111,
    accent: 0xffffff,
    accentDim: 0x888888,
    building: 0x0a0a0a,
    building2: 0x141414,
    grid: 0xeeeeee,
    particles: 0xffffff,
    lightMain: 0xffffff,
    lightFill: 0x222222,
  },
  {
    name: 'Slate / Steel',
    sceneBackground: 0x050608,
    fogColor: 0x1a1f24,
    accent: 0x6b8c9e,
    accentDim: 0x3d5563,
    building: 0x0f1419,
    building2: 0x1a2028,
    grid: 0x7d9aab,
    particles: 0xc5d4dc,
    lightMain: 0x8ba3b5,
    lightFill: 0x1a2229,
  },
  {
    name: 'Emerald / Forest',
    sceneBackground: 0x020a06,
    fogColor: 0x0a1f14,
    accent: 0x00c853,
    accentDim: 0x007a33,
    building: 0x05120a,
    building2: 0x0a1a10,
    grid: 0x00e676,
    particles: 0xb8f0d0,
    lightMain: 0x34e89e,
    lightFill: 0x0d2818,
  },
  {
    name: 'Violet / Purple',
    sceneBackground: 0x080508,
    fogColor: 0x1a0f24,
    accent: 0x9c6bde,
    accentDim: 0x5c3d8a,
    building: 0x120a18,
    building2: 0x1a1222,
    grid: 0xb388ff,
    particles: 0xe0d4f0,
    lightMain: 0xbb86fc,
    lightFill: 0x1a1425,
  },
  {
    name: 'Coral / Warm',
    sceneBackground: 0x0a0505,
    fogColor: 0x281818,
    accent: 0xff6b6b,
    accentDim: 0x994444,
    building: 0x1a0a0a,
    building2: 0x221212,
    grid: 0xff8888,
    particles: 0xffdddd,
    lightMain: 0xff8a80,
    lightFill: 0x331818,
  },
];

const CYCLE_INTERVAL_MS = 20000; // Auto-cycle every 20s to show all combinations

export default function CityBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [colorPresetId, setColorPresetId] = useState(0); // Start with teal
  const preset = COLOR_PRESETS[colorPresetId] ?? COLOR_PRESETS[0];
  const runIntroOnMount = useRef(true);
  const introStartTimeRef = useRef(0);
  const introDoneRef = useRef(false);
  const requestIntroReplayRef = useRef(false);
  const cityRotationYRef = useRef(0);
  const smokeRotationYRef = useRef(0);
  const smokeRotationXRef = useRef(0);

  const cycleToNextPreset = () => {
    setColorPresetId((prev) => (prev + 1) % COLOR_PRESETS.length);
  };

  useEffect(() => {
    const interval = setInterval(cycleToNextPreset, CYCLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const {
      sceneBackground,
      fogColor,
      accent: COLOR_ACCENT,
      accentDim: COLOR_ACCENT_DIM,
      building: COLOR_BUILDING,
      building2: COLOR_BUILDING2,
      grid: COLOR_GRID,
      particles: COLOR_PARTICLES,
      lightMain: COLOR_LIGHT_MAIN,
      lightFill: COLOR_LIGHT_FILL,
    } = preset;

    const COLOR_FOG = preset.accentDim;

    // ---- RENDERER ----
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ---- SCENE ----
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneBackground);
    scene.fog = new THREE.FogExp2(fogColor, 0.018);

    // ---- CAMERA ----
    const camera = new THREE.PerspectiveCamera(
      20,
      mount.clientWidth / mount.clientHeight,
      1,
      500
    );
    const introDurationMs = 5800;
    const cameraStartPos = new THREE.Vector3(0, 28, 0.6);
    const cameraEndPos = new THREE.Vector3(0, 4, 28);
    const lookAtStart = new THREE.Vector3(0, 0, 0);
    const lookAtEnd = new THREE.Vector3(0, 0, 0);

    const now = typeof performance !== 'undefined' ? performance.now() : 0;
    introStartTimeRef.current = now;
    if (runIntroOnMount.current) {
      camera.position.copy(cameraStartPos);
      camera.lookAt(lookAtStart);
      introDoneRef.current = false;
    } else {
      camera.position.copy(cameraEndPos);
      camera.lookAt(lookAtEnd);
      introDoneRef.current = true;
    }

    // ---- LIGHTS ----
    const ambientLight = new THREE.AmbientLight(COLOR_LIGHT_FILL, 25);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(COLOR_LIGHT_MAIN, 220);
    spotLight.position.set(0, 25, 0);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    // ---- HELPERS ----
    function mathRandom(num = 8) {
      return -Math.random() * num + Math.random() * num;
    }

    const city = new THREE.Object3D();
    const smoke = new THREE.Object3D();
    const town = new THREE.Object3D();

    const createBuildings = () => {
      for (let i = 0; i < 120; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? COLOR_BUILDING : COLOR_BUILDING2,
          wireframe: false,
          roughness: 0.8,
          metalness: 0.2,
        });
        const cube = new THREE.Mesh(geometry, material);

        const wireframeGeo = new THREE.BoxGeometry(1, 1, 1);
        const wireframeMat = new THREE.MeshBasicMaterial({
          color: COLOR_GRID,
          wireframe: true,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
        });
        const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);

        const floorGeo = new THREE.BoxGeometry(1, 0.05, 1);
        const floorMat = new THREE.MeshStandardMaterial({
          color: COLOR_GRID,
          wireframe: false,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);

        const scaleH = mathRandom(6);
        cube.castShadow = true;
        cube.receiveShadow = true;

        cube.scale.y = 0.1 + Math.abs(scaleH);
        cube.position.x = Math.round(mathRandom());
        cube.position.z = Math.round(mathRandom());
        cube.position.y = cube.scale.y / 2;

        wireframe.scale.copy(cube.scale);
        wireframe.position.copy(cube.position);

        floor.position.x = cube.position.x;
        floor.position.z = cube.position.z;
        floor.position.y = cube.scale.y + 0.03;

        town.add(floor);
        town.add(cube);
        town.add(wireframe);
      }
    };
    createBuildings();

    const createLines = () => {
      for (let i = 0; i < 60; i++) {
        const points = [];
        points.push(new THREE.Vector3(-20, 0, i * 2 - 60));
        points.push(new THREE.Vector3(20, 0, i * 2 - 60));
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: COLOR_GRID,
          transparent: true,
          opacity: 0.15,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        city.add(line);
      }
    };
    createLines();

    const createSmoke = () => {
      const smokeMat = new THREE.MeshStandardMaterial({
        color: COLOR_PARTICLES,
        transparent: true,
        opacity: 0.6,
        roughness: 0.65,
      });
      for (let h = 1; h < 300; h++) {
        const smokeGeo = new THREE.BoxGeometry(0.1, mathRandom(0.1), 0.1);
        const smokeMesh = new THREE.Mesh(smokeGeo, smokeMat);
        smokeMesh.position.set(mathRandom(5), mathRandom(5) + 1, mathRandom(5));
        smokeMesh.rotation.set(mathRandom(), mathRandom(), mathRandom());
        smoke.add(smokeMesh);
      }
    };
    createSmoke();

    const createAccentLines = () => {
      for (let i = 0; i < 10; i++) {
        const points = [];
        points.push(new THREE.Vector3(mathRandom(2), 0, mathRandom(2)));
        points.push(new THREE.Vector3(mathRandom(2), mathRandom(3) + 1, mathRandom(2)));
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: COLOR_ACCENT,
          transparent: true,
          opacity: 0.8,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        town.add(line);
      }
    };
    createAccentLines();

    city.add(town);
    city.add(smoke);
    scene.add(city);
    city.rotation.y = cityRotationYRef.current;
    smoke.rotation.y = smokeRotationYRef.current;
    smoke.rotation.x = smokeRotationXRef.current;

    let mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const now = typeof performance !== 'undefined' ? performance.now() : 0;

      if (requestIntroReplayRef.current) {
        requestIntroReplayRef.current = false;
        introStartTimeRef.current = now;
        introDoneRef.current = false;
        camera.position.copy(cameraStartPos);
        camera.lookAt(lookAtStart);
      }

      const elapsed = now - introStartTimeRef.current;

      if (!introDoneRef.current && elapsed < introDurationMs) {
        const t = Math.min(1, elapsed / introDurationMs);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        camera.position.copy(cameraStartPos).lerp(cameraEndPos, eased);
        const lookAt = new THREE.Vector3().copy(lookAtStart).lerp(lookAtEnd, eased);
        camera.lookAt(lookAt);
        if (t >= 1) {
          introDoneRef.current = true;
          runIntroOnMount.current = false;
        }
      } else {
        introDoneRef.current = true;
        runIntroOnMount.current = false;
        camera.rotation.y = mouse.x * 0.05;
        camera.rotation.x = mouse.y * 0.05;
      }

      city.rotation.y += 0.002;
      smoke.rotation.y += 0.001;
      smoke.rotation.x += 0.0005;
      cityRotationYRef.current = city.rotation.y;
      smokeRotationYRef.current = smoke.rotation.y;
      smokeRotationXRef.current = smoke.rotation.x;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [colorPresetId]);

  return (
    <div
      ref={mountRef}
      role="presentation"
      onClick={cycleToNextPreset}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          requestIntroReplayRef.current = true;
        } else if (e.key === 'Enter') {
          e.preventDefault();
          cycleToNextPreset();
        }
      }}
      tabIndex={0}
      aria-label="Background: click to cycle color, Space to replay intro"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        cursor: 'pointer',
      }}
    />
  );
}
