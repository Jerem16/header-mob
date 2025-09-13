import type { ContactAnnouncement, ContactDetail } from "../interfaces/content";

export const contactAnnouncements: ContactAnnouncement[] = [
    {
        message:
            "Besoin de conseils ou de renseignements ? N'hésite pas à me contacter.",
    },
    { message: "Vous pouvez également me contacter via ce formulaire." },
];

export const contactDetails: ContactDetail[] = [
    {
        svg: "https://assets.peur-de-la-conduite.fr/img/contact/icon/clock.svg",
        text: "Du Lundi au Dimanche, 07h - 20h",
        alt: "Horaires",
    },
    {
        svg: "https://assets.peur-de-la-conduite.fr/img/contact/icon/phone.svg",
        text: "+33 6 74 25 91 81",
        link: "tel:+33674259181",
        alt: "Téléphonne",
    },
    {
        svg: "https://assets.peur-de-la-conduite.fr/img/contact/icon/mail.svg",
        text: "Envoyez-moi un mail",
        link: "mailto:contact.peurdelaconduite@gmail.com",
        alt: "Mail",
    },
    {
        svg: "https://assets.peur-de-la-conduite.fr/img/contact/icon/location.svg",
        text: "17 Allée Didier Daurat, 76620 LE HAVRE",
        link: "https://maps.google.com/?q=17+Allée+Didier+Daurat,+76620+LE+HAVRE",
        alt: "Addresse",
    },
];
