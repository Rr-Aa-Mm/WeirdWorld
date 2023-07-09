import * as THREE from "./node_modules/three/build/three.module.js";

// Load the texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./img/maps.jpg");

var scene = new THREE.Scene();

var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(100, 128, 64),
  new THREE.MeshBasicMaterial({ map: texture })
);

scene.add(sphere);

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 300;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var isRotating = false;
var previousMousePosition = {
  x: 0,
  y: 0,
};

function handleMouseMove(event) {
  var deltaMove = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y,
  };

  if (isRotating) {
    var rotationQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        toRadians(deltaMove.y),
        toRadians(deltaMove.x),
        0,
        "XYZ"
      )
    );
    sphere.quaternion.multiplyQuaternions(rotationQuaternion, sphere.quaternion);
  }

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
}

function handleMouseDown(event) {
  isRotating = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
}

function handleMouseUp(event) {
  isRotating = false;
}

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

var animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

animate();
