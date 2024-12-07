"use client";

import { login } from "../actions";

export default function LoginPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default browser form submission
    const formData = new FormData(event.currentTarget);
    await login(formData); // Call the server action
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button type="submit">Log in</button>
    </form>
  );
}
