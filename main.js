import './style.css'
import { AxesHelper, BufferAttribute, DirectionalLight, DirectionalLightHelper, DoubleSide, FlatShading, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, SphereGeometry, SpotLight, SpotLightHelper, Vector3, WebGLRenderer } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//Initiate scene - START
    const world = {
        sphere: {
            radius: 30,
            widthSegments:  16,
            heightSegments: 8,
            position: new Vector3(0,0,0)
        },
        light: {
            x: 0,
            y: 0,
            z: 50,
            color: 0x55ff99,
            intensity: 2
        }
    }

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
        generatePlane();
        scene.add(sphere);
    //Sphere - END

    //Lighting - START
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

    const axesHelper = new AxesHelper( 500 );
    scene.add( axesHelper );

//Initiate scene - END

function generatePlane() {
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
            colors.push(0, 0.19, 0.4)
        }
        sphere.geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));
    // Vertices Coloring - END
}

var frame = 0;
function animate() {
    //perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
    requestAnimationFrame(animate);
    frame += 0.07;
    //Moving sphere with individual vertices - START
        const {array, originalPosition, randomValues} = sphere.geometry.attributes.position
        for (let i = 0; i < array.length; i+=3) {

            if ((Math.abs(array[i + 1]) == world.sphere.radius)) {}
            else if ((i % 17 == 0) || ((i + 3) % 17 == 0)) {
                array[i] = originalPosition[i] + Math.cos(frame + randomValues[0]) * 0.01
                array[i+1] = originalPosition[i+1] + Math.sin(frame + randomValues[1]) * 0.01
                array[i+2] = originalPosition[i+2] + Math.sin(frame + randomValues[2]) * 0.01
            }
            else {
                array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01
                array[i+1] = originalPosition[i+1] + Math.sin(frame + randomValues[i]) * 0.01
                array[i+2] = originalPosition[i+2] + Math.sin(frame + randomValues[i]) * 0.01
            }
        }
        sphere.geometry.attributes.position.needsUpdate = true;
    //Moving sphere with individual vertices - END


    renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

animate();