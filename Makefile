APP_NAME := pedro.js
HUB := $(if $(HUB),$(HUB),some_docker_image_repo)
OS := linux
NODE_VER := 24.14
ALPINE_VER := 3.16

PRJ_DIR := $(shell pwd -L)
BUILD_DIR := $(PRJ_DIR)/dist
APP_DIR := $(BUILD_DIR)
DOCKER_DIR := $(PRJ_DIR)/docker

PACKAGE_MANAGER := pnpm
PACKAGE_MANAGER_VERSION := 10.32.1
PACKAGE_MANAGER_SPEC := $(PACKAGE_MANAGER)@$(PACKAGE_MANAGER_VERSION)
PACKAGE_MANAGER_BIN := $(PACKAGE_MANAGER)

TS_VER := $(shell ./node_modules/.bin/tsc -v 2>/dev/null || $(PACKAGE_MANAGER_BIN) exec tsc -v 2>/dev/null || echo unknown)
GIT_BR := $(shell git -C "$(PRJ_DIR)" rev-parse --abbrev-ref HEAD 2>/dev/null | grep -v HEAD || git -C "$(PRJ_DIR)" describe --tags 2>/dev/null || git -C "$(PRJ_DIR)" rev-parse --short HEAD 2>/dev/null || echo nogit)
GIT_ID := $(if $(CI_COMMIT_SHORT_SHA),$(CI_COMMIT_SHORT_SHA),$(shell git -C "$(PRJ_DIR)" rev-parse --short HEAD 2>/dev/null || echo nogit))
TIMESTAMP := $(shell date -u '+%Y%m%d')
VER1 := $(if $(CI_COMMIT_TAG),$(CI_COMMIT_TAG).$(GIT_ID),$(if $(CI_COMMIT_SHORT_SHA),$(CI_COMMIT_SHORT_SHA),$(GIT_BR).$(GIT_ID)))
VER := $(if $(CI_Daily_Build),$(VER1).$(TIMESTAMP),$(VER1))

Version = $(VER)
GitCommit = $(GIT_ID)
BuildTime = $(TIMESTAMP)
VERSION_INFO = '{"version":"$(Version)","gitCommit":"$(GitCommit)","buildTime":"$(BuildTime)","tsVersion":"$(TS_VER)"}'

ifneq ($(unsafe_docker),)
DOCKER_FILE := ./docker/Dockerfile.debug
else
DOCKER_FILE := ./docker/Dockerfile
endif

.PHONY: all init deps build-prepare build test dev-run dist-run prepub docker clean help

all: build

define require_command
	@command -v $(1) >/dev/null 2>&1 || { echo "[MAKEFILE] Missing required command: $(1)"; exit 1; }
endef

init:
	$(call require_command,corepack)
	corepack enable
	corepack prepare $(PACKAGE_MANAGER_SPEC) --activate
	$(PACKAGE_MANAGER_BIN) -v

deps: init
	$(PACKAGE_MANAGER_BIN) install --frozen-lockfile

build-prepare:
	@echo "[MAKEFILE] Prepare for building..."
	mkdir -p $(APP_DIR)

build: deps build-prepare
	@echo "[MAKEFILE] Building package"
	$(PACKAGE_MANAGER_BIN) run build
	@printf '%s\n' $(VERSION_INFO) > $(APP_DIR)/git.json
	@echo "[MAKEFILE] Build done"

test: deps
	@echo "[MAKEFILE] Running tests"
	$(PACKAGE_MANAGER_BIN) run test

dev-run: deps
	@echo "[MAKEFILE] Running dev server"
	$(PACKAGE_MANAGER_BIN) run dev-run

dist-run: build
	@echo "[MAKEFILE] Running dist build"
	$(PACKAGE_MANAGER_BIN) run dist-run

prepub: build
	@echo "[MAKEFILE] Preparing publish artifacts"
	$(PACKAGE_MANAGER_BIN) run prepub

docker:
	@echo "[MAKEFILE] Building docker image..."
	@printf '%s\n' $(VERSION_INFO) > $(PRJ_DIR)/git.json
	docker build --force-rm -f $(DOCKER_FILE) --build-arg NODE_VER=$(NODE_VER) -t $(APP_NAME):$(VER) .
	docker tag $(APP_NAME):$(VER) $(APP_NAME):latest
	docker images | grep $(APP_NAME)
	@echo "[MAKEFILE] Build docker image done"

clean:
	@echo "[MAKEFILE] Cleaning project"
	$(PACKAGE_MANAGER_BIN) run clean
	rm -f $(PRJ_DIR)/git.json
	@echo "[MAKEFILE] Cleaned"

help:
	@echo "make init      - Enable corepack and prepare pnpm"
	@echo "make deps      - Install dependencies with pnpm"
	@echo "make build     - Build dist artifacts and write git.json"
	@echo "make test      - Run tests"
	@echo "make dev-run   - Run the dev entrypoint"
	@echo "make dist-run  - Run compiled output"
	@echo "make prepub    - Prepare publish artifacts"
	@echo "make docker    - Build docker image"
	@echo "make clean     - Clean generated files"
