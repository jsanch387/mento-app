import { consumeToken } from "../../settings/components/api/user-api";
import useTokenStore from "../store/tokenStore";

export const useConsumeToken = () => {
  const { tokens, setTokens } = useTokenStore();

  const handleConsumeToken = async () => {
    if (tokens !== undefined && tokens !== null && tokens > 0) {
      try {
        await consumeToken(); // API call to deduct a token from the user's profile
        setTokens(tokens - 1); // Update local token count
      } catch (error) {
        console.error("Error consuming token:", error);
      }
    }
  };

  return { tokens, handleConsumeToken };
};
