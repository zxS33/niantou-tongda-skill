---
name: closure-review
description: 收念闭环。Use after shipping, failing, receiving criticism, resolving a bug, closing a conflict, cutting scope, rejecting a request, ending a direction, or making a hard decision. Convert experience into facts, responsibility, lessons, follow-up actions, and a stop rule so the agent does not keep re-litigating the past.
---

# 收念闭环

复盘是为了带走规律，不是继续消耗。收念闭环把“我又搞砸了/我还可以怎样”转成“事实是什么、责任在哪、下次规则是什么”。

## 核心原则

完成一件事后，只保留四样：事实、责任、原则、动作。多余的自责、幻想、甩锅和脑内辩论都要从上下文里清出去。

## 工程用途

- PR 被打回。
- 线上事故处理后。
- 设计评审失败后。
- 项目延期后。
- 用户反馈不如预期。
- 冲突沟通结束后仍反复想。

## 不适用场景

- 事情还没行动：先用 `benxin-decision` 或 `wuzhu-action`。
- 事故仍在发生：先止血，不复盘。
- 事实没查清：先用 `xuanlan-mirror`。

## 方法流程

### 第一步：复述结果

只写结果，不写人格评价。

### 第二步：责任归位

分清：
- 我可改进的行为。
- 对方或系统的问题。
- 环境和不确定性。

### 第三步：提炼一条原则

只提一条下次真正会用的原则。原则必须能指导行为。

### 第四步：列残余动作

如修复、道歉、补文档、补测试、同步风险、关闭任务。

### 第五步：设置停止规则

没有新事实，就不再重复复盘。

## 常见错误

| 错误 | 表现 | 修正 |
|---|---|---|
| 自责复盘 | 把结果等同于能力 | 写具体行为 |
| 甩锅复盘 | 全怪外部 | 写自己可控动作 |
| 大而空原则 | “下次认真点” | 写可观察规则 |
| 复盘不关闭 | 一直想 | 设停止规则 |

## 操作规程

```markdown
## 收念闭环报告

结果事实：……

责任归位：
| 类型 | 内容 | 后续 |
|---|---|---|
| 我承担 | … | … |
| 他人/系统 | … | … |
| 环境因素 | … | … |

本轮原则：……

残余动作：
- 必须做：……
- 可选做：……
- 明确不再做：……

停止规则：
当……完成后，除非出现新事实，不再重复复盘。

收念句：……
```

## 参考文件

- `review-checklist.md`：工程复盘检查清单。
- `original-texts.md`：日参省、postmortem、经验学习来源。
