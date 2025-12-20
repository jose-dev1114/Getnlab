import { useLoaderData } from 'react-router';
import { data } from 'react-router';

export const meta = () => {
  return [{ title: 'Signup Dashboard | nLab Admin' }];
};

export const loader = async ({ context }) => {
  // Get environment variables
  const klaviyoApiKey = context?.env?.KLAVIYO_PRIVATE_API_KEY || process.env.KLAVIYO_PRIVATE_API_KEY;
  const klaviyoListId = context?.env?.KLAVIYO_LIST_ID || process.env.KLAVIYO_LIST_ID;
  const shopifyDomain = context?.env?.PUBLIC_STORE_DOMAIN || process.env.PUBLIC_STORE_DOMAIN;
  const shopifyToken = context?.env?.PRIVATE_STOREFRONT_API_TOKEN || process.env.PRIVATE_STOREFRONT_API_TOKEN;

  let klaviyoProfiles = [];
  let shopifyOrders = [];
  let error = null;

  try {
    // Fetch Klaviyo profiles directly from the list
    if (klaviyoApiKey && klaviyoListId) {
      console.log('Fetching Klaviyo profiles for list:', klaviyoListId);

      // First, get the list information and profile count
      const listResponse = await fetch(
        `https://a.klaviyo.com/api/lists/${klaviyoListId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
            'revision': '2024-10-15',
            'Accept': 'application/json',
          },
        }
      );

      if (listResponse.ok) {
        const listData = await listResponse.json();
        console.log('List data:', listData);

        // Now get all profiles in the list with their details
        const profilesResponse = await fetch(
          `https://a.klaviyo.com/api/lists/${klaviyoListId}/profiles/?page[size]=100`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
              'revision': '2024-10-15',
              'Accept': 'application/json',
            },
          }
        );

        if (profilesResponse.ok) {
          const profilesData = await profilesResponse.json();
          console.log('Profiles data:', profilesData);
          klaviyoProfiles = profilesData.data || [];

          // If there are more profiles, fetch additional pages
          let nextUrl = profilesData.links?.next;
          while (nextUrl && klaviyoProfiles.length < 5000) { // Increased limit
            const nextResponse = await fetch(nextUrl, {
              headers: {
                'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
                'revision': '2024-10-15',
                'Accept': 'application/json',
              },
            });

            if (nextResponse.ok) {
              const nextData = await nextResponse.json();
              klaviyoProfiles = [...klaviyoProfiles, ...(nextData.data || [])];
              nextUrl = nextData.links?.next;
            } else {
              break;
            }
          }

          console.log('Total profiles fetched:', klaviyoProfiles.length);
        } else {
          console.error('Failed to fetch profiles:', profilesResponse.status, await profilesResponse.text());
        }
      } else {
        console.error('Failed to fetch list:', listResponse.status, await listResponse.text());
      }
    }

    // Fetch Shopify orders (simplified - you'd need proper Admin API setup)
    // This is a placeholder - you'd need to set up Shopify Admin API access
    if (shopifyDomain && shopifyToken) {
      // Note: This would require Admin API token, not Storefront API
      // For now, we'll show a message about setting up Admin API
    }

  } catch (err) {
    console.error('Error fetching signup data:', err);
    error = err.message;
  }

  // Calculate stats
  const popupSignups = klaviyoProfiles.filter(profile =>
    profile.attributes?.properties?.source === 'Kickstarter Popup'
  ).length;

  const formSignups = klaviyoProfiles.filter(profile =>
    profile.attributes?.properties?.source === 'Early Access Form'
  ).length;

  const interestBreakdown = klaviyoProfiles.reduce((acc, profile) => {
    const interest = profile.attributes?.properties?.interest || 'Unknown';
    acc[interest] = (acc[interest] || 0) + 1;
    return acc;
  }, {});

  return data({
    klaviyoProfiles,
    shopifyOrders,
    error,
    hasKlaviyo: !!(klaviyoApiKey && klaviyoListId),
    hasShopify: !!(shopifyDomain && shopifyToken),
    stats: {
      totalEmailSignups: klaviyoProfiles.length,
      popupSignups,
      formSignups,
      interestBreakdown,
    },
  });
};

