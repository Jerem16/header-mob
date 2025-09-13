// @assets/data/content/index.ts
import { sliderContent } from "./slider";
import { sliderInfo } from "./info";
import { aboutContent } from "./about";
import { serviceContent } from "./services";
import { contactAnnouncements, contactDetails } from "./contact";

import { Content } from "../interfaces/content";

export const contentIndex: Record<string, Content[]> = {
    "#s1": [...sliderContent, ...sliderInfo],
    "#s2": aboutContent,
    "#s3": serviceContent,
    "#s4": [...contactAnnouncements, ...contactDetails],
};
