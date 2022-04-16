import { AuditRule } from "../..";

export const permissionsPolicyRule: AuditRule = {
  name: "permissions-policy",
  isValid: ({ headers, body }) => {
    return headers.has("permissions-policy");
  }
};
