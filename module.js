import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
//  ORBITCONTROLS allow for the camera to move
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
// GLTFloader allow for import the .glft file
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
// TWEEN allow  to create animaton in camera position
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

//3D
let canvasform = document.getElementById('dCanvas');
let width = canvasform.offsetWidth;
let height = canvasform.offsetHeight;
// create a threeJS scene
let scene = new THREE.Scene();
// create camera
let camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
//keep the object 3D
let object;
// OrbtControls allow to the camera move
let controls;
//instaniate a loader for the .gifl file
let loader = new GLTFLoader();
// load the file
loader.load(
  'modural_robot_mecha_chimera_dyan_high-poly_mesh/scene.gltf',
  function(gltf){
    // if file loader to scene
    object = gltf.scene;
    scene.add(object);
  }
)
//alow background transparent with alpha = true

let renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(width, height);
// Add the render the DOM HTML
document.getElementById('dCanvas').appendChild(renderer.domElement);
// set camera
camera.position.set(0, 0, 4); // x,y,z
// add light in 3d model
let ambientLight = new THREE.AmbientLight(0x404040, 7);
scene.add(ambientLight);
let directionLight = new THREE.DirectionalLight(0xffffff,1);
directionLight.position.set(2,1,0);
scene.add(directionLight);
let light = new THREE.PointLight(0x4c4c4c,2);
light.position.set(0,10,10);
scene.add(light);

let light3 = new THREE.PointLight(0,1);
light3.position.set(0, 5, 5);
scene.add(light3);

let light4 = new THREE.PointLight(0,1);
light4.position.set(0,5,5);
scene.add(light4);

// add controls to the camera
controls = new OrbitControls(camera, renderer.domElement);
// Render the scene
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}
animate();


let slider = document.querySelector('.ai');
let btnshowmore = document.getElementById('showmore');

let statusContent = 'contentOne';

// create function animation change position camera
function runCamera(x, y, z){
  // create postion camera
  let targetPosition = new THREE.Vector3(x, y, z);
  //let duration (time run animation)
  let duration = 1200; //ms

  let tween = new TWEEN.Tween(camera.position)
  .to(targetPosition, duration)
  .easing(TWEEN.Easing.Quadratic.InOut)
  .onUpdate(() => {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  })
  .start();
}

btnshowmore.onclick = () => {
  slider.classList.remove('contentOneActive');
  slider.classList.remove('contentTwoActive');
  switch (statusContent) {
    case 'contentOne':
      runCamera(-3, -5, -2);
      slider.classList.add('contentTwoAction')
      statusContent = 'contentTwo';
      break;
      case 'contentTwo':
        runCamera(2, 2, 3);
      statusContent = 'fullScreen';
      break;
      case 'fullScreen':
        runCamera(0, 0, 4);
      statusContent = 'contentOne';
      slider.classList.add('contentOneAction');
      break;
  
    default:
      break;
  }
}

// add event listen to resize window
window.addEventListener('resize', () => {
  width = canvasform.offsetWidth;
  height = canvasform.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width. height);
})


