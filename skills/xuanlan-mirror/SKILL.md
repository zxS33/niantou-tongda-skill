---
name: xuanlan-mirror
description: 玄览明镜。Use when facts, signals, assumptions, emotions, user claims, logs, screenshots, code behavior, product opinions, or design reactions are mixed together. Apply before debugging, design critique, product planning, conflict analysis, or risky decisions. Output a mirror table that separates observed facts, reproducible evidence, interpretations, unknowns, emotional noise, and the next verification step.
---

# 玄览明镜

“涤除玄览”在本 skill 中被工程化为：清理认知镜面，先看见现实，再允许判断出现。

## 核心原则

念头不通，常因“事实、解释、情绪、欲望”混成一团。明镜不是冷漠，而是先让现实照进来。

在开发和设计中，玄览明镜用于：
- bug 定位前区分报错事实、猜测原因和未验证假设。
- 产品讨论中区分用户反馈、团队立场和指标证据。
- 设计评审中区分视觉事实、个人偏好和业务目标。
- 项目管理中区分真实阻塞、情绪压力和沟通误差。

## 不适用场景

- 已有可复现 bug 和明确修复路径：直接修。
- 用户要求快速执行，且没有判断风险。
- 需要专业审计或法律事实认定：转专业流程。

## 方法流程

### 第一步：收集可观察物

只写能被看见、读到、运行、截图、日志、用户原话、指标证明的内容。

### 第二步：分离四层

| 层次 | 说明 | 示例 |
|---|---|---|
| 事实 | 已观察或可复现 | 测试 A 失败，错误码 500 |
| 信号 | 事实背后的模式 | 只在 Safari 出现 |
| 解释 | 当前假说 | 可能是日期解析问题 |
| 情绪 | 对事实的心理反应 | 我觉得这次评审在否定我 |

### 第三步：标出未知

未知不是失败，而是下一步验证入口。每个未知必须配一个验证动作。

### 第四步：选择最小验证

不要一次验证十个假说。选择能最大幅减少不确定性的一个动作。

### 第五步：更新镜面

验证后把结果写回事实层。假说错了就删，不要护短。

## 常见错误

| 错误 | 表现 | 修正 |
|---|---|---|
| 把感受当事实 | “这个代码肯定很烂” | 指出具体失败、复杂度或用户影响 |
| 把猜测当结论 | “一定是缓存” | 写成假说并验证 |
| 只看支持自己的证据 | 忽略反例 | 主动寻找能证伪假说的信号 |
| 用忙碌逃避判断 | 同时查很多方向 | 选一个最大信息增益动作 |

## 操作规程

```markdown
## 玄览明镜表

要澄清的问题：……

| 层次 | 内容 | 证据/来源 | 下一步 |
|---|---|---|---|
| 已确认事实 | … | … | … |
| 稳定信号 | … | … | … |
| 当前解释 | … | … | … |
| 情绪噪声 | … | … | … |
| 未知缺口 | … | … | … |

最小验证动作：……
完成信号：……

传递给下一步：
- 若需要决策：调用 `benxin-decision`
- 若需要攻关：调用 `pojing-breakthrough`
- 若卡在外部变量：调用 `control-boundary`
```

## 参考文件

- `original-texts.md`：涤除玄览、心斋、认知偏差等来源。
- `thought-traps-reference.md`：常见认知陷阱到工程场景映射。
