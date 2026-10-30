# Demo Chat

这是仓库内的无后端模拟页面，用来体验 Skill 的操作与取证，不代表真实产品验收。

- 页面：`demo/index.html`
- 可从仓库根目录使用现成 Python 模块启动：`python -m http.server 4173 --bind 127.0.0.1 --directory projects/demo-chat/demo`
- 测试地址：http://127.0.0.1:4173
- 环境：local-fixture；版本以仓库 commit 为准
- 无需登录；刷新清空状态，无后端数据
- Chromium，1440 × 900，中文；剪贴板测试需授予此本地来源读写权限
- 普通等待 10 秒；模拟回复约 1.5 秒
- 控件：消息 textbox、发送 button、停止生成 button、复制回复 button、status
- 回复正文：`data-testid="reply-text"`
- 范围仅此模拟页面，不操作外部网站

已有计划在 `plans/chat-smoke.md`。由 Agent 根据 Skill 直接操作，不需要先生成测试脚本。
历史运行保留在 `runs/`，其中旧版工具验证报告描述的是当时的实现，不代表当前仍保留那些脚本。
