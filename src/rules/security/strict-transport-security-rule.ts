import { AuditRule } from "../..";

export const strictTransportSecurityRule: AuditRule = {
  name: "strict-transport-security",
  isValid: ({ headers, body }) => {
    return Object.prototype.hasOwnProperty.call(headers, "strict-transport-security");
  }
};
