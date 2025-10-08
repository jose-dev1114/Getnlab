# Klaviyo Integration Setup

This guide will help you set up Klaviyo integration for the early access form.

## Prerequisites

1. A Klaviyo account (free tier available)
2. Access to your Klaviyo dashboard

## Setup Steps

### 1. Get Your Klaviyo Private API Key

1. Log in to your Klaviyo account
2. Go to **Account** > **Settings** > **API Keys**
3. Click **Create Private API Key**
4. Give it a name like "nLab Early Access"
5. Select the following scopes:
   - **Profiles**: Read, Write
   - **Lists**: Read, Write
6. Copy the generated API key

### 2. Create or Find Your List ID

1. Go to **Lists & Segments** in your Klaviyo dashboard
2. Either create a new list called "Early Access" or use an existing one
3. Click on your list name
4. Go to **Settings** tab
5. Copy the **List ID** (it looks like: `ABC123`)

### 3. Update Environment Variables

1. Open your `.env` file
2. Replace the placeholder values:
   ```env
   KLAVIYO_PRIVATE_API_KEY="pk_your_actual_private_key_here"
   KLAVIYO_LIST_ID="ABC123"
   ```

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/early-access` page
3. Fill out and submit the form
4. Check your Klaviyo dashboard to see if the profile was created

## What the Integration Does

- **Creates/Updates Profiles**: When someone submits the form, it creates or updates their profile in Klaviyo
- **Adds to List**: Automatically subscribes them to your early access list
- **Stores Custom Properties**: Saves their interest selection and signup source
- **Error Handling**: Gracefully handles API errors and shows user-friendly messages

## Klaviyo Features You Can Use

Once profiles are in Klaviyo, you can:

- **Send Welcome Emails**: Set up automated welcome sequences
- **Segment Users**: Create segments based on interests (Light, Sound, AI, etc.)
- **Track Engagement**: Monitor email opens, clicks, and engagement
- **A/B Test**: Test different email content and timing
- **Analytics**: View signup trends and conversion metrics

## Troubleshooting

### Common Issues

1. **"Configuration error" message**
   - Check that both `KLAVIYO_PRIVATE_API_KEY` and `KLAVIYO_LIST_ID` are set in `.env`
- Restart your development server after updating `.env`

2. **"Failed to create profile" error**
   - Verify your API key has the correct scopes (Profiles: Read/Write)
   - Check that the API key is active in your Klaviyo dashboard

3. **Profile created but not added to list**
   - Verify the List ID is correct
   - Check that your API key has Lists: Read/Write permissions

### Testing in Development

You can test with real email addresses in development. Klaviyo will create actual profiles, so use test emails or your own email for testing.

## Production Deployment

When deploying to production:

1. Set the environment variables in your hosting platform
2. Use your production Klaviyo account and API keys
3. Consider setting up separate lists for development and production

## Next Steps

After setting up Klaviyo:

1. **Create Welcome Flow**: Set up an automated email sequence for new subscribers
2. **Design Templates**: Create branded email templates
3. **Set Up Segments**: Create segments based on user interests
4. **Monitor Performance**: Track signup rates and email engagement
