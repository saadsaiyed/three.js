import './style.css'
import './function.js'
import { AxesHelper, BufferAttribute, BufferGeometry, Clock, DirectionalLight, DirectionalLightHelper, DoubleSide, FlatShading, Float32BufferAttribute, Group, MathUtils, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Points, PointsMaterial, Scene, SphereGeometry, SpotLight, SpotLightHelper, Vector3, WebGLRenderer } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import gsap from 'gsap';
import * as dat from 'dat.gui'

const gui = new dat.GUI();

//Initiate scene - START
    const world = {
        plane: {
            width: 400,
            height: 600,
            widthSegments: 50,
            heightSegments: 50,
            position: new Vector3(0, 0, 0)
        },
        sphere: {
            radius: 30,
            widthSegments:  32,
            heightSegments: 16,
            position: new Vector3(0, 0, 0)
        },
        pointLight: {
            color: 0x55ff99,
            intensity: 2,
            position: new Vector3(0, 0, 10)
        }
    }    

    var clock = new Clock(true);

    const scene = new Scene();
    const vertexPlane = new Group();
    const vertexSphere = new Group();
    const particleScene = new Group();
    const rainScene = new Group();
    
    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 90;

    const renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    const controls = new OrbitControls( camera, renderer.domElement );

    //Plane - START
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
        world.plane.position.setY(80-world.plane.height / 2);
        plane.position.y = world.plane.position.y;
        vertexPlane.add(plane);
        generatePlane();
        
        var GUIPlane = gui.addFolder('Plane'); 
        GUIPlane.add(plane, 'visible')
        var GUIPlanePosition = GUIPlane.addFolder('Position'); 
            GUIPlanePosition.add(plane.position, 'x').min(world.plane.position.x - 100).max(world.plane.position.x + 100).step(0.1).name('x')
            GUIPlanePosition.add(plane.position, 'y').min(world.plane.position.y - 100).max(world.plane.position.y + 100).step(0.1).name('y')
            GUIPlanePosition.add(plane.position, 'z').min(world.plane.position.z - 100).max(world.plane.position.z + 100).step(0.1).name('z')
        var GUIPlaneGeometry = GUIPlane.addFolder('Geometry'); 
            GUIPlaneGeometry.add(world.plane, 'width').min(world.plane.width - 100).max(world.plane.width + 100).step(1).name('width').onChange(generatePlane)
            GUIPlaneGeometry.add(world.plane, 'height').min(world.plane.height - 100).max(world.plane.height + 100).step(1).name('height').onChange(generatePlane)
            GUIPlaneGeometry.add(world.plane, 'widthSegments').min(world.plane.widthSegments - 100).max(world.plane.widthSegments + 100).step(1).name('widthSegments').onChange(generatePlane)
            GUIPlaneGeometry.add(world.plane, 'heightSegments').min(world.plane.heightSegments - 100).max(world.plane.heightSegments + 100).step(1).name('heightSegments').onChange(generatePlane)
    //Plane - END
            
    //Sphere - START
        const sphere = new Mesh(
            new SphereGeometry(
                world.sphere.radius,
                world.sphere.widthSegments,
                world.sphere.heightSegments
            ),
            new MeshPhongMaterial({
                flatShading: FlatShading,
                vertexColors: true,
                side: DoubleSide
            })
        );
        world.sphere.position.set(sphere.position.x, -(world.plane.height + world.sphere.radius), world.sphere.radius);
        sphere.position.copy(world.sphere.position);
        sphere.rotation.z += Math.PI / 2;
        sphere.rotation.x += Math.PI;
        vertexSphere.add(sphere);
        generateSphere();
        
        var GUISphere = gui.addFolder('Sphere'); 
        GUISphere.add(sphere, 'visible')
        var GUISpherePosition = GUISphere.addFolder('Position'); 
            GUISpherePosition.add(sphere.position, 'x').min(world.sphere.position.x - 100).max(world.sphere.position.x + 100).step(0.1).name('x')
            GUISpherePosition.add(sphere.position, 'y').min(world.sphere.position.y - 100).max(world.sphere.position.y + 100).step(0.1).name('y')
            GUISpherePosition.add(sphere.position, 'z').min(world.sphere.position.z - 100).max(world.sphere.position.z + 100).step(0.1).name('z')
        var GUISphereGeometry = GUISphere.addFolder('Geometry'); 
            GUISphereGeometry.add(world.sphere, 'radius').min(world.sphere.radius - 100).max(world.sphere.radius + 100).step(1).name('radius').onChange(generateSphere)
            GUISphereGeometry.add(world.sphere, 'widthSegments').min(world.sphere.widthSegments - 100).max(world.sphere.widthSegments + 100).step(1).name('widthSegments').onChange(generateSphere)
            GUISphereGeometry.add(world.sphere, 'heightSegments').min(world.sphere.heightSegments - 100).max(world.sphere.heightSegments + 100).step(1).name('heightSegments').onChange(generateSphere)
    //Sphere - END

    //Particle - START
        let vertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = MathUtils.randFloatSpread( 2000 );
            const y = MathUtils.randFloatSpread( 2000 );
            const z = MathUtils.randFloatSpread( 2000 );
            vertices.push( x, y, z );
        }
        const particleGeometry = new BufferGeometry();
        const particleMaterial = new PointsMaterial( { color: 0x888888 } );
        
        particleGeometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

        const particle = new Points(particleGeometry, particleMaterial)
        particleScene.add(particle)
        
        var GUIParticles = gui.addFolder('Particles'); 
        GUIParticles.add(particle, 'visible')
        var GUIParticlesPosition = GUIParticles.addFolder('Position'); 
            GUIParticlesPosition.add(particle.position, 'x').min(-200).max(200).step(0.1).name('x')
            GUIParticlesPosition.add(particle.position, 'y').min(-200).max(200).step(0.1).name('y')
            GUIParticlesPosition.add(particle.position, 'z').min(-200).max(200).step(0.1).name('z')

    //Particle - END

    //Rain - START
        const rainVertices = [];
        for ( let i = 0; i < 10000; i ++ ) {
            const x = MathUtils.randFloatSpread( 2000 );
            const y = MathUtils.randFloatSpread( 2000 );
            const z = MathUtils.randFloatSpread( 2000 );
            rainVertices.push( x, y, z );
        }
        const rainGeometry = new BufferGeometry();
        
        rainGeometry.setAttribute( 'position', new Float32BufferAttribute( rainVertices, 3 ) );
        
        const points = new Points( rainGeometry, new PointsMaterial( { color: 0x888888 } ) );
        
        // scene.add( points );    
    //Rain - END

    //Lighting - START
        const pointLight = new PointLight(world.pointLight.color, world.pointLight.intensity, 100)
        pointLight.position.set(
            world.pointLight.position.x,
            world.pointLight.position.y,
            world.pointLight.position.z
        );
        vertexPlane.add(pointLight);
        
        const directionalLightTop = new DirectionalLight( 0xFFFFFF, 1);
        vertexSphere.add( directionalLightTop );
        directionalLightTop.position.set(0, 10, 10);
        directionalLightTop.intensity = 0;
        
        const tempLight1 = new DirectionalLight( 0xFFFFFF, 1);
        vertexSphere.add( tempLight1 );
        tempLight1.position.set(10, 10, 10);
        tempLight1.intensity = 0;

    //Lighting - END

    //Axis Helper - START
        // scene.add( new AxesHelper( 500 ) );
    //Axis Helper - END

    const mouse = {
        x: 0,
        y: 0
    }
    
    scene.add(vertexPlane, vertexSphere, particleScene, rainScene)

