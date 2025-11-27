# Website Analytics Strategy

This document outlines the privacy-first analytics approach for [mohamed-c-a.github.io](https://mohamed-c-a.github.io/).

## Objective

Collect anonymous, aggregated visitor statistics to understand:

- Total visitor count (daily, weekly, monthly)
- Traffic sources (LinkedIn, GitHub, Xing, direct access, search engines)
- Geographic distribution (country/region level)
- Page views and navigation patterns
- Device types and browsers

## Privacy Principles

This website follows a strict privacy-first approach:

- No cookies are set
- No IP addresses are stored
- No personal data is collected
- No fingerprinting techniques are used
- No tracking across websites
- GDPR compliant without consent banners

## Technology Choice: Umami

[Umami](https://umami.is/) is an open-source, privacy-focused analytics platform that provides all required metrics while respecting visitor privacy.

### Why Umami

| Criteria | Umami | Google Analytics |
|----------|-------|------------------|
| Privacy-first | Yes | No |
| Cookie-free | Yes | No |
| GDPR compliant | Yes | Requires consent |
| Open source | Yes | No |
| Self-hosting option | Yes | No |
| Free tier available | Yes | Yes |
| Lightweight script | ~2KB | ~45KB |

### Metrics Collected

1. **Page Views**: Which pages are visited and how often
2. **Referrers**: Traffic sources (LinkedIn, GitHub, Xing, direct, search)
3. **Countries**: Visitor location at country level (derived from request, not stored)
4. **Devices**: Desktop, mobile, tablet distribution
5. **Browsers**: Chrome, Firefox, Safari, Edge, etc.
6. **Operating Systems**: Windows, macOS, Linux, iOS, Android
7. **Time-based**: Hourly, daily, weekly, monthly aggregations

### What Is NOT Collected

- IP addresses
- Personal identifiers
- Cookies or local storage data
- Cross-site tracking information
- Behavioral profiles
- Any data that could identify an individual

## Implementation

### Setup Steps

1. Create an account at [Umami Cloud](https://cloud.umami.is/) (free tier)
2. Add a new website with domain `mohamed-c-a.github.io`
3. Copy the provided tracking script
4. Add the script to `index.html` in the `<head>` section

### Script Integration

The tracking script is added to `index.html`:

```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="YOUR_WEBSITE_ID"></script>
```

Replace `YOUR_WEBSITE_ID` with the actual ID from your Umami dashboard.

### Script Placement

The script is placed in the `<head>` section with the `defer` attribute to ensure:

- Non-blocking page load
- Execution after HTML parsing
- Minimal performance impact

## GitHub Pages Compatibility

Since GitHub Pages only serves static content, server-side analytics tools cannot be used directly. Umami Cloud provides:

- Client-side tracking script
- Cloud-hosted data processing
- Dashboard for viewing statistics
- API access for custom integrations

## Data Access

Analytics data is accessible through:

1. **Umami Dashboard**: Web interface for viewing statistics
2. **Umami API**: Programmatic access for custom reporting

## Security Considerations

### Website ID Exposure

The Umami website ID is visible in the public repository and page source. This is an inherent characteristic of all client-side analytics solutions (including Google Analytics, Plausible, and others).

**Risk**: Third parties could theoretically send fake pageviews to pollute analytics data.

**Assessment**: This is an accepted risk for the following reasons:

1. The data collected is aggregated and anonymous, so pollution would only affect statistics, not privacy
2. Umami Cloud does not offer server-side validation for website IDs
3. The same limitation applies to all client-side analytics platforms
4. For a personal portfolio site, the risk-benefit ratio is acceptable
5. Anomalies in traffic patterns would be visible and can be manually reviewed

**Mitigation**: Periodically review analytics data for unusual patterns. If significant data pollution is detected, consider migrating to a self-hosted Umami instance with additional access controls.

### Subresource Integrity

The analytics script is loaded from an external domain (cloud.umami.is) without Subresource Integrity (SRI) hash verification.

**Why SRI is not implemented**:

1. Umami Cloud serves a dynamically updated script without versioned URLs
2. An SRI hash would break whenever Umami updates their script (which happens regularly)
3. Umami does not publish SRI hashes for their hosted script
4. The trade-off between security and maintenance burden favors omitting SRI in this case

**Mitigation**: The script source is restricted via Content Security Policy (CSP) meta tag in `index.html`, limiting script execution to trusted domains only.

### Content Security Policy

A CSP meta tag is implemented in `index.html` to restrict resource loading:

- Scripts are only allowed from the same origin and `cloud.umami.is`
- This prevents injection of unauthorized scripts
- GitHub Pages does not support HTTP headers, so the meta tag approach is used

## Ethical Considerations

This analytics implementation adheres to the following ethical standards:

1. **Transparency**: This documentation is publicly available
2. **Minimalism**: Only essential metrics are collected
3. **Anonymity**: No individual can be identified from the data
4. **Purpose limitation**: Data is used solely for understanding visitor patterns
5. **No monetization**: Visitor data is never sold or shared with third parties

## Alternatives Considered

| Tool | Decision | Reason |
|------|----------|--------|
| Google Analytics | Rejected | Privacy concerns, requires cookies and consent |
| Plausible | Considered | Good alternative, slightly higher cost |
| Simple Analytics | Considered | Good alternative, no free tier |
| Fathom | Considered | Good alternative, no free tier |
| Matomo | Considered | More complex, requires self-hosting for privacy |

## Maintenance

- Review analytics data periodically to understand visitor patterns
- Update tracking script if Umami releases new versions
- Monitor Umami service status for any outages

## References

- [Umami Documentation](https://umami.is/docs)
- [Umami GitHub Repository](https://github.com/umami-software/umami)
- [GDPR Compliance Guide](https://gdpr.eu/)
