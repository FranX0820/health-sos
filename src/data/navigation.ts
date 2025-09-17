import {
  Home,
  Pets,
  Phone,
  Sos,
  SvgIconComponent,
  VolunteerActivism,
} from "@mui/icons-material";

interface Menu {
  title: string;
  url: string;
  icon: SvgIconComponent;
}

const menu: Menu[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Book a call",
    url: "/book-a-call",
    icon: Phone,
  },
  {
    title: "SOS",
    url: "/sos",
    icon: Sos,
  },
  {
    title: "Donate",
    url: "/donate",
    icon: VolunteerActivism,
  },
  {
    title: "Veterinary",
    url: "veterinary",
    icon: Pets,
  },
];

export { menu };
export type { Menu };
