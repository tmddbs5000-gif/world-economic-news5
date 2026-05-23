# Project Guidelines

## News Data Updates
- **Mandatory Commit:** Whenever you update `news-data.json` with new news items, you MUST immediately stage, commit, and push the changes.
- **Verification:** After updating the JSON, verify that the file remains a valid JSON and that the latest news is at the top of the file.
- **Daily Updates:** News should be updated daily by 10 AM KST. If you are asked to fix "missing news," check for uncommitted local changes first.

## Automation
- A GitHub Action is configured in `.github/workflows/daily-news.yml`. If you are enhancing automation, refer to that file.
