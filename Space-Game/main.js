import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff6347,
//   wireframe: true,
// });
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffaa });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// // Space background
// const spaceTexture = new THREE.TextureLoader().load("assets/space.png");
// scene.background = spaceTexture;

const skyboxTexture = new THREE.TextureLoader().load("assets/skybox.jpg");
const skybox = new THREE.Mesh(
  new THREE.SphereGeometry(1000, 24, 24),
  new THREE.MeshBasicMaterial({ map: skyboxTexture, side: THREE.BackSide })
);

scene.add(skybox);

// Avatar
// const tylerTexture = new THREE.TextureLoader().load("assets/cube.png");
// const tyler = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 3, 3),
//   new THREE.MeshBasicMaterial({
//     map: tylerTexture,
//   })
// );

// scene.add(tyler);

// Planet
// const planetTexture = new THREE.TextureLoader().load("assets/planet.png");
// const normalMap = new THREE.TextureLoader().load("assets/NormalMap.png");
// const specularMap = new THREE.TextureLoader().load("assets/SpecularMap.png");
// const displacementMap = new THREE.TextureLoader().load(
//   "assets/DisplacementMap.png"
// );

// const planet = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: planetTexture,
//     displacementMap: displacementMap,
//     normalMap: normalMap,
//     roughness: specularMap,
//   })
// );

// scene.add(planet);

// Gold Sphere
// const loader = new GLTFLoader();
// let sphereMesh;

// const colorMap = new THREE.TextureLoader().load("assets/Metal Sphere Diffuse.jpg");
// loader.load('assets/Golden Sphere.glb', (glb) => {
//   sphereMesh = glb.scene;
//   // sphereMesh.map = colorMap;
//   // sphereMesh.position.x = 20;
//   scene.add(sphereMesh);
// });

addSphere(scene);

function addSphere(scene) {
  const goldSphereMap = new THREE.TextureLoader().load(`assets\Metal Sphere Diffuse.jpg`);
  goldSphereMap.encoding = THREE.sRGBEncoding;
  // const goldSphereMaterial = new THREE.MeshStandardMaterial({
  //   map: goldSphereMap
  // });


  let goldSphereMesh;
  const loader = new GLTFLoader();
  loader.load(`assets/Golden Sphere.glb`, (glb) => {
    goldSphereMesh = glb.scene;


    // goldSphereMesh.material = goldSphereMaterial;
    // goldSphereMesh.material = new THREE.MeshBasicMaterial();
    // goldSphereMesh.material.map = goldSphereMap;
    scene.add(goldSphereMesh);
  })


  // const goldSphereGeometry = new Promise(resolve => {
  //   loader.load(`assets/Golden Sphere.glb`, geometry => {
  //     resolve(geometry);
  //   })
  // })

  // const goldSphere = new THREE.Mesh(goldSphereMesh, goldSphereMaterial);

}



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
}

animate();
