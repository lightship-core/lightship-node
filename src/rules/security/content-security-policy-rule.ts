import { AuditRule } from "../..";

export const contentSecurityPolicyRule: AuditRule = {
  name: "content-security-policy",
  isValid: ({ headers, body }) => {
    return headers.has("content-security-policy");
  }
};
