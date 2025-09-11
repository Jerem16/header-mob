// @assets/data/interfaces/content.ts
import { socialSvgComponents } from "../../../home/contact-section/socialSvgComponents";
// Interface pour le contenu "About"
export interface AboutCardIdentity {
  firstName: string;
  name: string;
  profession: string;
}

export interface AboutCardContent {
  description: string[];
}

export interface AboutContent {
  cardIdentity: AboutCardIdentity;
  cardContent: AboutCardContent;
}

// Type pour le contenus contact

export interface ContactAnnouncement {
  message: string;
}

export interface ContactDetail {
  svg: string;
  text: string;
  link?: string;
  alt: string;
}

export interface SocialLink {
  svg: keyof typeof socialSvgComponents;
  link: string;
}

export type Content =
  | AboutContent
  | ContactAnnouncement
  | ContactDetail
  | SocialLink;
