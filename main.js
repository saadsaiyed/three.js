import './style.css'
import gsap from 'gsap'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { BufferAttribute, DirectionalLight, DoubleSide, FlatShading, Mesh, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, WebGLRenderer } from 'three';
import * as DAT from "dat.gui";


//Initiate scene - START
    // Adding GUI editor - START
        const gui = new DAT.GUI()
        const world = {
            plane: {
                width: 400,
                height: 400,
                widthSegments: 50,
                heightSegments: 50
            }
        }
    // Adding GUI editor - END

    gui.add(world.plane, 'width', 1, 500).onChange(generatePlane)
    gui.add(world.plane, 'height', 1, 500).onChange(generatePlane)
    gui.add(world.plane, 'widthSegments', 1, 100).onChange(generatePlane)
    gui.add(world.plane, 'heightSegments', 1, 100).onChange(generatePlane)


    const raycaster = new Raycaster()

    const scene = new Scene();

    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 70;

    const renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    new OrbitControls(camera, renderer.domElement);

    const plane = new Mesh(
        new PlaneGeometry(
            world.plane.width,
            world.plane.height,
            world.plane.widthSegments,
            world.plane.heightSegments
        ),    
        new MeshPhongMaterial({
            side: DoubleSide,
            flatShading: FlatShading,
            vertexColors: true
        })
    );
    scene.add(plane);
    generatePlane();
    
    //Lighting - START
        const light = new DirectionalLight(0xFFFFFF, 1)
        light.position.set(0, 5, 5)
        scene.add(light);
        
        const backLight = new DirectionalLight(0xFFFFFF, 1)
        backLight.position.set(0, 0, -5)
        scene.add(backLight);
    //Lighting - END

    const mouse = {
        x: undefined,
        y: undefined
    }

//Initiate scene - END

function generatePlane() {
    plane.geometry.dispose();
    plane.geometry = new PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments
    )
    
    // Adding vertices - START
        const randomValues = [];
        const { array } = plane.geometry.attributes.position;
        for (let i = 0; i < array.length; i++) {
            if (i % 3 == 0) {
                const x = array[i]        
                const y = array[i+1]        
                const z = array[i+2]        
                
                array[i] = x + (Math.random() - 0.5) * 3
                array[i+1] = y + (Math.random() - 0.5) * 3
                array[i + 2] = z +(Math.random() - 0.5) * 5
            }
            
            randomValues.push(Math.random() * Math.PI * 2)
        }
        plane.geometry.attributes.position.originalPosition = plane.geometry.attributes.position.array
        plane.geometry.attributes.position.randomValues = randomValues
    // Adding vertices - END

    // Vertices Coloring - START
        const colors = []
        for (let i = 0; i < plane.geometry.attributes.position.count; i++) {
            colors.push(0, 0.19, 0.4)
        }
        plane.geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));
    // Vertices Coloring - END
}
let frame = 0 
function animate() {
    //perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
    requestAnimationFrame(animate);
    frame += 0.01;
    renderer.render(scene, camera)
    raycaster.setFromCamera(mouse, camera)

    //Moving plane with individual vertices - START
        const {array, originalPosition, randomValues} = plane.geometry.attributes.position
        for (let i = 0; i < array.length; i+=3) {
            array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01
            array[i+1] = originalPosition[i+1] + Math.sin(frame + randomValues[i]) * 0.01
        }
        plane.geometry.attributes.position.needsUpdate = true;
    //Moving plane with individual vertices - END

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

        const initialColor = { r: 0, g: 0.19, b: 0.4 }
        const hoverColor = { r: 0.1, g: 0.5, b: 1 }
      
    
        gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            duration: 1,
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
                color.needsUpdate = true
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