// Map interest values to labels
const interestLabels = {
  '1': 'High school/college skills',
  '2': 'Career advancement',
  '3': 'Parent - STEM activities',
  '4': 'Fun/creative projects',
  '5': 'Gift',
  '6': 'Support Kickstarter',
  '7': 'Other',
  'General Interest': 'General Interest',
  'Not specified': 'Not specified',
};

const getInterestLabel = (interest) => {
  if (!interest) return 'Not specified';
  return interestLabels[interest] || interest;
};

export default function AdminSignups() {
  const { klaviyoProfiles, shopifyOrders, error, hasKlaviyo, hasShopify, stats } = useLoaderData();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>nLab Signup Dashboard</h1>
      
      {error && (
        <div style={{ background: '#fee', border: '1px solid #fcc', padding: '1rem', marginBottom: '2rem', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Klaviyo Email Signups */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Email Signups (Klaviyo)</h2>
        {!hasKlaviyo ? (
          <p style={{ color: '#666' }}>
            Klaviyo not configured. Set KLAVIYO_PRIVATE_API_KEY and KLAVIYO_LIST_ID in your environment.
          </p>
        ) : klaviyoProfiles.length === 0 ? (
          <p>No email signups found.</p>
        ) : (
          <div>
            <p><strong>Total Email Signups:</strong> {stats?.totalEmailSignups || klaviyoProfiles.length}</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Source</th>
                    <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Interest</th>
                    <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {klaviyoProfiles.map((profile, index) => (
                    <tr key={profile.id || index}>
                      <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                        {profile.attributes?.email || 'N/A'}
                      </td>
                      <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                        {profile.attributes?.first_name} {profile.attributes?.last_name}
                      </td>
                      <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                        {profile.attributes?.properties?.source || 'Unknown'}
                      </td>
                      <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                        {getInterestLabel(profile.attributes?.properties?.interest)}
                      </td>
                      <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                        {profile.attributes?.properties?.signup_date ? 
                          new Date(profile.attributes.properties.signup_date).toLocaleDateString() : 
                          'N/A'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Shopify Pre-Orders */}
      <section>
        <h2>$1 Pre-Order Reservations (Shopify)</h2>
        {!hasShopify ? (
          <div>
            <p style={{ color: '#666' }}>
              To view Shopify pre-orders, you need to:
            </p>
            <ol>
              <li>Set up Shopify Admin API access</li>
              <li>Add SHOPIFY_ADMIN_API_TOKEN to your environment</li>
              <li>Or check directly in your Shopify Admin → Orders</li>
            </ol>
            <p>
              <strong>Manual Check:</strong> Go to your Shopify Admin → Orders and filter by your pre-order product.
            </p>
          </div>
        ) : (
          <p>Shopify integration coming soon...</p>
        )}
      </section>

      {/* Quick Stats */}
      <section style={{ marginTop: '3rem', padding: '1rem', background: '#f9f9f9', borderRadius: '4px' }}>
        <h3>Quick Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <strong>Total Email Signups:</strong> {stats?.totalEmailSignups || 0}
          </div>
          <div>
            <strong>Popup Signups:</strong> {stats?.popupSignups || 0}
          </div>
          <div>
            <strong>Form Signups:</strong> {stats?.formSignups || 0}
          </div>
          <div>
            <strong>Pre-Orders:</strong> Check Shopify Admin
          </div>
        </div>

        {stats?.interestBreakdown && Object.keys(stats.interestBreakdown).length > 0 && (
          <div>
            <h4>Interest Breakdown:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {Object.entries(stats.interestBreakdown).map(([interest, count]) => (
                <div key={interest} style={{ fontSize: '0.9rem' }}>
                  <strong>{getInterestLabel(interest)}:</strong> {count}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Export Options */}
      <section style={{ marginTop: '2rem' }}>
        <h3>Export Data</h3>
        <p>To export your data:</p>
        <ul>
          <li><strong>Klaviyo:</strong> Go to Lists & Segments → Your List → Export</li>
          <li><strong>Shopify:</strong> Go to Orders → Export (filter by pre-order product)</li>
        </ul>
      </section>
    </div>
  );
}
