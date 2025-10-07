import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <header className="header nlab-header">
      <NavLink prefetch="intent" to="/" className="nlab-logo" end>
        <img src="/svg/logo.svg" alt="NLAB" />
      </NavLink>
      <HeaderCtas
        isLoggedIn={isLoggedIn}
        cart={cart}
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  // Only render for mobile viewport since desktop is now in HeaderCtas
  if (viewport !== 'mobile') {
    return null;
  }

  return (
    <nav className={className} role="navigation">
      <NavLink
        end
        onClick={close}
        prefetch="intent"
        to="/"
      >
        Home
      </NavLink>
      {FALLBACK_HEADER_MENU.items.map((item) => {
        if (!item.url) return null;

        // Check if URL is external
        const isExternal = item.url.startsWith('http://') || item.url.startsWith('https://');

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        // Render external links as regular anchor tags
        if (isExternal) {
          return (
            <a
              className="header-menu-item"
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              {item.title}
            </a>
          );
        }

        // Render internal links as NavLinks
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'> & {primaryDomainUrl: string, publicStoreDomain: string}}
 */
function HeaderCtas({isLoggedIn, cart, primaryDomainUrl, publicStoreDomain}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />

      {/* Desktop Menu Items */}
      <div className="header-menu-desktop">
        {FALLBACK_HEADER_MENU.items.map((item) => {
          if (!item.url) return null;

          // Check if URL is external
          const isExternal = item.url.startsWith('http://') || item.url.startsWith('https://');

          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;

          // Render external links as regular anchor tags
          if (isExternal) {
            return (
              <a
                className="header-menu-item"
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            );
          }

          // Render internal links as NavLinks
          return (
            <NavLink
              className="header-menu-item"
              end
              key={item.id}
              prefetch="intent"
              to={url}
            >
              {item.title}
            </NavLink>
          );
        })}
      </div>

      <NavLink prefetch="intent" to="/early-access" className="get-early-access-btn">
        Get Early Access
      </NavLink>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Starter Kit',
      type: 'HTTP',
      url: '/starter-kit',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Explore Projects',
      type: 'HTTP',
      url: '/explore-projects',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Download App',
      type: 'HTTP',
      url: '/download',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: null,
      tags: [],
      title: 'About Us',
      type: 'HTTP',
      url: '/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599033',
      resourceId: null,
      tags: [],
      title: 'Join Our Community',
      type: 'HTTP',
      url: '/community',
      items: [],
    },
  ],
};

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
