# once installed @angular/pwa run:

ng build
npx http-server -p 8080 -c-1 dist/browser

# startup command for your app service

pm2 serve /home/site/wwwroot --no-daemon --spa
