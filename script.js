/* =====================================================================
   PARTH SHARMA - PORTFOLIO SCRIPTS
   Includes:
   - Profile Data Configuration
   - Dynamic Content Rendering
   - Navigation & Scroll Spy
   - Three.js Interactive Background Blob (GPU Displacement Shader)
   - Three.js Welcome Screen 3D Geometry & Particle Starfield
   - GSAP + ScrollTrigger Entrance & Reveal Animations
   - 3D Card Tilt Interaction
   ===================================================================== */

/* =====================================================================
   1. PROFILE CONTENT CONFIGURATION
   Edit your resume details, projects, skills, and links here.
   ===================================================================== */
const PROFILE = {
  name: 'Parth Sharma',
  location: 'Burari, New Delhi-110084',
  roles: ['AI Engineer', 'Machine Learning Builder', 'Generative AI Developer', 'Python Specialist'],
  links: {
    email:        'mailto:ps4689203@gmail.com',
    phone:        'tel:8595213964',
    phoneDisplay: '+91 8595213964',
    github:       'https://github.com',
    linkedin:     'https://linkedin.com/in/parth-sharma-37666a2aa'
  },
  skills: {
    row1: [
      'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision',
      'Generative AI', 'Large Language Models', 'Retrieval-Augmented Generation (RAG)',
      'Prompt Engineering', 'Model Evaluation', 'Feature Engineering'
    ],
    row2: [
      'Python', 'SQL', 'JavaScript', 'TypeScript', 'Pandas', 'NumPy', 'Matplotlib',
      'scikit-learn', 'TensorFlow', 'Keras', 'Hugging Face', 'LangChain', 'Streamlit',
      'REST APIs', 'Git & GitHub', 'Jupyter Notebook'
    ]
  },
  projects: [
    {
      title: 'Sentiment Analysis System (NLP)',
      hue: 245,
      status: 'Completed',
      sample: false,
      text: 'Classified customer reviews as positive, negative, or neutral, comparing TF-IDF models with a fine-tuned transformer. Deployed an interactive Streamlit web app that returns sentiment predictions in real time.',
      tags: ['Python', 'NLTK', 'scikit-learn', 'Hugging Face', 'Streamlit']
    },
    {
      title: 'Image Classification with CNN',
      hue: 280,
      status: 'Completed',
      sample: false,
      text: 'Trained a convolutional neural network to classify images and evaluated it with accuracy and confusion-matrix analysis. Reduced overfitting using data augmentation, dropout, and early stopping.',
      tags: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Deep Learning']
    },
    {
      title: 'Document Q&A Chatbot (RAG)',
      hue: 200,
      status: 'Completed',
      sample: false,
      text: 'Built a retrieval-augmented chatbot that answers questions from uploaded PDF documents and cites its sources. Improved answer relevance by tuning chunk size, embeddings, and prompt design.',
      tags: ['Python', 'LangChain', 'FAISS', 'LLM API', 'Streamlit']
    }
  ],
  timeline: [
    {
      category: 'Work Experience',
      when: 'Jun 2026 – Aug 2026',
      title: 'Artificial Intelligence Intern',
      org: 'Internship Studio',
      bullets: [
        'Built and evaluated machine learning models in Python using scikit-learn, Pandas, and NumPy to solve real-world prediction problems.',
        'Cleaned and preprocessed datasets and engineered features to improve model accuracy and reliability.',
        'Versioned code and documented experiments with Git and GitHub so results stayed reproducible.',
        'Presented model results to mentors and iterated on their feedback to deliver projects on schedule.'
      ]
    },
    {
      category: 'Education',
      when: '2025 – 2027',
      title: 'Master of Computer Applications (MCA)',
      org: 'Government College Dharamshala, Kangra',
      bullets: [
        'Specializing in Artificial Intelligence, Machine Learning, and Advanced Computing curriculum.',
        'Aiming for an entry-level AI Engineer role.'
      ]
    },
    {
      category: 'Education',
      when: '2022 – 2025',
      title: 'Bachelor of Computer Applications (BCA)',
      org: 'SRM University, Sonipat',
      bullets: [
        'Built solid software engineering foundations in Object-Oriented Programming, Database Management (SQL), and Data Structures.'
      ]
    }
  ],
  certs: [
    'Artificial Intelligence Internship - Training',
    'Career Essentials in GitHub Professional Certificate',
    'Introduction to Programming Using Python',
    'JavaScript ES6+ Fundamentals - Internshala Trainings'
  ]
};

/* =====================================================================
   2. MAIN APPLICATION LOGIC
   ===================================================================== */
