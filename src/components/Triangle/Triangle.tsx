import React, { useMemo } from 'react';
import { BufferGeometry, DoubleSide, Euler, Vector3 } from 'three';

type TTriangleProps = {
  rotation: Euler;
  vertices: [Vector3, Vector3, Vector3];
};

const Triangle: React.FC<TTriangleProps> = ({ rotation, vertices }) => {
  const geometry = useMemo(
    () => new BufferGeometry().setFromPoints(vertices),
    []
  );

  return (
    <>
      <mesh position={[0, 0, 0]} rotation={rotation} geometry={geometry}>
        <meshStandardMaterial
          color={'white'}
          side={DoubleSide}
          flatShading={true}
        />
      </mesh>
    </>
  );
};

export default Triangle;
