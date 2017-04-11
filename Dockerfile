FROM pierreozoux/nginx
COPY web/ /var/www
RUN sed -i 's#location /#location /app/#' /etc/nginx/sites-enabled/default
CMD 'nginx'
