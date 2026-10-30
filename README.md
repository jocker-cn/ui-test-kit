# UI Test Kit

在 Copilot 中按需求执行网页 UI 测试，保存报告和截图。Jira 与 Confluence 交给其他 Skill。

## 结构

```text
.github/skills/
  playwright-cli/          官方 Playwright Skill，原样保留
  ui-test/                 团队约定、模板和官方工具依赖
projects/
  <project>/
    project.md             地址、环境、账号角色及数据约定
    plans/                 可复用的 Markdown 测试计划
    runs/<run-id>/         每次计划副本、报告、截图（默认本地）
    .local/                本机登录状态等（不提交）
```

根目录只保留仓库入口和基础 Git 配置，没有目录生成器、报告生成器或自定义执行脚本。
AI 根据 Skill 中的规则直接创建项目、整理计划、执行 UI 操作和填写报告。

## 使用

在本地 Copilot 中打开此仓库，例如：

> 使用 ui-test，执行 my-chat 的 message-copy 计划，环境 UAT，保存报告和截图。

> 使用 ui-test，测试 my-chat 的停止生成功能，检查停止后不再追加文字。

> 帮我接入一个新项目，名字是 my-chat，测试地址是……

Story 的内容由用户或其他 Skill 提供，也可以直接描述测试要求。
需要补充的信息只有目标环境、前置条件和预期结果，不需要学习脚本命令。

- [项目测试约定](.github/skills/ui-test/SKILL.md)
- [官方 Playwright Skill](.github/skills/playwright-cli/SKILL.md)
- [首次环境安装](.github/skills/ui-test/references/setup.md)
- [示例项目](projects/demo-chat/project.md)

官方 Skill 来自 Playwright 1.64.1 发布包，浏览器指令及 references 原样保留，来源和许可证在其目录内。
自有 Skill 只补充项目组织和结果交付，不复制一套浏览器操作机制。
