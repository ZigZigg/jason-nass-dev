# Google OAuth Integration with AWS Cognito

This implementation provides direct Google OAuth login that integrates with AWS Cognito User Pool, bypassing Cognito's Hosted UI while maintaining full Cognito integration.

## Architecture Overview

```
User → Google OAuth → Your API → Cognito User Pool → NextAuth Session
```

### Flow:
1. User clicks "Continue with Google" button
2. Redirected to Google OAuth consent screen
3. Google redirects back to your callback with auth code
4. Your API exchanges code for Google tokens
5. Fetch user info from Google API
6. Create/update user in Cognito User Pool
7. Create NextAuth session with Cognito integration

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API (or Google People API)
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen:
   - Application type: Web application
   - Authorized redirect URIs: `https://yourdomain.com/api/auth/google-callback`

### 2. Environment Variables

Add these to your `.env.local`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AWS Cognito (existing)
COGNITO_USER_POOL_ID=your-cognito-user-pool-id
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

# NextAuth (existing)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret
```

### 3. Cognito User Pool Configuration

#### Required Custom Attributes

Add these custom attributes to your Cognito User Pool:

```bash
# Using AWS CLI
aws cognito-idp add-custom-attributes \
  --user-pool-id your-user-pool-id \
  --custom-attributes \
    Name=auth_provider,AttributeDataType=String,Mutable=true \
    Name=google_id,AttributeDataType=String,Mutable=true
```

#### Create User Groups

```bash
# Create groups for Google users
aws cognito-idp create-group \
  --group-name "google-users" \
  --user-pool-id your-user-pool-id \
  --description "Users who signed up via Google"

aws cognito-idp create-group \
  --group-name "microsoft-users" \
  --user-pool-id your-user-pool-id \
  --description "Users who signed up via Microsoft"

aws cognito-idp create-group \
  --group-name "external-users" \
  --user-pool-id your-user-pool-id \
  --description "External users (non-company domain)"

aws cognito-idp create-group \
  --group-name "internal-users" \
  --user-pool-id your-user-pool-id \
  --description "Internal users (company domain)"

aws cognito-idp create-group \
  --group-name "administrators" \
  --user-pool-id your-user-pool-id \
  --description "Administrator users"

aws cognito-idp create-group \
  --group-name "dev-users" \
  --user-pool-id your-user-pool-id \
  --description "Development environment users"
```

## API Routes

### 1. `/api/auth/google-oauth` (GET)
- Generates Google OAuth authorization URL
- Returns: `{ authUrl: string, state: string }`

### 2. `/api/auth/google-callback` (GET)
- Handles Google OAuth callback
- Exchanges authorization code for tokens
- Creates/updates user in Cognito
- Redirects to session creation endpoint

### 3. `/api/auth/google-session` (GET)
- Prepares session data for NextAuth
- Redirects to client-side session creation page

### 4. `/auth/google-signin` (Client Page)
- Handles NextAuth session creation
- Redirects to dashboard on success

## User Attributes Stored in Cognito

When a user signs up via Google, these attributes are stored:

```javascript
{
  email: "user@example.com",
  email_verified: "true",
  name: "John Doe",
  given_name: "John",
  family_name: "Doe",
  picture: "https://lh3.googleusercontent.com/...",
  "custom:auth_provider": "google",
  "custom:google_id": "google-user-id"
}
```

## Group Assignment Logic

Users are automatically assigned to groups based on:

1. **Default**: All Google users → `google-users` group
2. **Domain-based**: 
   - Company domain → `internal-users`
   - External domain → `external-users`
3. **Role-based**: Name contains "admin" → `administrators`
4. **Environment-based**: Development → `dev-users`

Customize the `determineUserGroups()` function in `google-callback/route.ts`.

## Security Features

- **State Parameter**: CSRF protection during OAuth flow
- **Token Validation**: Validates Google tokens before user creation
- **Email Verification**: Automatically sets `email_verified=true` (Google verified)
- **User Confirmation**: Automatically confirms users (no email verification needed)
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Error Handling

The implementation handles these error scenarios:

- Invalid/missing authorization code
- Google API failures
- Cognito user creation failures
- Session creation failures
- Network timeouts

Users are redirected to login page with appropriate error messages.

## Customization

### Modify User Groups
Edit `determineUserGroups()` in `src/app/api/auth/google-callback/route.ts`:

```javascript
function determineUserGroups(userInfo: GoogleUserInfo): string[] {
  const groups: string[] = [];
  
  // Your custom logic here
  const domain = userInfo.email.split('@')[1];
  
  if (domain === 'yourcompany.com') {
    groups.push('employees');
  }
  
  return groups;
}
```

### Add More User Attributes
Modify the `AdminCreateUserCommand` in `createOrUpdateCognitoUser()`:

```javascript
UserAttributes: [
  { Name: 'email', Value: email },
  { Name: 'email_verified', Value: 'true' },
  { Name: 'name', Value: userInfo.name },
  // Add more attributes
  { Name: 'locale', Value: userInfo.locale },
  { Name: 'custom:signup_method', Value: 'google_oauth' },
],
```

## Testing

### Test OAuth Flow
1. Click "Continue with Google" button
2. Complete Google OAuth consent
3. Verify user creation in Cognito User Pool
4. Check user groups assignment
5. Confirm NextAuth session creation

### Verify Cognito Integration
```bash
# Check if user exists in Cognito
aws cognito-idp admin-get-user \
  --user-pool-id your-user-pool-id \
  --username user@example.com

# Check user groups
aws cognito-idp admin-list-groups-for-user \
  --user-pool-id your-user-pool-id \
  --username user@example.com
```

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**
   - Ensure redirect URI in Google Console matches exactly: `https://yourdomain.com/api/auth/google-callback`

2. **"User creation failed"**
   - Check AWS credentials and permissions
   - Verify Cognito User Pool ID is correct

3. **"Session creation failed"**
   - Check NextAuth configuration
   - Verify credentials provider is properly configured

4. **"Group assignment failed"**
   - Ensure groups exist in Cognito User Pool
   - Check AWS permissions for `AdminAddUserToGroupCommand`

5. **"Password did not conform with password policy"**
   - This was fixed in the latest implementation
   - External provider users (Google/Microsoft) don't need passwords
   - Users are created without `TemporaryPassword` and confirmed automatically

### Debug Mode

Add console logs in API routes for debugging:

```javascript
console.log('Google tokens:', tokenResponse);
console.log('User info:', userInfo);
console.log('Cognito user:', cognitoUser);
```

## Production Considerations

1. **Rate Limiting**: Implement rate limiting on OAuth endpoints
2. **Monitoring**: Add CloudWatch logs for OAuth flows
3. **Error Tracking**: Integrate with error tracking service
4. **Security Headers**: Add appropriate security headers
5. **HTTPS**: Ensure all OAuth redirects use HTTPS

## Comparison with Cognito Federation

| Feature | Direct OAuth (This Implementation) | Cognito Federation |
|---------|-----------------------------------|-------------------|
| UI Control | Full control | Limited (Hosted UI) |
| User Experience | Seamless | Cognito branding |
| Customization | High | Limited |
| Setup Complexity | Medium | Low |
| Maintenance | Higher | Lower |

This implementation gives you complete control over the user experience while maintaining full Cognito integration for user management and security.