import './style.scss'
import * as THREE from 'three'

import { gsap } from 'gsap'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const textureLoader = new THREE.TextureLoader()

const canvas = document.querySelector('canvas.webgl')


import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import fragmentShaderW from './shaders/fragmentW.glsl'

let checkMixers = []

let playing = false

document.querySelector('#titular').addEventListener('click', (e) => {
  console.log(check)

  if(!playing){

    playing = true
  let filtered = check.filter( x=> x.egg.material !== invisibleMaterial )
  var flock = new THREE.AnimationObjectGroup()


  for (let i=0; i<filtered.length; i++) {
   task(i);
}

function task(i) {
    setTimeout(function() {
        // Add tasks to do
        if(  filtered[i].egg.material !== invisibleMaterial){
        let  mixer = new THREE.AnimationMixer(filtered[i].animate.scene)
       checkMixers.push(mixer)
        filtered[i].animate.animations.map(x => {
          let action = mixer.clipAction(x)
          action.clampWhenFinished = true
          action.setLoop(THREE.LoopOnce, 1)
          action.play()
          var audio = new Audio('egg.mp3');
          audio.play();
        })
          filtered[i].egg.material= invisibleMaterial
        }
    }, 2000 * i);
}


  // birds.map(x=> {
  //
  //   // gsap.to(  x.position, { duration: 3, y: 30, delay: 1 })
  //   //
  //   //
  //   //   gsap.to(  x.scale, { duration: 3, x: 3, delay: 1 })
  //   //     gsap.to(  x.scale, { duration: 3, y: 3, delay: 1 })
  //   //       gsap.to(  x.scale, { duration: 3, z: 3, delay: 1 })
  //
  //
  //
  // })


}


})


const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xffffff )
const loadingBarElement = document.querySelector('.loading-bar')
const loadingBarText = document.querySelector('.loading-bar-text')
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () =>{
    window.setTimeout(() =>{
      gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

      loadingBarElement.classList.add('ended')
      loadingBarElement.style.transform = ''

      loadingBarText.classList.add('fade-out')
      window.setTimeout(() =>{
        overlay.material.depthWrite = false

      }, 520)
    }, 500)
  },


  // Progress
  (itemUrl, itemsLoaded, itemsTotal) =>{
    const progressRatio = itemsLoaded / itemsTotal
    loadingBarElement.style.transform = `scaleX(${progressRatio})`


  }
)

