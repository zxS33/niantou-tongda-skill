<p align="center">
  <img src="./assets/niantou-tongda-hero.png" width="980" alt="念头通达 Skill"/>
</p>

# 念头通达 Skill

把“念头通达”从弹幕热梗和修心意象，转化为 AI Agent 可以执行的工程心法：调试能清事实，评审能稳心神，取舍能守本心，卡关能做探针，交付后能收念闭环。

本项目受道家修心语义、修仙叙事中的心性门槛，以及《凡人修仙传》相关网络讨论启发，但不隶属于任何作品或权利方。这里提炼的是方法论：让 agent 帮用户把卡住的念头拆成事实、价值、选择、行动和闭环。

对熟悉《凡人修仙传》的用户来说，它尤其借鉴了“韩立式念头通达”：不把一时痛快当道心，不把工具当根本，不把一次失败当自我审判；先看清处境，留住后手，证据足再出手，做完选择后能承担代价继续赶路。

## 为什么需要

今天的 AI Agent 已经很会写代码、总结材料、生成方案，但越是复杂任务，越容易暴露一个问题：它不是不会行动，而是太容易在没有真正看清之前就行动。

很多失败，不是模型不会写，而是“念头不通”：

- 把事实、猜测、用户情绪和自己的推断混在一起，把假说当结论。
- 为了显得有帮助，过早给出确定答案，把未知包装成判断。
- 一遇到报错、review、需求变化、设计争议，就被上下文带偏：要么过度解释，要么直接大改。
- 迷信工具和生成能力，把“小绿瓶”当成道心，以为能生成代码就等于能做对选择。
- 执著于第一个方案，把一段代码、一个设计稿、一个计划当成必须维护的自我价值。
- 给出漂亮建议后，没有产物、验证信号、回滚路径和收念规则。

这就是为什么智能体需要“念头通达”。

念头通达不是让 agent 说几句古风话，也不是让它安慰用户“放下”。它是一套工作约束：先分清事实和脑补，再识别心结与边界；先看清可控与不可控，再做本心决断；先设计最小探针和后手，再出手交付；最后用验证和复盘把念头收住。

对熟悉《凡人修仙传》的用户来说，这就是韩立式道心：小绿瓶可以是工具，但不是根本；灵根普通也要承认限制；出手前留后手，证据足再动剑，做完选择后能承担代价继续赶路。

`niantou-tongda-skill` 的目标，是让 AI Agent 在代码、项目、设计、文档和复杂办公场景里，不只是“会生成”，而是能看清、取舍、行动、验证、收念。

## 方法结构

```text
niantou-tongda        总入口：道心路由与通达校验
xuanlan-mirror        玄览明镜：分清事实、信号、解释、情绪、未知
heart-knot-diagnosis  心结诊断：识别悔、怨、怕、羞、亏、欲、义
control-boundary      可控边界：划分控制圈、影响圈、观察圈
benxin-decision       本心决断：按价值、代价、边界和验证做选择
wuzhu-action          无住行动：在不确定和不完美中交付最小反馈
pojing-breakthrough   破境攻关：为顽固瓶颈设计最小探针
engineering-execution 工程执行：把澄清和决断落到代码、文档、设计或办公交付
hanli-long-game       韩立长线：保留后路、证据、复利和选择权
closure-review        收念闭环：行动后复盘并停止重复内耗
tongda-workflows      工作流：组合多个 skill 处理复杂困境
```

## 核心原则

念头通达 = 事实澄明 + 心结可见 + 边界清楚 + 决断干净 + 行动不执 + 瓶颈可破 + 交付可验 + 长线不败 + 复盘收束。

它不是压抑情绪，也不是鼓励冲动；不是有仇必报，也不是委屈求全。通达的标志是：做完选择后，用户知道自己为什么这样做，愿意承担代价，并能把注意力收回到行动。

## 韩立式念头通达

