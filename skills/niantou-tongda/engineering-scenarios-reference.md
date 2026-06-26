# 工程场景触发速查

| 场景 | 表面问题 | 通达判断 | 推荐 skill |
|---|---|---|---|
| Bug 复现不了 | “它就是偶发” | 事实和信号未分离 | `xuanlan-mirror` |
| PR 被批后防御 | “他针对我” | 羞/怨心结 | `heart-knot-diagnosis` |
| 需求等别人确认 | “我没法推进” | 可控边界混乱 | `control-boundary` |
| 赶期要不要砍测试 | “先上再说” | 本心标准冲突 | `benxin-decision` |
| 一直想完美架构 | “还不够优雅” | 方案执著 | `wuzhu-action` |
| 性能优化卡住 | “所有办法都试了” | 缺最小探针 | `pojing-breakthrough` |
| 已经想清楚但没有落地 | “方案有了，先等等” | 交付空转 | `engineering-execution` |
| 改代码但不敢验证 | “应该能跑” | 缺证据闭环 | `engineering-execution` |
| 想重写整个模块 | “这代码没救” | 一时痛快伤长线 | `hanli-long-game` |
| 事故后反复自责 | “我太菜了” | 复盘未收束 | `closure-review` |
| 复杂项目推进混乱 | “哪里都卡” | 需要编排 | `tongda-workflows` |

## 产品与设计场景

| 场景 | 推荐 |
|---|---|
| 用户反馈互相矛盾 | `xuanlan-mirror` -> `benxin-decision` |
| 设计稿被否但说不清原因 | `xuanlan-mirror` -> `wuzhu-action` -> `engineering-execution` |
| 需求范围不断膨胀 | `control-boundary` -> `hanli-long-game` |
| 团队争论方案优劣 | `benxin-decision` |
| 创意枯竭 | `wuzhu-action` -> `pojing-breakthrough` |
| 汇报/文档/表格需要交付 | `engineering-execution` |
