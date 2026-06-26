---
name: pojing-breakthrough
description: |
  破境攻关。Use when a bug, build failure, product bottleneck, design deadlock, writing block, migration, performance issue, or research question has resisted obvious attempts. Turn the bottleneck into a staged probe plan: define the gate, isolate variables, choose a minimal experiment, record learning, and decide whether to continue, pivot, rollback, or escalate.
---

# 破境攻关

破境不是硬撞墙，而是找到瓶颈的关窍。遇到卡关时，先把“我不行”改写成“系统里有一个未识别的门槛”。

## 核心原则

顽固瓶颈需要探针，不需要焦虑。每一次失败都必须换回一个新信息，否则只是消耗心神。

## 工程用途

- 测试一直失败但原因不明。
- 性能优化没有效果。
- 设计方案反复被否。
- 产品指标卡住。
- 文档或论文写不下去。
- 重构牵一发动全身。

## 不适用场景

- 事实尚未整理：先用 `xuanlan-mirror`。
- 主要问题是外部依赖：先用 `control-boundary`。
- 只是缺少行动勇气：用 `wuzhu-action`。

## 方法流程

### 第一步：定义关口

写清“过关”的具体信号：测试通过、延迟下降、用户能完成任务、设计评审通过、文稿能支撑论点。

### 第二步：列失败尝试

只列已经做过且有结果的尝试。不要把想过但没做的也算进去。

### 第三步：隔离变量

把系统拆成输入、环境、状态、依赖、逻辑、输出、用户行为等变量。

### 第四步：选择最小探针

探针必须满足：
- 成本小。
- 结果清晰。
- 能证伪一个假说。
- 不破坏主线。

### 第五步：根据结果转向

结果出现后只做四选一：
- 继续：假说被支持。
- 转向：假说被证伪。
- 回滚：改动引入风险。
- 升级：需要外部专家、权限或资源。

## 常见错误

| 错误 | 表现 | 修正 |
|---|---|---|
| 重复撞墙 | 一遍遍试同一类办法 | 每次探针必须带来新信息 |
| 一次改太多 | 不知道哪个变量有效 | 单变量或小批变量 |
| 情绪化推翻 | 全部重写 | 先证明局部瓶颈 |
| 不记录学习 | 下次从零再痛 | 写破境记录 |

## 操作规程

```markdown
## 破境攻关表

关口定义：……
过关信号：……

已尝试：
| 尝试 | 结果 | 学到什么 |
|---|---|---|
| … | … | … |

当前假说：……
隔离变量：……

最小探针：
- 动作：……
- 预期：……
- 若成功：……
- 若失败：……

四选一决策：[继续/转向/回滚/升级]
下一步：……
```

## 参考文件

- `probe-patterns-reference.md`：代码、产品、设计、写作的探针模式。
- `original-texts.md`：庖丁解牛、OODA、复杂系统与复盘依据。