const gtlfLoader = new GLTFLoader(loadingManager)

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  depthWrite: true,
  uniforms:
    {
      uAlpha: { value: 1 }
    },
  transparent: true,
  vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
  fragmentShader: `
  uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)


const invisibleMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0, depthWrite: false})




let materials = []

let objectsToIntersect = []

let objectsToAnimate = []

let mixers = []

let birds = []

let check = []

let sceneGroup, mixer, gltfVar, egg, eggT, bird, floor, segments
function createFlower(x, z, scaler){


  gtlfLoader.load(
    'hatch2.glb',
    (gltf) => {
      // console.log(gltf)
      gltfVar = gltf

      gltf.scene.scale.set(scaler,scaler,scaler)
      sceneGroup = gltf.scene
      sceneGroup.needsUpdate = true
      sceneGroup.position.x = x
      sceneGroup.position.z = z
        sceneGroup.position.y = scaler

        sceneGroup.rotation.y += Math.random()* 18


      scene.add(sceneGroup)
      segments = []

      egg = gltf.scene.children.find((child) => {
        return child.name === 'egg'
      })

      bird = gltf.scene.children.find((child) => {
        return child.name === 'bird'
      })

      birds.push(bird)

      eggT = gltf.scene.children.find((child) => {
        return child.name === 'EggT'
      })

    // console.log(egg.material)

    egg.material.depthWrite = true



      scene.traverse( function( object ) {
        // console.log(object)
        if (object.material){
          object.material.skinning = true
          object.material.needsUpdate = true
          object.geometry.verticesNeedUpdate = true
        }
        if (object.material && object.material.name.includes('3')){

          // object.material.color.setRGB( Math.random(), Math.random(), Math.random())
          object.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            depthWrite: true,
            clipShadows: true,
            wireframe: false,
            side: THREE.DoubleSide,
            uniforms: {
              uFrequency: {
                value: new THREE.Vector2(10, 5)
              },
              uTime: {
                value: 0
              },

              uResolution: { type: 'v2', value: new THREE.Vector2() },
              uPosition: {
                value: {
                  x: 0
                }
              },
              uRotation: {
                value: 0



              },
              uValueA: {
                value: Math.random()
              },
              uValueB: {
                value: Math.random()
              },
              uValueC: {
                value: Math.random()
              },
              uValueD: {
                value: Math.random()
              }
            }
          })
          object.material.morphTargets = true;
            materials.push(object.material)

        }


      if (object.material && object.material.name.includes('1')){
          object.material.color.setRGB( Math.random(), Math.random(), Math.random())

      }


      if (object.material && object.material.name.includes('2')){

        // object.material.color.setRGB( Math.random(), Math.random(), Math.random())
        object.material = new THREE.ShaderMaterial({
          vertexShader: vertexShader,
          fragmentShader: fragmentShaderW,
          transparent: true,
          depthWrite: true,
          clipShadows: true,
          wireframe: false,
          side: THREE.DoubleSide,
          uniforms: {
            uFrequency: {
              value: new THREE.Vector2(10, 5)
            },
            uTime: {
              value: 0
            },

            uResolution: { type: 'v2', value: new THREE.Vector2() },
            uPosition: {
              value: {
                x: 0
              }
            },
            uRotation: {
              value: 0



            },
            uValueA: {
              value: Math.random()
            },
            uValueB: {
              value: Math.random()
            },
            uValueC: {
              value: Math.random()
            },
            uValueD: {
              value: Math.random()
            }
          }
        })
        object.material.morphTargets = true;
          materials.push(object.material)
      }





  } )

  objectsToIntersect.push(egg)


  objectsToAnimate.push(gltfVar)


  check.push({
    egg: egg,
    animate: gltfVar
  })

    }
  )
}

const image_radius = 1;
const number_of_images = 11;
const radius = 40;
const radian_interval = (2.0 * Math.PI) / number_of_images;
const center_of_wheel = {
                            x: 0,
                            y: 0
                        }

for(let i =1; i < 12; i ++){
    createFlower(   center_of_wheel.x + (Math.cos(radian_interval * i) * radius),
            center_of_wheel.y + (Math.sin(radian_interval * i) * radius), 3)

            createFlower(   center_of_wheel.x + (Math.cos(radian_interval * i) * (radius +20)),
                    center_of_wheel.y + (Math.sin(radian_interval * i) * (radius+20)), 2)

                    createFlower(   center_of_wheel.x + (Math.cos(radian_interval * i) * (radius +33)),
                            center_of_wheel.y + (Math.sin(radian_interval * i) * (radius+33)), 1)
}


// for(let i =1; i < 12; i ++){
//
// }
//
// for(let i =1; i < 12; i ++){
//
// }
//




createFlower(0, 0, 6)

document.querySelector('.webgl').addEventListener( 'click', onClick, false )
let started = false
function onClick(e) {

  // console.log( e)
  // event.preventDefault()
  // console.log(mixer)
  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera )

    // console.log( mouse.x)



    var intersects = raycaster.intersectObjects( objectsToIntersect );
    // console.log( objectsToIntersec)
    for ( var i = 0; i < intersects.length; i++ ) {
        // console.log( intersects[ i ] );



        // console.log(mixers)
       // console.log( intersects[0].object.parent.uuid)
       // console.log(objectsToAnimate.filter(x => x.parent.uuid === intersects[0].object.parent.uuid))
       // objectsToAnimate.filter(x => x.parent.uuid === intersects[0].object.parent.uuid)[0]

       const action = objectsToAnimate.filter(x => x.scene.uuid === intersects[0].object.parent.uuid)[0]

       if(action.animations[0] && intersects[0].object.material !== invisibleMaterial){
         var audio2 = new Audio('screech.mp3');
         audio2.play();
     mixer = new THREE.AnimationMixer(action.scene)
     console.log(mixer)
     gltfVar.animations.map(x => {
       const action = mixer.clipAction(x)
       action.clampWhenFinished = true
       action.setLoop(THREE.LoopOnce, 1)
       action.play()
     })
       intersects[0].object.material= invisibleMaterial

   }




    }


}





const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>{



  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2 ))


})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(
   -0.000003421258218025903,
 230.999999999997427,
 -0.0000020724362971103135

)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2 - 0.1
//controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0x0000000, 1)
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const light = new THREE.AmbientLight( 0x404040 )
scene.add( light )
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 )
scene.add( directionalLight )





const clock = new THREE.Clock()

const tick = () =>{
let delta = clock.getDelta()
  if(checkMixers){
    // console.log(checkMixers)
    checkMixers.map(x=>{
      x.update(delta)

    })
  }

  // mixers.map(x => {
  //
  //   x.update(clock.getDelta())
  // })
  if ( mixer ) mixer.update( delta )

  const elapsedTime = clock.getElapsedTime()



  // Update controls
  controls.update()





  materials.map(x=> {
    x.uniforms.uTime.value = elapsedTime
  })


  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
