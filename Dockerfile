# Etape 1 : compilation du projet(mise à jour du numero en fonction du numero de version java utilisée)
FROM node:21-alpine AS builder
# paramétrage du dossier courant pour le build
WORKDIR /app
COPY . .
# suppression du contenu de nodes_modules
RUN rm -rf node_modules
# npm ci similaire à npm install (mais environnement automatisé) -> installation de tous les packages nécessaires au build
RUN npm ci
RUN npm run build

# Etape 2 : utilisation d'une image de serveur http pour servir le site précompilé(mise à jour du numero de version sur : https://hub.docker.com/_/nginx)
FROM nginx:1.27.3-alpine
EXPOSE 8080
COPY --chown=nginx:nginx nginx-ui.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/build /var/www/html/
