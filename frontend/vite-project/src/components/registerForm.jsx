import "./Register.css"
export default function Register(){
    const register = async(formData)=>{
        const username = formData.get("username")
        const password = formData.get("password")
        const email = formData.get("email")

         const user = {
            email,
            username,
            password
        };

        try{
            const response = await fetch("http://localhost:3000/api/auth/register",{
                method : "POST",
                headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const result = await response.json();
            console.log("API Response:", result.message);
            } catch (err) {
                console.error("Error registering:", err);
            }
    }

    return(
        <>
        <div className="flex flex-wrap gap-4 justify-center dark:outline-white/10">
            <h1>Register</h1>

            <form action = {register}>
                <label>Email:</label>
                <input id="email" type="email" name = "email"></input>
                <label>Username:</label>
                <input id="username" name = "username"></input>
                <label>Password:</label>
                <input id="password" type="password" name = "password"></input>
                <button>Submit</button>
            </form>
            </div>
        </>
    )
}