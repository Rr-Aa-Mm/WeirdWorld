import { PerspectiveCamera, Scene, WebGLRenderer, SphereGeometry, TextureLoader, MeshBasicMaterial, Mesh } from 'https://threejs.org/build/three.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

// Create a scene, camera, and renderer
var scene = new Scene();
var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new WebGLRenderer();

// Get the sphere container
var container = document.getElementById('sphere-container');

// Set the size of the renderer to match the size of the container
renderer.setSize(container.clientWidth, container.clientHeight);

// Append the renderer to the sphere container
container.appendChild(renderer.domElement);

// Create a sphere geometry
var geometry = new SphereGeometry(1, 32, 32);

// Load the image
var textureLoader = new TextureLoader();
textureLoader.load('./img/maps.jpg', function(texture) {
    // Create a material with the image as its texture
    var material = new MeshBasicMaterial({ map: texture });

    // Create a mesh with the sphere geometry and image material
    var sphere = new Mesh(geometry, material);

    // Add the sphere to the scene
    scene.add(sphere);

    // Position the camera
    camera.position.z = 2;

    // Add controls to allow the user to rotate the sphere
    var controls = new OrbitControls(camera, renderer.domElement);

    // Render the scene
    var animate = function() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
});
