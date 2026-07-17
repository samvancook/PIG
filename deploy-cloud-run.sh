#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-poetry-image-generator}"
REGION="${REGION:-us-central1}"
SERVICE_NAME="${SERVICE_NAME:-pig}"
DEPLOY_ACCOUNT="${PIG_DEPLOY_ACCOUNT:-sam@buttonpoetry.com}"
DEPLOY_SERVICE_ACCOUNT="${PIG_DEPLOY_SERVICE_ACCOUNT:-pig-drive-uploader@poetry-image-generator.iam.gserviceaccount.com}"
ADC_FILE="${GOOGLE_APPLICATION_CREDENTIALS:-${HOME}/.config/gcloud/application_default_credentials.json}"

if [[ ! -f "${ADC_FILE}" ]]; then
  echo "Google ADC was not found at ${ADC_FILE}. Run: gcloud auth application-default login" >&2
  exit 1
fi

export CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE="${ADC_FILE}"
GCLOUD=(
  gcloud
  --account="${DEPLOY_ACCOUNT}"
  --impersonate-service-account="${DEPLOY_SERVICE_ACCOUNT}"
  --project="${PROJECT_ID}"
)

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "OPENAI_API_KEY must be set in your shell before deploying." >&2
  exit 1
fi

if [[ -z "${GOOGLE_OAUTH_CLIENT_ID:-}" || -z "${GOOGLE_API_KEY:-}" || -z "${GOOGLE_APP_ID:-}" ]]; then
  echo "GOOGLE_OAUTH_CLIENT_ID, GOOGLE_API_KEY, and GOOGLE_APP_ID must be set before deploying." >&2
  exit 1
fi

POETRY_PLEASE_RANKED_TEXTS_URL="${POETRY_PLEASE_RANKED_TEXTS_URL:-https://poetryplease.org/api/pig/ranked-texts}"
PIG_EDITABLE_PROJECTS_FOLDER_ID="${PIG_EDITABLE_PROJECTS_FOLDER_ID:-1feZWKlY26jQi9Vzz9CNEm48J2Fpygtrz}"
PIG_EDITABLE_PROJECTS_FOLDER_NAME="${PIG_EDITABLE_PROJECTS_FOLDER_NAME:-PIG / Editable Projects}"

"${GCLOUD[@]}" run deploy "${SERVICE_NAME}" \
  --project "${PROJECT_ID}" \
  --region "${REGION}" \
  --source . \
  --service-account "${DEPLOY_SERVICE_ACCOUNT}" \
  --quiet \
  --set-env-vars "OPENAI_API_KEY=${OPENAI_API_KEY},OPENAI_IMAGE_MODEL=${OPENAI_IMAGE_MODEL:-gpt-image-2-2026-04-21},GOOGLE_OAUTH_CLIENT_ID=${GOOGLE_OAUTH_CLIENT_ID},GOOGLE_API_KEY=${GOOGLE_API_KEY},GOOGLE_APP_ID=${GOOGLE_APP_ID},POETRY_PLEASE_API_KEY=${POETRY_PLEASE_API_KEY:-},POETRY_PLEASE_AUTH_TOKEN=${POETRY_PLEASE_AUTH_TOKEN:-},POETRY_PLEASE_RANKED_TEXTS_URL=${POETRY_PLEASE_RANKED_TEXTS_URL},PIG_DEFAULT_DRIVE_FOLDER_ID=${PIG_DEFAULT_DRIVE_FOLDER_ID:-},PIG_DEFAULT_DRIVE_FOLDER_NAME=${PIG_DEFAULT_DRIVE_FOLDER_NAME:-},PIG_EDITABLE_PROJECTS_FOLDER_ID=${PIG_EDITABLE_PROJECTS_FOLDER_ID},PIG_EDITABLE_PROJECTS_FOLDER_NAME=${PIG_EDITABLE_PROJECTS_FOLDER_NAME},HOST=0.0.0.0"
