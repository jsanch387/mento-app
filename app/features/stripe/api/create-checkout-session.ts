import apiClient from "@/app/lib/utils/api/apiClient";

/**
 * Creates a Stripe Checkout session.
 *
 * @param priceId - The ID of the Stripe price for the subscription.
 * @returns A Promise resolving with the Checkout session URL.
 */
export const createCheckoutSession = async (
  priceId: string
): Promise<string> => {
  try {
    const response = await apiClient.post("/stripe/create-checkout-session", {
      priceId,
    });

    return response.data.url; // URL for Stripe Checkout session
  } catch (error: any) {
    console.error(
      "Error creating checkout session:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create checkout session"
    );
  }
};
