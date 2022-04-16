import { AuditRule } from "../..";

export const xFrameOptionsRule: AuditRule = {
  name: "x-frame-options",
  isValid: ({ headers, body }) => {
    return Object.prototype.hasOwnProperty.call(headers, "x-frame-options");
  }
};
