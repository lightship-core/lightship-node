import { AuditRule } from "../..";

export const strictTransportSecurityRule: AuditRule = {
  name: "strict-transport-security",
  isValid: ({ headers, body }) => {
    return headers.has("strict-transport-security");
  }
};
