FROM pierreozoux/nginx
COPY ./.bin /var/www/app/
RUN sed -i 's#location /#location /app/#' /etc/nginx/sites-enabled/default \
 && chown -R nginx:nginx /var/www
CMD 'nginx'
