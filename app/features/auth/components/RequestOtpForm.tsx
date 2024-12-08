import Button from "@/app/shared/components/Button";
import Input from "@/app/shared/components/Input";

export function RequestOtpForm({
  email,
  setEmail,
  handleSubmit,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="example@email.com"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button label="Get Code" variant="primary" className="w-full" />
      <p className="text-sm text-gray-700 text-center">
        Don’t have an account?{" "}
        <a href="/signup" className="text-primary font-medium hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}