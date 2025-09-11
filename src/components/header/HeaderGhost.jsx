import LogoLink from "./LogoLink";
import MenuIcon from "@components/svg_Icon/utils/MenuIcon";
const HeaderGhost = () => {
    return (
        <div className="header">
            <LogoLink />
            <button aria-label="ouvrir le menu" className="menu">
                <MenuIcon />
            </button>
            <div className="head-flex absolute "></div>
        </div>
    );
};

export default HeaderGhost;
