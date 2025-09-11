// @assets/data/content/index.ts
import { aboutContent } from "./about";
import { contactAnnouncements, socialLinks, contactDetails } from "./contact";

import { Content } from "../interfaces/content";

export const contentIndex: Record<string, Content[]> = {
  "#about": aboutContent,
  "#contact": [...contactAnnouncements, ...contactDetails, ...socialLinks],
};
