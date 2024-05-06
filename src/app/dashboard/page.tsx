'use client'
import { useAuthContext } from "@/context/AuthContext";
import { redirect } from 'next/navigation';
import styles from "@/ui/dashboard/dashboard.module.css";
import Card from "@/ui/dashboard/card/card";
import Transactions from "@/ui/dashboard/transactions/transactions";

const Dashboard = () => {
    const { user } = useAuthContext() as { user: any };
    // console.log("dashboard ", user)
    if (!user) {
        return redirect("/signin");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                </div>
                <Transactions />
                {/* <Chart /> */}
            </div>
        </div>
    )
}

export default Dashboard