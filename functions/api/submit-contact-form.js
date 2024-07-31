/**
 * POST /api/submit-contact-form
 */
// import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext/browser";

export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();

    // Convert FormData to JSON
    // NOTE: Allows multiple values per key
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    let pretty = JSON.stringify(output, null, 2);

    if (context.env.ENVIRONMENT === "production") {
      const { EmailMessage } = await import("cloudflare:email");

      const msg = createMimeMessage();
      msg.setSender({ name: "GPT-4", addr: "hi@sia.codes" });
      msg.setRecipient("hi@sia.codes");
      msg.setSubject("An email generated in a worker");
      msg.addMessage({
          contentType: 'text/plain',
          data: `Congratulations, you just sent an email from a worker.`
      });

      // first is sender
      var message = new EmailMessage(
        "hi@sia.codes",
        "hi@sia.codes",
        msg.asRaw()
      );
      try {
        await env.form_email.send(message);
      } catch (e) {
        return new Response(e.message);
      }

      return new Response("Hello Send Email World!");
    } else {
      console.log("DEV");

      return new Response(pretty, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
    }
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}
