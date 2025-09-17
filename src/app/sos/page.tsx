"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";

const ambulanceTypes = [
  "Basic Ambulance",
  "ICU Ambulance",
  "Mortuary Ambulance",
  "Oxygen Ambulance",
];

const SosPage: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [mobile, setMobile] = useState("");
  const [ambulanceType, setAmbulanceType] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lon: longitude });

          // Simple reverse geocoding using OpenStreetMap
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            setAddress(data.display_name || "Address not found");
          } catch (_err) {
            setAddress("Unable to fetch address");
          }
          setLoading(false);
          setConfirmOpen(true);
        },
        (_err) => {
          alert("Location access is required for SOS!");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const handleConfirm = () => {
    setConfirmOpen(false);
    setFormOpen(true);
  };

  const handleSubmit = () => {
    alert(
      `🚑 SOS SENT!\nMobile: ${mobile}\nAmbulance: ${ambulanceType}\nLocation: ${coords?.lat}, ${coords?.lon}\nAddress: ${address}`
    );
    setFormOpen(false);
  };

  return (
    <div className="p-4">
      <Typography variant="h5" gutterBottom>
        SOS Page
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : coords ? (
        <div>
          <Typography variant="body1">
            <strong>Latitude:</strong> {coords.lat}
          </Typography>
          <Typography variant="body1">
            <strong>Longitude:</strong> {coords.lon}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {address}
          </Typography>
        </div>
      ) : (
        <Typography color="error">Location not available</Typography>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Send SOS Signal?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to send SOS with your current location?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button variant="contained" color="error" onClick={handleConfirm}>
            Yes, Send SOS
          </Button>
        </DialogActions>
      </Dialog>

      {/* Ambulance Form */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>Book Ambulance</DialogTitle>
        <DialogContent>
          <TextField
            label="Mobile Number"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            label="Ambulance Type"
            fullWidth
            select
            margin="normal"
            value={ambulanceType}
            onChange={(e) => setAmbulanceType(e.target.value)}
          >
            {ambulanceTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="body2" className="mt-2">
            <strong>Location:</strong> {coords?.lat}, {coords?.lon}
          </Typography>
          <Typography variant="body2">
            <strong>Address:</strong> {address}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!mobile || !ambulanceType}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SosPage;
