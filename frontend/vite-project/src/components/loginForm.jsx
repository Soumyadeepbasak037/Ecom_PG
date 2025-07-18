import "./Register.css"
export default function Login(){
    const login = async(formData)=>{
        const username = formData.get("username")
        const password = formData.get("password")
        // const email = formData.get("email")

         const user = {
            username,
            password
        };

        try{
            const response = await fetch("http://localhost:3000/api/auth/login",{
                method : "POST",
                headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const result = await response.json();
            localStorage.setItem("token", result.token);
            console.log("API Response:", result.message);
            } catch (err) {
                console.error("Error registering:", err);
            }
    }
    return(
        <>
        <div className="flex flex-wrap gap-4 justify-center dark:outline-white/10">
            <h1>Login</h1>
            <form action = {login}> 
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