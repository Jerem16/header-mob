/**
 *! ⚠️ NOTE IMPORTANTE SUR LA NAVIGATION DES SOUS-MENUS
 *
 ** Pour que les sous-menus fonctionnent correctement (clic et navigation),
 ** il faut ajouter `ref={navRef}` provenant du hook `useMenuBehavior`
 ** dans le bloc de navigation <nav.. <nav ref={navRef} className="main-nav">.
 *
 * Exemple (Nav.tsx) :
 *
 *   <div className="head-flex" >
 *     <nav ref={navRef} className="main-nav"> ... </nav>
 *     <nav className="reservationId"> ... </nav>
 *     <nav className="research"> ... </nav>
 *     <nav ref={navRef} className="connection"> ... </nav>
 *   </div>
 *
 *? 👉 Sans ça : les clics dans <nav class="connection"> ou dans un <SubMenu>
 *? sont considérés comme des "clics extérieurs" et ferment le menu avant la navigation.
 *
 */

import { MenuLinks } from "./interfaces/menu";
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
          id: "menu-about",
          title: "À propos",
          AnchorId: "#about",
          class: "",
          content: contentIndex["#about"],
        },
        {
          id: "menu-contact",
          title: "Contact",
          AnchorId: "#contact",
          class: "",
          content: contentIndex["#contact"],
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
