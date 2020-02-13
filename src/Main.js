import React, { Component } from 'react'
import $ from 'jquery'
import url from './audio/hebe.mp3' // 引入背景音乐文件


class Main extends Component {
    state = {
        date: {},
    }
    componentDidMount() {
        this.print();
        setInterval(() => {
            this.time(2019, 6, 8) // 你们的纪念日
        }, 1000
        )
        var audio = document.getElementById("audio");
        setTimeout(() => audio.play(), 8500) // 背景音乐在页面加载后，延迟播放的时长，单位：毫秒。
    }
    print = () => {
        $.fn.autotype = function () {
            var _this = $(this);
            var str = _this.html();
            // 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
            str = str.replace(/(\s){2,}/g, "$1");
            var index = 0;
            $(this).html('');
            var timer = function fn() {
                var args = arguments;
                var current = str.slice(index, index + 1);
                // html标签完整输出,如：<p>
                if (current == '<') {
                    index = str.indexOf('>', index) + 1;
                }
                else {
                    index++;
                }
                //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
                if (index < str.length - 1) { //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
                    _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
                } else {
                    _this.html(str.substring(0, index));
                    clearTimeout(timer);
                };
                setTimeout(fn, 200)
            };
            // 延迟1s开始
            setTimeout(timer, 1000);
        };
        $("#autotype").autotype();
    }
    time = (year, month, day) => {
        var dateNow = new Date();
        var dateJNR = new Date(year, month - 1, day);
        // var anniversary = parseInt((dateNow - dateJNR) / (365*24*3600*1000))
        var d = parseInt((dateNow - dateJNR) / (24 * 3600 * 1000));
        var hour = parseInt(((dateNow - dateJNR) / (3600 * 1000)) % 24);
        var minute = parseInt((dateNow - dateJNR) / (1000 * 60) % 60);
        var second = parseInt((dateNow - dateJNR) / 1000 % 60);
        this.setState({ date: { d: d, hour: hour, minute: minute, second: second } });
    };
    render() {
        const date = () => {
            if (this.state.date.d !== undefined) {
                const { d, hour, minute, second } = this.state.date
                return (<p>我们已经一起走过了: <span className="date-text">{d}</span> 天 <span className="date-text">{hour}</span> 小时 <span className="date-text">{minute}</span> 分 <span className="date-text">{second}</span> 秒 </p>
                )
            }
        }
        return (
            <div className="App animated bounceInLeft">
                <div className="date">{date()}</div>
                <div id="autotype">
                    <h1 style={{ fontWeight: 900 }}>哈喽！我的好好小姐！</h1>
                    <p >在煽情开始之前，先来听听我们定情曲吧！Music!</p>
                    <p>今天是我们的第一个情人节，从2019年6月8号到现在，也算是一起经历了好多事情，
                    有开心也有争论，好几次到互相冷静的时候，但是我们都走过来了。</p>
                    <p>回想起来，也是感慨万千哈哈，现在已经异地半年啦，除了那次回去短暂的见了一下，我也知道我把你从一个对感情充满憧憬，
					充满期望的人伤害了好多，因为我的傻，你感觉很多时候get不到你想要的，总是会做让你不理解让你伤心的事情，包括那些之前各种想法互不理解的争吵，很伤你的心，
					让你现在不敢再过多的热情在我们的感情里，让你甚至有点看开麻木了。
                </p>
                    <p>其实你也知道，我心里就是只有你的呀，只是恍然一想我今年都25了，好像目前的经历都配不上这个年纪，以前觉得这个年纪的人都踏入社会好几年了，开始自己挣钱开始追求了自己想要的，
					其实看看我身边的人就是这样，可是我却还在挣扎，还在跟自己做斗争，还在担心毕业的事情，有时间时却不去争取。我觉得这不是我想象中的样子，不应该是这样一个从小到大算是听话学习不错
					的人的样子，但是看一眼时间就是在我的抗拒和拖延中过去了。觉得自己这个年纪了还不能像成人一样做事，完成好自己的任务，还不能适应很好管理自己，所以我会苦恼，我其实懂得呀，关于
					感情很多时候应该怎么去做，虽然嘴里说的是在一起了都会变好，其实异地时也有好多可以做的事情，我也知道的呀，就是希望能先让自己踏上正轨，自己的学业和工作，当一切都踏上正轨开始运转了，
					感情的事也会踏上正轨的我知道。
                </p>
                    <p>就是苦了你现在要看到一个这样的我，哈哈明明情人节快乐然后说了这么多我自己，我知道你会一直支持我陪伴我，我对你也会。现在不想再去想以前我们争吵过的事情啦，只希望我们的
					生活和工作都能踏上正轨，然后我们也能很开心的一起生活。whatever，有你在，我就有一个后盾一样，很多事情就有了精神力量，希望我让做到让你也有这样的感觉。
                </p>
                    <p>最后祝我的好好小姐情人节快乐哦，爱你好好！</p>
                    <div style={{ textAlign: 'right' }}>
                        <p>安迪哥哥</p>
                        <p>2020年2月14日</p>
                    </div>
                </div>
                <audio id="audio" src={url}></audio>
            </div>

        )
    }
}
export default Main