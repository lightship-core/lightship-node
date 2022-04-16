import { AuditRule } from "../..";

export const xFrameOptionsRule: AuditRule = {
  name: "x-frame-options",
  isValid: ({ headers, body }) => {
    return headers.has("x-frame-options");
  }
};
