import React, { useEffect, useState } from 'react';
import 'src/css/reset.scss';
import 'src/css/global.scss';
import Cone from './features/Cone/Cone';
import { CameraControls } from '@react-three/drei';
import { toRad } from './helpers/helpers';
import { Canvas } from '@react-three/fiber';
import MenuItem from './components/MenuItem/MenuItem';
import { TTriangulation } from './types/types';
import { fetchTriangulations } from './API/API';
import { Vector3 } from 'three';

function App() {
  const [height, setHeight] = useState(5);
  const [radius, setRadius] = useState(2);
  const [segments, setSegments] = useState(15);
  const [triangulation, setTriangulation] = useState<TTriangulation>([]);

  useEffect(() => {
    handleSend();
  }, []);

  const handleChangeHeight = (number: number) => {
    setHeight(number);
  };
  const handleChangeRadius = (number: number) => {
    setRadius(number);
  };
  const handleChangeSegments = (number: number) => {
    setSegments(number);
  };

  //Высчитываем дистанцию камеры на основе высоты конуса
  const cameraDistance = (triangulation[0]?.at(-1)?.z || 5) * 2;

  const handleSend = async () => {
    const triangles = await fetchTriangulations(height, radius, segments);
    setTriangulation(
      triangles.map((item) => {
        return [
          new Vector3(...item[0]),
          new Vector3(...item[1]),
          new Vector3(...item[2]),
        ];
      })
    );
  };

  return (
    <div className="App">
      <div className="menuSide">
        <MenuItem
          text={'Высота:'}
          onChange={handleChangeHeight}
          value={height}
        />
        <MenuItem
          text={'Радиус:'}
          onChange={handleChangeRadius}
          value={radius}
        />
        <MenuItem
          text={'Количество сегментов:'}
          onChange={handleChangeSegments}
          value={segments}
        />
        <button className={'menuSide_button'} onClick={handleSend}>
          Применить
        </button>
      </div>

      <div className="canvasSide">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 1, 1]} intensity={0.5} />
          <CameraControls
            distance={cameraDistance}
            azimuthAngle={toRad(160)}
            polarAngle={toRad(130)}
          />
          <Cone triangulation={triangulation} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
