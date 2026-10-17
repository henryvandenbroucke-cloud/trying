/* Vroeglicht — the WebGL flacon (three.js r147).
   VL.createStage(canvas, opts) builds the scene. Live mode (home page) draws one flacon driven by
   stage.state; still mode draws one or more flacons once (used to render the product images). */
(function () {
  "use strict";
  var VL = window.VL = window.VL || {};

  VL.JUICE = { night: 0xb8692e, blue: 0x9c93c9, light: 0xe6c27a };

  VL.createStage = function (canvas, opts) {
    opts = opts || {};
    var THREE = window.THREE;
    if (!THREE) throw new Error("three.js not loaded");
    var still = !!opts.still;
    var small = Math.min(window.innerWidth, window.innerHeight) < 700;
    var lowPower = still ? false : (opts.lowPower != null ? opts.lowPower : (small || (navigator.hardwareConcurrency || 8) <= 4));
    var reduce = !!opts.reduceMotion;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !lowPower, powerPreference: "high-performance", preserveDrawingBuffer: still });
    var pixelRatio = still ? (opts.pixelRatio || 1) : Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = opts.exposure || 1.05;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
    camera.position.set(0, 0, 9);

    /* Studio environment: emissive softboxes give the glass long, clean highlights. */
    var pmrem = new THREE.PMREMGenerator(renderer);
    var env = new THREE.Scene();
    env.add(new THREE.Mesh(new THREE.BoxGeometry(14, 14, 14), new THREE.MeshBasicMaterial({ color: 0x0b0f2a, side: THREE.BackSide })));
    function softbox(w, h, hex, k, x, y, z) {
      var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(k), side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
    }
    softbox(9, 2.2, 0xffffff, 4.5, 0, 6, 1);
    softbox(1.3, 8, 0xffd2a6, 6.5, -5.5, 0.5, 3);
    softbox(1.1, 7, 0xc9c2ff, 3.8, 5.5, 0.2, 2.5);
    softbox(5, 1.4, 0xffffff, 1.5, 0, -3, 6);
    softbox(4, 4, 0xeaa86a, 1.8, 0, 0.5, -6);
    scene.environment = pmrem.fromScene(env, 0.04).texture;

    function roundedRect(w, h, r) {
      var s = new THREE.Shape(), x = -w / 2, y = -h / 2;
      s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
      return s;
    }
    function block(w, h, r, depth, bevel, segs) {
      var g = new THREE.ExtrudeGeometry(roundedRect(w, h, r), {
        depth: depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * 0.85,
        bevelSegments: segs, curveSegments: lowPower ? 8 : 16
      });
      g.center(); return g;
    }

    /* Shared materials and geometry */
    var glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, metalness: 0, roughness: 0.03,
      transmission: 1, thickness: 1.2, ior: 1.5,
      specularIntensity: 1, envMapIntensity: 1.6,
      clearcoat: 1, clearcoatRoughness: 0.03,
      iridescence: 0.18, iridescenceIOR: 1.3,
      attenuationColor: new THREE.Color(0xf1ecf8), attenuationDistance: 3.5
    });
    var capMat = new THREE.MeshPhysicalMaterial({ color: 0x17142a, metalness: 0.1, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1.25 });
    var collarMat = new THREE.MeshStandardMaterial({ color: 0xe2cda8, metalness: 1, roughness: 0.22, envMapIntensity: 1.3 });
    var geo = {
      glass: block(1.5, 1.9, 0.2, 0.8, 0.14, lowPower ? 4 : 8),
      liquid: block(1.1, 1.05, 0.12, 0.42, 0.07, 3),
      neck: new THREE.CylinderGeometry(0.2, 0.23, 0.24, lowPower ? 20 : 40),
      collar: new THREE.CylinderGeometry(0.29, 0.29, 0.08, lowPower ? 24 : 48),
      cap: block(0.82, 0.66, 0.1, 0.62, 0.05, 3),
      label: new THREE.PlaneGeometry(1.05, 0.525)
    };

    var liquidVert = [
      "varying vec3 vPos; varying vec3 vN; varying vec3 vV;",
      "void main(){ vPos = position; vec4 mv = modelViewMatrix * vec4(position, 1.0);",
      " vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }"
    ].join("\n");
    var liquidFrag = [
      "uniform vec3 uColor; uniform float uTime; uniform float uGlow;",
      "varying vec3 vPos; varying vec3 vN; varying vec3 vV;",
      "float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }",
      "float noise(vec3 x){ vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);",
      " return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),",
      "            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z); }",
      "float fbm(vec3 p){ return noise(p) * 0.55 + noise(p * 2.1 + 1.7) * 0.3 + noise(p * 4.3 + 3.1) * 0.15; }",
      "void main(){",
      " vec3 p = vPos * vec3(1.2, 1.6, 1.2) + vec3(0.0, -uTime * 0.12, uTime * 0.04);",
      " float n = fbm(p);",
      " float fres = pow(1.0 - clamp(abs(dot(vN, vV)), 0.0, 1.0), 2.2);",
      " float lift = smoothstep(-0.65, 0.5, vPos.y);",
      " vec3 deep = uColor * 0.38;",
      " vec3 bright = mix(uColor, vec3(1.0, 0.95, 0.86), 0.1) * 1.15;",
      " vec3 col = mix(deep, bright, clamp(lift * (0.82 + 0.3 * n), 0.0, 1.0));",
      " col += uColor * fres * 0.55;",
      " col += vec3(1.0, 0.96, 0.9) * smoothstep(0.5, 0.585, vPos.y) * 0.45;",
      " gl_FragColor = vec4(col * uGlow, 1.0);",
      " #include <tonemapping_fragment>",
      " #include <colorspace_fragment>",
      "}"
    ].join("\n");

    /* Frosted print on the front face */
    var labelCanvas = document.createElement("canvas");
    labelCanvas.width = 512; labelCanvas.height = 256;
    var labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.colorSpace = THREE.SRGBColorSpace;
    labelTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    function drawLabel() {
      var c = labelCanvas.getContext("2d");
      c.clearRect(0, 0, 512, 256);
      c.textAlign = "center"; c.textBaseline = "middle";
      c.fillStyle = "rgba(255,255,255,0.94)";
      c.font = 'italic 500 90px "Bodoni Moda", Didot, Georgia, serif';
      c.fillText("Vroeglicht", 256, 106);
      c.fillStyle = "rgba(255,255,255,0.78)";
      c.font = '500 26px "Jost", Futura, sans-serif';
      c.fillText("Gent", 176, 184);
      c.fillText("100 ml", 336, 184);
      labelTex.needsUpdate = true;
    }
    drawLabel();
    var labelMat = new THREE.MeshBasicMaterial({ map: labelTex, transparent: true, depthWrite: false, toneMapped: false });

    function buildFlacon(hex) {
      var group = new THREE.Group();
      var inner = new THREE.Group();
      group.add(inner);
      inner.add(new THREE.Mesh(geo.glass, glassMat));
      var liquidMat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(hex) }, uTime: { value: 0 }, uGlow: { value: 1 } },
        vertexShader: liquidVert, fragmentShader: liquidFrag
      });
      var liquid = new THREE.Mesh(geo.liquid, liquidMat);
      liquid.position.y = -0.24; inner.add(liquid);
      var neck = new THREE.Mesh(geo.neck, glassMat); neck.position.y = 1.19; inner.add(neck);
      var collar = new THREE.Mesh(geo.collar, collarMat); collar.position.y = 1.32; inner.add(collar);
      var cap = new THREE.Mesh(geo.cap, capMat); cap.position.y = 1.7; inner.add(cap);
      var label = new THREE.Mesh(geo.label, labelMat); label.position.set(0, -0.12, 0.545); inner.add(label);
      inner.position.y = -0.48;
      return { group: group, liquidMat: liquidMat };
    }

    /* Light rays behind the flacon and a glow pool under it (additive, cheap) */
    function rays() {
      var m = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xffd9b0) }, uAlpha: { value: 0.16 } },
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader: [
          "uniform float uTime; uniform vec3 uColor; uniform float uAlpha; varying vec2 vUv;",
          "void main(){ vec2 p = vUv - vec2(0.5, 1.02); float a = atan(p.x, -p.y); float r = length(p);",
          " float s = 0.55 + 0.45 * sin(a * 17.0 + uTime * 0.12) * sin(a * 6.0 - uTime * 0.08);",
          " float fall = smoothstep(1.05, 0.05, r) * smoothstep(0.62, 0.0, abs(p.x));",
          " gl_FragColor = vec4(uColor, s * fall * uAlpha);", " #include <colorspace_fragment>", "}"
        ].join("\n")
      });
      var mesh = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), m);
      mesh.position.z = -1.8;
      return mesh;
    }
    function pool(hex) {
      var m = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color(hex) }, uAlpha: { value: 0.55 } },
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader: "uniform vec3 uColor; uniform float uAlpha; varying vec2 vUv; void main(){ float d = length((vUv - 0.5) * vec2(1.0, 1.0)) * 2.0; float a = pow(smoothstep(1.0, 0.0, d), 2.2); gl_FragColor = vec4(uColor, a * uAlpha);\n #include <colorspace_fragment>\n}"
      });
      var mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), m);
      mesh.rotation.x = -Math.PI / 2 + 0.28;
      return mesh;
    }

    /* The sky is drawn inside the scene so the glass refracts it (night → blue hour → dawn via uT). */
    VL.SKY = VL.SKY || {
      top: [0x070b24, 0x1c2260, 0xd4cde6], bot: [0x161b48, 0x5a5ca2, 0xf3eff2],
      glow: [0xeaa86a, 0xb3a9f0, 0xf3c896], glowA: [0.36, 0.42, 0.6]
    };
    function skyMesh(p) {
      p = p || VL.SKY;
      var u = {
        uT: { value: 0 }, uAspect: { value: 1 }, uGlowPos: { value: new THREE.Vector2(0.5, 0.5) }, uGlowSize: { value: 0.62 },
        uGlowA: { value: new THREE.Vector3(p.glowA[0], p.glowA[1], p.glowA[2]) }
      };
      ["top", "bot", "glow"].forEach(function (k) {
        for (var i = 0; i < 3; i++) u["u" + k + i] = { value: new THREE.Color(p[k][i]) };
      });
      var m = new THREE.ShaderMaterial({
        uniforms: u, depthWrite: false, depthTest: false, toneMapped: false,
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }",
        fragmentShader: [
          "uniform float uT; uniform float uAspect; uniform vec2 uGlowPos; uniform float uGlowSize; uniform vec3 uGlowA;",
          "uniform vec3 utop0; uniform vec3 utop1; uniform vec3 utop2; uniform vec3 ubot0; uniform vec3 ubot1; uniform vec3 ubot2;",
          "uniform vec3 uglow0; uniform vec3 uglow1; uniform vec3 uglow2; varying vec2 vUv;",
          "vec3 pick(vec3 a, vec3 b, vec3 c){ return mix(mix(a, b, clamp(uT, 0.0, 1.0)), c, clamp(uT - 1.0, 0.0, 1.0)); }",
          "void main(){",
          " vec3 col = mix(pick(ubot0, ubot1, ubot2), pick(utop0, utop1, utop2), smoothstep(0.0, 1.0, vUv.y));",
          " float ga = mix(mix(uGlowA.x, uGlowA.y, clamp(uT, 0.0, 1.0)), uGlowA.z, clamp(uT - 1.0, 0.0, 1.0));",
          " float r = length((vUv - uGlowPos) * vec2(uAspect, 1.0)) / uGlowSize;",
          " float g = smoothstep(1.0, 0.0, r); col = mix(col, pick(uglow0, uglow1, uglow2), ga * g * g);",
          " gl_FragColor = vec4(col, 1.0);",
          " #include <colorspace_fragment>",
          "}"
        ].join("\n")
      });
      var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m);
      mesh.frustumCulled = false; mesh.renderOrder = -10;
      return mesh;
    }
    var projV = new THREE.Vector3();
    function glowAt(sky, x, y) {
      projV.set(x, y, 0).project(camera);
      sky.material.uniforms.uGlowPos.value.set(projV.x * 0.5 + 0.5, projV.y * 0.5 + 0.5);
      sky.material.uniforms.uAspect.value = camera.aspect;
    }

    var juice = {
      night: new THREE.Color(VL.JUICE.night),
      blue: new THREE.Color(VL.JUICE.blue),
      light: new THREE.Color(VL.JUICE.light)
    };
    var poolColors = { night: new THREE.Color(0xeaa86a), blue: new THREE.Color(0xb3a9f0), light: new THREE.Color(0xf3d391) };

    function viewSize() {
      var h = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
      return { h: h, w: h * camera.aspect };
    }

    function resizeTo(w, h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    /* ---------------------------------------------------------------- Still mode */
    if (still) {
      resizeTo(canvas.clientWidth || canvas.width, canvas.clientHeight || canvas.height);
      var bottles = opts.bottles || [{ juice: VL.JUICE.night, x: 0, y: 0, s: 1, rotY: 0.5 }];
      var sky0 = skyMesh(opts.sky);
      sky0.material.uniforms.uT.value = opts.skyT || 0;
      if (opts.glowSize) sky0.material.uniforms.uGlowSize.value = opts.glowSize;
      scene.add(sky0);
      glowAt(sky0, opts.glowX != null ? opts.glowX : bottles[0].x || 0, opts.glowY != null ? opts.glowY : (bottles[0].y || 0) - 0.2);
      var r0 = rays(); r0.material.uniforms.uTime.value = 3; r0.material.uniforms.uAlpha.value = opts.raysAlpha != null ? opts.raysAlpha : 0.16;
      r0.position.set(opts.raysX || 0, 0.6, -1.8); scene.add(r0);
      bottles.forEach(function (b) {
        var f = buildFlacon(b.juice);
        f.liquidMat.uniforms.uTime.value = b.time || 4;
        f.group.position.set(b.x || 0, b.y || 0, b.z || 0);
        f.group.scale.setScalar(b.s || 1);
        f.group.rotation.set(b.rotX || 0, b.rotY || 0, b.rotZ || 0);
        scene.add(f.group);
        var p = pool(b.pool || 0xeaa86a);
        p.position.set(b.x || 0, (b.y || 0) - 1.55 * (b.s || 1), 0.2);
        p.scale.setScalar(b.s || 1);
        p.material.uniforms.uAlpha.value = b.poolAlpha != null ? b.poolAlpha : 0.5;
        scene.add(p);
      });
      var renderStill = function () { renderer.render(scene, camera); };
      if (document.fonts && document.fonts.load) {
        Promise.all([document.fonts.load('italic 500 90px "Bodoni Moda"'), document.fonts.load('500 26px "Jost"')])
          .then(function () { drawLabel(); renderStill(); window.__stillReady = true; })
          .catch(function () { renderStill(); window.__stillReady = true; });
      }
      renderStill();
      return { render: renderStill, viewSize: viewSize };
    }

    /* ---------------------------------------------------------------- Live mode */
    var state = { x: 0, y: 0, scale: 1, rotY: 0, colorT: 0, intro: 1 };
    var skyLive = skyMesh();
    scene.add(skyLive);
    var hero = buildFlacon(VL.JUICE.night);
    scene.add(hero.group);
    var liquidMat = hero.liquidMat;
    var rayMesh = rays(); scene.add(rayMesh);
    var poolMesh = pool(0xeaa86a); scene.add(poolMesh);

    var COUNT = lowPower ? 320 : 900;
    var pos = new Float32Array(COUNT * 3), seed = new Float32Array(COUNT);
    for (var i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = -2.5 + Math.random() * 3.5;
      seed[i] = Math.random();
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    var pMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPR: { value: pixelRatio }, uAlpha: { value: 0 }, uColor: { value: new THREE.Color(0xffd9b0) } },
      vertexShader: [
        "attribute float aSeed; uniform float uTime; uniform float uPR; varying float vA;",
        "void main(){ vec3 p = position; float sp = 0.04 + aSeed * 0.08;",
        " p.y = mod(p.y + uTime * sp + 3.0, 6.0) - 3.0; p.x += sin(uTime * 0.3 + aSeed * 20.0) * 0.12;",
        " vec4 mv = modelViewMatrix * vec4(p, 1.0);",
        " gl_PointSize = (1.4 + aSeed * 3.0) * uPR * (8.0 / -mv.z);",
        " gl_Position = projectionMatrix * mv;",
        " vA = (0.25 + 0.75 * abs(sin(uTime * 0.8 + aSeed * 40.0))) * smoothstep(3.0, 1.6, abs(p.y)); }"
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 uColor; uniform float uAlpha; varying float vA;",
        "void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d);",
        " gl_FragColor = vec4(uColor, a * vA * uAlpha);", " #include <colorspace_fragment>", "}"
      ].join("\n")
    });
    scene.add(new THREE.Points(pGeo, pMat));

    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('italic 500 90px "Bodoni Moda"'), document.fonts.load('500 26px "Jost"')])
        .then(function () { drawLabel(); if (!running) renderOnce(); }).catch(function () {});
    }

    var pointer = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
    if (VL.finePointer && !reduce) {
      window.addEventListener("pointermove", function (e) {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      }, { passive: true });
    }

    var colA = new THREE.Color(), colB = new THREE.Color();
    function juiceAt(t) {
      if (t <= 1) return colA.copy(juice.night).lerp(juice.blue, t);
      return colA.copy(juice.blue).lerp(juice.light, Math.min(t - 1, 1));
    }
    function poolAt(t) {
      if (t <= 1) return colB.copy(poolColors.night).lerp(poolColors.blue, t);
      return colB.copy(poolColors.blue).lerp(poolColors.light, Math.min(t - 1, 1));
    }

    var running = false, active = true, raf = 0, last = 0, clock = 0;
    var frames = 0, slow = 0, warm = 0, downgrade = 0;
    var lastW = 0, lastH = 0;

    function draw(time) {
      var s = state.scale * (0.88 + 0.12 * state.intro);
      tilt.x += (pointer.x - tilt.x) * 0.05;
      tilt.y += (pointer.y - tilt.y) * 0.05;
      var spin = reduce ? 0.45 : time * 0.14;
      var bob = reduce ? 0 : Math.sin(time * 0.8) * 0.04;
      hero.group.position.set(state.x, state.y + bob, 0);
      hero.group.scale.setScalar(s);
      hero.group.rotation.set(tilt.y * 0.12 + (reduce ? 0 : Math.sin(time * 0.6) * 0.03), state.rotY + spin + tilt.x * 0.3, 0);
      liquidMat.uniforms.uColor.value.copy(juiceAt(state.colorT));
      liquidMat.uniforms.uTime.value = time;
      liquidMat.uniforms.uGlow.value = 0.2 + 0.8 * state.intro;
      var dawnFade = Math.max(0, 1 - Math.max(0, state.colorT - 1.3) * 1.2);
      rayMesh.position.set(state.x, state.y + 0.7 * state.scale, -1.8);
      rayMesh.scale.setScalar(state.scale);
      rayMesh.material.uniforms.uTime.value = time;
      rayMesh.material.uniforms.uAlpha.value = 0.17 * state.intro * dawnFade;
      poolMesh.position.set(state.x, state.y - 1.5 * s, 0.25);
      poolMesh.scale.setScalar(s);
      poolMesh.material.uniforms.uColor.value.copy(poolAt(state.colorT));
      poolMesh.material.uniforms.uAlpha.value = 0.55 * state.intro * (0.35 + 0.65 * dawnFade);
      pMat.uniforms.uTime.value = time;
      pMat.uniforms.uAlpha.value = state.intro * dawnFade;
      skyLive.material.uniforms.uT.value = state.colorT;
      glowAt(skyLive, state.x, state.y - 0.15 * state.scale);
      renderer.render(scene, camera);
    }
    function loop(now) {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      var dt = last ? Math.min((now - last) / 1000, 0.1) : 0.016;
      last = now; clock += dt;
      draw(clock);
      // Adaptive quality: step down if the device can't hold about 40 fps.
      warm += dt;
      if (warm > 2 && downgrade < 2) {
        frames++; slow += dt;
        if (frames >= 90) {
          if (slow / frames > 0.026) {
            downgrade++;
            if (downgrade === 1 && renderer.getPixelRatio() > 1) { renderer.setPixelRatio(1); pMat.uniforms.uPR.value = 1; resize(true); }
            else { downgrade = 2; glassMat.transmission = 0; glassMat.transparent = true; glassMat.opacity = 0.32; glassMat.needsUpdate = true; }
          }
          frames = 0; slow = 0;
        }
      }
    }
    function start() { if (running || !active || reduce) return; running = true; last = 0; raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }
    function renderOnce() { draw(clock); }
    function resize(force) {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!force && w === lastW && Math.abs(h - lastH) < 120 && !VL.finePointer) return;
      lastW = w; lastH = h;
      resizeTo(w, h);
      if (!running) renderOnce();
    }
    window.addEventListener("resize", function () { resize(false); });
    resize(true);
    start();

    return {
      state: state,
      viewSize: viewSize,
      aspect: function () { return camera.aspect; },
      renderOnce: renderOnce,
      start: start,
      setActive: function (on) { active = on; if (on) { start(); if (reduce) renderOnce(); } else stop(); }
    };
  };
})();
