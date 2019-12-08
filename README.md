# Pizza shop POS system demo

This is a simple demo for POS system for sales of pizzas.

To perform admin user functions, you would first need to create an admin account `/register` and log in `/login`.
As an admin user, you can either view the sales statistics `/admin/statistics` or add to the menu `/admin/management`.

As a customer, you can either get an overview of all orders `/orders` or create a new order `orders/new`.

To run on local machine, run `docker-compose up -d` in the root directory of the project.

A deployed demo version is available at http://159.65.128.162:3050/
