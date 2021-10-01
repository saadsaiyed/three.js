import './style.css'
import gsap from 'gsap'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { BufferAttribute, DoubleSide, FlatShading, PlaneGeometry } from 'three';
import * as DAT from "dat.gui";


//Initiate scene - START
    const raycaster = new THREE.Raycaster()

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    new OrbitControls(camera, renderer.domElement);

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 10, 10),
        new THREE.MeshPhongMaterial({
            side: DoubleSide,
            flatShading: FlatShading,
            vertexColors: true
        })
    );
    plane.rotation.x -= 0.3;
    scene.add(plane);

    const { array } = plane.geometry.attributes.position;
    for (let i = 0; i < array.length; i+=3) {
        const x = array[i]        
        const y = array[i+1]        
        const z = array[i+2]        

        array[i+2] = z + Math.random()
    }
    var initialColor = {r: 0, g: 0.19, b: 0.4}
    var hoverColor = {r: 0.1, g: 0.5, b: 1}
    
    const colors = [];
    for (let i = 0; i < plane.geometry.attributes.position.count; i++) {
        colors.push(initialColor.r, initialColor.g, initialColor.b);
    }
    plane.geometry.setAttribute(
        'color',
        new BufferAttribute(new Float32Array(colors), 3)
    );

    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(0, 0, 5)
    scene.add(light);
    
    const backLight = new THREE.DirectionalLight(0xFFFFFF, 1)
    backLight.position.set(0, 0, -5)
    scene.add(backLight);
    

    const mouse = {
        x: undefined,
        y: undefined
    }

//Initiate scene - START

const gui = new DAT.GUI()
const world = {
    plane: {
        width: 5,
        height: 5,
        widthSegments: 10,
        heightSegments: 10
    }
}
gui.add(world.plane, 'width', 1, 10).onChange(generatePlane)
gui.add(world.plane, 'height', 1, 10).onChange(generatePlane)
gui.add(world.plane, 'widthSegments', 1, 30).onChange(generatePlane)
gui.add(world.plane, 'heightSegments', 1, 30).onChange(generatePlane)

function generatePlane() {
    plane.geometry.dispose();
    plane.geometry = new PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments
    )
    
    const { array } = plane.geometry.attributes.position;
    for (let i = 0; i < array.length; i+=3) {
        const x = array[i]        
        const y = array[i+1]        
        const z = array[i+2]        

        array[i+2] = z + Math.random()
    }
    for (let i = 0; i < plane.geometry.attributes.position.count; i++) {
        colors.push(initialColor.r, initialColor.g, initialColor.b);
    }
    plane.geometry.setAttribute(
        'color',
        new BufferAttribute(new Float32Array(colors), 3)
    );
}

function animate() {
    //perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
    requestAnimationFrame(animate);

    renderer.render(scene, camera)
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(plane)
    if (intersects.length > 0) {
        const { color } = intersects[0].object.geometry.attributes;

        color.setX(intersects[0].face.a, 0.1)
        color.setY(intersects[0].face.a, 0.5)
        color.setZ(intersects[0].face.a, 1)
        
        color.setX(intersects[0].face.b, 0.1)
        color.setY(intersects[0].face.b, 0.5)
        color.setZ(intersects[0].face.b, 1)

        color.setX(intersects[0].face.c, 0.1)
        color.setY(intersects[0].face.c, 0.5)
        color.setZ(intersects[0].face.c, 1)

        intersects[0].object.geometry.attributes.color.needsUpdate = true;

        hoverColor = {r: 0.1, g: 0.5, b: 1}
    
        gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            onUpdate: () => {
                color.setX(intersects[0].face.a, hoverColor.r)
                color.setY(intersects[0].face.a, hoverColor.g)
                color.setZ(intersects[0].face.a, hoverColor.b)
                
                color.setX(intersects[0].face.b, hoverColor.r)
                color.setY(intersects[0].face.b, hoverColor.g)
                color.setZ(intersects[0].face.b, hoverColor.b)
        
                color.setX(intersects[0].face.c, hoverColor.r)
                color.setY(intersects[0].face.c, hoverColor.g)
                color.setZ(intersects[0].face.c, hoverColor.b)
                
                color.needsUpdate = true;
            }
        })
    }
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = - (event.clientY / innerHeight) * 2 + 1
}, false);

animate();