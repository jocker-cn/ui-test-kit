# 测试项目

此目录只保存实际被测项目。让 Copilot 按 `ui-test` Skill 接入项目即可：

> 帮我接入 my-chat，测试地址是……，环境是 UAT。

每个项目保存 `project.md`、可复用的 `plans/`、本机状态 `.local/`，
以及独立的 `runs/<run-id>/` 报告和截图。运行记录与本机状态默认不提交 Git。
项目、计划和报告模板统一维护在 `ui-test` Skill 内。
