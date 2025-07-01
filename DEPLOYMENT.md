# Deployment Guide

This guide covers deploying K-Beauty Hub to various platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`

### GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d build
```

## 📋 Prerequisites

- Node.js 16+ installed
- Git repository set up
- Build passes locally (`npm run build`)

## 🔧 Environment Variables

Create `.env` file for production:
```env
REACT_APP_API_URL=your-api-url
REACT_APP_GA_TRACKING_ID=your-ga-id
```

## 📦 Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test build locally
npx serve -s build
```

## 🌐 Domain Configuration

### Custom Domain Setup
1. Add domain in hosting platform
2. Update DNS records
3. Configure SSL certificate
4. Update `public/manifest.json` and `public/index.html`

### SEO Optimization
- Update meta tags in `public/index.html`
- Configure robots.txt
- Add sitemap.xml
- Set up Google Analytics

## 📊 Performance Monitoring

### Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse https://your-site.com
```

### Core Web Vitals
- Monitor with Google PageSpeed Insights
- Set up Real User Monitoring (RUM)
- Track Core Web Vitals metrics

## 🔒 Security Considerations

- Enable HTTPS
- Set security headers
- Configure CSP (Content Security Policy)
- Regular dependency updates
- Environment variable protection

## 📱 PWA Configuration

### Manifest Updates
Update `public/manifest.json`:
```json
{
  "name": "K-Beauty Hub",
  "short_name": "K-Beauty",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#8b5cf6",
  "background_color": "#ffffff"
}
```

### Service Worker
- Ensure service worker is registered
- Test offline functionality
- Configure caching strategies

## 🔄 CI/CD Pipeline

### GitHub Actions
The project includes `.github/workflows/ci.yml` for:
- Automated testing
- Type checking
- Build verification
- Automatic deployment

### Manual Deployment
```bash
# Build and deploy
npm run build
# Upload build folder to hosting platform
```

## 📞 Support

For deployment issues:
1. Check build logs
2. Verify environment variables
3. Test locally first
4. Review hosting platform documentation 