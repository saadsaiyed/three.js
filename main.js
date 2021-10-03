import './style.css'
import { BufferAttribute, DoubleSide, FlatShading, Mesh, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, WebGLRenderer } from 'three';


//Initiate scene - START
    const world = {
        plane: {
            width: 400,
            height: 400,
            widthSegments: 50,
            heightSegments: 50
        },
        light: {
            x: 0,
            y: 0,
            z: 10,
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
        const pointLight = new PointLight(world.light.color, world.light.intensity, 100)
        pointLight.position.set(
            world.light.x,
            world.light.y,
            world.light.z
        );
        scene.add(pointLight);
    //Lighting - END

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

let frame = 0 
function animate() {
    //perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
    requestAnimationFrame(animate);
    frame += 0.01;

    //Moving plane with individual vertices - START
        const {array, originalPosition, randomValues} = plane.geometry.attributes.position
        for (let i = 0; i < array.length; i+=3) {
            array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01
            array[i+1] = originalPosition[i+1] + Math.sin(frame + randomValues[i]) * 0.01
        }
        plane.geometry.attributes.position.needsUpdate = true;
    //Moving plane with individual vertices - END

    //Updating light position relative to mouse position
    pointLight.position.set(mouse.x , mouse.y, world.light.z);

    renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

window.addEventListener('mousemove', (event) => {
    if (window.DeviceMotionEvent == undefined) {
        var threshold = 0.105;
        mouse.x = (event.clientX - (window.innerWidth / 2)) * threshold
        mouse.y = ((window.innerHeight / 2) - event.clientY) * threshold
    }
}, false);
window.addEventListener('devicemotion', (event) => {
    if (window.DeviceMotionEvent != undefined) {
        var x = 0, y = 0,
            vx = 0, vy = 0,
            ax = 0, ay = 0;

        window.ondevicemotion = function (e) {
            ax = event.accelerationIncludingGravity.x * 5;
            ay = event.accelerationIncludingGravity.y * 5;
            console.log(ax, ay);
        }
        // setInterval(function() {
        //     var landscapeOrientation = window.innerWidth / window.innerHeight > 1;
        //     if (landscapeOrientation) {
        //         vx = vx + ay;
        //         vy = vy + ax;
        //     } else {
        //         vy = vy - ay;
        //         vx = vx + ax;
        //     }
        //     vx = vx * 0.98;
        //     vy = vy * 0.98;
        //     y = parseInt(y + vy / 50);
        //     x = parseInt(x + vx / 50);

        //     boundingBoxCheck();

        //     pointLight.position.set(x, y, world.light.z);
        // }, 25);
    }
}, false);


animate();