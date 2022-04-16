import { AuditRule } from "../..";

export const xContentTypeOptionsRule: AuditRule = {
  name: "x-content-type-options",
  isValid: ({ headers, body }) => {
    console.log(headers.entries());
    return headers.has("x-content-type-options");
  }
};