//Initiate scene - END

//GUI Settings - START
    // plane.visible = false
    // sphere.visible = false
    // particle.visible = false
    gui.__proto__.constructor.toggleHide()

    // GUIPlane.open();
    GUIPlanePosition.open();
    GUIPlaneGeometry.open();

    // GUISphere.open();
    GUISpherePosition.open();
    GUISphereGeometry.open();
//GUI Settings - END

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
                array[i + 2] = z + (Math.random() - 0.5) * 5
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

function generateSphere() {
    sphere.geometry.dispose();
    sphere.geometry = new SphereGeometry(
        world.sphere.radius,
        world.sphere.widthSegments,
        world.sphere.heightSegments
    )
    // Adding vertices - START
        const randomValues = [];
        const { array } = sphere.geometry.attributes.position;
        for (let i = 0; i < array.length; i++) {
            if (i % 3 == 0) {
                const x = array[i]        
                const y = array[i+1]        
                const z = array[i+2]        
                if ((Math.abs(array[i + 1]) == world.sphere.radius) || (i % (world.sphere.radius+1) == 0) || ((i + 3) % (world.sphere.radius+1) == 0) ) {
                }
                else {
                    array[i] = x + (Math.random() - 0.5) * 3
                    array[i + 1] = y + (Math.random() - 0.5) * 3;
                    array[i + 2] = z + (Math.random() - 0.5) * 3
                }
            }
            randomValues.push(Math.random() * Math.PI * 2)
        }
        sphere.geometry.attributes.position.originalPosition = sphere.geometry.attributes.position.array
        sphere.geometry.attributes.position.randomValues = randomValues
    // Adding vertices - END

    // Vertices Coloring - START
        const colors = []
        for (let i = 0; i < sphere.geometry.attributes.position.count; i++) {
            colors.push(0.4, 0.19, 0)
        }
        sphere.geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));

    // Vertices Coloring - END
}

