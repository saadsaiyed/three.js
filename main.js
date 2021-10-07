import './style.css'
import { AxesHelper, BufferAttribute, DirectionalLight, DirectionalLightHelper, DoubleSide, FlatShading, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, SphereGeometry, SpotLight, SpotLightHelper, Vector3, WebGLRenderer } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//Initiate scene - START
    const world = {
        plane: {
            width: 400,
            height: 400,
            widthSegments: 50,
            heightSegments: 50
        },
        sphere: {
            radius: 15,
            widthSegments:  16,
            heightSegments: 8,
            position: new Vector3(0,0,0)
        },
        light: {
            x: 0,
            y: 0,
            z: 10,
            color: 0x55ff99,
            intensity: 2
        }
    }

    world.sphere.position.setY(-(world.plane.height/2 + world.sphere.radius));
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
        scene.add(plane);
        generatePlane();
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
            })
        );
        sphere.position.copy(world.sphere.position)
        generateSphere();
        scene.add(sphere);
    //Sphere - END

    
    //Lighting - START
        const pointLight = new PointLight(world.light.color, world.light.intensity, 100)
        pointLight.position.set(
            world.light.x,
            world.light.y,
            world.light.z
        );
        scene.add(pointLight);
        
        const directionalLightTop = new DirectionalLight( 0xFFFFFF, 1);
        scene.add( directionalLightTop );
        directionalLightTop.position.set(0, 10, 10);

        const tempLight1 = new DirectionalLight( 0xFFFFFF, 1);
        tempLight1.position.set(0, -10, -10);
        scene.add( tempLight1 );
        
        const tempLight2 = new DirectionalLight( 0xFFFFFF, 1);
        tempLight2.position.set(10, 0, -10);
        scene.add( tempLight2 );
        
        const tempLight3 = new DirectionalLight( 0xFFFFFF, 1);
        tempLight3.position.set(-10, 0, 10);
        scene.add( tempLight3 );
    //Lighting - END

    //Axis Helper - START
        // scene.add( new AxesHelper( 500 ) );
    //Axis Helper - END

    const mouse = {
        x: 0,
        y: 0
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
    new SphereGeometry(
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
                if ((Math.abs(array[i + 1]) == world.sphere.radius) || (i % 17 == 0) || ((i + 3) % 17 == 0) ) {
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
        frameSphere += 0.07;
        var {array, originalPosition, randomValues} = sphere.geometry.attributes.position
        for (let i = 0; i < array.length; i+=3) {
            if ((Math.abs(array[i + 1]) == world.sphere.radius)) {}
            else if ((i % (world.sphere.widthSegments+1) == 0) || ((i + 3) % (world.sphere.widthSegments+1) == 0)) {
                array[i] = originalPosition[i] + Math.cos(frameSphere + randomValues[0]) * 0.01
                array[i+1] = originalPosition[i+1] + Math.sin(frameSphere + randomValues[1]) * 0.01
                array[i+2] = originalPosition[i+2] + Math.sin(frameSphere + randomValues[2]) * 0.01
            }
            else {
                array[i] = originalPosition[i] + Math.cos(frameSphere + randomValues[i]) * 0.01
                array[i+1] = originalPosition[i+1] + Math.sin(frameSphere + randomValues[i]) * 0.01
                array[i+2] = originalPosition[i+2] + Math.sin(frameSphere + randomValues[i]) * 0.01
            }
        }
        sphere.geometry.attributes.position.needsUpdate = true;
    //Moving Sphere with individual vertices - END

    //Updating light position relative to mouse position
    pointLight.position.set(mouse.x , mouse.y, world.light.z);
    sphere.rotation.y += 0.005;

    controls.update()
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

animate();