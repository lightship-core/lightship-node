import { AuditRule } from "../..";

export const referrerPolicyRule: AuditRule = {
  name: "referrer-policy",
  isValid: ({ headers, body }) => {
    return Object.prototype.hasOwnProperty.call(headers, "referrer-policy");
  }
};

