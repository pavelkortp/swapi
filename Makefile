# Makefile for NestJS, PostgreSQL, and Docker Compose project

# By default, when you run `make` without a target, it will show the help message.
.DEFAULT_GOAL := help

# Include the .env file to make its variables available to this Makefile
# This allows commands like `db-shell` to use the correct credentials.
# The `-` before `include` tells make to ignore errors if the file doesn't exist.
-include .env
export

# ====================================================================================
# HELP
# This command automatically generates a help message by reading the comments.
# ====================================================================================
.PHONY: help
help: ## 📜 Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'


# ====================================================================================
# LOCAL DEVELOPMENT (Without Docker)
# ====================================================================================
.PHONY: setup
setup: ## ⚙️  Install local dependencies using asdf and npm
	@echo "--- Installing project dependencies ---"
	@asdf install
	@npm install
	@echo "✅ Setup complete."

.PHONY: build
build: ## 🔨 Build the TypeScript application into JavaScript
	@echo "--- Building application ---"
	@npm run build
	@echo "✅ Build complete."

.PHONY: start-local
start-local: ## ▶️  Start the application locally in development mode (with hot-reload)
	@npm run start:dev

.PHONY: lint
lint: ## 💅 Lint the codebase and fix issues where possible
	@npm run lint

.PHONY: test
test: ## 🧪 Run the test suite
	@npm run test


# ====================================================================================
# DOCKER MANAGEMENT
# ====================================================================================
.PHONY: start
start: ## 🐳 Build and start all services with Docker Compose in the background
	@echo "--- Starting Docker services ---"
	@docker-compose up --build -d
	@echo "✅ Services are up and running."

.PHONY: stop
stop: ## 🛑 Stop and remove all services started with Docker Compose
	@echo "--- Stopping Docker services ---"
	@docker-compose down
	@echo "✅ Services stopped."

.PHONY: restart
restart: stop start ## 🔄 Restart all Docker services

.PHONY: logs
logs: ## 📝 View live logs from all running Docker services
	@docker-compose logs -f


# ====================================================================================
# DATABASE COMMANDS
# ====================================================================================
.PHONY: db-shell
db-shell: ## 🗄️ Open a psql shell inside the running database container
	@echo "--- Connecting to the database shell ---"
	@docker-compose exec db psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

.PHONY: migrate
migrate: ## 🚀 Run database migrations inside the app container
	@echo "--- Running database migrations ---"
	@docker-compose exec app npm run typeorm:run-migrations # Replace with your actual migration script if different
	@echo "✅ Migrations complete."


# ====================================================================================
# CLEANUP
# ====================================================================================
.PHONY: clean
clean: ## 🧹 Remove build artifacts (dist) and local dependencies (node_modules)
	@echo "--- Cleaning up project artifacts ---"
	@rm -rf dist node_modules
	@echo "✅ Cleanup complete."
