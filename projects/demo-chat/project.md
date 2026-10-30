# Demo Chat

这是仓库内的模拟页面，只用于演示和工具自检，不是真实产品验收。

- 本地启动：`npm run demo`，测试地址 `http://127.0.0.1:4173`
- 环境：local-fixture；版本以仓库 commit 为准
- 无需登录；每次刷新清空页面状态，不产生后端数据
- Chromium，1440 × 900，中文；剪贴板测试需授予该本地来源读写权限
- 普通等待 10 秒；模拟回复约 1.5 秒
- 控件：消息 textbox、发送 button、停止生成 button、复制回复 button、status
- 回复正文：`data-testid="reply-text"`
- 本次范围仅此页面，不操作外部网站

直接 Agent 执行前启动演示服务器。标准用例可在单独终端启动服务器后执行：
`npm test -- projects/demo-chat/tests/chat.spec.ts`。
