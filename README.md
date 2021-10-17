# Warrant Demo Application

[![Discord](https://img.shields.io/discord/865661082203193365?label=discord)](https://discord.gg/QNCMKWzqET)

## Get Started

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
