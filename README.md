# once installed @angular/pwa run:

ng build
pm2 serve dist/browser -p 8080 --no-daemon --spa

# startup command for your app service

pm2 serve /home/site/wwwroot --no-daemon --spa

# stop program

pm2 stop static-page-server-8080
