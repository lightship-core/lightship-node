import { AuditRule } from "../..";

export const contentSecurityPolicyRule: AuditRule = {
  name: "content-security-policy",
  isValid: ({ headers, body }) => {
    return Object.prototype.hasOwnProperty.call(headers, "content-security-policy");
  }
};
