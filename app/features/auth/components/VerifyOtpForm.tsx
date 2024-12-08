// Components/VerifyOtpForm.tsx
import Button from "@/app/shared/components/Button";
import Input from "@/app/shared/components/Input";

export function VerifyOtpForm({
  email,
  otp,
  setOtp,
  handleSubmit,
}: {
  email: string;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-md text-text-secondary text-center">
        We&apos;ve sent a code to <strong>{email}</strong>
      </p>
      <Input
        id="otp"
        name="otp"
        type="text"
        placeholder="123456"
        label="Enter Code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      {/* Hidden field to include the email */}
      <input type="hidden" name="email" value={email} />
      <Button label="Login" variant="primary" className="w-full" />
    </form>
  );
}