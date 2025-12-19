!#/bin/bash

pnpm run --filter server deploy server_build
cd server_build
pnpm build
tar -czvf /home/sargis/projects/finit/builds/backend/dist.tar.gz dist
tar -czvf /home/sargis/projects/finit/builds/backend/server_modules.tar.gz node_modules
scp -r server.tar.gz root@185-47-174-99.cloud-xip.com:~/finit-backend
scp -r server-modules.tar.gz root@185-47-174-99.cloud-xip.com:~/finit-backend
