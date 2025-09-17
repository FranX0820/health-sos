"use client";
// pages/donate.tsx
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { motion, AnimatePresence } from "framer-motion";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
  const [donated, setDonated] = useState(false);

  const handleDonate = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setDonated(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
        <CardContent>
          <AnimatePresence mode="wait">
            {!donated ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <VolunteerActivismIcon color="primary" fontSize="large" />
                  <Typography variant="h5" fontWeight="bold">
                    Support Our Cause
                  </Typography>
                </Box>

                <Typography variant="body1" mb={3}>
                  Your donation helps us continue our mission. Every
                  contribution makes a difference.
                </Typography>

                <TextField
                  fullWidth
                  label="Enter Amount (₹)"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  sx={{ mb: 3 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleDonate}
                >
                  Donate Now
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="thankyou"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                style={{ textAlign: "center", padding: "20px 0" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1.5, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <VolunteerActivismIcon color="error" sx={{ fontSize: 80 }} />
                </motion.div>

                <Typography variant="h5" mt={2} fontWeight="bold">
                  Thank You for Your Donation!
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  We truly appreciate your support of ₹{amount}.
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </Container>
  );
}
