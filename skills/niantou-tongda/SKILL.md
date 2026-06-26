---
name: niantou-tongda
description: 念头通达总入口。Use at the start of complex work when an agent is blocked by rumination, unclear facts, decision paralysis, over-attachment to one solution, fear of criticism, sunk cost, brittle plans, product/design/code uncertainty, or a conflict between momentary relief and long-term delivery. Route to downstream skills that separate facts from stories, identify the knot, define controllable boundaries, choose a clean decision, act without attachment, break bottlenecks, protect long-game leverage, and close the loop.
---

# 念头通达

把本 skill 当作“道心路由器”和工程化校验框架。它的目标不是安慰人，也不是写古风文案，而是让 agent 在复杂工作里做到：心不被噪声牵走，手能继续推进，事有验证闭环。

## 总原则：心无滞碍，行动有据

念头通达 = 事实澄明 + 心结可见 + 边界清楚 + 决断干净 + 行动不执 + 瓶颈可破 + 交付可验 + 长线不败 + 复盘收束。

在工程语境里，它表现为：
- 不被报错、评审意见、需求变更、设计争议带偏心神。
- 不把“我不爽”“我怕被否定”“我想证明自己”伪装成技术判断。
- 不把一个方案、一段代码、一个设计稿、一个计划执著成自我价值。
- 做决定时写清事实、代价、边界和验证信号。
- 失败后复盘，不自责成团，也不甩锅成性。

## 调度规则

一次只选一个主 skill；确实需要组合时调用 `tongda-workflows`。

| 当前信号 | 调用 |
|---|---|
| 事实、推断、情绪和脑补混在一起 | `xuanlan-mirror` 玄览明镜 |
| 反复想、被评审/冲突/失败卡住 | `heart-knot-diagnosis` 心结诊断 |
| 外部依赖、他人反馈、不可控变量让任务停滞 | `control-boundary` 可控边界 |
| 需要做产品、代码、设计、关系或职业决定 | `benxin-decision` 本心决断 |
| 想等到完美、有把握、被认可后才行动 | `wuzhu-action` 无住行动 |
| 遇到顽固 bug、瓶颈、卡关、设计僵局 | `pojing-breakthrough` 破境攻关 |
| 需要真实改代码、写文档、做设计/办公产物并验证 | `engineering-execution` 工程执行 |
| 想立刻反击、证明、重构一切、推翻全部 | `hanli-long-game` 韩立长线 |
| 完成、失败、被拒、上线后仍反复内耗 | `closure-review` 收念闭环 |
| 多个问题交织，需要顺序编排 | `tongda-workflows` 通达工作流 |

## 不适用场景

- 简单执行任务：直接做，不要仪式化调用。
- 已有明确验证路径：直接验证，不要绕进心法。
- 医疗、法律、财务、危机干预：先走专业和安全流程。
- 用户只要文学解释：读取 `theory-map.md` 或 `original-texts.md`，不要启动完整工作流。

## 核心纪律

1. **先明镜，后决断**：事实没分清，不做判断。
2. **先边界，后发力**：不可控的事不拿来折磨自己。
3. **先本心，后取舍**：决定必须服务核心目标，不服务面子。
4. **先最小行动，后宏大叙事**：通达必须落到下一步。
5. **先交付，后自证**：工程和办公任务不能停在表格，必须落到可检查产物。
6. **先验证，后心安**：没有运行、测试、反馈、交付信号，就不要宣布“通了”。
7. **先收念，后转场**：复盘沉淀原则，不让失败继续占上下文。

## 操作规程

当本 skill 被触发时，输出“通达路由卡”：

```markdown
## 通达路由卡

当前卡点：……

这是哪类滞碍：
- 事实不明 / 心结反复 / 边界混乱 / 决策困难 / 行动执著 / 瓶颈卡关 / 交付空转 / 长线风险 / 复盘未收

应调用的主 skill：……
理由：……

本轮完成信号：
- 事实信号：……
- 行动信号：……
- 收念信号：……

现在先做：
……
```

如果用户明确要求完整处理，则调用被选中的下游 skill，并按其输出格式继续，不要只停在路由。

## 参考文件

- `theory-map.md`：道家、儒释、斯多葛、现代心理学、工程方法的映射。
- `original-texts.md`：短引用与理论出处。
- `engineering-scenarios-reference.md`：代码、产品、设计、办公场景的触发速查。

## 与其他 skill 的关系

`niantou-tongda` 只负责建立总原则和选择路线。具体工作由下游 skill 执行；复杂任务由 `tongda-workflows` 串联。