(function(){
'use strict';

var root = document.documentElement;
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var hasG = !!window.gsap, hasST = hasG && !!window.ScrollTrigger;
if (!hasG || reduce) root.classList.remove('js');
if (hasST) gsap.registerPlugin(ScrollTrigger);

/* ---------- DOM Helpers ---------- */
var P = PROFILE;
var $ = function(s, r){ return (r || document).querySelector(s); };
var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

function icon(id){ return '<svg aria-hidden="true"><use href="#' + id + '"/></svg>'; }

/* ---------- Render Profile Content into DOM ---------- */
$('#socialRow').innerHTML =
  '<a href="' + P.links.linkedin + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-reveal>' + icon('i-linkedin') + '</a>' +
  '<a href="' + P.links.email + '" aria-label="Email" data-reveal>' + icon('i-mail') + '</a>' +
  '<a href="' + P.links.phone + '" aria-label="Phone" data-reveal>' + icon('i-phone') + '</a>' +
  '<a href="' + P.links.github + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-reveal>' + icon('i-github') + '</a>';

$('#contactCta').innerHTML =
  '<a class="pill pill-solid pill-sm" href="' + P.links.email + '">Email Directly</a>' +
  '<a class="pill pill-ghost pill-sm" href="' + P.links.phone + '">Call: ' + P.links.phoneDisplay + '</a>' +
  '<a class="pill pill-ghost pill-sm" href="' + P.links.linkedin + '" target="_blank" rel="noopener noreferrer">LinkedIn</a>';

/* ---------- Contact Form Handler (Direct Mailto with feedback) ---------- */
window.handleContactSubmit = function(){
  var name = $('#userName').value.trim();
  var email = $('#userEmail').value.trim();
  var msg = $('#userMessage').value.trim();
  var feedback = $('#contactFeedback');

  if (!name || !email || !msg) return;

  var subject = encodeURIComponent('Portfolio Contact from ' + name);
  var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + msg);
  var mailtoUrl = 'mailto:ps4689203@gmail.com?subject=' + subject + '&body=' + body;

  if (feedback){
    feedback.style.display = 'block';
    feedback.textContent = 'Opening your email client to send message...';
  }

  setTimeout(function(){
    window.location.href = mailtoUrl;
  }, 400);
};

/* ---------- Skills Marquee Generation ---------- */
function chips(list){
  return list.map(function(s){ return '<span class="chip"><i></i>' + s + '</span>'; }).join('');
}
function marquee(list, rev){
  var one = chips(list);
  return '<div class="marquee' + (rev ? ' rev' : '') + '" aria-label="' + list.join(', ') + '"><div class="marquee-track" aria-hidden="true">' + one + one + one + one + '</div></div>';
}
$('#marquees').innerHTML = marquee(P.skills.row1, false) + marquee(P.skills.row2, true);

/* ---------- Projects Grid Generation ---------- */
$('#projGrid').innerHTML = P.projects.map(function(p){
  return '<article class="proj" data-reveal>' +
    '<span class="status' + (p.sample ? ' sample' : '') + '">' + p.status + '</span>' +
    '<div class="proj-art" style="--h:' + p.hue + '" aria-hidden="true"></div>' +
    '<div class="proj-body"><h3>' + p.title + '</h3><p>' + p.text + '</p>' +
    '<ul class="tags">' + p.tags.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul></div></article>';
}).join('');

/* ---------- Journey Timeline Generation ---------- */
var tl = $('#timeline');
tl.insertAdjacentHTML('beforeend', P.timeline.map(function(t){
  var bulletsHtml = t.bullets ? '<ul class="tl-bullets">' + t.bullets.map(function(b){ return '<li>' + b + '</li>'; }).join('') + '</ul>' : (t.text ? '<p>' + t.text + '</p>' : '');
  var badgeHtml = t.category ? '<span class="tl-badge">' + t.category + '</span>' : '';
  return '<li class="tl-item"><span class="tl-node" aria-hidden="true"></span>' +
    badgeHtml +
    '<div class="tl-when">' + t.when + '</div><h3>' + t.title + '</h3><p class="tl-org">' + t.org + '</p>' +
    bulletsHtml + '</li>';
}).join(''));

$('#certList').innerHTML = P.certs.map(function(c){ return '<li>' + c + '</li>'; }).join('');
$('#year').textContent = new Date().getFullYear();

/* ---------- Navigation & Scroll Spy ---------- */
var nav = $('#nav'), menuBtn = $('#menuBtn'), navLinks = $('#navLinks');
function onScrollNav(){ nav.classList.toggle('scrolled', scrollY > 30); }
addEventListener('scroll', onScrollNav, {passive:true});
onScrollNav();

menuBtn.addEventListener('click', function(){
  var open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

$$('#navLinks a').forEach(function(a){
  a.addEventListener('click', function(){
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

var secs = $$('main > section');
if ('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        $$('#navLinks a').forEach(function(a){
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, {rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){ io.observe(s); });
}

/* ---------- Typed Hero Role Line ---------- */
(function(){
  var el = $('#typed'), words = P.roles;
  if (!el) return;
  if (reduce){ el.textContent = words[0]; return; }
  var w = 0, i = 0, del = false;
  function tick(){
    var word = words[w];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length){ del = true; return setTimeout(tick, 1500); }
    if (del && i === 0){ del = false; w = (w + 1) % words.length; return setTimeout(tick, 350); }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 32 : 70);
  }
  setTimeout(tick, 1600);
})();

/* =====================================================================
   3. BACKGROUND THREE.JS 3D LIQUID BLOB SIMULATION
   ===================================================================== */
var state = { intro: reduce ? 1 : 0 };
var GL = null;
try {
  if (window.THREE) GL = initThree();
} catch (err) {
  console.warn('WebGL unavailable', err);
  GL = null;
}
if (GL) root.classList.add('has-gl');

function initThree(){
  var canvas = $('#stage');
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    precision: 'mediump'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  /* Quick lightweight studio reflections */
  (function(){
    var c = document.createElement('canvas'); c.width = 256; c.height = 128;
    var x = c.getContext('2d');
    var g = x.createLinearGradient(0,0,0,128);
    g.addColorStop(0,'#323b63'); g.addColorStop(0.5,'#121626'); g.addColorStop(1,'#07080f');
    x.fillStyle = g; x.fillRect(0,0,256,128);
    function light(cx,cy,r,col,a){
      var rg = x.createRadialGradient(cx,cy,0,cx,cy,r);
      rg.addColorStop(0,col); rg.addColorStop(1,'rgba(0,0,0,0)');
      x.globalAlpha = a; x.fillStyle = rg; x.fillRect(cx-r,cy-r,2*r,2*r); x.globalAlpha = 1;
    }
    light(50,30,45,'#ffffff',0.9);
    light(180,25,50,'#8f9eff',0.85);
    light(120,85,55,'#7065ff',0.5);
    light(220,75,40,'#ff75a0',0.45);
    var tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.encoding = THREE.sRGBEncoding;
    var pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromEquirectangular(tex).texture;
    tex.dispose(); pm.dispose();
  })();

  /* Dynamic Studio Lighting */
  var key = new THREE.DirectionalLight(0xb4c2ff, 1.6); key.position.set(-3, 4, 5); scene.add(key);
  var rim = new THREE.DirectionalLight(0xff75a0, 0.9); rim.position.set(4, -2, -3); scene.add(rim);
  var ambient = new THREE.AmbientLight(0x2a3355, 0.8); scene.add(ambient);

  /* Vertex displacement shader hooks into MeshPhysicalMaterial for full GPU execution */
  function createBlobMaterial(seedVal){
    var mat = new THREE.MeshPhysicalMaterial({
      color: 0x22283e,
      roughness: 0.16,
      metalness: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.6,
      transmission: 0.2,
      ior: 1.45
    });

    mat.userData.uTime = { value: 0 };
    mat.userData.uAmp = { value: 0.18 };
    mat.userData.uSeed = { value: seedVal };

    mat.onBeforeCompile = function(shader){
      shader.uniforms.uTime = mat.userData.uTime;
      shader.uniforms.uAmp = mat.userData.uAmp;
      shader.uniforms.uSeed = mat.userData.uSeed;

      shader.vertexShader = 'uniform float uTime;\nuniform float uAmp;\nuniform float uSeed;\n' +
        'float disp(vec3 p, float t, float s){\n' +
        '  return 0.5 * sin(p.x * 1.6 + t * 0.9 + sin(p.y * 1.2 + t * 0.45 + s))\n' +
        '       + 0.35 * sin(p.y * 2.1 - t * 0.7 + p.z * 1.1 + s)\n' +
        '       + 0.25 * sin(p.z * 2.5 + t * 1.1 + p.x * 0.7);\n' +
        '}\n' +
        shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        '#include <beginnormal_vertex>\n' +
        'float e = 0.02;\n' +
        'float v0 = disp(position, uTime, uSeed);\n' +
        'vec3 posW = position * (1.0 + uAmp * v0);\n' +
        'float vX = disp(position + vec3(e, 0.0, 0.0), uTime, uSeed);\n' +
        'float vY = disp(position + vec3(0.0, e, 0.0), uTime, uSeed);\n' +
        'float vZ = disp(position + vec3(0.0, 0.0, e), uTime, uSeed);\n' +
        'vec3 grad = vec3((vX - v0)/e, (vY - v0)/e, (vZ - v0)/e);\n' +
        'vec3 normMod = normalize(normal - uAmp * (grad - dot(grad, normal) * normal));\n' +
        'objectNormal = normMod;'
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n' +
        'transformed = position * (1.0 + uAmp * v0);'
      );
    };

    return mat;
  }

  /* GPU Instanced Meshes */
  var matMain = createBlobMaterial(0.0);
  var matSatA = createBlobMaterial(2.1);
  var matSatB = createBlobMaterial(4.7);

  var geomMain = new THREE.SphereGeometry(1, 48, 36);
  var geomSatA = new THREE.SphereGeometry(1, 32, 24);
  var geomSatB = new THREE.SphereGeometry(1, 24, 18);

  var main = new THREE.Mesh(geomMain, matMain);
  var satA = new THREE.Mesh(geomSatA, matSatA);
  var satB = new THREE.Mesh(geomSatB, matSatB);
  scene.add(main, satA, satB);

  /* Section Keyframes (x,y normalized to screen half-dimensions, s = scale) */
  var KF_D = [
    {x: 0.50, y:-0.02, s: 1.05},
    {x:-0.50, y: 0.00, s: 0.95},
    {x: 0.58, y:-0.05, s: 0.72},
    {x:-0.86, y:-0.22, s: 0.62},
    {x: 0.60, y: 0.00, s: 0.85},
    {x: 0.50, y:-0.02, s: 1.05}
  ];
  var KF_M = [
    {x: 0.45, y: 0.48, s: 1.55},
    {x: 0.55, y: 0.52, s: 1.20},
    {x: 0.55, y: 0.48, s: 1.00},
    {x: 0.60, y: 0.42, s: 0.90},
    {x: 0.55, y: 0.48, s: 1.00},
    {x: 0.45, y: 0.48, s: 1.35}
  ];

  var hw = 1, hh = 1, unit = 1, mobile = false, lastW = 0, lastH = 0;
  function resize(){
    var w = window.innerWidth, h = window.innerHeight;
    if (w === lastW && Math.abs(h - lastH) < 80) return;
    lastW = w; lastH = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    hh = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    hw = hh * camera.aspect;
    unit = Math.min(hh, hw * 0.85);
    mobile = (w / h) < 0.85;
  }

  var centers = [];
  function measure(){
    centers = secs.map(function(s){
      var r = s.getBoundingClientRect();
      return r.top + window.scrollY + r.height / 2;
    });
  }

  function target(){
    var KF = mobile ? KF_M : KF_D;
    var mid = window.scrollY + window.innerHeight * 0.5;
    var i = 0;
    for (var k = 0; k < centers.length; k++){
      if (mid >= centers[k]) i = k;
    }
    var a = KF[i], b = KF[Math.min(i + 1, KF.length - 1)], f = 0;
    if (i < centers.length - 1 && centers[i+1] > centers[i]){
      f = (mid - centers[i]) / (centers[i + 1] - centers[i]);
      f = Math.min(Math.max(f, 0), 1);
      f = f * f * (3 - 2 * f);
    }
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, s: a.s + (b.s - a.s) * f };
  }

  var cur = null, px = 0, py = 0, tpx = 0, tpy = 0, energy = 0, t = 0, lastScroll = window.scrollY;
  window.addEventListener('pointermove', function(e){
    var nx = (e.clientX / window.innerWidth) * 2 - 1;
    var ny = -((e.clientY / window.innerHeight) * 2 - 1);
    energy = Math.min(energy + Math.hypot(nx - tpx, ny - tpy) * 1.5, 1.2);
    tpx = nx; tpy = ny;
  }, {passive:true});

  window.addEventListener('scroll', function(){
    var sy = window.scrollY;
    energy = Math.min(energy + Math.abs(sy - lastScroll) / window.innerHeight * 2.0, 1.2);
    lastScroll = sy;
  }, {passive:true});

  function draw(dt, snap){
    var tg = target();
    if (!cur || snap) cur = {x: tg.x, y: tg.y, s: tg.s};

    var lerpFactor = snap ? 1 : Math.min(dt * 3.8, 1);
    cur.x += (tg.x - cur.x) * lerpFactor;
    cur.y += (tg.y - cur.y) * lerpFactor;
    cur.s += (tg.s - cur.s) * lerpFactor;

    px += (tpx - px) * Math.min(dt * 3.5, 1);
    py += (tpy - py) * Math.min(dt * 3.5, 1);
    energy *= Math.pow(0.2, dt);
    t += dt * (0.65 + energy * 1.2);

    var amp = 0.16 + energy * 0.18;
    var intro = Math.max(state.intro, 0.0001);
    var R = Math.max(cur.s * unit * 0.6 * intro, 0.0001);
    var cx = cur.x * hw + px * 0.28;
    var cy = cur.y * hh + py * 0.18;

    main.position.set(cx, cy, 0);
    main.scale.setScalar(R);
    main.rotation.set(-py * 0.22, t * 0.18 + px * 0.35, 0);

    matMain.userData.uTime.value = t;
    matMain.userData.uAmp.value = amp;

    var a1 = t * 0.42;
    satA.position.set(cx + Math.cos(a1) * R * 1.75, cy + Math.sin(a1 * 0.9) * R * 0.95, Math.sin(a1) * R * 0.85);
    satA.scale.setScalar(R * 0.3);
    satA.rotation.y = t * 0.35;
    matSatA.userData.uTime.value = t * 1.2;
    matSatA.userData.uAmp.value = amp * 1.1;

    var a2 = t * 0.58 + 2.2;
    satB.position.set(cx + Math.cos(a2) * R * 2.3, cy + Math.sin(a2) * R * 1.2, Math.cos(a2) * R * 0.65);
    satB.scale.setScalar(R * 0.17);
    satB.rotation.y = t * 0.45;
    matSatB.userData.uTime.value = t * 1.4;
    matSatB.userData.uAmp.value = amp;

    renderer.render(scene, camera);
  }

  var clock = new THREE.Clock();
  function loop(){
    draw(Math.min(clock.getDelta(), 0.04), false);
    requestAnimationFrame(loop);
  }

  resize();
  measure();
  window.addEventListener('resize', function(){ resize(); measure(); });
  window.addEventListener('load', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);

  if (reduce){
    draw(0, true);
    var still = function(){ draw(0, true); };
    window.addEventListener('scroll', still, {passive:true});
    window.addEventListener('resize', still);
  } else {
    clock.getDelta();
    requestAnimationFrame(loop);
  }
  return { measure: measure };
}

/* =====================================================================
   4. CINEMATIC WELCOME SCREEN (3D Morphing Icosahedron + Particles)
   ===================================================================== */
var welcomeScreen = $('#welcomeScreen');
var welcomeBar = $('#welcomeBar');
var welcomeStatus = $('#welcomeStatus');
var welcomeBtn = $('#welcomeBtn');
var siteEntered = false;

var welcomeRAF = null;
var welcomeGLCleanup = null;
(function initWelcome3D(){
  if (!window.THREE || !welcomeScreen || reduce) return;
  var canvas = document.getElementById('welcomeStage');
  if (!canvas) return;

  var W = window.innerWidth, H = window.innerHeight;
  var ren = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:true, powerPreference:'high-performance'});
  ren.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  ren.setSize(W, H);
  ren.outputEncoding = THREE.sRGBEncoding;

  var sc = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(50, W/H, 0.1, 100);
  cam.position.set(0, 0, 18);

  /* Central morphing icosahedron core */
  var coreGeo = new THREE.IcosahedronGeometry(2.6, 4);
  var coreMat = new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}, uC1:{value:new THREE.Color(0x1a1f3a)}, uC2:{value:new THREE.Color(0x8f9eff)}},
    vertexShader:[
      'uniform float uTime;',
      'varying vec3 vP; varying vec3 vN;',
      'void main(){',
      '  vP=position; vN=normal;',
      '  vec3 p=position;',
      '  float d=sin(p.x*2.5+uTime*1.2)*0.14+sin(p.y*3.0-uTime*0.9)*0.11+sin(p.z*2.2+uTime*1.5)*0.09;',
      '  p*=1.0+d;',
      '  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);',
      '}'
    ].join('\n'),
    fragmentShader:[
      'uniform float uTime; uniform vec3 uC1; uniform vec3 uC2;',
      'varying vec3 vP; varying vec3 vN;',
      'void main(){',
      '  float fr=pow(1.0-abs(dot(normalize(vN),vec3(0,0,1))),2.2);',
      '  vec3 col=mix(uC1,uC2,fr);',
      '  float pulse=0.85+0.15*sin(uTime*1.5);',
      '  gl_FragColor=vec4(col*pulse, 0.35+fr*0.65);',
      '}'
    ].join('\n'),
    transparent:true, side:THREE.DoubleSide, depthWrite:false
  });
  var core = new THREE.Mesh(coreGeo, coreMat);
  sc.add(core);

  /* Inner wireframe shell */
  var wireGeo = new THREE.IcosahedronGeometry(3.0, 2);
  var wireMat = new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}, uCol:{value:new THREE.Color(0x8f9eff)}},
    vertexShader:'uniform float uTime;\nvoid main(){\n  vec3 p=position;\n  float d=sin(p.x*2.0+uTime)*0.07+sin(p.y*2.5-uTime*0.7)*0.05;\n  p*=1.0+d;\n  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);\n}',
    fragmentShader:'uniform vec3 uCol;\nvoid main(){ gl_FragColor=vec4(uCol,0.28); }',
    transparent:true, wireframe:true, depthWrite:false
  });
  var wire = new THREE.Mesh(wireGeo, wireMat);
  sc.add(wire);

  /* Outer wireframe shell */
  var outerGeo = new THREE.IcosahedronGeometry(4.2, 1);
  var outerMat = new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}, uCol:{value:new THREE.Color(0x5f6fe0)}},
    vertexShader:'uniform float uTime;\nvoid main(){\n  vec3 p=position;\n  float d=sin(p.x*1.5+uTime*0.6)*0.04+sin(p.z*1.8-uTime*0.5)*0.03;\n  p*=1.0+d;\n  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);\n}',
    fragmentShader:'uniform vec3 uCol;\nvoid main(){ gl_FragColor=vec4(uCol,0.12); }',
    transparent:true, wireframe:true, depthWrite:false
  });
  var outerShell = new THREE.Mesh(outerGeo, outerMat);
  sc.add(outerShell);

  /* Orbiting particle rings */
  var rings = [];
  var ringCfg = [
    {count:180, radius:5.5, tx:0.3, tz:0.1, spd:0.2, col:0x8f9eff, op:0.7},
    {count:140, radius:7.0, tx:-0.6, tz:0.4, spd:0.15, col:0xaab4ff, op:0.55},
    {count:100, radius:9.0, tx:0.8, tz:-0.3, spd:0.1, col:0x5f6fe0, op:0.4}
  ];
  ringCfg.forEach(function(cfg){
    var pos = new Float32Array(cfg.count*3);
    var sz = new Float32Array(cfg.count);
    for(var i=0;i<cfg.count;i++){
      var a=(i/cfg.count)*Math.PI*2+(Math.random()-0.5)*0.15;
      pos[i*3]=Math.cos(a)*cfg.radius+(Math.random()-0.5)*0.4;
      pos[i*3+1]=(Math.random()-0.5)*0.5;
      pos[i*3+2]=Math.sin(a)*cfg.radius+(Math.random()-0.5)*0.4;
      sz[i]=0.5+Math.random()*2.0;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sz,1));
    var mat = new THREE.ShaderMaterial({
      uniforms:{uCol:{value:new THREE.Color(cfg.col)}, uOp:{value:cfg.op}},
      vertexShader:'attribute float aSize;\nvarying float vA;\nvoid main(){\n  vA=aSize/2.5;\n  vec4 mv=modelViewMatrix*vec4(position,1.0);\n  gl_PointSize=aSize*(180.0/-mv.z);\n  gl_Position=projectionMatrix*mv;\n}',
      fragmentShader:'uniform vec3 uCol; uniform float uOp;\nvarying float vA;\nvoid main(){\n  float d=length(gl_PointCoord-0.5);\n  if(d>0.5)discard;\n  float a=smoothstep(0.5,0.02,d)*uOp*vA;\n  gl_FragColor=vec4(uCol,a);\n}',
      transparent:true, depthWrite:false, blending:THREE.AdditiveBlending
    });
    var pts = new THREE.Points(geo, mat);
    pts.rotation.x=cfg.tx; pts.rotation.z=cfg.tz;
    sc.add(pts);
    rings.push({mesh:pts, speed:cfg.spd});
  });

  /* Floating geometric wireframes */
  var floaters = [];
  var fGeos = [new THREE.IcosahedronGeometry(0.18,0), new THREE.OctahedronGeometry(0.16,0), new THREE.TetrahedronGeometry(0.15,0)];
  for(var f=0;f<20;f++){
    var fm = new THREE.MeshBasicMaterial({
      color:f%3===0?0x8f9eff:f%3===1?0xaab4ff:0x5f6fe0,
      wireframe:true, transparent:true, opacity:0.25+Math.random()*0.35
    });
    var fM = new THREE.Mesh(fGeos[f%3], fm);
    var th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1), dist=5+Math.random()*10;
    fM.position.set(dist*Math.sin(ph)*Math.cos(th), dist*Math.sin(ph)*Math.sin(th), dist*Math.cos(ph));
    fM.userData={spd:0.3+Math.random()*0.8, orbSpd:0.03+Math.random()*0.08, orbR:dist, orbA:th, orbPh:ph};
    sc.add(fM);
    floaters.push(fM);
  }

  /* Center pulsing glow + ambient */
  var glowPt = new THREE.PointLight(0x8f9eff, 2.5, 20);
  sc.add(glowPt);
  sc.add(new THREE.AmbientLight(0x2a3355, 0.5));

  /* Mouse-reactive camera */
  var wmx=0, wmy=0;
  function onWelcomeMouse(e){ wmx=(e.clientX/W)*2-1; wmy=-((e.clientY/H)*2-1); }
  window.addEventListener('pointermove', onWelcomeMouse, {passive:true});

  var ck = new THREE.Clock();
  function anim(){
    welcomeRAF = requestAnimationFrame(anim);
    var dt = Math.min(ck.getDelta(), 0.05);
    var t = ck.elapsedTime;

    coreMat.uniforms.uTime.value = t;
    wireMat.uniforms.uTime.value = t;
    outerMat.uniforms.uTime.value = t;

    core.rotation.y = t*0.18;
    core.rotation.x = Math.sin(t*0.22)*0.12;
    wire.rotation.y = -t*0.12;
    wire.rotation.x = Math.cos(t*0.18)*0.14;
    outerShell.rotation.y = t*0.06;
    outerShell.rotation.z = Math.sin(t*0.1)*0.08;

    rings.forEach(function(r){ r.mesh.rotation.y += dt*r.speed; });

    floaters.forEach(function(fl){
      fl.rotation.x += dt*fl.userData.spd;
      fl.rotation.y += dt*fl.userData.spd*0.6;
      fl.userData.orbA += dt*fl.userData.orbSpd;
      var a=fl.userData.orbA, p=fl.userData.orbPh, d=fl.userData.orbR;
      fl.position.x = d*Math.sin(p)*Math.cos(a);
      fl.position.z = d*Math.sin(p)*Math.sin(a);
    });

    glowPt.intensity = 2.0+0.8*Math.sin(t*1.5);

    cam.position.x += (wmx*1.5-cam.position.x)*dt*2;
    cam.position.y += (wmy*1.0-cam.position.y)*dt*2;
    cam.lookAt(0,0,0);

    ren.render(sc, cam);
  }

  ck.getDelta();
  anim();

  function onWelcomeResize(){
    W=window.innerWidth; H=window.innerHeight;
    ren.setSize(W,H);
    cam.aspect=W/H;
    cam.updateProjectionMatrix();
  }
  window.addEventListener('resize', onWelcomeResize);

  welcomeGLCleanup = function(){
    if(welcomeRAF) cancelAnimationFrame(welcomeRAF);
    welcomeRAF = null;
    window.removeEventListener('pointermove', onWelcomeMouse);
    window.removeEventListener('resize', onWelcomeResize);
    sc.traverse(function(o){
      if(o.geometry) o.geometry.dispose();
      if(o.material) o.material.dispose();
    });
    ren.dispose();
  };
})();

