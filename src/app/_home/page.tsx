"use client";

import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { Sos, Phone, VolunteerActivism, Pets } from "@mui/icons-material";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <Typography variant="h3" fontWeight="bold">
          🚑 Emergency Healthcare App
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your trusted companion in medical emergencies
        </Typography>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="contained"
            color="error"
            startIcon={<Sos />}
            onClick={() => router.push("/sos")}
          >
            Send SOS
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Phone />}
            onClick={() => router.push("/book-a-call")}
          >
            Book Ambulance
          </Button>
        </div>
      </section>

      {/* About the App */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <Typography variant="h5" fontWeight="bold">
          About the App
        </Typography>
        <Typography variant="body1" color="text.secondary">
          In an emergency, every second counts. This app helps you quickly send
          an SOS alert, book an ambulance, and access critical medical services
          instantly. With a user-friendly design and fast access features, we
          aim to save lives when it matters most.
        </Typography>
      </section>

      {/* Quick Actions */}
      <section>
        <Typography variant="h5" fontWeight="bold" className="mb-4 text-center">
          Quick Access
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push("/sos")}
            >
              <CardContent className="text-center space-y-2">
                <Sos fontSize="large" color="error" />
                <Typography variant="h6">SOS Alert</Typography>
                <Typography variant="body2" color="text.secondary">
                  Send emergency alert instantly
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push("/book-a-call")}
            >
              <CardContent className="text-center space-y-2">
                <Phone fontSize="large" color="primary" />
                <Typography variant="h6">Book Ambulance</Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose and book the right ambulance
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push("/donate")}
            >
              <CardContent className="text-center space-y-2">
                <VolunteerActivism fontSize="large" color="success" />
                <Typography variant="h6">Donate</Typography>
                <Typography variant="body2" color="text.secondary">
                  Support life-saving initiatives
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push("/veterinary")}
            >
              <CardContent className="text-center space-y-2">
                <Pets fontSize="large" color="secondary" />
                <Typography variant="h6">Pet Ambulance</Typography>
                <Typography variant="body2" color="text.secondary">
                  Emergency care for your pets
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>

      {/* Awareness Section */}
      <section className="bg-gray-100 p-6 rounded-xl space-y-4">
        <Typography variant="h5" fontWeight="bold">
          🛡️ Emergency Awareness
        </Typography>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Save emergency contacts in your phone for quick access.</li>
          <li>Know the nearest hospital and ambulance services.</li>
          <li>Keep a first-aid kit handy at home and in your vehicle.</li>
          <li>Allow location access during emergencies for faster help.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <Typography variant="h5" fontWeight="bold">
          Be Prepared. Stay Safe.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Download our app, share it with friends & family, and make sure
          everyone stays safe during critical moments.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/donate")}
        >
          Support the Mission
        </Button>
      </section>
    </div>
  );
}
