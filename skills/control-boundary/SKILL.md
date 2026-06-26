---
name: control-boundary
description: 可控边界。Use when work is blocked by external dependencies, unclear ownership, other people's reactions, unstable requirements, waiting for approval, review feedback, market uncertainty, team conflict, or anxiety about outcomes. Separate controllable actions, influenceable levers, and uncontrollable conditions, then choose the next move that restores agency without pretending to control everything.
---

# 可控边界

把“我控制不了”拆成三层：能控制、能影响、只能观察。念头通达不是掌控一切，而是把力量收回到自己能动的地方。

## 核心原则

外界不可控，行动仍可控；结果不可控，准备和反馈可控；他人评价不可控，交付质量和沟通方式可控。

## 工程用途

- PR 等待 review：控制补充测试和说明，影响 reviewer，观察排期。
- 产品需求摇摆：控制原型和假设，影响决策，观察市场反馈。
- 设计争议：控制问题定义和备选稿，影响共识，观察用户行为。
- 团队依赖卡住：控制接口 mock、降级方案、风险同步。

## 不适用场景

- 问题完全在本地可修复：直接行动。
- 需要硬性决断而不是边界梳理：调用 `benxin-decision`。
- 处于安全或合规风险：先处理风险。

## 方法流程

### 第一步：写出卡点

不要写“他们不配合”这种笼统描述。写清谁、什么事、卡在哪里。

### 第二步：分三圈

- **控制圈**：我可以直接做的动作。
- **影响圈**：我可以通过沟通、证据、替代方案改变概率的事。
- **观察圈**：我不能改变，只能监控并设置触发条件的事。

### 第三步：清除伪责任

不要为别人的情绪、历史遗留、组织模糊、市场波动承担全责。

### 第四步：设计边界动作

每个圈都要有动作：
- 控制圈：今天做什么。
- 影响圈：向谁同步什么证据。
- 观察圈：什么信号出现后切换策略。

### 第五步：设等待上限

等待必须有时限。超过时限就执行降级、替代或升级路径。

## 常见错误

| 错误 | 表现 | 修正 |
|---|---|---|
| 责任泛化 | 什么都怪自己 | 写责任边界 |
| 受害者循环 | 只说别人不配合 | 找控制圈动作 |
| 控制幻觉 | 想让所有人满意 | 明确不可控评价 |
| 无限等待 | “再等等”没有截止 | 设置等待上限 |

## 操作规程

```markdown
## 可控边界图

卡点：……

三圈拆解：
| 圈层 | 内容 | 当前动作 |
|---|---|---|
| 控制圈 | … | … |
| 影响圈 | … | … |
| 观察圈 | … | … |

我不再承担的伪责任：……

等待上限：……
触发切换的信号：……

下一步：
- 立即执行：……
- 同步/影响：……
- 观察记录：……
```

## 与其他 skill 的关系

- 事实不清先用 `xuanlan-mirror`。
- 需要取舍调用 `benxin-decision`。
- 外部变量造成长期局势，接 `hanli-long-game`。
