import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function CanonicalManager() {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://4seasonsrightservices.com';
    const cleanPath = location.pathname.replace(/\/$/, '');
    const canonicalUrl = `${baseUrl}${cleanPath || '/'}`;

    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // Sync Open Graph & Twitter URL tags
    const ogUrl = document.querySelector("meta[property='og:url']");
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    const twitterUrl = document.querySelector("meta[name='twitter:url']");
    if (twitterUrl) {
      twitterUrl.setAttribute('content', canonicalUrl);
    }
  }, [location]);

  return null;
}
