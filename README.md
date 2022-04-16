# lightship-node

## Requirements

- [Node](https://nodejs.org)
- [NPM](https://npmjs.com)

## Installation

```bash
npm install @lightship/lightship
```

## Usage

```typescript
import {
  audit,
  contentSecurityPolicyRule,
  permissionsPolicyRule,
  referrerPolicyRule
  strictTransportSecurityRule,
  xContentTypeOptionsRule,
  xFrameOptionsRule,
} from "@lightship/lightship";

const auditResponse = await audit({
  url: "http://localhost:8000",
  rules: {
    seo: [],
    security: [
      contentSecurityPolicyRule,
      permissionsPolicyRule,
      referrerPolicyRule
      strictTransportSecurityRule,
      xContentTypeOptionsRule,
      xFrameOptionsRule,
    ]
  }
});

console.log(auditResponse);
```

```json
{
  "url": "http://localhost:8000",
  "durationInSeconds": 0.007,
  "score": {
    "seo": 0,
    "security": 33
  },
  "seo": [],
  "security": [
    {
      "name": "content-security-policy",
      "passes": true
    },
    {
      "name": "permissions-policy",
      "passes": false
    },
    {
      "name": "referrer-policy",
      "passes": false
    },
    {
      "name": "strict-transport-security",
      "passes": true
    },
    {
      "name": "x-content-type-options",
      "passes": false
    },
    {
      "name": "x-frame-options",
      "passes": false
    }
  ]
}
```
