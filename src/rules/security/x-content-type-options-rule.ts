import { AuditRule } from "../..";

export const xContentTypeOptionsRule: AuditRule = {
  name: "x-content-type-options",
  isValid: ({ headers, body }) => {
    return Object.prototype.hasOwnProperty.call(headers, "x-content-type-options");
  }
};
