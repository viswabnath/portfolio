'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
    renderer.setSize(innerWidth, innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const vert = `void main(){gl_Position=vec4(position,1.0);}`
    const frag = `
      precision highp float;
      uniform float u_t;
      uniform float u_scroll;
      uniform vec2  u_mouse;
      uniform vec2  u_res;

      float hash(vec2 p){p=fract(p*vec2(127.1,311.7));p+=dot(p,p+45.32);return fract(p.x*p.y);}
      float noise(vec2 p){
        vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
      }
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<7;i++){v+=a*noise(p);p=p*2.1+vec2(1.7,9.2);a*=.52;}return v;}

      void main(){
        vec2 uv=gl_FragCoord.xy/u_res;
        vec2 m=u_mouse*.1;
        float t=u_t*.055;
        vec2 q=vec2(fbm(uv+t+m),fbm(uv+vec2(1.7,9.2)+t));
        vec2 r=vec2(fbm(uv+q*1.8+vec2(1.7,9.2)+t*.9),fbm(uv+q*1.8+vec2(8.3,2.8)+t*.7));
        float f=fbm(uv+r*1.6+m);

        vec3 p0=vec3(.72,.52,.18);
        vec3 p1=vec3(.08,.55,.75);
        vec3 p2=vec3(.48,.14,.82);
        vec3 p3=vec3(.08,.62,.30);
        vec3 p4=vec3(.82,.35,.06);
        vec3 p5=vec3(.70,.22,.40);
        vec3 p6=vec3(.72,.52,.18);

        float s=clamp(u_scroll*6.,0.,6.);
        vec3 pal;
        if(s<1.)pal=mix(p0,p1,smoothstep(0.,1.,s));
        else if(s<2.)pal=mix(p1,p2,smoothstep(0.,1.,s-1.));
        else if(s<3.)pal=mix(p2,p3,smoothstep(0.,1.,s-2.));
        else if(s<4.)pal=mix(p3,p4,smoothstep(0.,1.,s-3.));
        else if(s<5.)pal=mix(p4,p5,smoothstep(0.,1.,s-4.));
        else pal=mix(p5,p6,smoothstep(0.,1.,s-5.));

        vec3 bg=vec3(.026,.022,.052);
        vec3 glow=pal*pow(max(f,0.),1.2)*.82;
        vec3 rim=pal*pow(max(1.-length((uv-.5)*vec2(.9,1.)),0.),2.5)*.22;
        vec3 col=bg+glow+rim;
        float vig=smoothstep(0.,.75,1.-length((uv-.5)*vec2(.72,0.9)));
        col*=vig*.9+.1;
        gl_FragColor=vec4(col,1.0);
      }
    `

    const uni = {
      u_t: { value: 0 },
      u_scroll: { value: 0 },
      u_mouse: { value: new THREE.Vector2() },
      u_res: { value: new THREE.Vector2(innerWidth, innerHeight) },
    }

    scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms: uni })
    ))

    const tgt = { scroll: 0, mx: 0, my: 0 }
    const clock = new THREE.Clock()

    let animId: number
    function tick() {
      animId = requestAnimationFrame(tick)
      uni.u_t.value = clock.getElapsedTime()
      uni.u_scroll.value += (tgt.scroll - uni.u_scroll.value) * .03
      uni.u_mouse.value.x += (tgt.mx - uni.u_mouse.value.x) * .05
      uni.u_mouse.value.y += (tgt.my - uni.u_mouse.value.y) * .05
      renderer.render(scene, camera)
    }
    tick()

    function onResize() {
      renderer.setSize(innerWidth, innerHeight)
      uni.u_res.value.set(innerWidth, innerHeight)
    }

    function onMouseMove(e: MouseEvent) {
      tgt.mx = (e.clientX / innerWidth - .5) * 2
      tgt.my = -(e.clientY / innerHeight - .5) * 2
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    window._auroraSetScroll = (v: number) => { tgt.scroll = v }

    return () => {
      cancelAnimationFrame(animId)
      renderer.dispose()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas id="aurora-canvas" ref={canvasRef} />
}
