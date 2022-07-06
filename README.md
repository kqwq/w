# w

The letter W perfectly captures the essence of this site. No matter how poorly written my code is, this project always feels like an absolute win.

This is my personal website/portfolio. There are a lot of components in the making.

## Development

under web
create `.env.local` with

```
MONGODB_URI=
NEXT_PUBLIC_CONTENT_PASSWORD_HASH= (prepend "kqwq_website_salt_" to the content password then put resulting sha256 hash here)
ADMIN_PASSWORD_HASH= (prepend "kqwq_website_salt_" to the admin password then put resulting sha256 hash here)
```

run `yarn install` and `yarn dev` to run locally.

## Deploy

I used Vercel to deploy, just make sure to set the root directory to web. Don't forget the environment variables.
