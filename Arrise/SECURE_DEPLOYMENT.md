# Secure Deployment Guide for Phoenix Confidence Companion

This guide provides step-by-step instructions for securely deploying the Phoenix Confidence Companion application to various hosting environments.

## Table of Contents
1. [Pre-Deployment Security Checklist](#pre-deployment-security-checklist)
2. [Deployment Options](#deployment-options)
   - [Static Hosting Services](#static-hosting-services)
   - [Self-Hosted Options](#self-hosted-options)
3. [HTTPS Configuration](#https-configuration)
4. [Security Headers](#security-headers)
5. [Content Delivery Network (CDN) Setup](#content-delivery-network-cdn-setup)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Pre-Deployment Security Checklist

Before deploying the application, ensure you've completed the following security checks:

- [ ] Remove any development credentials or API keys
- [ ] Verify all file permissions are correctly set
- [ ] Ensure no sensitive data is included in the codebase
- [ ] Check that the `.gitignore` file is properly configured
- [ ] Verify all dependencies are up-to-date and free of known vulnerabilities
- [ ] Run a security scan on the codebase
- [ ] Test the application for common vulnerabilities (XSS, CSRF, etc.)
- [ ] Ensure proper error handling is implemented

## Deployment Options

### Static Hosting Services

#### 1. Netlify (Recommended for Security)

Netlify provides excellent security features out of the box, including free HTTPS, HTTP/2, and security headers.

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy the site
cd production
netlify deploy --prod
```

**Security Configuration:**
- Enable branch deploys with preview environments
- Configure security headers in `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://cdnjs.cloudflare.com; img-src 'self' data:; font-src 'self' https://cdnjs.cloudflare.com; connect-src 'self'"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

#### 2. Vercel

Vercel also provides excellent security features similar to Netlify.

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy the site
cd production
vercel --prod
```

**Security Configuration:**
- Configure security headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://cdnjs.cloudflare.com; img-src 'self' data:; font-src 'self' https://cdnjs.cloudflare.com; connect-src 'self'"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

#### 3. AWS S3 + CloudFront

For enterprise-grade security with fine-grained control:

1. Create an S3 bucket with static website hosting enabled
2. Upload the production files to the S3 bucket
3. Create a CloudFront distribution pointing to the S3 bucket
4. Configure CloudFront to use HTTPS only
5. Set up security headers using Lambda@Edge

**Security Configuration for CloudFront:**
- Enable AWS WAF (Web Application Firewall)
- Configure security headers using Lambda@Edge
- Enable access logging
- Use Origin Access Identity to restrict direct S3 access

### Self-Hosted Options

#### 1. Nginx Server

For self-hosting with Nginx:

1. Install Nginx on your server
2. Copy the production files to your web root directory
3. Configure Nginx with the following security settings:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL Configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://cdnjs.cloudflare.com; img-src 'self' data:; font-src 'self' https://cdnjs.cloudflare.com; connect-src 'self'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Root directory
    root /var/www/phoenix-app;
    index index.html;

    # Handle service worker
    location /service-worker.js {
        add_header Cache-Control "no-cache";
        expires -1;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}
```

## HTTPS Configuration

Regardless of your hosting choice, ensure proper HTTPS configuration:

1. **Certificate Options:**
   - Let's Encrypt (free, automated)
   - Commercial SSL certificate
   - Self-signed certificates (for development only)

2. **HTTPS Best Practices:**
   - Use TLS 1.2 or higher
   - Disable older protocols (SSL 3.0, TLS 1.0, TLS 1.1)
   - Use strong cipher suites
   - Implement HSTS (HTTP Strict Transport Security)
   - Consider HSTS preloading
   - Regularly renew certificates (automate if possible)

3. **Certificate Monitoring:**
   - Set up alerts for certificate expiration
   - Use services like SSL Labs to test your configuration
   - Monitor for TLS/SSL vulnerabilities

## Security Headers

Implement the following security headers regardless of hosting platform:

1. **Content-Security-Policy (CSP)**
   - Restricts resource loading to trusted sources
   - Mitigates XSS attacks
   - Start with a strict policy and relax as needed

2. **Strict-Transport-Security (HSTS)**
   - Forces HTTPS connections
   - Recommended setting: `max-age=31536000; includeSubDomains; preload`

3. **X-Content-Type-Options**
   - Prevents MIME type sniffing
   - Always set to `nosniff`

4. **X-Frame-Options**
   - Prevents clickjacking attacks
   - Set to `DENY` or `SAMEORIGIN`

5. **X-XSS-Protection**
   - Enables browser's built-in XSS protection
   - Set to `1; mode=block`

6. **Referrer-Policy**
   - Controls information in the Referer header
   - Recommended setting: `strict-origin-when-cross-origin`

7. **Permissions-Policy** (formerly Feature-Policy)
   - Restricts which browser features the site can use
   - Example: `camera=(), microphone=(), geolocation=()`

## Content Delivery Network (CDN) Setup

Using a CDN improves both performance and security:

1. **CDN Options:**
   - Cloudflare (offers free tier with security features)
   - AWS CloudFront
   - Fastly
   - Akamai

2. **Security Benefits:**
   - DDoS protection
   - WAF (Web Application Firewall)
   - Bot protection
   - Rate limiting
   - Caching to reduce origin server load

3. **Cloudflare Specific Setup:**
   - Enable HTTPS (Full or Full Strict mode)
   - Enable Always Use HTTPS
   - Enable HSTS
   - Configure security level (Medium or High)
   - Enable WAF with managed rules
   - Configure rate limiting rules

## Monitoring and Maintenance

1. **Security Monitoring:**
   - Set up uptime monitoring
   - Configure security scanning
   - Monitor for unusual traffic patterns
   - Set up alerts for security events

2. **Regular Maintenance:**
   - Update dependencies regularly
   - Apply security patches promptly
   - Review and update security configurations
   - Conduct periodic security audits

3. **Logging:**
   - Enable access logs
   - Monitor for suspicious activities
   - Retain logs for an appropriate period
   - Consider centralized logging solutions

---

By following this secure deployment guide, you'll ensure that the Phoenix Confidence Companion application is deployed with industry-standard security practices, protecting both the application and its users.