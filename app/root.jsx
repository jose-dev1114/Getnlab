import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  data,
} from 'react-router';
import {useEffect} from 'react';
import favicon from '~/assets/favicon.svg';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import tailwindCss from './styles/tailwind.css?url';
import {PageLayout} from './components/PageLayout';
import {FacebookPixelScript, FacebookPixelRouteTracker} from './components/FacebookPixel';

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 * @type {ShouldRevalidateFunction}
 */
export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // For static builds without Shopify backend, return minimal data
  if (!args.context?.storefront) {
    return {
      header: null,
      footer: null,
      cart: null,
      publicStoreDomain: '',
      shop: null,
      consent: null,
    };
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    facebookPixelId: env.PUBLIC_FACEBOOK_PIXEL_ID,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

// Action function to handle newsletter subscription from footer
export async function action({request, context}) {
  const formData = await request.formData();
  const email = formData.get('email');

  console.log('📝 Footer newsletter subscription:', { email });

  // Validate required fields
  if (!email) {
    return data(
      {
        error: 'Email is required',
        success: false,
      },
      {status: 400}
    );
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return data(
      {
        error: 'Please enter a valid email address',
        success: false,
      },
      {status: 400}
    );
  }

  // Spam filtering functions
  const isSpamEmail = (email) => {
    const spamDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
      'yopmail.com', 'temp-mail.org', 'throwaway.email', 'getnada.com',
      'maildrop.cc', 'sharklasers.com', 'grr.la', 'guerrillamailblock.com',
      'pokemail.net', 'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com',
      'fakeinbox.com', 'hide.biz.st', 'mytrashmail.com', 'nobulk.com',
      'sogetthis.com', 'spamherelots.com', 'superrito.com', 'zoemail.org'
    ];

    // SMS gateway domains (phone number + @carrier domain)
    const smsGatewayDomains = [
      'vtext.com', 'txt.att.net', 'tmomail.net', 'messaging.sprintpcs.com',
      'pm.sprint.com', 'vmobl.com', 'mmst5.tracfone.com', 'mymetropcs.com',
      'sms.cricketwireless.net', 'msg.fi.google.com', 'text.republicwireless.com',
      'mailmymobile.net', 'cingularme.com', 'email.uscc.net', 'cspire1.com'
    ];

    const domain = email.toLowerCase().split('@')[1];

    // Check spam domains
    if (spamDomains.includes(domain)) return true;

    // Check SMS gateway domains
    if (smsGatewayDomains.includes(domain)) return true;

    // Check if local part is just numbers (phone number pattern like 5082547892@vtext.com)
    const localPart = email.toLowerCase().split('@')[0];
    if (/^\d{10,}$/.test(localPart)) return true;

    return false;
  };

  const hasSpamKeywords = (text) => {
    const spamKeywords = [
      'viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations',
      'million', 'inheritance', 'prince', 'nigeria', 'bitcoin', 'crypto',
      'investment', 'loan', 'credit', 'debt', 'mortgage', 'insurance',
      'pharmacy', 'pills', 'weight loss', 'diet', 'supplement'
    ];
    const lowerText = text.toLowerCase();
    return spamKeywords.some(keyword => lowerText.includes(keyword));
  };

  // Apply spam filtering
  if (isSpamEmail(email)) {
    console.log('🚫 Blocked spam email:', email);
    return data(
      {
        error: 'Please use a valid email address.',
        success: false,
      },
      {status: 400}
    );
  }

  if (hasSpamKeywords(email)) {
    console.log('🚫 Blocked spam keywords in email:', email);
    return data(
      {
        error: 'Invalid submission detected.',
        success: false,
      },
      {status: 400}
    );
  }

  try {
    // Klaviyo API integration
    const klaviyoApiKey = context?.env?.KLAVIYO_PRIVATE_API_KEY;
    const klaviyoListId = context?.env?.KLAVIYO_LIST_ID;

    if (!klaviyoApiKey || !klaviyoListId) {
      return data(
        {
          error: 'Configuration error. Please check environment variables.',
          success: false,
        },
        {status: 500}
      );
    }

    // Create or update profile in Klaviyo
    const requestBody = {
      data: {
        type: 'profile',
        attributes: {
          email: email,
          properties: {
            source: 'Footer Newsletter',
            signup_date: new Date().toISOString(),
          },
        },
      },
    };

    const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15',
      },
      body: JSON.stringify(requestBody),
    });

    let profileId;

    if (profileResponse.status === 409) {
      // Profile already exists - try to get existing profile by email
      const existingProfileResponse = await fetch(
        `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${encodeURIComponent(email)}")`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
            'Content-Type': 'application/json',
            'revision': '2024-10-15',
          },
        }
      );

      if (existingProfileResponse.ok) {
        const existingData = await existingProfileResponse.json();
        if (existingData.data && existingData.data.length > 0) {
          profileId = existingData.data[0].id;
          console.log('📧 Found existing profile:', profileId);
        }
      }

      if (!profileId) {
        console.error('Could not find existing profile for email:', email);
        throw new Error('Profile lookup failed');
      }
    } else if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error('Profile creation failed:', profileResponse.status, errorText);
      throw new Error(`Profile creation failed: ${profileResponse.status}`);
    } else {
      const profileData = await profileResponse.json();
      profileId = profileData.data.id;
      console.log('✨ Created new profile:', profileId);
    }

    // Subscribe to list
    const listResponse = await fetch(`https://a.klaviyo.com/api/lists/${klaviyoListId}/relationships/profiles/`, {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15',
      },
      body: JSON.stringify({
        data: [
          {
            type: 'profile',
            id: profileId,
          },
        ],
      }),
    });

    if (!listResponse.ok && listResponse.status !== 409) {
      console.warn('List subscription failed:', listResponse.status);
    }

    console.log('✅ Footer newsletter subscription successful!');

    return data({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      trackFacebookPixel: {
        email: email,
        source: 'footer-newsletter'
      }
    });

  } catch (error) {
    console.error('❌ Footer newsletter subscription failed:', error);

    return data(
      {
        error: 'Something went wrong. Please try again.',
        success: false,
      },
      {status: 500}
    );
  }
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const {storefront} = context;

  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {header};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const {storefront, customerAccount, cart} = context;

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

