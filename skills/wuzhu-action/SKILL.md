---
name: wuzhu-action
description: 无住行动。Use when an agent is stuck waiting for certainty, perfect architecture, complete requirements, approval, praise, inspiration, emotional readiness, or guaranteed outcome. Convert attachment to outcome, identity, elegance, or approval into a small committed action with feedback, while preserving quality and safety.
---

# 无住行动

“应无所住而生其心”在本 skill 中被工程化为：不执著于完美条件、固定方案、他人评价或一次成败，仍然按价值行动。

## 核心原则

无住不是随便做，而是不把心卡在结果、名声、方案、过去投入和他人认可上。行动要对齐价值，接受反馈修正。

## 工程用途

- 需求还不完全清楚，但可以做原型验证。
- 架构还不完美，但可以先切出稳定接口。
- 设计没有灵感，但可以先做低保真探索。
- PR 害怕被批，但可以先提交小 diff。
- 写作或汇报怕不够好，但可以先交草稿。

## 不适用场景

- 安全、支付、数据迁移、合规等高风险操作：必须先严谨验证。
- 事实不清导致行动风险高：先用 `xuanlan-mirror`。
- 真正需要取舍：先用 `benxin-decision`。

## 方法流程

### 第一步：识别执著对象

判断卡住的是：
- 结果执著：必须成功。
- 形象执著：不能显得不专业。
- 方案执著：只能用我想的方案。
- 完美执著：不够好就不能交。
- 认可执著：没人肯定就不敢做。

### 第二步：回到价值

写出此刻行动服务的真实价值：用户理解、验证假设、减少风险、交付增量、获得反馈、保护边界。

### 第三步：缩小动作

把行动缩成最小可反馈版本：
- 一个测试。
- 一个 repro。
- 一个低保真稿。
- 一个接口草案。
- 一个短说明。
- 一个小 PR。

### 第四步：限定质量底线

无住行动不能以粗糙为荣。写出最低质量线和安全线。

### 第五步：反馈后不粘着

结果好坏都只作为信息，不作为自我评价。

## 常见错误

| 错误 | 表现 | 修正 |
|---|---|---|
| 把无住当摆烂 | 不验证、不负责 | 写质量底线 |
| 把完美当认真 | 迟迟不交付 | 缩小到可反馈版本 |
| 把批评当否定 | PR/评审后自闭 | 用反馈更新方案 |
| 把方案当自我 | 不肯删代码 | 回到价值而非作品 |

## 操作规程

```markdown
## 无住行动卡

卡住的执著：……
它正在阻止的行动：……

本轮价值：……
最小可反馈动作：……

质量底线：
- 必须满足：……
- 暂不追求：……

反馈方式：……
完成信号：……

收念句：
我不把……当成自我；我先完成……来获得真实反馈。
```

## 与其他 skill 的关系

- 行动后卡住，调用 `closure-review`。
- 行动中遇瓶颈，调用 `pojing-breakthrough`。
- 行动可能破坏长线，调用 `hanli-long-game`。
