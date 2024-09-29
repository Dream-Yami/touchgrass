const MapComponent = ({ showScorePopup }) => {
    const [position, setPosition] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                const { latitude, longitude } = location.coords;
                setPosition([latitude, longitude]);
            },
            (error) => {
                console.error("Error getting the user's location: ", error);
                setPosition([39.25, -76.713]); // Default position
            }
        );

        fetch("https://hackumbc2024.onrender.com/api/get-environment-data")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const markerData = data.map(item => ({
                    lat: item.latitude,
                    lng: item.longitude,
                    score: item.score,
                    image: item.image_data
                }));
                setMarkers(markerData);
            })
            .catch((error) => console.error("Error fetching marker data:", error));
    }, []);

    if (!position) {
        return <p>Loading...</p>;
    }

    return (
        <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]} eventHandlers={{
                    click: () => {
                        showScorePopup({ lat: marker.lat, lng: marker.lng }, [marker.score], marker.image);
                    },
                }}>
                    <Popup>
                        <div>
                            <strong>Score: {marker.score}</strong><br />
                            <img src={marker.image} alt="Location" style={{ width: '100px', height: 'auto' }} />
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
