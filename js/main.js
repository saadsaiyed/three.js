let scene, camera, renderer, cube;
function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry( 1.5, 9.6, 9.6 );
    const texture = new THREE.TextureLoader().load('textures/Carbon.png');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
}

function animate() {
    //perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
    requestAnimationFrame(animate);

    document.onmousemove = function (event) {
        var eventDoc, doc, body;
        var threshold = 0.003;
        
        event = event || window.event; // IE-ism
        
        // console.log("height = " + (window.innerHeight) + ", width = " + (window.innerWidth));
        var mousePosX = event.clientX - (window.innerWidth / 2);
        var mousePosY = (event.clientY - (window.innerHeight / 2)) * -1;

        // console.log("x=" + mousePosX + ", y=" + mousePosY);
        
        var cubePosX = cube.position.x;
        var cubePosY = cube.position.y;
        
        // console.log("cubeX=" + ((mousePosX - cubePosX) * threshold) + ", cubeY=" + ((mousePosY - cubePosY) * threshold));
        
        cube.position.x = ((mousePosX - cubePosX) * threshold);
        cube.position.y = ((mousePosY - cubePosY) * threshold);

        // console.log("CUBE X =" + cube.position.x + ",CUBE Y=" + cube.position.y); 
    };

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

init();
animate();