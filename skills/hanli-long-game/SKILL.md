---
name: hanli-long-game
description: 韩立长线。Use when an agent is tempted to retaliate, over-refactor, argue in review, prove cleverness, publish a hot take, accept too much scope, chase novelty, rewrite everything, or optimize for short-term relief over long-term delivery. Preserve leverage, optionality, safety, evidence, and future maintainability before taking action.
---

# 韩立长线

本 skill 处理“一口气”和“一条路”的冲突。真正的通达，不是当场痛快，而是多年后回看仍觉得这一步没有毁掉根基。

## 核心原则

藏锋不是怂，冒进不是勇。长线稳心要求：少暴露无谓风险，多保存选择权；小处果断，大处谨慎。

## 工程用途

- 想因为评审意见激烈反驳 reviewer。
- 想一怒之下重写整个模块。
- 想为了证明能力做复杂炫技方案。
- 想接下所有需求让别人满意。
- 想在证据不足时公开指责或定性。
- 想追热点而偏离项目主线。

## 不适用场景

- 用户明确要求小范围执行，且风险低。
- 安全事故或线上事故需要立刻止血：先响应事故。
- 事实不清：先用 `xuanlan-mirror`。

## 三查

任何强动作前做三查：

1. **后路查**：这一步会不会关闭关键退路？
2. **证据查**：证据是否足以支撑行动强度？
3. **复利查**：三个月后，这一步是在积累资产还是制造债务？

三查不过，不出重手。

## 四种长线策略

| 策略 | 适用 | 工程动作 |
|---|---|---|
| 藏锋 | 情绪强、证据弱 | 暂不争辩，先补日志/测试/数据 |
| 蓄势 | 方向对、条件不足 | 建脚手架、写说明、攒小胜 |
| 断缘 | 持续消耗、无修复价值 | 降低耦合、砍范围、设边界 |
| 出手 | 证据足、窗口到 | 小而强的改动、清晰同步、快速验证 |

## 常见错误

| 错误 | 表现 | 修正 |
|---|---|---|
| 把激烈当担当 | 当场开战 | 先过三查 |
| 把保守当长线 | 什么都不做 | 选择蓄势动作 |
| 把复杂当高级 | 炫技方案 | 看复利和维护成本 |
| 把讨好当合作 | 全部答应 | 设范围边界 |

## 操作规程

```markdown
## 长线稳心方案

当前诱惑：……
如果立刻行动，短期会得到：……
长期可能损失：……

三查：
- 后路：通过/不通过，理由：……
- 证据：通过/不通过，理由：……
- 复利：通过/不通过，理由：……

策略：[藏锋/蓄势/断缘/出手]

最小长线动作：
- 做什么：……
- 保留什么选择权：……
- 避免什么债务：……
- 何时复查：……
```

## 与其他 skill 的关系

- 冲动来自心结，先用 `heart-knot-diagnosis`。
- 长线策略要落成选择，用 `benxin-decision`。
- 行动完成后用 `closure-review`。
