import { useState } from 'react';
import './TripList.css';
import { useFetch } from '../hooks/useFetch';

export default function TripList() {
  // const [trips, setTrips] = useState([]);
  const [url, setUrl] = useState('http://localhost:3000/trips');

  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => setTrips(json));
  // }, [url]);

  // const fetchTrips = useCallback(async () => {
  //   const response = await fetch(url);
  //   const json = await response.json();
  //   setTrips(json);
  // }, [url]);

  // useEffect(() => {
  //   fetchTrips();
  // }, [fetchTrips]);

  // Fetch the data from useFetch hook & destructure object to get data
  const { data: trips, isPending, error } = useFetch(url);

  return (
    <div className="trip-list">
      <h2>Trip List</h2>

      {isPending && <div>Loading Trips...</div>}
      {error && <div>{error}</div>}
      <div className="filters">
        <button
          onClick={() => {
            setUrl('http://localhost:3000/trips');
          }}
        >
          All Trips
        </button>
        <button
          onClick={() => {
            setUrl('http://localhost:3000/trips?loc=europe');
          }}
        >
          Europe
        </button>
        <button
          onClick={() => {
            setUrl('http://localhost:3000/trips?loc=america');
          }}
        >
          America
        </button>
      </div>

      <ul>
        {/* Map through the data object when trips data is not null */}
        {trips &&
          trips.map((trip, index) => (
            <li key={trip.id}>
              <h3>
                {trip.title} - {trip.price}
              </h3>
            </li>
          ))}
      </ul>
    </div>
  );
}