// clock;
let framePlane = 0, frameSphere = 0
function animate() {
    //perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
    requestAnimationFrame(animate);
    
    //Moving plane with individual vertices - START
        framePlane += 0.01;
        var {array, originalPosition, randomValues} = plane.geometry.attributes.position
        for (let i = 0; i < array.length; i+=3) {
            array[i] = originalPosition[i] + Math.cos(framePlane + randomValues[i]) * 0.01
            array[i+1] = originalPosition[i+1] + Math.sin(framePlane + randomValues[i]) * 0.01
        }
        plane.geometry.attributes.position.needsUpdate = true;
    //Moving plane with individual vertices - END

    //Moving Sphere with individual vertices - START
        frameSphere += 0.1;
        var {array, originalPosition, randomValues} = sphere.geometry.attributes.position
        for (let i = 0; i < array.length; i+=3) {
            if ((Math.abs(array[i + 1]) == world.sphere.radius)) {}
            else if ((i % (world.sphere.widthSegments+1) == 0) || ((i + 3) % (world.sphere.widthSegments+1) == 0)) {
                array[i] = originalPosition[i] + Math.cos(frameSphere + randomValues[0]) * 0.05
                array[i+1] = originalPosition[i+1] + Math.sin(frameSphere + randomValues[1]) * 0.05
                array[i+2] = originalPosition[i+2] + Math.sin(frameSphere + randomValues[2]) * 0.05
            }
            else {
                array[i] = originalPosition[i] + Math.cos(frameSphere + randomValues[i]) * 0.05
                array[i+1] = originalPosition[i+1] + Math.sin(frameSphere + randomValues[i]) * 0.05
                array[i+2] = originalPosition[i+2] + Math.sin(frameSphere + randomValues[i]) * 0.05
            }
        }
        sphere.geometry.attributes.position.needsUpdate = true;
    //Moving Sphere with individual vertices - END

    //Animating Particles - START
        particle.material.size = (Math.sin(clock.getElapsedTime()) ) - 0.5
        
        particle.rotation.x = -mouse.y * (clock.getElapsedTime() * 0.00008)
        particle.rotation.y = mouse.x * (clock.getElapsedTime() * 0.00008)
    //Animating Particles - END

    //Updating light position relative to mouse position
    pointLight.position.set(mouse.x , mouse.y, world.pointLight.z);
    sphere.rotation.x -= 0.004;

    // controls.update()
    renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

window.addEventListener('mousemove', (event) => {
    var threshold = 0.105;
    mouse.x = (event.clientX - (window.innerWidth / 2)) * threshold
    mouse.y = ((window.innerHeight / 2) - event.clientY) * threshold
}, false);

document.getElementById("portfolio").addEventListener('click', (event) => {
    let tempCameraZoomValue = 20;
    gsap.to(camera.position, {
        y: sphere.position.y,
        duration: 6,
        ease: "power4",
        onStart: () => {
            gsap.to(camera.position, {
                z: camera.position.z - tempCameraZoomValue, duration: 5
            });
            gsap.to(directionalLightTop, { intensity: 1, duration: 20 });
            gsap.to(tempLight1, { intensity: 1, duration: 20 });
            gsap.to(particleScene.position, { y: sphere.position.y, duration: 5 });
        },
        onComplete: () => {
            gsap.to(camera.position, {
                z: camera.position.z + tempCameraZoomValue,
                duration: 5,
            });
        },
    });

    // document.querySelector("#intro").classList.add("hidden");
    // document.querySelector("#work").classList.remove("hidden");
    document.querySelector("#intro").classList.toggle("hidden");
    document.querySelector("#work").classList.toggle("hidden");
});

animate();