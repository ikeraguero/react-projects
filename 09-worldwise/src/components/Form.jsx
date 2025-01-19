// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import Button from "./Button";
import useUrlLocation from "../hooks/useUrlLocation";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const { createCity } = useCities();
  const [cityName, setCityName] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState();
  const [countryEmoji, setCountryEmoji] = useState();
  const [country, setCountry] = useState();
  const [mapLat, mapLng] = useUrlLocation();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(
    function () {
      if (!mapLat || !mapLng) return;

      async function fetchCityName() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );

          const data = await res.json();
          if (!data.countryCode)
            throw new Error("Please select a valid territory");

          setCityName(data.city || data.location || "");
          setCountryEmoji(convertToEmoji(data.countryCode));
          setCountry(data.countryName);
          setIsLoadingGeocoding(false);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityName();
    },
    [mapLat, mapLng]
  );

  async function submitForm(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji: countryEmoji,
      date,
      notes,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };

    await createCity(newCity);
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!mapLat || !mapLng)
    return <Message message={"Start by selecting a location!"} />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form} onSubmit={(e) => submitForm(e)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{countryEmoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
