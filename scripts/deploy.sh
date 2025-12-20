#!/usr/bin/bash
rm -rf server_build
pnpm --filter server deploy server_build
pnpm --filter client build
cd apps/client
tar -czvf client-dist.tar.gz dist
cd ../../server_build
pnpm build
tar -czvf /home/sargis/projects/finit/server_build/dist.tar.gz dist
tar -czvf /home/sargis/projects/finit/server_build/server_modules.tar.gz node_modules
scp -i ~/.ssh/id_ed25519_personal -r  /home/sargis/projects/finit/server_build/dist.tar.gz root@185-47-174-99.cloud-xip.com:~/finit-backend
scp  -i ~/.ssh/id_ed25519_personal -r  /home/sargis/projects/finit/server_build/server_modules.tar.gz root@185-47-174-99.cloud-xip.com:~/finit-backend
scp  -i ~/.ssh/id_ed25519_personal -r  /home/sargis/projects/finit/apps/client/client-dist.tar.gz root@185-47-174-99.cloud-xip.com:~/finit-frontend
curl http://185-47-174-99.cloud-xip.com:8090/deploy/finit-backend
curl http://185-47-174-99.cloud-xip.com:8090/deploy/finit-frontend
