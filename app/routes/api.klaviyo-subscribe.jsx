export async function action({ request, context }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { email, fullName } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!fullName) {
      return new Response(JSON.stringify({ error: 'Full name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Klaviyo API integration - get from environment variables
    const klaviyoApiKey = context?.env?.KLAVIYO_PRIVATE_API_KEY ||
                          process.env.KLAVIYO_PRIVATE_API_KEY;
    const klaviyoListId = context?.env?.KLAVIYO_LIST_ID ||
                         process.env.KLAVIYO_LIST_ID;

    if (!klaviyoApiKey || !klaviyoListId) {
      return new Response(JSON.stringify({
        error: 'Configuration error. Please check environment variables.',
        success: false
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create or update profile in Klaviyo
    const [firstName, ...lastNameParts] = fullName.trim().split(' ');
    const lastName = lastNameParts.join(' ');

    const requestBody = {
      data: {
        type: 'profile',
        attributes: {
          email: email,
          first_name: firstName,
          last_name: lastName || '',
          properties: {
            source: 'Kickstarter Popup',
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
    if (profileResponse.ok) {
      const profileData = await profileResponse.json();
      profileId = profileData.data.id;
    } else if (profileResponse.status === 409) {
      // Profile already exists, get the profile ID
      const existingProfileResponse = await fetch(`https://a.klaviyo.com/api/profiles/?filter=equals(email,"${email}")`, {
        method: 'GET',
        headers: {
          'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
          'Content-Type': 'application/json',
          'revision': '2024-10-15',
        },
      });

      if (existingProfileResponse.ok) {
        const existingProfileData = await existingProfileResponse.json();
        if (existingProfileData.data && existingProfileData.data.length > 0) {
          profileId = existingProfileData.data[0].id;
        }
      }
    } else {
      const errorText = await profileResponse.text();
      console.error('Profile creation failed:', profileResponse.status, errorText);
      throw new Error('Failed to create profile');
    }

    // Add profile to the list
    if (profileId) {
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
        // Don't fail the whole process if list subscription fails (409 means already subscribed)
        console.warn('List subscription failed:', listResponse.status);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully joined the Kickstarter launch list! 🎉'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Klaviyo subscription error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to subscribe. Please try again later.',
      success: false
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
