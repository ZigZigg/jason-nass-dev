# Microsoft Direct OAuth with Cognito Integration

This implementation allows users to sign in with Microsoft **directly** without going through Cognito's Hosted UI, while still storing users in Cognito User Pool.

## 🎯 Flow Architecture

```
User clicks "Continue with Microsoft"
    ↓
Frontend calls /api/auth/microsoft-oauth
    ↓
API returns Microsoft OAuth URL
    ↓
Browser redirects to Microsoft OAuth
    ↓
User authenticates with Microsoft
    ↓
Microsoft redirects to /api/auth/microsoft-callback
    ↓
API exchanges code for tokens
    ↓
API gets user info from Microsoft Graph
    ↓
API creates/updates user in Cognito User Pool
    ↓
API redirects to /auth/microsoft-signin with session data
    ↓
Client-side page calls NextAuth signIn()
    ↓
NextAuth creates session with Cognito-compatible tokens
    ↓
User redirected to dashboard
```

**Result**: Direct Microsoft OAuth experience + users stored in Cognito User Pool

## Step 1: Configure Microsoft Azure AD Application

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure:
   - **Name**: Your app name (e.g., "NASS Learning Platform")
   - **Supported account types**: "Accounts in any organizational directory and personal Microsoft accounts"
   - **Redirect URI**: 
     - Type: Web
     - URL: `http://localhost:3000/api/auth/microsoft-callback` (development)
     - URL: `https://yourdomain.com/api/auth/microsoft-callback` (production)

5. After registration, note down:
   - **Application (client) ID** → `MICROSOFT_CLIENT_ID`
   - **Directory (tenant) ID**

6. Go to **Certificates & secrets**:
   - Click **New client secret**
   - Add description and set expiration
   - Copy the **Value** → `MICROSOFT_CLIENT_SECRET`

7. Go to **API permissions**:
   - Ensure these permissions are granted:
     - `openid` (should be there by default)
     - `email`
     - `profile`
     - `User.Read`

## Step 2: Environment Variables

Add these to your `.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# AWS Cognito Configuration
COGNITO_CLIENT_ID=your-cognito-app-client-id
COGNITO_CLIENT_SECRET=your-cognito-app-client-secret
COGNITO_USER_POOL_ID=your-cognito-user-pool-id
COGNITO_ISSUER=https://cognito-idp.your-region.amazonaws.com/your-user-pool-id
AWS_REGION=us-east-1

# AWS Credentials (for SDK operations)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

# Microsoft OAuth Configuration (NOW REQUIRED!)
MICROSOFT_CLIENT_ID=your-microsoft-app-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-app-client-secret

# Other API Keys
JASON_PARTNER_API_KEY=your-api-key-here
```

## Step 3: Cognito User Pool Configuration

### 3.1 Add Custom Attributes (Optional)

In your Cognito User Pool, you can add custom attributes to track Microsoft users:

1. Go to **User Pool** > **User attributes**
2. Add custom attributes:
   - `custom:auth_provider` (String)
   - `custom:microsoft_id` (String)

### 3.2 No Federation Setup Required

Unlike the previous approach, you **don't need** to configure Microsoft as a federated identity provider in Cognito. The API handles user creation directly.

## Step 4: Implementation Details

### 4.1 API Routes Created

- **`/api/auth/microsoft-oauth`**: Generates Microsoft OAuth URL
- **`/api/auth/microsoft-callback`**: Handles OAuth callback, creates Cognito user
- **`/api/auth/microsoft-session`**: Prepares session data for NextAuth

### 4.2 Client-Side Page

- **`/auth/microsoft-signin`**: Handles NextAuth session creation

### 4.3 Updated SignIn Component

The Microsoft login button now:
1. Calls `/api/auth/microsoft-oauth` to get OAuth URL
2. Redirects directly to Microsoft OAuth
3. No Cognito Hosted UI involved

## Step 5: Testing

### 5.1 Test the Flow

1. Start your development server: `npm run dev`
2. Go to `/login`
3. Click "Continue with Microsoft"
4. You should be redirected directly to Microsoft login (login.microsoftonline.com)
5. After authentication, you should be redirected back to your app
6. Check that the user appears in your Cognito User Pool

### 5.2 Verify User Data

After successful Microsoft login, check your Cognito User Pool:
- User should appear with email as username
- User attributes should include Microsoft profile data
- Custom attributes should show `auth_provider: microsoft`

## Step 6: Benefits of This Approach

✅ **Direct Microsoft OAuth**: No Cognito Hosted UI redirect
✅ **Custom UI Control**: Full control over login experience
✅ **Cognito Integration**: Users still stored in Cognito User Pool
✅ **Consistent Sessions**: NextAuth handles all session management
✅ **Error Handling**: Comprehensive error handling at each step
✅ **Security**: Proper OAuth 2.0 flow with state parameter

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch"**
   - Ensure Azure AD redirect URI matches exactly: `http://localhost:3000/api/auth/microsoft-callback`

2. **"invalid_client"**
   - Verify `MICROSOFT_CLIENT_ID` and `MICROSOFT_CLIENT_SECRET` are correct
   - Check that client secret hasn't expired

3. **"User creation failed"**
   - Check AWS credentials and Cognito User Pool ID
   - Verify Cognito User Pool allows admin user creation

4. **"Session creation failed"**
   - Check NextAuth configuration
   - Verify credentials provider is properly configured

### Debug Steps:

1. Check browser network tab for API calls
2. Check server logs for detailed error messages
3. Verify all environment variables are loaded
4. Test each API endpoint individually

## Production Deployment

1. **Update Azure AD redirect URI** to production URL
2. **Set production environment variables**
3. **Ensure HTTPS is configured** (required for OAuth)
4. **Test with different Microsoft account types**

## Security Considerations

1. **State Parameter**: CSRF protection implemented
2. **Token Security**: Tokens handled securely server-side
3. **User Validation**: Email verification from Microsoft
4. **Error Handling**: No sensitive data exposed in errors

This implementation provides a seamless Microsoft login experience with full UI control while maintaining Cognito integration! 🚀 