/**
 * @param {{children?: React.ReactNode, facebookPixelId?: string}}
 */
export function Layout({children, facebookPixelId}) {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        {/* Google Tag Manager - as high in head as possible */}
        <script nonce={nonce} dangerouslySetInnerHTML={{__html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TS6GFQZ5');
        `}} />

        {/* UTM Cookie Script - saves query string to cookie when URL contains utm */}
        <script nonce={nonce} dangerouslySetInnerHTML={{__html: `
          if (window.location.search.indexOf('utm') > -1) {
            document.cookie = "source_query=" + window.location.search + "; expires=" + new Date(Date.now() + 99 * 864e5).toUTCString() + "; path=/";
          }
        `}} />

        <link rel="preconnect" href="https://fonts.googleapis.com" nonce={nonce} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" nonce={nonce} />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet" nonce={nonce} />

        <style nonce={nonce}>{`
          @font-face {
            font-family: 'TitlingGothicFB Comp';
            src: url('/TitlingGothicFBComp-Med.otf') format('opentype');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
        <Meta />
        <Links />
        <link rel="stylesheet" href={tailwindCss}></link>
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />

        {/* UTM Hidden Fields Filler - runs on DOM ready */}
        <script nonce={nonce} dangerouslySetInnerHTML={{__html: `
          document.addEventListener('DOMContentLoaded', function() {
            function getCookie(name) {
              var cookieArr = document.cookie.match(new RegExp("(^|;)\\\\s*" + name + "\\\\s*=\\\\s*([^;]+)"));
              return cookieArr ? cookieArr[2] : undefined;
            }

            var sourceQuery = getCookie('source_query');

            var inputElements = {
              "utm_source": 'input[name="utm_source"]',
              "utm_medium": 'input[name="utm_medium"]',
              "utm_campaign": 'input[name="utm_campaign"]',
              "utm_term": 'input[name="utm_term"]'
            };

            var urlParams = new URLSearchParams(sourceQuery);

            for (var key in inputElements) {
              if (urlParams.has(key)) {
                var value = urlParams.get(key);
                var inputFields = document.querySelectorAll(inputElements[key]);
                inputFields.forEach(function(inputField) {
                  if (inputField) {
                    inputField.value = value;
                  }
                });
              }
            }
          });
        `}} />
      </body>
    </html>
  );
}

export default function App() {
  /** @type {RootLoader} */
  const data = useRouteLoaderData('root');

  // Initialize Facebook Pixel
  useEffect(() => {
    if (data?.facebookPixelId && typeof window !== 'undefined') {
      console.log('🔍 Initializing Facebook Pixel:', data.facebookPixelId);

      // Facebook Pixel Code
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq('init', data.facebookPixelId);
      window.fbq('track', 'PageView');
      console.log('✅ Facebook Pixel initialized:', data.facebookPixelId);
    }
  }, [data?.facebookPixelId]);

  if (!data) {
    return <Outlet />;
  }

  return (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      <FacebookPixelRouteTracker pixelId={data.facebookPixelId} />
      <PageLayout {...data}>
        <Outlet />
      </PageLayout>
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const data = useRouteLoaderData('root');
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Layout facebookPixelId={data?.facebookPixelId}>
      <div className="route-error">
        <h1>Oops</h1>
        <h2>{errorStatus}</h2>
        {errorMessage && (
          <fieldset>
            <pre>{errorMessage}</pre>
          </fieldset>
        )}
      </div>
    </Layout>
  );
}

/** @typedef {LoaderReturnData} RootLoader */

/** @typedef {import('react-router').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('./+types/root').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
