import React from "react";
import Image from "next/image";

const ContactBackGround = () => {
    return (
        <Image
            className="contact-bg"
            src="/mob-peur-de-la-conduite/img/contact/bg-contact.svg"
            alt="Decorative background for contact section"
            width={1440}
            height={1587}
            priority
        />
    );
};

export default ContactBackGround;
