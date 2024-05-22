
const url = 'http://localhost:8000/knowhow/positions'

export async function getPositions(){
  const response = await fetch(url);
  const positions = await response.json();
  return positions;
}