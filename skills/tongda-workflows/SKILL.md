---
name: tongda-workflows
description: |
  通达工作流。Use when complex work needs multiple 念头通达 skills in sequence: debugging, feature delivery, design iteration, product scope decisions, interpersonal conflict, postmortems, creative blocks, or long-horizon strategy. Select a workflow, define handoff data between skills, run the first step, and stop only when there is a verified next action or closure.
---

# 通达工作流

方法论的力量在顺序。先明镜，再断心结；先边界，再决断；先行动，再收念。不要把所有 skill 一起糊上去。

## Workflow 1：工程调试通达

适用：bug、测试失败、性能瓶颈、构建失败、线上异常。

```text
xuanlan-mirror -> pojing-breakthrough -> benxin-decision -> closure-review
```

交接：
- 明镜输出事实、信号、假说和最小验证。
- 破境输出探针结果和四选一决策。
- 本心决断决定修复、回滚、降级或升级。
- 收念闭环沉淀原则和残余动作。

终止条件：问题有可验证处理结果，且记录了下次原则。

## Workflow 2：产品/设计迭代通达

适用：需求不清、设计争议、用户反馈分裂、方案被否。

```text
xuanlan-mirror -> heart-knot-diagnosis -> wuzhu-action -> closure-review
```

交接：
- 明镜区分用户事实、团队观点和指标信号。
- 心结诊断识别被触动的是能力、审美、控制还是沉没成本。
- 无住行动产出低保真原型、试验稿或小范围验证。
- 闭环记录反馈和下一轮原则。

终止条件：完成一个可反馈版本，而不是继续争论抽象偏好。

## Workflow 3：范围取舍通达

适用：赶期、砍需求、重构与交付冲突、是否接额外任务。

```text
control-boundary -> benxin-decision -> hanli-long-game
```

交接：
- 可控边界区分控制圈、影响圈、观察圈。
- 本心决断选择范围、代价和验证信号。
- 韩立长线检查后路、证据和复利。

终止条件：有一个可承担的取舍和明确同步话术。

## Workflow 4：内耗止损通达

适用：反复想、羞耻、愧疚、后悔、被评审卡住。

```text
heart-knot-diagnosis -> control-boundary -> closure-review
```

交接：
- 心结诊断定位卡住的价值。
- 可控边界收回能动性。
- 收念闭环停止重复复盘。

终止条件：用户或 agent 有一个可控动作和停止规则。

## Workflow 5：长线项目通达

适用：长期项目、创业、研究、写书、复杂学习、技能建设。

```text
xuanlan-mirror -> benxin-decision -> hanli-long-game -> wuzhu-action -> closure-review
```

交接：
- 明镜看清现实。
- 本心决断确定阶段目标。
- 韩立长线保护复利和后路。
- 无住行动交付最小增量。
- 闭环沉淀下轮原则。

终止条件：阶段目标、下一步、复查点和收念规则都明确。

## 中断处理

- 信息不足：插入 `xuanlan-mirror`。
- 外部依赖卡住：插入 `control-boundary`。
- 方案执著：插入 `wuzhu-action`。
- 反复失败：插入 `pojing-breakthrough`。
- 情绪上头：插入 `hanli-long-game`。
- 已行动但心不收：插入 `closure-review`。

## 操作规程

```markdown
## 通达工作流选择

任务类型：……
选择工作流：……
理由：……

步骤与交接：
| 步骤 | skill | 输入 | 输出 | 终止条件 |
|---|---|---|---|---|
| 1 | … | … | … | … |
| 2 | … | … | … | … |

本轮先执行：……
```

不要只输出计划。选定工作流后，立即执行第一步。
