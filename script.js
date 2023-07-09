var scene = new THREE.Scene();

var sphereTexture = new THREE.TextureLoader().load("img/maps.jpg");
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(100, 128, 64),
  new THREE.MeshBasicMaterial({ map: sphereTexture })
);

// Tip the central axis to the left
var axisTilt = 30; // Degrees
var axisQuaternion = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(1, 0, 0),
  toRadians(axisTilt)
);
sphere.quaternion.premultiply(axisQuaternion);

scene.add(sphere);

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 300;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas").appendChild(renderer.domElement);

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
    sphere.quaternion.multiplyQuaternions(
      rotationQuaternion,
      sphere.quaternion
    );
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

function handleTouchMove(event) {
  var touch = event.touches[0];

  var deltaMove = {
    x: touch.clientX - previousMousePosition.x,
    y: touch.clientY - previousMousePosition.y,
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
    sphere.quaternion.multiplyQuaternions(
      rotationQuaternion,
      sphere.quaternion
    );
  }

  previousMousePosition = {
    x: touch.clientX,
    y: touch.clientY,
  };
}

function handleTouchStart(event) {
  var touch = event.touches[0];

  isRotating = true;
  previousMousePosition = {
    x: touch.clientX,
    y: touch.clientY,
  };
}

function handleTouchEnd(event) {
  isRotating = false;
}

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);

document.addEventListener("touchmove", handleTouchMove);
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchend", handleTouchEnd);

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function handleMouseWheel(event) {
  event.preventDefault();

  var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
  var zoomSpeed = 20.0; // Increase the zoom speed

  if (delta < 0) {
    camera.position.z += zoomSpeed;
  } else {
    camera.position.z -= zoomSpeed;
  }
}

document.addEventListener("mousewheel", handleMouseWheel);
document.addEventListener("DOMMouseScroll", handleMouseWheel);

// Initial rotation animation
var rotationSpeed = 0.005;
var autoRotate = true;

function rotateSphere() {
  if (autoRotate) {
    sphere.rotation.y += rotationSpeed;
  }
}

function stopRotation() {
  autoRotate = false;
}

function animate() {
  requestAnimationFrame(animate);

  rotateSphere();
  renderer.render(scene, camera);
}

animate();
