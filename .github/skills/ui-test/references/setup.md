# 官方工具环境

先检查当前环境已有的 `playwright-cli` 或项目安装的 Playwright，按官方 Skill 选择可用入口。
本仓库还在本 Skill 目录内提供官方 `@playwright/test` 的锁定依赖，供没有现成环境的同事使用。
`package.json` 只有依赖，没有自定义 npm scripts 或运行器。

首次安装（从仓库根目录）：

```bash
npm --prefix .github/skills/ui-test ci
```

之后进入 `.github/skills/ui-test` 目录，直接使用官方命令：

```bash
npx --no-install playwright install chromium
npx --no-install playwright cli --help
```

浏览器只需首次下载或版本更新后下载。普通任务不重装依赖，不每次查询最新版。
此目录的 `.playwright/cli.config.json` 设置默认 headless、视口和超时，没有自定义执行逻辑。

在此目录运行时，官方 Skill 中的 `playwright-cli` 可以替换为 `npx --no-install playwright cli`：

```bash
npx --no-install playwright cli -s=my-chat-uat open https://your-test-site.example
```

需要人工登录或观察时使用已安装 Chrome 的 `--browser=chrome --headed`。
不同账号与环境的状态分开保存在 `projects/<project>/.local/`，使用官方 state-save / state-load。
实际网站的登录状态能否复用需验证，失效时重新人工登录。

**工作目录是 Skill 目录**：打开本地文件、保存截图或读取项目文件时使用绝对路径，
防止把运行证据存进 Skill。报告中的图片链接仍使用相对 `screenshots/` 路径。

需要维护官方 Skill 时，从 Playwright 官方发布包更新整个 `playwright-cli` Skill 及其 references，
保留来源和许可证。团队约定只改 `ui-test`，不改写官方 Skill。
