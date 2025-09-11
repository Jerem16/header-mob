import React from "react";
import Image from "next/image";

const ContactFormTitle = () => {
    return (
        <div className="form-tle flx-c">
            <h2>Contact</h2>
            <Image
                src="/mob-peur-de-la-conduite/img/contact/icon/key.svg"
                alt="announcement"
                width={37}
                height={32}
                className="announcement-bg"
                loading="lazy"
            />
        </div>
    );
};

export default ContactFormTitle;
