import http, { RequestOptions, IncomingHttpHeaders } from "http";
import { URL } from "url";
import { resolve } from "dns/promises";

export interface RuleResults {
  name: string,
  passes: boolean
}

export interface AuditRule {
  name: string,
  isValid: (options: { headers: IncomingHttpHeaders, body: string }) => boolean
}

export interface AuditRules {
  security: Array<AuditRule>,
  seo: Array<AuditRule>
}

export type AuditUrl = string;

export interface AuditOptions {
  url: AuditUrl,
  rules: AuditRules
}

export type AuditScoreSeo = number;
export type AuditScoreSecurity = number;

export interface AuditScore {
  seo: AuditScoreSeo,
  security: AuditScoreSecurity
}

export interface AuditResponse {
  url: string,
  durationInSeconds: number,
  score: AuditScore,
  seo: Array<RuleResults>,
  security: Array<RuleResults>
}

const getRuleResultsScore = ({ ruleResults }: { ruleResults: Array<RuleResults> }): number => {
  return Math.floor(ruleResults.reduce((score, ruleResult) => ruleResult.passes ? score + 1 : score, 0) / (ruleResults.length || 1) * 100);
};

const getRuleResults = ({ rules, headers, body }: { rules: Array<AuditRule>, headers: IncomingHttpHeaders, body: string }): Array<RuleResults> => {
  return rules.map(rule => {
    return {
      name: rule.name,
      passes: rule.isValid({ headers, body })
    };
  });
};

export const audit = (options: AuditOptions): Promise<AuditResponse> => {
  return new Promise((succeed, fail) => {
    const url = new URL(options.url);
    const host = url.hostname;
    const port = Number(url.port) || 80;
    const method = "GET";
    const path = url.pathname;

    return resolve(host).then(([hostname]) => {
      let body = "";

      const millisecondsBeforeRequest = new Date().getTime();

      const request = http.request({hostname, path, method, port}, response => {
        const headers = response.headers;

        response.on("data", chunk => {
          body += chunk; 
        });

        response.on("end", () => {
          const millisecondsAfterRequest = new Date().getTime();

          const seoResults = getRuleResults({ rules: options.rules.seo, headers, body });
          const securityResults = getRuleResults({ rules: options.rules.security, headers, body });
          const seoScore = getRuleResultsScore({ ruleResults: seoResults });
          const securityScore = getRuleResultsScore({ ruleResults: securityResults });

          succeed({
            url: options.url,
            durationInSeconds: (millisecondsAfterRequest - millisecondsBeforeRequest) / 1000,
            score: {
              seo: seoScore,
              security: securityScore
            },
            seo: seoResults,
            security: securityResults
          });
        });
      });

      request.on("error", error => {
        fail(error);
      });

      request.end();
    });
  });
};

export { contentSecurityPolicyRule } from "./rules/security/content-security-policy-rule";
export { permissionsPolicyRule } from "./rules/security/permissions-policy-rule";
export { xContentTypeOptionsRule } from "./rules/security/x-content-type-options-rule";
export { xFrameOptionsRule } from "./rules/security/x-frame-options-rule";
export { strictTransportSecurityRule } from "./rules/security/strict-transport-security-rule";
export { referrerPolicyRule } from "./rules/security/referrer-policy-rule";
