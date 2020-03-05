var scene = new THREE.Scene();
    //create a camera(different types) 4 properties go inside of ()
    var camera = new THREE.PerspectiveCamera(
      75, //for the field of view
      window.innerWidth / window.innerHeight,//aspect retio
      0.1,
      1000
    )
    camera.position.z = 5;
    //set up a renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    //set a clear color on a renderer #e5e5e5 is light grey
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth, window.innerHeight);
    //append child the renderer DOM element
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    })
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    //define some 3D element form material 4 lines down below is what we need to create a new item
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({ color: 0xF7F7F7 });
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.x = 2; //not in middle anymore
    // mesh.position.y = 2;
    // mesh.position.a = -2;
    //shorthand mesh.position.set(2,2,-2)
    // mesh.rotation.set(45, 0, 0);
    // mesh.scale.set(1, 2, 1);
    // scene.add(mesh);
    //second item, just copy and paste 4 above
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.y = 2;
    // scene.add(mesh);
    meshX = -10;
    for (var i = 0; i < 15; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10
      scene.add(mesh);
      meshX += 1;
    }
    var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
    light.position.set(0, 0, 0);
    scene.add(light);
    var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
    light.position.set(0, 0, 25);
    scene.add(light);
    // renderer.render(scene, camera);
    //this function makes the item responsive to be in the middle
    var render = function () {
      requestAnimationFrame(render);
      //*** makes the cube move
      // mesh.rotation.x += 0.03;
      // mesh.rotation.y += 0.01;
      // mesh.rotation.z += 0.06;
      // mesh.scale.x -= 0.01;
      renderer.render(scene, camera);
    }
    function onMouseMove(event) {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      //this will return an array where the mouse is intersected
      var intersects = raycaster.intersectObjects(scene.children, true);
      for (var i = 0; i < intersects.length; i++) {
        // intersects[i].object.material.color.set(0xff0000);
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.rotation, .5, { x: Math.PI * .5, ease: Expo.easeOut }, "=-1.5");
      }
      // renderer.render(scene, camera);
    }
    render();
    // this.tl = new TimelineMax().delay(.3);
    //change this to user interaction 
    // this.tl = new TimelineMax({ paused: true });
    // //square after 0.3 ease out to rectangle
    // this.tl.to(this.mesh.scale, 1, { x: 2, ease: Expo.easeOut });
    // this.tl.to(this.mesh.scale, .5, { x: .5, ease: Expo.easeOut });
    // this.tl.to(this.mesh.position, .5, { x: 2, ease: Expo.easeOut });
    // //it's going to happen 1.5 sec before it normally would
    // this.tl.to(this.mesh.rotation, .5, { x: Math.PI * .5, ease: Expo.easeOut }, "=-1.5");
    //this is a listener of TimelinMax, click to make it move, paused initially
    //this is when we click anywhere on the screen
    // document.body.addEventListener('click', () => {
    //     this.tl.play();
    // });
    //what is we want to click a specific place on screen, we need to create **raycaster and mouse
    window.addEventListener('mousemove', onMouseMove);