/* ---------- Entrance Transition to Main Portfolio ---------- */
function startHeroAnimations(){
  if (siteEntered) return;
  siteEntered = true;

  /* Dispose welcome 3D scene */
  if (welcomeGLCleanup){ welcomeGLCleanup(); welcomeGLCleanup = null; }

  if (welcomeScreen){
    welcomeScreen.classList.add('hidden');
    setTimeout(function(){
      if (welcomeScreen.parentNode) welcomeScreen.parentNode.removeChild(welcomeScreen);
    }, 900);
  }

  if (hasG && !reduce){
    var tlIn = gsap.timeline({defaults:{ease:'power3.out'}});
    tlIn.fromTo('.nav', {y:-25, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.7}, 0.05)
        .fromTo('.hero .head-line>span', {yPercent:110, autoAlpha:0}, {yPercent:0, autoAlpha:1, duration:0.95, stagger:0.12}, 0.15)
        .fromTo('.hero .ring', {scale:0.4, autoAlpha:0}, {scale:1, autoAlpha:1, duration:0.9, stagger:0.08, ease:'back.out(1.5)'}, 0.35)
        .fromTo('.hero-copy, .hero-role', {y:20, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.8, stagger:0.08}, 0.55)
        .fromTo('.hero-cta .pill', {y:16, autoAlpha:0, scale:0.95}, {y:0, autoAlpha:1, scale:1, duration:0.65, stagger:0.08, ease:'power3.out'}, 0.75)
        .fromTo('.hero-social a', {scale:0, autoAlpha:0}, {scale:1, autoAlpha:1, duration:0.45, stagger:0.06, ease:'back.out(1.8)'}, 0.85);

    gsap.fromTo(state, {intro: 0.15}, {intro: 1, duration: 1.2, ease: 'power2.out', delay: 0.05});
  } else {
    state.intro = 1;
  }
}

