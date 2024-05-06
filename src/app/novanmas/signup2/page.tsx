
import styles from "@/ui/signup/signup.module.css"
import signUp from "@/firestore/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { registerUser } from "../actions";
import Signup from "@/components/Signup";
import { useFormState } from "react-dom";

// TODO - que pasa si el user ya existe? da error y estalla la app
const SignupPage = () => {
    // const initialState = {
    //     message: "",
    //   };
    // const [state, formAction] = useFormState(registerUser, initialState);
    // let error: any; 
    // @ts-ignore
    // const handleForm = (e) => {
    //     'use server'
    //     e.preventDefault();
    //     console.log(e, "SE DISPARA EL EVENTO???")
    //     // const result = await registerUser(formData)
    //     // console.log("result ", result)
    //     // revalidatePath("/signup")
    //     // redirect("/dashboard");
    // }

    return (
        <div className={styles.container}>
            <Signup />
            {/* <form className={styles.form} action={formAction}>
                <h1>Sign up</h1>
                <input onChange={(e) => console.log(e.target.value)}required type="email" name="email" id="email" placeholder='email@example.com' />
                <input required type="password" name="password" id="password" placeholder="password" />
                <button>Sign up</button>
                {state?.message && (
                    <p>{state.message}</p>
                )}
            </form> */}
        </div>
    );
}

export default SignupPage;
