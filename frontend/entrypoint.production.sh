#!/bin/sh
cp -r .nuxt/dist/client/* nuxt_volume/
exec "$@"
