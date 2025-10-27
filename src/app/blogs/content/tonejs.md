# 学习使用 Tone.js 制作网页版乐器

## 安装

```sh
npm install tone
```

```js
import * as Tone from "tone";
```

## 使用

这是官网 Hello Tone 示例，初步讲解了怎么使用 tone。

```js
//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");
```

其中通过`new Tone.Synth()`创建了一个 Synth 发声器，然后通过`toDestination()`连接到了输出。

然后使用发生器对象`synth`的方法`triggerAttackRelease("C4", "8n")`演奏了一个音高 c4,时长为 8n 的音。

## API

### 乐器

发声需要用到乐器来播放某个音，其中常用的有 Synth 和 Sampler。

#### Synth

Synth 由一个通过幅度包络线的全振荡器组成，声音是电子音。

#### Sampler

Sampler 通过传入一个将音符的音高或 midi 值映射到 url 的对象，可以像其他工具一样触发攻击并释放该音符。通过自动重投样本，可以播放没有明确包含的音调，这可以节省加载时间。

<Valine></Valine>
