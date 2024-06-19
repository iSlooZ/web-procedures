
const url = 'https://backend-procedures-production.up.railway.app/knowhow/positions'

export async function getPositions(){
  const response = await fetch(url);
  const positions = await response.json();
  return positions;
}