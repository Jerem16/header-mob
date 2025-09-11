import Link from "next/link";
import { socialLinks } from "../../../assets/data/content/contact";
import { socialSvgComponents } from "../socialSvgComponents";

export default function SocialLinkP2() {
    return (
        <div className="social-g1">
            {socialLinks.slice(-3).map(({ svg, link }, index) => {
                const IconComponent = socialSvgComponents[svg];
                return (
                    <Link
                        key={index + "-social-last"}
                        rel="nofollow noreferrer"
                        href={link}
                        target="_blank"
                        className="flx-c social-icon"
                    >
                        {IconComponent && <IconComponent />}
                        <span className="visually-hidden">{link}</span>
                    </Link>
                );
            })}
        </div>
    );
}
