import { mailtrapClient, sender } from "../lib/mailtrap.js";
import {
	createCommentNotificationEmailTemplate,
	createLinkAcceptedEmailTemplate,
	createWelcomeEmailTemplate,
} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Welcome to AlumnLink",
			html: createWelcomeEmailTemplate(name, profileUrl),
			category: "welcome",
		});

		console.log("Welcome Email sent succesffully", response);
	} catch (error) {
		throw error;
	}
};

export const sendCommentNotificationEmail = async (
	recipientEmail,
	recipientName,
	commenterName,
	postUrl,
	commentContent
) => {
	const recipient = [{ email: recipientEmail }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "New Comment on Your Post",
			html: createCommentNotificationEmailTemplate(recipientName, commenterName, postUrl, commentContent),
			category: "comment_notification",
		});
		console.log("Comment Notification Email sent successfully", response);
	} catch (error) {
		throw error;
	}
};

export const sendLinkAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {
	const recipient = [{ email: senderEmail }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: `${recipientName} accepted your Link request`,
			html: createLinkAcceptedEmailTemplate(senderName, recipientName, profileUrl),
			category: "Link_accepted",
		});
	} catch (error) {}
};
export const sendResetPasswordEmail = async (email, name, resetUrl) => {
	try {
		await mailtrapClient.send({
			from: sender,
			to: [{ email }],
			subject: "Reset Your Password",
			html: `<p>Hi ${name},</p><p>Please click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`,
		});
	} catch (error) {
		console.error("Error sending reset password email:", error);
		throw error;
	}
};