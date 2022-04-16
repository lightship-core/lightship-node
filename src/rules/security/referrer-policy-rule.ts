import { AuditRule } from "../..";

export const referrerPolicyRule: AuditRule = {
  name: "referrer-policy",
  isValid: ({ headers, body }) => {
    return headers.has("referrer-policy");
  }
};

