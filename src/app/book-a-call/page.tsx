"use client";

import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Stack,
  SelectChangeEvent,
} from "@mui/material";

export default function BookACallPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    healthIssue: "",
    hospital: "",
    time: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const hospitals = [
    "City Hospital",
    "Apollo Clinic",
    "Sunrise Medical",
    "Metro Health",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <Typography variant="h4" className="mb-6 font-bold">
        Book a Call
      </Typography>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6"
        >
          <Stack spacing={3}>
            {/* Name */}
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Age */}
            <TextField
              fullWidth
              label="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            {/* Health Issue */}
            <TextField
              fullWidth
              label="Health Issue"
              name="healthIssue"
              value={formData.healthIssue}
              onChange={handleChange}
              multiline
              rows={3}
            />

            {/* Hospital Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Select Appointment Hospital</InputLabel>
              <Select
                value={formData.hospital}
                onChange={handleSelectChange}
                label="Select Appointment Hospital"
                name="hospital"
                required
              >
                {hospitals.map((hospital) => (
                  <MenuItem key={hospital} value={hospital}>
                    {hospital}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Date & Time */}
            <TextField
              fullWidth
              label="Preferred Date & Time"
              type="datetime-local"
              name="time"
              value={formData.time}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      ) : (
        <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6">
          <Typography variant="h6" className="mb-4">
            ✅ Your appointment request has been submitted!
          </Typography>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm">
            {JSON.stringify(formData, null, 2)}
          </pre>
          <Button
            className="mt-4"
            variant="outlined"
            onClick={() => setSubmitted(false)}
          >
            Book Another
          </Button>
        </div>
      )}
    </main>
  );
}
