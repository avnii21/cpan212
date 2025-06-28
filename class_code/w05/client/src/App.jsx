import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  
  const fetchData = async () => {
    const response = await fetch(`http://localhost:8000/data`);
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  const handleRegistration = async(e) =>{
    e.preventDefault();
    const submission = {email, password, name}

    const response = await fetch(`http://localhost:8000/register`, {
      method: "POST",
      headers: { "Content-Type: application/json" },
      body: JSON.stringify(submission),
    });

    const result = response.json();

    if (!response.ok) {
      setMessage("There was a problem registering an account")
    }
    setMessage(result.message)
  };
{

  return (
  <>
    <button onClick={fetchData}>Click to fetch data</button>
    <form onSubmit={handleRegistration}>
       <input
          type="email"
          placeholder="Enter email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      <button type="submit">Register</button>
    </form>
  </>
);
  }


export default App;
