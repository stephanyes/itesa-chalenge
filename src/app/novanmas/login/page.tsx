import signIn from "@/firestore/signin";
import styles from '@/ui/login/login.module.css';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/firestore/firestore";
import { setDoc, collection, doc } from "firebase/firestore";

const Login = () => {
    // @ts-ignore
    const handleForm = async (formData) => {
        "use server"
        try {
            const email = formData.get("email");
            const password = formData.get("password");
    
            const { result, error } = await signIn(email, password);
            if (error) {
                return console.log(error)
            }
            // const table = await collection(db, "users");
            // await setDoc(doc(db, "users"), {
            //     username: email,
            //     password: password
            // })
            revalidatePath("/dashboard")
            redirect("/dashboard");
        } catch (error) {
            console.log("error ", error)
        }
    }

    return (
        <div className={styles.container}>
            <form action={handleForm} className={styles.form}>
                <h1>Login</h1>
                <input required type="email" name="email" id="email" placeholder='email@example.com' />
                <input required type="password" name="password" id="password" placeholder="password" />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login
