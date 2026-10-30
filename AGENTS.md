# UI Test Kit

此仓库只做网页 UI 测试，面向本地 Copilot Agent。读取 `.github/skills/ui-test/SKILL.md` 后执行。

- 按需读取指定项目的 `project.md` 和指定计划，不扫描其他项目、历史运行或整个页面。
- 测试需求来自用户提供的 Story 内容、已有计划或临时描述。Jira 获取和 Confluence 发布由外部 Skill 处理。
- 计划在 `projects/<project>/plans/`；每次证据与报告在独立的 `runs/<project>/<run-id>/`。
- 使用仓库安装的 Playwright CLI 或标准 Playwright Test，不依赖 Codex 内置浏览器能力。
- 不把账号、登录状态或真实测试证据自动提交 Git。执行记录默认本地留存。
- 命令在仓库根目录运行。项目机制应保持简单，不增加流程 DSL、缓存编译器或桌面自动化。
