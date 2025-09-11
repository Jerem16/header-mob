import Link from "next/link";
import React from "react";
import SocialLinks from "../../home/contact-section/contactCard/SocialLinks";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <nav className="ft_p-1">
                    <Link href="/mentions-legales">Mentions légales</Link>
                    <Link href="/informations-legales">
                        Informations légales
                    </Link>
                    <Link href="/contact">Contact</Link>

                    <p>Peur-de-la-conduite.fr © 2024.</p>
                    <SocialLinks />
                </nav>
            </div>
        </footer>
    );
};
export default React.memo(Footer);
