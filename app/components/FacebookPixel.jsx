import {useEffect} from 'react';
import {useLocation} from 'react-router';

/**
 * Facebook Pixel Route Tracker - handles page view tracking on route changes
 * Note: The main pixel script is loaded server-side in the head
 * @param {Object} props
 * @param {string} props.pixelId - Facebook Pixel ID (for validation)
 */
export function FacebookPixelRouteTracker({pixelId}) {
  const location = useLocation();

  useEffect(() => {
    // Only track if pixel is loaded and we have a valid pixel ID
    if (typeof window !== 'undefined' && window.fbq && pixelId) {
      // Track page view on route change (except initial load which is handled server-side)
      window.fbq('track', 'PageView');
      console.log('🎯 Facebook Pixel: Route PageView tracked for', location.pathname);
    }
  }, [location.pathname, pixelId]);

  return null;
}

/**
 * Facebook Pixel Script for server-side rendering
 * @param {Object} props
 * @param {string} props.pixelId - Facebook Pixel ID
 * @param {string} props.nonce - CSP nonce for script execution
 */
export function FacebookPixelScript({pixelId, nonce}) {
  console.log('🔍 FacebookPixelScript Debug:', { pixelId, nonce });
  if (!pixelId) {
    console.log('❌ No Facebook Pixel ID provided');
    return null;
  }

  const pixelScript = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
    console.log('✅ Facebook Pixel loaded via server script:', '${pixelId}');
  `;

  return (
    <>
      {/* Debug comment to verify rendering */}
      {/* Facebook Pixel ID: {pixelId} */}
      <script
        nonce={nonce}
        dangerouslySetInnerHTML={{__html: pixelScript}}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{display: 'none'}}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/**
 * Track Facebook Pixel events
 * @param {string} eventName - Event name (e.g., 'Lead', 'Purchase', 'AddToCart')
 * @param {Object} parameters - Event parameters
 */
export function trackFacebookEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
}

/**
 * Track custom Facebook Pixel events
 * @param {string} eventName - Custom event name
 * @param {Object} parameters - Event parameters
 */
export function trackCustomFacebookEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, parameters);
  }
}