这里的“韩立式”不是剧情复述，而是一组 agent 行动规则：

- 小绿瓶是工具：模型、测试、脚手架、资料库可以放大能力，但不能替代判断。
- 灵根是约束：时间、权限、架构、数据、经验不足，都要先承认再破局。
- 落云宗是根据地：维护项目基础设施、团队信任和长期节奏。
- 青竹峰云剑是出手方式：少而准，小 diff、强证据、快验证。
- 化凡入世是事实感：回到日志、代码、用户现场和真实反馈。
- 飞升回望是收念标准：回头看这一步是否值得、干净、可承担。

对应 skill 是 `hanli-long-game`，详细映射见 [hanli-practice-map.md](skills/hanli-long-game/hanli-practice-map.md)。

## 理论来源

本项目综合了：

- 道家：涤除玄览、心斋、坐忘、知止。
- 修仙叙事：心境门槛、藏锋守拙、后手、长线道心。
- 儒家：反求诸己、义利之辨、日参省。
- 禅宗：无住生心。
- 斯多葛：可控与不可控的区分。
- CBT / ACT：自动想法、认知解离、价值行动。
- 工程方法：OODA、敏捷、最小可验证探针、blameless postmortem。

详细映射见 [theory-map.md](skills/niantou-tongda/theory-map.md) 和各 skill 的 `original-texts.md`。

## 安装到 Codex

源码方式：

```bash
git clone https://github.com/zxS33/niantou-tongda-skill.git
cd niantou-tongda-skill
node ./bin/niantou-tongda-skill.mjs install --target codex --scope user
```

然后开启新会话，检查 skill 列表中是否出现 `niantou-tongda`。

更多说明见 [.codex/INSTALL.md](.codex/INSTALL.md)。

其他平台：

```bash
node ./bin/niantou-tongda-skill.mjs install --target opencode --scope user
node ./bin/niantou-tongda-skill.mjs install --target claude-code --scope user
node ./bin/niantou-tongda-skill.mjs install --target all --scope user
```

## 手动命令入口

支持 Markdown slash commands 的宿主可以使用 `commands/`：

```text
/niantou-tongda
/xuanlan-mirror
/heart-knot-diagnosis
/control-boundary
/benxin-decision
/wuzhu-action
/pojing-breakthrough
/engineering-execution
/hanli-long-game
/closure-review
/tongda-workflows
```

不支持命令目录的宿主，直接读取同名 command 文件或 `skills/*/SKILL.md`。

## 会话入口

`hooks/session-start` 会注入 `skills/niantou-tongda/SKILL.md` 作为轻量总入口。它只负责建立“心无滞碍，行动有据”的路由和校验框架，不会强行加载全部方法。

## 验证

```bash
npm test
```

验证内容包括：

- 必要文件是否存在。
- skills 和 commands frontmatter 是否有效。
- slash command 是否覆盖全部 skill。
- README 和文档中的本地链接是否有效。
- 是否残留初始化模板占位文本。

## 项目结构

```text
niantou-tongda-skill/
├── agents/
│   └── daoxin-reviewer.md
├── commands/
├── hooks/
├── skills/
│   ├── niantou-tongda/
│   ├── xuanlan-mirror/
│   ├── heart-knot-diagnosis/
│   ├── control-boundary/
│   ├── benxin-decision/
│   ├── wuzhu-action/
│   ├── pojing-breakthrough/
│   ├── engineering-execution/
│   ├── hanli-long-game/
│   ├── closure-review/
│   └── tongda-workflows/
├── docs/
├── bin/validate.mjs
├── bin/niantou-tongda-skill.mjs
├── README.md
└── README.en.md
```

## 示例

查看 [docs/example.md](docs/example.md)。

## 边界

本项目不是心理治疗、法律意见或危机干预工具。如果问题涉及自伤、伤人、违法、跟踪、威胁、骚扰、医疗或法律高风险事项，必须优先处理安全与合规。

## License

MIT
