import { TTriangulationResponse } from '../types/types';

export const fetchTriangulations = async (
  height: number,
  radius: number,
  segments: number
): Promise<TTriangulationResponse> => {
  try {
    const response = await fetch(
      `https://threedconebackend.onrender.com/triangulation?height=${height}&radius=${radius}&segments=${segments}`
    );
    return response.json();
  } catch (e: any) {
    throw new Error(e.message);
  }
};
