import React from 'react';
import Triangle from '../../components/Triangle/Triangle';
import { Euler } from 'three';
import { toRad } from '../../helpers/helpers';
import { TTriangulation } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

type TConeProps = {
  triangulation: TTriangulation;
};

const Cone: React.FC<TConeProps> = ({ triangulation }) => {
  return (
    <>
      {triangulation.map((vertices) => {
        return (
          <Triangle
            rotation={new Euler(0, toRad(180), 0)}
            vertices={vertices}
            key={uuidv4()}
          />
        );
      })}
    </>
  );
};

export default React.memo(Cone);
