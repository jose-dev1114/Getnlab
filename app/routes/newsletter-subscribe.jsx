import {data} from 'react-router';
import { trackEmailSignup } from '~/lib/facebook-pixel';

// Spam filter functions (reused from early-access.jsx)
function isSpamEmail(email) {
  const spamDomains = [
    '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
    'yopmail.com', 'temp-mail.org', 'throwaway.email', 'getnada.com',
    'maildrop.cc', 'sharklasers.com', 'grr.la', 'guerrillamailblock.com',
    'pokemail.net', 'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com',
    'fakeinbox.com', 'hide.biz.st', 'mytrashmail.com', 'nobulk.com',
    'sogetthis.com', 'spamherelots.com', 'superrito.com', 'zoemail.org'
  ];

  const domain = email.toLowerCase().split('@')[1];
  return spamDomains.includes(domain);
}

function hasSpamKeywords(text) {
  const spamKeywords = [
    'viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations',
    'million', 'inheritance', 'prince', 'nigeria', 'bitcoin', 'crypto',
    'investment', 'loan', 'credit', 'debt', 'mortgage', 'insurance',
    'pharmacy', 'pills', 'weight loss', 'diet', 'supplement'
  ];
  
  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
}

// Action function to handle newsletter subscription
export async function action({request, context}) {
  const formData = await request.formData();
  const email = formData.get('email');

  console.log('📝 Newsletter subscription:', { email });

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

  // Spam filtering
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
    const klaviyoApiKey = context?.env?.KLAVIYO_PRIVATE_API_KEY ||
                          process.env.KLAVIYO_PRIVATE_API_KEY;
    const klaviyoListId = context?.env?.KLAVIYO_LIST_ID ||
                         process.env.KLAVIYO_LIST_ID;

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

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error('Profile creation failed:', profileResponse.status, errorText);
      throw new Error(`Profile creation failed: ${profileResponse.status}`);
    }

    const profileData = await profileResponse.json();
    const profileId = profileData.data.id;

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

    console.log('✅ Newsletter subscription successful!');

    return data({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      trackFacebookPixel: {
        email: email,
        source: 'footer-newsletter'
      }
    });

  } catch (error) {
    console.error('❌ Newsletter subscription failed:', error);

    return data(
      {
        error: 'Something went wrong. Please try again.',
        success: false,
      },
      {status: 500}
    );
  }
}
