import { AuditRule } from "../..";

export const permissionsPolicyRule: AuditRule = {
  name: "permissions-policy",
  isValid: ({ headers, body }) => {
    return Object.prototype.hasOwnProperty.call(headers, "permissions-policy");
  }
};
