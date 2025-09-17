import { Metadata } from "next";
import { ReactNode } from "react";
import Header from "../_components/header";

export const metadata: Metadata = {
  title: "Book a Call | My App",
  description: "Easily schedule a call with our experts.",
  openGraph: {
    title: "Book a Call | My App",
    description: "Easily schedule a call with our experts.",
    url: "https://myapp.com/book-a-call",
    images: [
      {
        url: "https://myapp.com/images/book-call-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Book a call preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Call | My App",
    description: "Easily schedule a call with our experts.",
    images: ["https://myapp.com/images/book-call-thumbnail.png"],
  },
};

export default function BookACallLayout({ children }: { children: ReactNode }) {
  // ✅ Notice: we don’t re-add <Header>, because root layout already has it
  return <div>{children}</div>;
}