/* ---------- Welcome Screen Progress Loader ---------- */
(function initWelcomeLoader(){
  if (!welcomeScreen){ startHeroAnimations(); return; }

  /* Clicking anywhere on the welcome screen enters immediately */
  welcomeScreen.addEventListener('click', function(){
    startHeroAnimations();
  });

  var progress = 0;
  var timer = setInterval(function(){
    progress += Math.floor(Math.random() * 3) + 2;
    if (progress > 100) progress = 100;

    if (welcomeBar) welcomeBar.style.width = progress + '%';

    if (progress >= 100){
      clearInterval(timer);
      if (welcomeBtn){
        welcomeBtn.classList.add('ready');
        welcomeBtn.addEventListener('click', function(e){
          e.stopPropagation();
          startHeroAnimations();
        });
      }
      /* Auto enter after smooth beat if user doesn't click */
      setTimeout(function(){
        startHeroAnimations();
      }, 2600);
    }
  }, 45);
})();

/* =====================================================================
   5. GSAP SCROLLTRIGGER ANIMATIONS & 3D TILT
   ===================================================================== */
if (hasST && !reduce){
  /* Headings: each line slides up out of a mask */
  $$('main .display').forEach(function(h){
    if (h.closest('.hero')) return;
    gsap.fromTo($$('.head-line>span', h), {yPercent:112, autoAlpha:0}, {
      yPercent:0, autoAlpha:1, duration:1, stagger:0.12, ease:'power4.out',
      scrollTrigger:{trigger:h, start:'top 88%', once:true}});
  });

  /* Contact card + buttons + certifications */
  gsap.fromTo('.contact-card', {y:50, autoAlpha:0}, {y:0, autoAlpha:1, duration:1, ease:'power3.out', clearProps:'all',
    scrollTrigger:{trigger:'#contact', start:'top 85%', once:true}});
  gsap.fromTo('#contactCta .pill', {y:24, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.7, stagger:0.1, ease:'back.out(1.6)',
    scrollTrigger:{trigger:'#contactCta', start:'top 92%', once:true}});
  gsap.fromTo('#certs', {y:40, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.9, ease:'power3.out', clearProps:'transform',
    scrollTrigger:{trigger:'#certs', start:'top 88%', once:true}});

  /* Project cards tip forward into view */
  gsap.fromTo('.proj', {rotationX:28, y:60, autoAlpha:0, transformOrigin:'50% 100%'}, {
    rotationX:0, y:0, autoAlpha:1, duration:1, stagger:0.15, ease:'power3.out', clearProps:'transform',
    scrollTrigger:{trigger:'#projGrid', start:'top 85%', once:true}});

  /* Timeline line draws as you scroll, nodes light up when reached */
  gsap.fromTo('.tl-fill', {scaleY:0}, {scaleY:1, ease:'none',
    scrollTrigger:{trigger:'#timeline', start:'top 65%', end:'bottom 65%', scrub:0.4}});
  $$('.tl-item').forEach(function(it){
    ScrollTrigger.create({trigger:it, start:'top 65%',
      onEnter:function(){ it.classList.add('on'); }, onLeaveBack:function(){ it.classList.remove('on'); }});
  });
  addEventListener('load', function(){ ScrollTrigger.refresh(); });
} else {
  $$('.tl-item').forEach(function(it){ it.classList.add('on'); });
}

/* Safety net: never leave content hidden if animation scripts stall */
setTimeout(function(){ if (!hasG) root.classList.remove('js'); }, 3500);

/* ---------- 3D Tilt Effect on Project Cards ---------- */
if (matchMedia('(hover: hover)').matches && !reduce){
  $$('.proj').forEach(function(c){
    c.addEventListener('pointermove', function(e){
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left)/r.width, y = (e.clientY - r.top)/r.height;
      c.style.setProperty('--mx', (x*100)+'%');
      c.style.setProperty('--my', (y*100)+'%');
      c.style.transform = 'perspective(900px) rotateX('+((0.5-y)*10)+'deg) rotateY('+((x-0.5)*12)+'deg) translateY(-4px)';
    });
    c.addEventListener('pointerleave', function(){ c.style.transform = ''; });
  });
}

})();
