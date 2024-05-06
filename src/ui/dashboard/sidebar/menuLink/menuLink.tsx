
import styles from "@/ui/dashboard/sidebar/menuLink/menulink.module.css"
import Link from "next/link";
import { usePathname } from "next/navigation";

// @ts-ignore
const MenuLink = ({item, onClose}) => {

    const pathName = usePathname();
    const handleClick = () => {
        if (onClose) {
          onClose();
        }
    };
    return (
        <Link href={item.path} className={`
        ${styles.container} 
        ${pathName === item.path && styles.active}
        `}
        onClick={handleClick}
        >
            {item.icon}
            {item.title}
        </Link>
    )
}

export default MenuLink;