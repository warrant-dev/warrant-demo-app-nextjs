# Warrant NextJS Demo Application

[![Discord](https://img.shields.io/discord/865661082203193365?label=discord)](https://discord.gg/QNCMKWzqET)

This demo application demonstrates how to add access control (specifically Role Based Access Control) to a NextJS application. The app uses the [Warrant NodeJS SDK](https://www.npmjs.com/package/@warrantdev/warrant-node) and [Warrant ExpressJS middleware](https://www.npmjs.com/package/@warrantdev/warrant-express-middleware) to control access to API Routes and data passed to the frontend. The frontend uses the [Warrant React SDK](https://www.npmjs.com/package/@warrantdev/react-warrant-js) to show/hide components in the UI based on each user's permitted access.

## Get Started

After creating a Warrant account [here](https://app.warrant.dev/signup), follow the steps below to get the demo app running locally.

### Create Demo App Object Types
```bash
curl "https://api.warrant.dev/v1/object-types" \
    -X POST \
    -H "Authorization: ApiKey YOUR_KEY" \
    --data-raw \
    '{
        "type": "group",
        "relations": {
            "member": {}
        }
    }'
```
```bash
curl "https://api.warrant.dev/v1/object-types" \
    -X POST \
    -H "Authorization: ApiKey YOUR_KEY" \
    --data-raw \
    '{
        "type": "store",
        "relations": {
            "owner": {},
            "creator": {},
            "editor": {
                "type": "anyOf",
                "rules": [
                    {
                        "type": "userset",
                        "relation": "owner"
                    }
                ]
            },
            "viewer": {
                "type": "anyOf",
                "rules": [
                    {
                        "type": "userset",
                        "relation": "editor"
                    }
                ]
            }
        }
    }'
```
```bash
curl "https://api.warrant.dev/v1/object-types" \
    -X POST \
    -H "Authorization: ApiKey YOUR_KEY" \
    --data-raw \
    '{
        "type": "item",
        "relations": {
            "parent_store": {},
            "creator": {},
            "editor": {
                "type": "anyOf",
                "rules": [
                    {
                        "type": "objectUserset",
                        "relation": "parent_store",
                        "userset": {
                            "type": "userset",
                            "relation": "editor"
                        }
                    }
                ]
            },
            "viewer": {
                "type": "anyOf",
                "rules": [
                    {
                        "type": "userset",
                        "relation": "editor"
                    }
                ]
            }
        }
    }'
```

### Add Your API Key
Replace occurences of `<replace_with_your_api_key>` in `/utils/auth.ts` and `/data/initialize.js` with your API Key.

Replace occurence of `<replace_with_your_client_key>` in `_app.jsx` with your Client Key.

### Initialize & Start the App
```bash
npm run init # only required the first time you setup the app
npm run dev
```
