'use client'

import styles from "@/ui/dashboard/search/search.module.css";
import { MdSearch } from "react-icons/md";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { useDebounceCallback } from "use-debounce";


// @ts-ignore
const Search = ({placeholder}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    //@ts-ignore
    const handleSearch = (e) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1")
        // params.set("test", e.target.value);
        router.replace(`/dashboard/transactions/${e.target.value}`)
        // router.push(`/dashboard/transactions/${e.target.value}`)
    }

    return (
        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch}/>
        </div>
    )
}

export default Search