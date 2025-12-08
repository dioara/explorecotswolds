import { TRPCError } from "@trpc/server";
import { ENV } from "./env";
import sgMail from "@sendgrid/mail";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;
const OWNER_EMAIL = "contact@lampstand.consulting";

const trimValue = (value: string): string => value.trim();
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validatePayload = (input: NotificationPayload): NotificationPayload => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }

  const title = trimValue(input.title);
  const content = trimValue(input.content);

  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`,
    });
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`,
    });
  }

  return { title, content };
};

/**
 * Sends email notifications to the project owner via SendGrid.
 * Returns `true` if the email was sent successfully, `false` on error.
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  const { title, content } = validatePayload(payload);

  // Check if SendGrid API key is configured
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendgridApiKey) {
    console.warn("[Notification] SendGrid API key not configured, skipping email notification");
    return false;
  }

  // Initialize SendGrid
  sgMail.setApiKey(sendgridApiKey);

  try {
    // Send email via SendGrid
    await sgMail.send({
      to: OWNER_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL || "noreply@explorecotswolds.com",
      subject: title,
      text: content,
      html: content.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
    });

    console.log(`[Notification] Email sent successfully to ${OWNER_EMAIL}`);
    return true;
  } catch (error) {
    console.error("[Notification] Failed to send email via SendGrid:", error);
    return false;
  }
}
