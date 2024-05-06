import styles from "@/ui/signup/signup.module.css"
import { registerUser } from "../actions";
import { useState } from "react";

export const Form = () => {
    const [ test, setTest ] = useState("")
    //@ts-ignore
    const handleForm = async (formData) => {
        "use server"
        console.log(formData, "SE DISPARA EL EVENTO???")
        const result = await registerUser(formData)
        console.log("result ", result)
        setTest(result.message);
        // revalidatePath("/signup")
        // redirect("/dashboard");
    }
    return (
        <>
            <form className={styles.form} action={handleForm}>
                <h1>Sign up</h1>
                <input required type="email" name="email" id="email" placeholder='email@example.com' />
                <input required type="password" name="password" id="password" placeholder="password" />
                <button>Sign up</button>
                {test ? (<p>{test}</p>) : ":("}
            </form>
        </>
    )
}
