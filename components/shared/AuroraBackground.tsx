'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AuroraBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const currentMount = mountRef.current

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(currentMount.offsetWidth, currentMount.offsetHeight)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.zIndex = '0'
    currentMount.appendChild(renderer.domElement)

    // CAE brand colors as uniforms
    // Primary: #2E2567 (indigo), Secondary: #644A9E (purple), Accent: #FBD207 (gold)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(currentMount.offsetWidth, currentMount.offsetHeight),
        },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);
          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
            u.y
          );
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100.0);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y
                   * mat2(6.0, -4.0, 4.0, 6.0);

          vec4 o = vec4(0.0);
          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          // CAE brand palette: indigo(0.18,0.15,0.40) purple(0.39,0.29,0.62) gold(0.98,0.82,0.03)
          for (float i = 0.0; i++ < 35.0;) {
            vec2 v = p + cos(
              i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)
            ) * 3.5;

            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));

            // Blend indigo → purple → gold streaks based on position in loop
            float t = i / 35.0;
            vec3 indigo = vec3(0.18, 0.15, 0.40);
            vec3 purple = vec3(0.39, 0.29, 0.62);
            vec3 gold   = vec3(0.98, 0.82, 0.03);

            vec3 col = t < 0.5
              ? mix(indigo, purple, t * 2.0)
              : mix(purple, gold,   (t - 0.5) * 2.0);

            vec4 auroraColors = vec4(
              col.r + 0.1 * sin(i * 0.2 + iTime * 0.4),
              col.g + 0.1 * cos(i * 0.3 + iTime * 0.5),
              col.b + 0.05 * sin(i * 0.4 + iTime * 0.3),
              1.0
            );

            vec4 contrib = auroraColors
              * exp(sin(i * i + iTime * 0.8))
              / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));

            float thin = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
            o += contrib * (1.0 + tailNoise * 0.8) * thin;
          }

          // Dark base: CAE dark navy #1A1840
          vec4 base = vec4(0.102, 0.094, 0.251, 1.0);
          o = tanh(pow(o / 100.0, vec4(1.6)));
          gl_FragColor = base + o * 1.4;
        }
      `,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      material.uniforms.iTime.value += 0.016
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      if (!mountRef.current) return
      const w = mountRef.current.offsetWidth
      const h = mountRef.current.offsetHeight
      renderer.setSize(w, h)
      material.uniforms.iResolution.value.set(w, h)
    }

    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      material.dispose()
      geometry.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
