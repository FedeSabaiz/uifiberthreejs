import React, {useRef} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useUpdate } from 'react-three-fiber';

function LinePath(props) {
	const ref = useRef();
	useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += .01));
	const vertices = React.useMemo(() => {
		const path = new THREE.Path()
		const firstPoint = props.vertices[0]

		path.moveTo(firstPoint.x, firstPoint.y)
		props.vertices.forEach(point => path.lineTo(point.x, point.y))
		path.closePath()

		return path.getPoints()
	}, [props.vertices]);

	const refer = useUpdate(geometry => {
    geometry.setFromPoints(vertices)
  }, [])

  return (
    <line 
		onClick={e => console.log('click')}
		onPointerOver={e => console.log('hover')}
		onPointerOut={e => console.log('unhover')}
		ref={ref}
		>
      <bufferGeometry attach="geometry" ref={refer} />
      <lineBasicMaterial attach="material" color="black" />
    </line>
  )
}

function Thing() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.z += 0.01));
  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}>
      <sphereGeometry attach="geometry" args={[2, 32, 32]} />
      <meshPhongMaterial attach="material" />
    </mesh>
  )
}

function App() {
	let x = 0;
	x++;
    return (
		<>
      <h1 style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        zIndex: 999,
      }} >Hola</h1>
			<Canvas>
        		<pointLight intensity={ .5 } position={[1, 2, 3]}/>
				<Thing />
				<LinePath vertices={[new THREE.Vector3(x, 0, 0), new THREE.Vector3(2, 2, 0)]}/>
			</Canvas>
		</>
    );
}

export default App;
