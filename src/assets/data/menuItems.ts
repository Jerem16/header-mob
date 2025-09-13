import type { MenuLinks } from "./interfaces/menu";
import { contentIndex } from "./content/index";
export const menuItems: MenuLinks = {
    mainLink: [
        {
            id: "menu-home",
            title: "Accueil",
            class: "",
            path: "/",
            AnchorId: "#top",
            svg: "Home",
            subItems: [
                {
                    id: "menu-slider",
                    title: "Slider",
                    AnchorId: "#s1",
                    class: "",
                    content: contentIndex["#s1"],
                },
                {
                    id: "menu-about",
                    title: "À propos",
                    AnchorId: "#s2",
                    class: "",
                    content: contentIndex["#s2"],
                },
                {
                    id: "menu-services",
                    title: "Services",
                    AnchorId: "#s3",
                    class: "",
                    content: contentIndex["#s3"],
                },
                {
                    id: "menu-contact",
                    title: "Contact",
                    AnchorId: "#s4",
                    class: "",
                    content: contentIndex["#s4"],
                },
            ],
        },
        {
            id: "menu-services",
            title: "Services",
            class: "",
            path: "/p1",
            AnchorId: "#top",
            svg: "Services",
            subItems: [
                {
                    id: "menu-without-license",
                    title: "Sans Permis",
                    AnchorId: "#sans-permis",
                    class: "",
                },
                {
                    id: "menu-with-license",
                    title: "Avec Permis",
                    AnchorId: "#avec-permis",
                    class: "",
                },
            ],
        },
        {
            id: "menu-prices",
            title: "Tarifs",
            class: "",
            path: "/p2",
            AnchorId: "#top",
            svg: "Tarifs",
            subItems: [
                {
                    id: "menu-without-license",
                    title: "Débutant",
                    AnchorId: "#novice",
                    class: "",
                },
                {
                    id: "menu-with-license",
                    title: "Confirmé",
                    AnchorId: "#expert",
                    class: "",
                },
            ],
        },
        {
            id: "menu-blog",
            title: "Blog",
            class: "",
            path: "/p1",
            AnchorId: "#top",
            svg: "Blog",
        },
        {
            id: "menu-contact",
            title: "Contact",
            class: "",
            path: "/p2",
            AnchorId: "#expert",
            svg: "Contact",
        },
    ],
    reservation: [
        {
            id: "reservationId",
            title: "Réservation",
            class: "",
            path: "/p1",
            AnchorId: "#top",
            svg: "Reservation",
        },
    ],
    connection: [
        {
            id: "connexion",
            title: "Connexion",
            class: "",
            path: "/p2",
            AnchorId: "#top",
            svg: "Connection",
        },
    ],
};

export type { MenuItem } from "./interfaces/menu";
