# UI Test Kit

给 Copilot 使用的轻量网页 UI 测试仓库。输入已有计划、Story 内容或临时测试描述，
由 Agent 操作浏览器，输出逐条测试结果和截图。只负责 UI，Jira 和 Confluence 由其他 Skill 处理。

这不是独立的 AI 服务：需要你在本地 Copilot Agent 中打开仓库并发出任务。
不需要额外模型 Key、数据库、工作流服务或桌面操作工具。

## 安装一次

需要 Node.js 22+、npm 和支持项目 Skills 的 Copilot Agent。

```bash
npm ci
npm run browser:install
```

依赖由 `package-lock.json` 锁定，浏览器只需首次下载或升级 Playwright 后更新。
浏览器操作使用 Playwright 内置 CLI，与测试运行器共享同一版本和浏览器安装。
在公司网络中若安装受代理限制，使用公司的 npm 与浏览器下载代理配置。

## 直接体验

终端一启动本地模拟页面：

```bash
npm run demo
```

在仓库中打开 Copilot，告诉它：

> 使用 ui-test Skill，执行 demo-chat 的 chat-smoke 计划。测试本地模拟页面，保存报告和截图。

也可以在终端二运行已经固化的示例测试：

```bash
npm test -- projects/demo-chat/tests/chat.spec.ts
```

示例覆盖生成中状态、回复完成、停止生成、剪贴板内容验证。它是无后端 fixture，
不代表 ChatGPT、Gemini 或任何真实产品已经通过测试。

## 接入自己的项目

```bash
npm run project:new -- my-chat
```

填写 `projects/my-chat/project.md` 的地址、环境、账号角色与数据约定；
填写 `plans/smoke.md` 的步骤、预期、证据。每条测试点用稳定的用例 ID，例如 TC-01。
计划是普通 Markdown，没有需要学习的流程 DSL。

然后直接向 Copilot 描述：

> 使用 ui-test，执行 my-chat 的 smoke 计划，环境 UAT。

或者临时测试：

> 使用 ui-test，测试 my-chat 的消息发送和停止生成。要求生成中显示 loading，停止后不再追加文字。保存报告和截图。

Story 已由其他 Skill 获取时，把验收条件作为输入即可。这里不会自行读取 Jira。
有需要时 Copilot 可把稳定流程保存为 `projects/my-chat/tests/*.spec.ts`，之后直接运行。

## 运行记录

Agent 使用以下命令创建独立记录，也可以手动创建后把路径交给它：

```bash
npm run run:new -- my-chat smoke
npm run run:new -- my-chat
```

第二条用于临时任务。命令仅建立文件，**不会启动测试，也不会产生通过结论**。

```text
projects/<project>/
  project.md                 项目地址、环境和必要约定
  plans/*.md                 可复用计划
  tests/*.spec.ts             可选的标准 Playwright 用例
runs/<project>/<UTC时间-随机ID>/
  project.md                 本次项目说明副本
  plan.md                    本次计划副本
  report.md                  汇总、明细、缺陷和阻塞
  screenshots/               以用例 ID 命名的证据
```

结果使用 PASS / FAIL / BLOCKED / NOT_RUN，保留每条预期与实际。
报告中的图片使用相对路径；将报告和附件目录一起交给独立 Confluence Skill 归档。
运行记录默认本地保存，不自动推送 Git；团队共享长期记录时使用自己的归档系统。

示例用例默认把关键截图保存到 `test-results/demo-chat/screenshots/`。
如需保存到指定运行目录，设置 `UI_TEST_RUN_DIR` 为刚创建的目录再执行测试；
测试完成后仍需 Agent 根据实际输出填写报告，不能把创建的空模板当作完成报告。

## 登录与浏览器会话

CLI 使用命名 session，避免不同项目或环境互相串状态。

```bash
npm run browser -- --help
npm run browser -- -s=my-chat-uat open https://your-test-site.example --browser=chrome --headed
```

人工登录后可用 `state-save .local/auth/my-chat-uat.json` 保存登录状态（先建立该本地目录）。
下次在对应 session 用 `state-load` 加载，然后访问业务页面。登录机制能否复用需在目标站验证。
标准 Playwright 用例可通过环境变量 `UI_TEST_STORAGE_STATE` 指定状态文件。
登录状态、密码和 Token 不进 Git，也不写进测试报告。

默认 headless；需要人工登录或查看时用 headed。调试期间复用会话，
通过已确认定位器批量执行动作，只在验证点取证；首次探索耗时仍需在真实网站上测量。

## 开发检查

```bash
npm run check
npm run test:unit
npm run test:ui
```

UI Mode 可选中单个用例运行、调试。标准测试默认不重试，不把失败用自动重试隐藏。
示例用例依赖本地 demo 服务器；业务项目测试需要自己的环境和登录状态。

项目 Skill 在 `.github/skills/ui-test/SKILL.md`。如果 Copilot 没有自动加载，
直接让它读取该文件；团队只维护项目计划和必要的页面约定。

参考：[Copilot Agent Skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)、
[Playwright CLI](https://github.com/microsoft/playwright-cli)、
[Playwright Test](https://playwright.dev/docs/intro)。
