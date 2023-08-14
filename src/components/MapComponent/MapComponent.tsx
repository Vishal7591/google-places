import "./map.scss";
import React, { useState } from "react";
import { updatePlaces } from "../../slice/placesSlice";
import { useDispatch } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  GeocodeResult,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Select } from "antd";

export default function Places() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NODE_ENV,
    id: "google-map-script",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapComponent />;
}

export const MapComponent: React.FC = () => {
  // const center = useMemo(() => ({ lat: 3.1472732, lng: 101.6995352 }), []);

  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState({ lat: 3.1472732, lng: 101.6995352 });

  return (
    <>
      <div className="places-container">
        <PlacesAutoComplete setSelected={setSelected} setCenter={setCenter} />
      </div>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
};

const PlacesAutoComplete = ({ setSelected, setCenter }: any) => {
  const dispatch = useDispatch<any>();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    const results: GeocodeResult[] = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setCenter({ lat, lng });
    const data = dispatch(updatePlaces(results));
    data.then((response: any) => {
      console.log("Response from store", response);
    });
  };

  const handleSearch = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <Select
        showSearch
        placeholder="Search an address..."
        optionFilterProp="children"
        onChange={(e) => setValue(e)}
        // onSearch={(e) => setValue(e)}
        onSearch={handleSearch}
        onSelect={handleSelect}
        className="places-input"
        disabled={!ready}
        value={value ? value : undefined}
        suffixIcon={null}
        notFoundContent={null}
        defaultActiveFirstOption={false}
        filterOption={false}
        options={
          status === "OK"
            ? (data || []).map((d) => {
                const {
                  place_id,
                  structured_formatting: { main_text, secondary_text },
                } = d;
                return {
                  value: `${main_text} ${secondary_text}`,
                  label: (
                    <div key={place_id}>
                      <strong>{main_text} </strong>
                      <small>{secondary_text}</small>
                    </div>
                  ),
                };
              })
            : []
        }
      />
    </div>
  );
};
