"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ImageIcon from "@mui/icons-material/Image";
import CircularProgress from "@mui/material/CircularProgress";

type Message = {
  id: string;
  role: "user" | "bot" | "system";
  text?: string;
  imgUrl?: string;
  createdAt: number;
};

const initialMessages: Message[] = [
  {
    id: "m1",
    role: "bot",
    text: "Hi! I’m PetCare Assistant 🐾 — I can help with pet first-aid tips, finding vets, or booking pet ambulances. How can I help?",
    createdAt: Date.now(),
  },
];

export default function VeterinaryPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [selectedQuick, setSelectedQuick] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const pushMessage = (msg: Message) => setMessages((prev) => [...prev, msg]);

  // simulate bot response — replace this with real API call to your server that talks to IBM Watson
  const simulateBotResponse = async (userMsg: string, imageUrl?: string) => {
    setIsTyping(true);

    // Example: call your API route here
    // const res = await fetch(`/api/watson/chat`, { method: "POST", body: JSON.stringify({ message: userMsg, image: imageUrl }) })
    // const data = await res.json();
    // pushMessage({ id: idgen, role: 'bot', text: data.reply, createdAt: Date.now() })

    // Fake responses for demo
    await new Promise((r) => setTimeout(r, 1200));

    let reply = "Thanks — I got that. Can you share symptoms or duration?";
    if (/injury|bleed|cut/i.test(userMsg)) {
      reply =
        "I’m sorry to hear that. For cuts or bleeding: apply gentle pressure with clean cloth and seek immediate vet help. Do you want local vet suggestions?";
    } else if (/not eating|vomit|sick/i.test(userMsg)) {
      reply =
        "Loss of appetite or vomiting can be serious. Note frequency and any blood. I can help find a vet or suggest first-aid steps.";
    } else if (imageUrl) {
      reply =
        "I see the photo — I may be able to help identify visible issues, but this is not a substitute for a vet. Shall I suggest nearby clinics?";
    }

    const botMsg: Message = {
      id: `m_bot_${Date.now()}`,
      role: "bot",
      text: reply,
      createdAt: Date.now(),
    };

    pushMessage(botMsg);
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!input.trim() && !uploadPreview) return;

    const userMsg: Message = {
      id: `m_user_${Date.now()}`,
      role: "user",
      text: input.trim() || undefined,
      imgUrl: uploadPreview || undefined,
      createdAt: Date.now(),
    };

    pushMessage(userMsg);
    setInput("");
    setUploadPreview(null);
    setUploadFile(null);

    // Call the bot
    await simulateBotResponse(userMsg.text || "", userMsg.imgUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadPreview(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const quickActions = [
    { id: "book_vet", title: "Book Vet Visit", icon: <LocalHospitalIcon /> },
    {
      id: "pet_ambulance",
      title: "Book Pet Ambulance",
      icon: <LocalShippingIcon />,
    },
    { id: "tips", title: "Pet Care Tips", icon: <PetsIcon /> },
  ];

  const handleQuickClick = (id: string) => {
    setSelectedQuick(id);
    // push a prefilled user message to the chat and trigger bot response
    if (id === "book_vet") {
      const pre = "I want to book a vet visit for my pet.";
      pushMessage({
        id: `m_user_quick_${Date.now()}`,
        role: "user",
        text: pre,
        createdAt: Date.now(),
      });
      simulateBotResponse(pre);
    } else if (id === "pet_ambulance") {
      const pre = "I need a pet ambulance near me.";
      pushMessage({
        id: `m_user_quick_${Date.now()}`,
        role: "user",
        text: pre,
        createdAt: Date.now(),
      });
      simulateBotResponse(pre);
    } else if (id === "tips") {
      const pre = "Give me quick first-aid tips for dogs.";
      pushMessage({
        id: `m_user_quick_${Date.now()}`,
        role: "user",
        text: pre,
        createdAt: Date.now(),
      });
      simulateBotResponse(pre);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      {/* Header / Hero */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Typography variant="h4" component="h1" fontWeight="bold">
            🐾 Pet Help & Vet Assistant
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            className="mt-2 max-w-xl"
          >
            Ask our assistant about symptoms, get first-aid tips, or request
            veterinary services and pet ambulances. This chat can be powered by
            IBM Watson later — for now it's a demo UI.
          </Typography>
        </div>

        <div className="flex gap-3">
          {quickActions.map((q) => (
            <Button
              key={q.id}
              variant={selectedQuick === q.id ? "contained" : "outlined"}
              startIcon={q.icon}
              onClick={() => handleQuickClick(q.id)}
            >
              {q.title}
            </Button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Info / Tips */}
        <aside className="space-y-4 lg:col-span-1">
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Quick Pet Care Tips
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Keep an emergency kit"
                    secondary="Bandages, thermometer, saline, contacts of nearest vet"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Do NOT give human meds"
                    secondary="Many over-the-counter meds are toxic to pets"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Check breathing & consciousness"
                    secondary="If breathing is shallow or absent, seek immediate help"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                About this Assistant
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This chatbot UI is ready to connect to IBM Watson Assistant. For
                production, call your server endpoint (app/api/...) which
                forwards queries to Watson. Responses should be sanitized before
                display.
              </Typography>
              <Divider className="my-3" />
              <Typography variant="subtitle2">What you can do</Typography>
              <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                <li>Get quick guidance and first-aid</li>
                <li>Share a photo of your pet for visual context</li>
                <li>Request vet visits or pet ambulance</li>
              </ul>
            </CardContent>
          </Card>
        </aside>

        {/* Middle & Right: Chat area */}
        <section className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              {/* Chat header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <PetsIcon />
                  </Avatar>
                  <div>
                    <Typography fontWeight="bold">PetCare Assistant</Typography>
                    <Typography variant="body2" color="text.secondary">
                      AI-powered help (demo)
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Chip label="Demo" size="small" />
                </div>
              </div>

              {/* Messages list */}
              <div
                ref={listRef}
                className="max-h-[430px] overflow-auto p-4 space-y-3 bg-white"
                aria-live="polite"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[78%] p-3 rounded-lg shadow-sm ${
                        m.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                      style={{ wordBreak: "break-word" }}
                    >
                      {m.imgUrl && (
                        <img
                          src={m.imgUrl}
                          alt="uploaded"
                          className="rounded-md mb-2 max-h-48 object-contain"
                        />
                      )}
                      {m.text && <div>{m.text}</div>}
                      <div className="text-xs mt-2 text-gray-500 text-right">
                        {new Date(m.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                        <CircularProgress size={18} />
                        <Typography variant="body2" color="text.secondary">
                          PetCare is typing...
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="p-4 border-t">
                <div className="flex gap-2 items-center">
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-input">
                    <IconButton component="span" aria-label="Upload image">
                      <ImageIcon />
                    </IconButton>
                  </label>

                  <TextField
                    placeholder="Describe symptoms, or ask a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    fullWidth
                    multiline
                    maxRows={4}
                    size="small"
                    aria-label="Chat input"
                  />

                  <IconButton
                    color="primary"
                    aria-label="Send message"
                    onClick={handleSend}
                    sx={{ ml: 1 }}
                  >
                    <SendIcon />
                  </IconButton>
                </div>

                {/* Preview + send area */}
                {uploadPreview && (
                  <div className="mt-3 flex items-start gap-3">
                    <img
                      src={uploadPreview}
                      alt="preview"
                      className="w-24 h-24 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <Typography variant="body2">Image selected</Typography>
                      <div className="mt-2 flex gap-2">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleSend}
                        >
                          Send Image
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setUploadPreview(null);
                            setUploadFile(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Frequently Asked Questions
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography variant="subtitle2">
                    What to do if my pet is bleeding?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Apply gentle pressure with a clean cloth. Avoid tourniquets.
                    Contact a vet immediately.
                  </Typography>
                </div>

                <div>
                  <Typography variant="subtitle2">
                    Can I give my pet human medicine?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No — many human medications are toxic to animals. Always
                    consult a vet first.
                  </Typography>
                </div>

                <div>
                  <Typography variant="subtitle2">
                    How to transport an injured pet?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Keep them warm and still. Use a blanket or board if
                    necessary. Seek ambulance if severe.
                  </Typography>
                </div>

                <div>
                  <Typography variant="subtitle2">
                    When to call an ambulance for pets?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    When breathing is compromised, severe bleeding,
                    unconsciousness, or major trauma.
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
