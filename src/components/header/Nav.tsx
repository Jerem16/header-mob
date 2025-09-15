import { memo } from "react";
import { MenuItem } from "../../assets/data/menuItems";
import ButtonOpen from "./ButtonOpen";
import MenuOpen from "./MenuOpen";
interface NavProps {
    menuItems: {
        mainLink?: MenuItem[];
    };
}

const Nav: React.FC<NavProps> = ({ menuItems }) => {
    return (
        <>
            <ButtonOpen />
            <MenuOpen menuItems={menuItems} />
        </>
    );
};

export default memo(Nav);
