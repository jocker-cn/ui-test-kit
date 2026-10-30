# UI Test Kit

- UI 测试先读取 `.github/skills/ui-test/SKILL.md`；浏览器能力读取官方 `.github/skills/playwright-cli/SKILL.md`。
- 通用规则、模板与官方工具依赖只放在 Skills 中，不新增目录生成器、报告生成器或自定义执行器。
- 项目自己的说明、计划、运行报告和证据全部放在 `projects/<project>/`。
- 按需读取指定项目与计划，不扫描其他项目和历史记录。Story 内容由用户或其他 Skill 提供。
- 实际 UI 验收必须走用户操作路径，不能用 API / WebMCP 调用或修改 DOM 替代。
- 遵循用户已有授权，不因 Skill 的“可能需要审批”提示额外索要确认。
- Jira 获取、Confluence 发布由其他 Skill 处理。本仓库不依赖 Codex 内置浏览器能力。
- 不自动提交凭据或真实运行证据，执行记录与登录状态默认本地留存。
